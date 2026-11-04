'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { KILL_GRACE_MS, getScriptFilePath } = require('./constants');

const sleep = (ms) => {
  const { promise, resolve } = Promise.withResolvers();
  setTimeout(resolve, ms);
  return promise;
};

exports.escapeShellArg = (arg) => {
  const str = String(arg === undefined || arg === null ? '' : arg);
  if (/^[a-zA-Z0-9_./:@=-]+$/.test(str)) {
    return str;
  }
  return `'${str.replace(/'/g, "'\\''")}'`;
};

exports.prepareTaskCommand = (taskDef = {}, taskId = null) => {
  if (typeof taskDef === 'string') {
    return {
      cmd: taskDef,
      scriptPath: null,
      script: null,
      args: [],
      shell: true
    };
  }

  const args = Array.isArray(taskDef.args) ? taskDef.args.map((a) => String(a)) : [];
  const formattedArgs = args.length > 0 ? ` ${args.map(exports.escapeShellArg).join(' ')}` : '';
  const shellInterpreter = typeof taskDef.shell === 'string' && taskDef.shell.trim() !== ''
    ? taskDef.shell.trim()
    : null;

  // 1. Inline multi-line shell script (`script` or `inlineScript`) -> write to /tmp/express-script-logs/<taskId>.sh
  const inlineScript = taskDef.script || taskDef.inlineScript || null;
  if (inlineScript && typeof inlineScript === 'string' && inlineScript.trim() !== '') {
    const resolvedTaskId = taskId || taskDef._id || taskDef.taskId || `inline-${Date.now()}`;
    const tempScriptPath = getScriptFilePath(resolvedTaskId);
    const hasShebang = inlineScript.trimStart().startsWith('#!');
    const content = hasShebang ? inlineScript : `#!/usr/bin/env bash\n${inlineScript}`;
    fs.writeFileSync(tempScriptPath, content, { encoding: 'utf8', mode: 0o700 });
    try {
      fs.chmodSync(tempScriptPath, 0o700);
    } catch (_chmodErr) {
      // Ignore chmod error on platforms without POSIX mode bits
    }

    const runnerPrefix = shellInterpreter ? `${exports.escapeShellArg(shellInterpreter)} ` : '';
    const cmd = `${runnerPrefix}${exports.escapeShellArg(tempScriptPath)}${formattedArgs}`;
    return {
      cmd,
      scriptPath: tempScriptPath,
      script: inlineScript,
      args,
      shell: shellInterpreter || true
    };
  }

  // 2. External shell script file path (`scriptPath` or `file`)
  const rawScriptPath = taskDef.scriptPath || taskDef.file || null;
  if (rawScriptPath && typeof rawScriptPath === 'string' && rawScriptPath.trim() !== '') {
    const resolvedPath = path.isAbsolute(rawScriptPath)
      ? rawScriptPath
      : path.resolve(taskDef.cwd || process.cwd(), rawScriptPath);

    const interpreter = shellInterpreter || 'bash';
    const cmd = taskDef.cmd && typeof taskDef.cmd === 'string' && taskDef.cmd.trim() !== ''
      ? taskDef.cmd
      : `${exports.escapeShellArg(interpreter)} ${exports.escapeShellArg(resolvedPath)}${formattedArgs}`;

    return {
      cmd,
      scriptPath: rawScriptPath,
      script: null,
      args,
      shell: shellInterpreter || true
    };
  }

  // 3. Direct shell command string (`cmd`) + optional `args`
  const baseCmd = typeof taskDef.cmd === 'string' ? taskDef.cmd.trim() : '';
  const finalCmd = baseCmd && formattedArgs ? `${baseCmd}${formattedArgs}` : baseCmd;

  return {
    cmd: finalCmd,
    scriptPath: null,
    script: null,
    args,
    shell: shellInterpreter || true
  };
};

exports.spawnShellProcess = (cmd, options = {}) => {
  const {
    cwd = process.cwd(),
    env = {},
    logFd,
    shell = true
  } = options;

  const mergedEnv = {
    ...process.env,
    ...env
  };

  const stdio = logFd !== undefined && logFd !== null
    ? ['ignore', logFd, logFd]
    : ['ignore', 'pipe', 'pipe'];

  const child = spawn(cmd, {
    cwd,
    env: mergedEnv,
    shell: shell || true,
    detached: true,
    stdio
  });

  if (child && typeof child.unref === 'function') {
    child.unref();
  }

  return child;
};

exports.isPidAlive = (pid) => {
  const numPid = Number(pid);
  if (!Number.isInteger(numPid) || numPid <= 0) {
    return false;
  }
  try {
    process.kill(numPid, 0);
    return true;
  } catch (err) {
    if (err && err.code === 'EPERM') {
      return true;
    }
    return false;
  }
};

exports.sendGroupSignal = (pid, signal) => {
  const numPid = Number(pid);
  if (!Number.isInteger(numPid) || numPid <= 0) {
    return false;
  }
  try {
    process.kill(-numPid, signal);
    return true;
  } catch (groupErr) {
    if (groupErr && groupErr.code === 'EPERM') {
      return true;
    }
    try {
      process.kill(numPid, signal);
      return true;
    } catch (singleErr) {
      return Boolean(singleErr && singleErr.code === 'EPERM');
    }
  }
};

exports.suspendProcessTree = (pid) => {
  const numPid = Number(pid);
  if (!exports.isPidAlive(numPid)) {
    return false;
  }
  if (process.platform === 'win32') {
    return false;
  }
  return exports.sendGroupSignal(numPid, 'SIGSTOP');
};

exports.resumeProcessTree = (pid) => {
  const numPid = Number(pid);
  if (!exports.isPidAlive(numPid)) {
    return false;
  }
  if (process.platform === 'win32') {
    return false;
  }
  return exports.sendGroupSignal(numPid, 'SIGCONT');
};

exports.killProcessTree = async (pid, gracePeriodMs = KILL_GRACE_MS) => {
  const numPid = Number(pid);
  if (!Number.isInteger(numPid) || numPid <= 0) {
    return false;
  }
  if (!exports.isPidAlive(numPid)) {
    return false;
  }

  if (process.platform === 'win32') {
    const { promise, resolve } = Promise.withResolvers();
    const killer = spawn('taskkill', ['/pid', String(numPid), '/T', '/F'], {
      stdio: 'ignore',
      windowsHide: true
    });
    killer.on('error', () => resolve(false));
    killer.on('close', (code) => resolve(code === 0 || !exports.isPidAlive(numPid)));
    return promise;
  }

  // Send SIGTERM to the entire detached process group (-pid), then SIGCONT in case it was SIGSTOP-paused
  exports.sendGroupSignal(numPid, 'SIGTERM');
  exports.sendGroupSignal(numPid, 'SIGCONT');

  const pollStepMs = 40;
  const maxWaitMs = Math.max(0, Number(gracePeriodMs));
  let waitedMs = 0;

  while (waitedMs < maxWaitMs) {
    if (!exports.isPidAlive(numPid)) {
      return true;
    }
    await sleep(pollStepMs);
    waitedMs += pollStepMs;
  }

  // Escalate to SIGKILL if process group did not exit within grace period
  if (exports.isPidAlive(numPid)) {
    exports.sendGroupSignal(numPid, 'SIGKILL');
    let killWaitMs = 0;
    while (killWaitMs < 300 && exports.isPidAlive(numPid)) {
      await sleep(30);
      killWaitMs += 30;
    }
  }

  return !exports.isPidAlive(numPid);
};
