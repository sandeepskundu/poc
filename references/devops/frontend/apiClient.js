/**
 * Plain JS REST & SSE API Client for Express Hierarchical Script Runner
 * Covers all 3-Tier Runner, Batch, Task, Log, Telemetry, Maintenance & Cluster endpoints.
 */

export const APPROVAL_STATUS = Object.freeze({
  NONE: null,
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SKIPPED: 'skipped',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired'
});

const buildQueryString = (params = {}) => {
  const entries = Object.entries(params).filter(
    ([, val]) => val !== undefined && val !== null && val !== ''
  );
  if (entries.length === 0) {
    return '';
  }
  const usp = new URLSearchParams();
  entries.forEach(([key, val]) => {
    if (Array.isArray(val)) {
      if (val.length > 0) {
        usp.set(key, val.join(','));
      }
    } else {
      usp.set(key, String(val));
    }
  });
  const str = usp.toString();
  return str ? `?${str}` : '';
};

export const createRunnerApiClient = (baseUrl = '/api/devops', defaultHeaders = {}) => {
  const cleanBase = baseUrl.replace(/\/+$/, '');

  const request = async (method, path, body = undefined, query = undefined) => {
    const qs = query ? buildQueryString(query) : '';
    const url = `${cleanBase}${path}${qs}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...defaultHeaders
      }
    };
    if (body !== undefined && method !== 'GET') {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);
    const contentType = res.headers.get('content-type') || '';
    const data = contentType.includes('application/json')
      ? await res.json()
      : await res.text();

    if (!res.ok) {
      const err = new Error(
        (data && data.error) || `Request failed with status ${res.status}`
      );
      err.status = res.status;
      err.code = data && data.code;
      err.activeRunnerIds = data && data.activeRunnerIds;
      err.payload = data;
      throw err;
    }
    return data;
  };

  return {
    baseUrl: cleanBase,

    // ========================================================================
    // 1. Trigger & Runner Discovery (Use Cases 1–12)
    // ========================================================================
    triggerRunner: (payload) =>
      request(
        'POST',
        payload && payload.mapId
          ? `/maps/${encodeURIComponent(payload.mapId)}/runners`
          : '/runners',
        payload
      ),

    getRunner: (runnerId) =>
      request('GET', `/runners/${encodeURIComponent(runnerId)}`),

    listRunners: (filters = {}) =>
      request('GET', '/runners', undefined, filters),

    getScheduledRunners: (filters = {}) =>
      request('GET', '/runners/scheduled', undefined, filters),

    getPausedRunners: (filters = {}) =>
      request('GET', '/runners/paused', undefined, filters),

    getFailedRunners: (filters = {}) =>
      request('GET', '/runners/failed', undefined, filters),

    getAwaitingApprovalRunners: (filters = {}) =>
      request('GET', '/runners/awaiting-approval', undefined, filters),

    // ========================================================================
    // 2. Runner Controls & Bulk Actions (Use Cases 11, 13, 14)
    // ========================================================================
    stopRunner: (runnerId) =>
      request('POST', `/runners/${encodeURIComponent(runnerId)}/stop`),

    stopRunners: (filters = {}) =>
      request('POST', '/runners/stop', filters),

    cancelScheduledRunners: (filters = {}) =>
      request('POST', '/runners/scheduled/cancel', filters),

    pauseRunner: (runnerId) =>
      request('POST', `/runners/${encodeURIComponent(runnerId)}/pause`),

    resumeRunner: (runnerId, options = {}) =>
      request('POST', `/runners/${encodeURIComponent(runnerId)}/resume`, options),

    replayRunner: (runnerId, options = {}) =>
      request('POST', `/runners/${encodeURIComponent(runnerId)}/replay`, options),

    // ========================================================================
    // 3. Batch Discovery, Controls & Manual Approvals (Use Cases 9, 13, 14)
    // ========================================================================
    getBatch: (batchId) =>
      request('GET', `/batches/${encodeURIComponent(batchId)}`),

    listBatches: (filters = {}) =>
      request('GET', '/batches', undefined, filters),

    getSkippableBatches: (filters = {}) =>
      request('GET', '/batches/skippable', undefined, filters),

    getAwaitingApprovalBatches: (filters = {}) =>
      request('GET', '/batches/awaiting-approval', undefined, filters),

    getPendingApprovalBatches: (filters = {}) =>
      request('GET', '/batches/pending-approval', undefined, filters),

    getFailedBatches: (filters = {}) =>
      request('GET', '/batches/failed', undefined, filters),

    skipBatch: (batchId, options = {}) =>
      request('POST', `/batches/${encodeURIComponent(batchId)}/skip`, options),

    skipBatches: (filters = {}) =>
      request('POST', '/batches/skip', filters),

    stopBatch: (batchId) =>
      request('POST', `/batches/${encodeURIComponent(batchId)}/stop`),

    replayBatch: (batchId, options = {}) =>
      request('POST', `/batches/${encodeURIComponent(batchId)}/replay`, options),

    approveBatch: (batchId, payload = {}) =>
      request('POST', `/batches/${encodeURIComponent(batchId)}/approve`, payload),

    approveBatches: (payload = {}) =>
      request('POST', '/batches/approve', payload),

    rejectBatch: (batchId, payload = {}) =>
      request('POST', `/batches/${encodeURIComponent(batchId)}/reject`, payload),

    rejectBatches: (payload = {}) =>
      request('POST', '/batches/reject', payload),

    expireBatchApproval: (batchId, payload = {}) =>
      request('POST', `/batches/${encodeURIComponent(batchId)}/expire-approval`, payload),

    // ========================================================================
    // 4. Task Discovery, OS Signal Controls & Replay (Use Cases 13, 14)
    // ========================================================================
    getTask: (taskId) =>
      request('GET', `/tasks/${encodeURIComponent(taskId)}`),

    listTasks: (filters = {}) =>
      request('GET', '/tasks', undefined, filters),

    getRunningTasks: (filters = {}) =>
      request('GET', '/tasks/running', undefined, filters),

    getPausedTasks: (filters = {}) =>
      request('GET', '/tasks/paused', undefined, filters),

    getFailedTasks: (filters = {}) =>
      request('GET', '/tasks/failed', undefined, filters),

    skipTask: (taskId) =>
      request('POST', `/tasks/${encodeURIComponent(taskId)}/skip`),

    stopTask: (taskId) =>
      request('POST', `/tasks/${encodeURIComponent(taskId)}/stop`),

    pauseTask: (taskId) =>
      request('POST', `/tasks/${encodeURIComponent(taskId)}/pause`),

    pauseTasks: (filters = {}) =>
      request('POST', '/tasks/pause', filters),

    resumeTask: (taskId) =>
      request('POST', `/tasks/${encodeURIComponent(taskId)}/resume`),

    resumeTasks: (filters = {}) =>
      request('POST', '/tasks/resume', filters),

    replayTask: (taskId, options = {}) =>
      request('POST', `/tasks/${encodeURIComponent(taskId)}/replay`, options),

    // ========================================================================
    // 5. Real-Time SSE Stream Connection (Use Case 15)
    // ========================================================================
    connectStream: (filters = {}, handlers = {}) => {
      const qs = buildQueryString({
        replayHistory: filters.replayHistory !== false ? 'true' : 'false',
        includeState: filters.includeState !== false ? 'true' : 'false',
        mapId: filters.mapId,
        runnerId: filters.runnerId,
        batchId: filters.batchId,
        taskId: filters.taskId,
        afterTs: filters.afterTs
      });

      let streamPath = '/stream';
      if (filters.taskId && !filters.runnerId && !filters.batchId) {
        streamPath = `/tasks/${encodeURIComponent(filters.taskId)}/stream`;
      } else if (filters.batchId && !filters.runnerId) {
        streamPath = `/batches/${encodeURIComponent(filters.batchId)}/stream`;
      } else if (filters.runnerId) {
        streamPath = `/runners/${encodeURIComponent(filters.runnerId)}/stream`;
      } else if (filters.mapId) {
        streamPath = `/maps/${encodeURIComponent(filters.mapId)}/stream`;
      }

      const url = `${cleanBase}${streamPath}${qs}`;
      const es = new window.EventSource(url);

      es.onopen = (evt) => {
        if (handlers.onOpen) handlers.onOpen(evt);
      };

      es.onerror = (err) => {
        if (handlers.onError) handlers.onError(err);
      };

      es.onmessage = (evt) => {
        try {
          const parsed = JSON.parse(evt.data);
          if (handlers.onLog) handlers.onLog(parsed);
        } catch (_e) {
          // ignore non-json comment/ping
        }
      };

      const customEvents = [
        'connected',
        'state',
        'runner:status',
        'batch:status',
        'task:status',
        'progress',
        'step-start',
        'step-ok',
        'step-fail',
        'section-start',
        'section-end',
        'warning',
        'error',
        'output',
        'stdout',
        'stderr',
        'system'
      ];

      customEvents.forEach((eventName) => {
        es.addEventListener(eventName, (evt) => {
          try {
            const data = JSON.parse(evt.data);
            if (eventName === 'state' && handlers.onState) {
              handlers.onState(data);
            } else if (
              (eventName === 'runner:status' ||
                eventName === 'batch:status' ||
                eventName === 'task:status') &&
              handlers.onStatusChange
            ) {
              handlers.onStatusChange(eventName, data);
            } else if (eventName === 'progress' && handlers.onProgress) {
              handlers.onProgress(data);
            } else if (eventName === 'connected' && handlers.onConnected) {
              handlers.onConnected(data);
            }
            if (handlers.onEvent) {
              handlers.onEvent(eventName, data);
            }
          } catch (_e) {
            // ignore
          }
        });
      });

      return {
        url,
        close: () => es.close(),
        eventSource: es
      };
    },

    // ========================================================================
    // 6. Historical Log Query, Raw Export & Telemetry (Use Cases 16, 17, 18)
    // ========================================================================
    queryLogs: (filters = {}) =>
      request('GET', '/logs', undefined, filters),

    getExportLogsUrl: (runnerId, format = 'txt') =>
      `${cleanBase}/runners/${encodeURIComponent(runnerId)}/export?format=${encodeURIComponent(format)}`,

    exportRunnerLogsText: (runnerId, format = 'txt') =>
      request('GET', `/runners/${encodeURIComponent(runnerId)}/export`, undefined, { format }),

    getRunnerMetrics: (runnerId) =>
      request('GET', `/runners/${encodeURIComponent(runnerId)}/metrics`),

    // ========================================================================
    // 7. Temp File Cleanup & Cluster Configuration (Use Cases 20, 21, 22)
    // ========================================================================
    cleanupRunnerFiles: (runnerId) =>
      request('POST', `/runners/${encodeURIComponent(runnerId)}/cleanup`),

    cleanupStaleTempFiles: (maxAgeMs = 86400000) =>
      request('POST', '/maintenance/cleanup-temp', { maxAgeMs }),

    getClusterConfig: () =>
      request('GET', '/cluster/config'),

    configureCluster: (config = {}) =>
      request('POST', '/cluster/config', config)
  };
};
