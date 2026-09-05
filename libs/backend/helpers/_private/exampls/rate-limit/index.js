// rateLimiter.js
import mongoose from 'mongoose';

const BLOCK_WINDOWS = [15, 60, 60 * 24]; // in minutes

const schema = {
  "ip":"",
  "ipHash":"",
  "hashId":"",
  "timestamps":[],
  "requestCount":"",
  "startWIndow":""
}

const ipRateLimitSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  requestCount: { type: Number, default: 1 },
  startWIndow: { type: Date, default: Date.now },
  blockedUntil: { type: Date, default: null },
  violationCount: { type: Number, default: 0 },
  postBlockRequestCount: { type: Number, default: 0 },
  dailyRequestTimestamps: { type: [Date], default: [] }
});

ipRateLimitSchema.index({ blockedUntil: 1 }, { expireAfterSeconds: 0 });

const IpRateLimit = mongoose.model('IpRateLimit', ipRateLimitSchema);

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;
const POST_BLOCK_THRESHOLD = 10;
const MAX_DAILY_REQUESTS = 100;

export async function ipRateLimitMiddleware(req, res, next) {
  try {
    const ip = req.ip;
    const now = new Date();

    let record = await IpRateLimit.findOne({ ip });

    if (!record) {
      record = await IpRateLimit.create({ ip });
    }

    // Clean timestamps older than 24 hours
    record.dailyRequestTimestamps = record.dailyRequestTimestamps.filter((ts) => {
        now - ts < 24 * 60 * 60 * 1000
    });

    if (record.dailyRequestTimestamps.length >= MAX_DAILY_REQUESTS) {
      return res.status(429).json({ error: 'Daily request limit exceeded. Try again after 24 hours.' });
    }

    // Add current request timestamp
    record.dailyRequestTimestamps.push(now);

    // If still blocked, increment post-block requests
    if (record.blockedUntil && record.blockedUntil > now) {
      record.postBlockRequestCount += 1;

      if (record.postBlockRequestCount >= POST_BLOCK_THRESHOLD) {
        record.violationCount += 1;
        const blockMinutes = BLOCK_WINDOWS[Math.min(record.violationCount, BLOCK_WINDOWS.length - 1)];
        record.blockedUntil = new Date(now.getTime() + blockMinutes * 60 * 1000);
        record.postBlockRequestCount = 0;
      }

      await record.save();
      return res.status(429).json({
        error: 'Too many requests. You are temporarily blocked. Try again later.'
      });
    }

    if (now - record.startWIndow < WINDOW_MS) {
      if (record.requestCount >= MAX_REQUESTS) {
        record.violationCount += 1;
        const blockMinutes = BLOCK_WINDOWS[Math.min(record.violationCount - 1, BLOCK_WINDOWS.length - 1)];
        record.blockedUntil = new Date(now.getTime() + blockMinutes * 60 * 1000);
        record.postBlockRequestCount = 0;
        record.requestCount = 0;
        record.startWIndow = now;
      } else {
        record.requestCount += 1;
      }
    } else {
      record.requestCount = 1;
      record.startWIndow = now;
    }

    await record.save();
    next();
  } catch (err) {
    console.error('IP Rate Limit Error:', err);
    res.status(500).json({ error: 'Server error in rate limiting.' });
  }
}
