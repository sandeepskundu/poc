import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback
} from 'react';
import { createRunnerApiClient, APPROVAL_STATUS } from './apiClient';
import { USE_CASE_CATALOG } from './useCaseTemplates';
import './DevOpsRunnerDashboard.css';

const SENSITIVE_KEY_PATTERN =
  /PASSWORD|PASSWD|SECRET|TOKEN|API_KEY|PRIVATE_KEY|ACCESS_KEY|AUTH|CREDENTIAL/i;

const formatTime = (ts) => {
  if (!ts) return '--:--:--';
  const d = new Date(ts);
  return d.toISOString().slice(11, 23);
};

const formatDuration = (ms) => {
  if (ms === null || ms === undefined) return '—';
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
};

const expandCartesianPreview = (matrixObj = {}) => {
  const axes = Object.keys(matrixObj).filter(
    (k) => Array.isArray(matrixObj[k]) && matrixObj[k].length > 0
  );
  if (axes.length === 0) return [];
  let combos = [{}];
  axes.forEach((axis) => {
    const next = [];
    combos.forEach((prefix) => {
      matrixObj[axis].forEach((val) => {
        next.push({ ...prefix, [axis]: String(val) });
      });
    });
    combos = next;
  });
  return combos;
};

// ============================================================================
// Sub-Component 1: Pipeline Builder & Trigger (Covers Use Cases 1,2,3,6,7,8,10,11,12,19,20)
// ============================================================================
export const PipelineBuilderPanel = ({
  selectedUseCase,
  payloadText,
  setPayloadText,
  onTrigger,
  conflictError,
  onResolveConflictStop
}) => {
  const [builderSubTab, setBuilderSubTab] = useState('visual');
  const [matrixAxisKey, setMatrixAxisKey] = useState('REGION');
  const [matrixAxisValues, setMatrixAxisValues] = useState('us-east-1, eu-west-1, ap-south-1');
  const [newCmdText, setNewCmdText] = useState('echo "##[step-ok] Custom command complete"');

  const parsedPayload = useMemo(() => {
    try {
      return JSON.parse(payloadText);
    } catch (_err) {
      return null;
    }
  }, [payloadText]);

  const updateParsedField = (updater) => {
    if (!parsedPayload) return;
    const clone = JSON.parse(JSON.stringify(parsedPayload));
    updater(clone);
    setPayloadText(JSON.stringify(clone, null, 2));
  };

  // Detect auto-redacted env keys (Use Case 6)
  const detectedSecrets = useMemo(() => {
    if (!parsedPayload) return [];
    const list = [];
    const envObj = parsedPayload.env || {};
    Object.keys(envObj).forEach((k) => {
      if (SENSITIVE_KEY_PATTERN.test(k)) {
        list.push({ source: 'Auto-Detected Env Key', key: k });
      }
    });
    (parsedPayload.secretKeys || []).forEach((k) => {
      list.push({ source: 'Explicit secretKeys', key: k });
    });
    (parsedPayload.secrets || []).forEach((s, idx) => {
      list.push({ source: 'Raw Literal Secret', key: `secrets[${idx}] (${s.slice(0, 4)}***)` });
    });
    return list;
  }, [parsedPayload]);

  // Matrix preview (Use Case 10)
  const matrixCombos = useMemo(() => {
    if (!parsedPayload || !Array.isArray(parsedPayload.batches)) return [];
    const firstMatrixBatch = parsedPayload.batches.find((b) => b && b.matrix);
    if (!firstMatrixBatch) return [];
    return expandCartesianPreview(firstMatrixBatch.matrix);
  }, [parsedPayload]);

  return (
    <div className="devops-grid-2">
      {/* Left Column: Interactive Visual Configurator for Use Cases */}
      <div className="devops-card">
        <div className="devops-card-header">
          <h3 className="devops-card-title">
            Pipeline Configuration ({selectedUseCase.shortTitle})
          </h3>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              type="button"
              className={`devops-btn devops-btn-sm ${builderSubTab === 'visual' ? 'devops-btn-primary' : ''}`}
              onClick={() => setBuilderSubTab('visual')}
            >
              Visual Form
            </button>
            <button
              type="button"
              className={`devops-btn devops-btn-sm ${builderSubTab === 'json' ? 'devops-btn-primary' : ''}`}
              onClick={() => setBuilderSubTab('json')}
            >
              Raw JSON
            </button>
          </div>
        </div>

        {/* Use Case 12: 409 Conflict Alert Banner */}
        {conflictError && (
          <div className="devops-alert devops-alert-error">
            <div>
              <strong>409 Concurrency Lock Conflict ({conflictError.code}):</strong>{' '}
              {conflictError.message}
              {Array.isArray(conflictError.activeRunnerIds) && (
                <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                  Active Runner IDs: {conflictError.activeRunnerIds.join(', ')}
                </div>
              )}
            </div>
            <button
              type="button"
              className="devops-btn devops-btn-sm devops-btn-danger"
              onClick={() => onResolveConflictStop(parsedPayload && parsedPayload.mapId)}
            >
              Stop Active & Retry
            </button>
          </div>
        )}

        {parsedPayload ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Top-level Runner Settings: mapId, Concurrency Policy (UC 12), Shell (UC 3) */}
            <div className="devops-grid-3">
              <div className="devops-field">
                <label>Application mapId</label>
                <input
                  className="devops-input mono"
                  value={parsedPayload.mapId || ''}
                  onChange={(e) =>
                    updateParsedField((d) => {
                      d.mapId = e.target.value;
                    })
                  }
                />
              </div>

              <div className="devops-field">
                <label>Concurrency Policy (UC 12)</label>
                <select
                  className="devops-select"
                  value={parsedPayload.concurrencyPolicy || 'allow'}
                  onChange={(e) =>
                    updateParsedField((d) => {
                      d.concurrencyPolicy = e.target.value;
                    })
                  }
                >
                  <option value="allow">allow (Parallel runs allowed)</option>
                  <option value="reject">reject (409 Conflict if active)</option>
                  <option value="cancel-previous">cancel-previous (Stop active first)</option>
                  <option value="queue">queue (Wait for active to finish)</option>
                </select>
              </div>

              <div className="devops-field">
                <label>Shell Binary (UC 3)</label>
                <select
                  className="devops-select"
                  value={parsedPayload.shell || '/bin/bash'}
                  onChange={(e) =>
                    updateParsedField((d) => {
                      d.shell = e.target.value;
                    })
                  }
                >
                  <option value="/bin/bash">/bin/bash</option>
                  <option value="/bin/sh">/bin/sh</option>
                  <option value="/bin/zsh">/bin/zsh</option>
                </select>
              </div>
            </div>

            {/* Use Case 11 & 20: Delay / Schedule & Auto Temp GC */}
            <div className="devops-grid-3">
              <div className="devops-field">
                <label>Delayed Start delayMs (UC 11)</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  className="devops-input mono"
                  placeholder="0 (Immediate)"
                  value={parsedPayload.delayMs || ''}
                  onChange={(e) =>
                    updateParsedField((d) => {
                      const val = Number(e.target.value);
                      if (val > 0) d.delayMs = val;
                      else delete d.delayMs;
                    })
                  }
                />
              </div>

              <div className="devops-field">
                <label>Scheduled ISO runAt (UC 11)</label>
                <input
                  type="text"
                  className="devops-input mono"
                  placeholder="e.g. 2026-11-04T02:00:00Z"
                  value={parsedPayload.runAt || ''}
                  onChange={(e) =>
                    updateParsedField((d) => {
                      if (e.target.value.trim()) d.runAt = e.target.value.trim();
                      else delete d.runAt;
                    })
                  }
                />
              </div>

              <div className="devops-field">
                <label>Auto-Delete /tmp on Finish (UC 20)</label>
                <select
                  className="devops-select"
                  value={parsedPayload.cleanupTempOnFinish ? 'true' : 'false'}
                  onChange={(e) =>
                    updateParsedField((d) => {
                      d.cleanupTempOnFinish = e.target.value === 'true';
                    })
                  }
                >
                  <option value="false">false (Keep /tmp logs for inspection)</option>
                  <option value="true">true (Delete /tmp files on finish)</option>
                </select>
              </div>
            </div>

            {/* Use Case 19: Outbound Signed Webhook Configurator */}
            <div className="devops-grid-2">
              <div className="devops-field">
                <label>Outbound Webhook URL (UC 19)</label>
                <input
                  type="text"
                  className="devops-input mono"
                  placeholder="https://ops.example.com/webhooks/ci"
                  value={parsedPayload.webhookUrl || ''}
                  onChange={(e) =>
                    updateParsedField((d) => {
                      if (e.target.value) d.webhookUrl = e.target.value;
                      else delete d.webhookUrl;
                    })
                  }
                />
              </div>
              <div className="devops-field">
                <label>HMAC-SHA256 Webhook Secret (UC 19)</label>
                <input
                  type="password"
                  className="devops-input mono"
                  placeholder="whsec_..."
                  value={parsedPayload.webhookSecret || ''}
                  onChange={(e) =>
                    updateParsedField((d) => {
                      if (e.target.value) d.webhookSecret = e.target.value;
                      else delete d.webhookSecret;
                    })
                  }
                />
              </div>
            </div>

            {/* Use Case 1: Quick Command Appender when using top-level `tasks` */}
            {Array.isArray(parsedPayload.tasks) && (
              <div className="devops-field">
                <label>Single-Stage Commands (`tasks` Array — Use Case 1)</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  <input
                    className="devops-input mono"
                    style={{ flex: 1 }}
                    value={newCmdText}
                    onChange={(e) => setNewCmdText(e.target.value)}
                  />
                  <button
                    type="button"
                    className="devops-btn devops-btn-sm devops-btn-primary"
                    onClick={() =>
                      updateParsedField((d) => {
                        d.tasks.push(newCmdText);
                      })
                    }
                  >
                    + Add Command
                  </button>
                </div>
              </div>
            )}

            {/* Use Case 10: Matrix Axis Builder & Cartesian Preview */}
            {matrixCombos.length > 0 && (
              <div
                style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  borderRadius: 6,
                  padding: 10
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 6, color: '#ddd6fe' }}>
                  Use Case 10 — Matrix Cartesian Expansion Preview ({matrixCombos.length} Expanded Tasks):
                </div>
                <div className="devops-pill-list">
                  {matrixCombos.map((combo, idx) => (
                    <span key={idx} className="devops-kv-pill">
                      [{Object.entries(combo).map(([k, v]) => `${k}=${v}`).join(', ')}]
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <input
                    className="devops-input mono"
                    placeholder="Axis Name (e.g. NODE_VER)"
                    value={matrixAxisKey}
                    onChange={(e) => setMatrixAxisKey(e.target.value)}
                    style={{ width: 130 }}
                  />
                  <input
                    className="devops-input mono"
                    placeholder="Comma values (e.g. 20, 22)"
                    value={matrixAxisValues}
                    onChange={(e) => setMatrixAxisValues(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className="devops-btn devops-btn-sm devops-btn-purple"
                    onClick={() =>
                      updateParsedField((d) => {
                        const targetBatch = d.batches && d.batches[0];
                        if (targetBatch) {
                          targetBatch.matrix = targetBatch.matrix || {};
                          targetBatch.matrix[matrixAxisKey.trim()] = matrixAxisValues
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean);
                        }
                      })
                    }
                  >
                    Set Axis
                  </button>
                </div>
              </div>
            )}

            {/* Use Case 6: Secret Redaction Live Detector */}
            {detectedSecrets.length > 0 && (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.09)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: 6,
                  padding: 10
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 6, color: '#6ee7b7' }}>
                  Use Case 6 — Active Secret Masking Rules ({detectedSecrets.length} Protected Values → ***REDACTED***):
                </div>
                <div className="devops-pill-list">
                  {detectedSecrets.map((s, idx) => (
                    <span key={idx} className="devops-badge status-completed">
                      {s.source}: {s.key}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="devops-alert devops-alert-error">
            Invalid JSON in editor. Fix syntax in the right panel to use visual controls.
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 6 }}>
          <button
            type="button"
            className="devops-btn devops-btn-primary"
            disabled={!parsedPayload}
            onClick={() => onTrigger(parsedPayload)}
          >
            {parsedPayload && (parsedPayload.delayMs || parsedPayload.runAt)
              ? '⏰ Schedule Delayed Runner'
              : '▶ Trigger 3-Tier Runner Now'}
          </button>
        </div>
      </div>

      {/* Right Column: Live Editable JSON Payload & Stage/Task Summary */}
      <div className="devops-card">
        <div className="devops-card-header">
          <h3 className="devops-card-title">triggerRunner(req, payload) — Live Payload Editor</h3>
          <button
            type="button"
            className="devops-btn devops-btn-sm"
            onClick={() => setPayloadText(JSON.stringify(selectedUseCase.payload, null, 2))}
          >
            Reset to Preset
          </button>
        </div>
        <textarea
          className="devops-textarea mono"
          rows={20}
          value={payloadText}
          onChange={(e) => setPayloadText(e.target.value)}
        />
      </div>
    </div>
  );
};

// ============================================================================
// Sub-Component 2: Live 3-Tier Hierarchy Tree + Structured SSE Terminal
// Covers Use Cases 4, 5, 8, 9, 10, 13, 15
// ============================================================================
export const LiveExecutionAndTerminalPanel = ({
  activeRunner,
  batches,
  tasks,
  logs,
  sseState,
  onReconnectSse,
  onClearTerminal,
  onRunnerAction,
  onBatchAction,
  onTaskAction
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const [collapsedSections, setCollapsedSections] = useState({});
  const terminalBodyRef = useRef(null);

  const filteredLogs = useMemo(() => {
    return logs.filter((entry) => {
      if (selectedTaskId && String(entry.taskId) !== String(selectedTaskId)) return false;
      if (selectedBatchId && String(entry.batchId) !== String(selectedBatchId)) return false;
      return true;
    });
  }, [logs, selectedTaskId, selectedBatchId]);

  useEffect(() => {
    if (autoScroll && terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [filteredLogs, autoScroll]);

  // Group collapsible ##[section-start] / ##[section-end] blocks (Use Case 4)
  const renderedLogItems = useMemo(() => {
    const items = [];
    let currentSection = null;

    filteredLogs.forEach((log, idx) => {
      if (log.type === 'section-start') {
        currentSection = log.msg || `Section ${idx}`;
        items.push({ ...log, isSectionHeader: true, sectionKey: currentSection });
      } else if (log.type === 'section-end') {
        currentSection = null;
        items.push({ ...log, isSectionFooter: true });
      } else {
        items.push({ ...log, parentSection: currentSection });
      }
    });
    return items;
  }, [filteredLogs]);

  const runnerOutputs = (activeRunner && activeRunner.outputs) || {};

  return (
    <div className="devops-grid-2">
      {/* Left: 3-Tier Runner -> Batch -> Task Interactive Tree */}
      <div className="devops-card">
        <div className="devops-card-header">
          <div>
            <h3 className="devops-card-title">
              Tier 1: Runner{' '}
              {activeRunner ? (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  #{String(activeRunner.runnerId || activeRunner._id).slice(-8)} ({activeRunner.mapId})
                </span>
              ) : (
                '(None Selected)'
              )}
            </h3>
            {activeRunner && activeRunner.hostId && (
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                Cluster Node hostId: <code>{activeRunner.hostId}</code> | Duration:{' '}
                <code>{formatDuration(activeRunner.durationMs)}</code>
              </div>
            )}
          </div>

          {activeRunner && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span className={`devops-badge status-${activeRunner.status}`}>
                {activeRunner.status}
              </span>
              {(activeRunner.status === 'running' || activeRunner.status === 'triggered') && (
                <button
                  type="button"
                  className="devops-btn devops-btn-sm devops-btn-warning"
                  onClick={() => onRunnerAction('pause', activeRunner.runnerId || activeRunner._id)}
                >
                  ⏸ Pause Runner
                </button>
              )}
              {activeRunner.status === 'paused' && (
                <button
                  type="button"
                  className="devops-btn devops-btn-sm devops-btn-success"
                  onClick={() => onRunnerAction('resume', activeRunner.runnerId || activeRunner._id)}
                >
                  ▶ Resume Runner
                </button>
              )}
              {['scheduled', 'triggered', 'running', 'paused', 'waiting_approval', 'awaiting-approval'].includes(
                activeRunner.status
              ) && (
                <button
                  type="button"
                  className="devops-btn devops-btn-sm devops-btn-danger"
                  onClick={() => onRunnerAction('stop', activeRunner.runnerId || activeRunner._id)}
                >
                  ⏹ Stop Runner
                </button>
              )}
              <button
                type="button"
                className="devops-btn devops-btn-sm devops-btn-purple"
                onClick={() =>
                  onRunnerAction('replay-from-failed', activeRunner.runnerId || activeRunner._id)
                }
                title="Replay Runner with { fromFailed: true }"
              >
                ↻ Replay fromFailed
              </button>
              <button
                type="button"
                className="devops-btn devops-btn-sm"
                onClick={() => onRunnerAction('replay-full', activeRunner.runnerId || activeRunner._id)}
                title="Full Runner Replay from Batch 0"
              >
                ↻ Full Replay
              </button>
            </div>
          )}
        </div>

        {/* Use Case 5: Captured Inter-Task ##[set-output KEY=VAL] Variables */}
        {Object.keys(runnerOutputs).length > 0 && (
          <div
            style={{
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              borderRadius: 6,
              padding: 10
            }}
          >
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#ddd6fe', marginBottom: 6 }}>
              Use Case 5 — Captured Pipeline Outputs (`runner.outputs` injected into downstream `env`):
            </div>
            <div className="devops-pill-list">
              {Object.entries(runnerOutputs).map(([k, v]) => (
                <span key={k} className="devops-kv-pill">
                  {k} = &quot;{v}&quot;
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tier 2: Batches & Tier 3: Tasks */}
        {batches.length === 0 ? (
          <div style={{ color: 'var(--text-secondary)', padding: 20, textAlign: 'center' }}>
            Trigger any Use Case from the sidebar or Pipeline Builder to inspect its 3-Tier hierarchy.
          </div>
        ) : (
          batches.map((batch) => {
            const bId = String(batch.batchId || batch._id);
            const batchTasks = tasks.filter((t) => String(t.batchId) === bId);
            const isGate =
              batch.status === 'waiting_approval' || batch.status === 'awaiting-approval';

            return (
              <div
                key={bId}
                className={`devops-tree-batch ${isGate ? 'waiting-gate' : ''}`}
              >
                <div className="devops-tree-batch-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span className={`devops-badge status-${batch.status}`}>{batch.status}</span>
                    <strong>{batch.name}</strong>
                    <span className="devops-badge status-queued">
                      mode: {batch.mode}
                      {batch.mode === 'queue' && batch.maxQueueConcurrency > 1
                        ? ` (workers=${batch.maxQueueConcurrency})`
                        : ''}
                    </span>
                    {batch.when && batch.when !== 'on-success' && (
                      <span className="devops-kv-pill">
                        when: {typeof batch.when === 'string' ? batch.when : JSON.stringify(batch.when)}
                      </span>
                    )}
                    {(batch.requiresApproval || batch.approvalStatus) && (
                      <span
                        className={`devops-badge status-${
                          batch.approvalStatus || 'pending'
                        }`}
                      >
                        approval: {batch.approvalStatus || 'pending'}
                      </span>
                    )}
                  </div>

                  {/* Batch-Level Granular Controls: skipBatch, force skip, stopBatch, replayBatch */}
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className={`devops-btn devops-btn-sm ${selectedBatchId === bId ? 'devops-btn-primary' : ''}`}
                      onClick={() => {
                        setSelectedBatchId(selectedBatchId === bId ? '' : bId);
                        setSelectedTaskId('');
                      }}
                    >
                      {selectedBatchId === bId ? 'Showing Logs' : 'Filter Logs'}
                    </button>

                    {['queued', 'paused', 'waiting_approval', 'awaiting-approval'].includes(
                      batch.status
                    ) && (
                      <button
                        type="button"
                        className="devops-btn devops-btn-sm devops-btn-warning"
                        onClick={() => onBatchAction('skip', bId)}
                      >
                        ⏭ Skip Batch
                      </button>
                    )}

                    {batch.status === 'running' && (
                      <>
                        <button
                          type="button"
                          className="devops-btn devops-btn-sm devops-btn-warning"
                          onClick={() => onBatchAction('force-skip', bId)}
                          title="skipBatch with { force: true }"
                        >
                          ⏭ Force Skip
                        </button>
                        <button
                          type="button"
                          className="devops-btn devops-btn-sm devops-btn-danger"
                          onClick={() => onBatchAction('stop', bId)}
                        >
                          ⏹ Stop Batch
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      className="devops-btn devops-btn-sm devops-btn-purple"
                      onClick={() => onBatchAction('replay-from-failed', bId)}
                      title="replayBatch(req, batchId, { fromFailed: true })"
                    >
                      ↻ Replay fromFailed
                    </button>
                    <button
                      type="button"
                      className="devops-btn devops-btn-sm"
                      onClick={() => onBatchAction('replay-full', bId)}
                      title="Full Batch Replay"
                    >
                      ↻ Replay All
                    </button>
                  </div>
                </div>

                {/* Use Case 9 Inline Approval Gate Prompt if waiting_approval */}
                {isGate && (
                  <div className="devops-alert devops-alert-warning" style={{ marginBottom: 10 }}>
                    <span>
                      🔒 <strong>Manual Approval Gate Reached:</strong> Pipeline is paused waiting for
                      approval on this batch.
                    </span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        type="button"
                        className="devops-btn devops-btn-sm devops-btn-success"
                        onClick={() => onBatchAction('approve', bId)}
                      >
                        ✓ Approve & Resume
                      </button>
                      <button
                        type="button"
                        className="devops-btn devops-btn-sm devops-btn-danger"
                        onClick={() => onBatchAction('reject', bId)}
                      >
                        ✕ Reject & Stop
                      </button>
                    </div>
                  </div>
                )}

                {/* Tier 3 Tasks inside Batch */}
                <div className="devops-tree-task-list">
                  {batchTasks.map((task) => {
                    const tId = String(task.taskId || task._id);
                    const pct =
                      typeof task.progress === 'number'
                        ? task.progress
                        : task.status === 'done'
                        ? 100
                        : 0;

                    return (
                      <div
                        key={tId}
                        className={`devops-tree-task ${selectedTaskId === tId ? 'selected' : ''}`}
                      >
                        <div className="devops-tree-task-row">
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                            <span className={`devops-badge status-${task.status}`}>
                              {task.status}
                            </span>
                            <span style={{ fontWeight: 600 }}>{task.name}</span>
                            {task.pid && (
                              <span className="devops-badge status-queued">PID: {task.pid}</span>
                            )}
                            {task.retryCount > 0 && (
                              <span className="devops-badge status-paused">
                                Retry {task.retryCount}/{task.maxRetries || 0}
                              </span>
                            )}
                            {task.durationMs !== null && task.durationMs !== undefined && (
                              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                                {formatDuration(task.durationMs)}
                              </span>
                            )}
                          </div>

                          {/* Task-Level Granular OS Controls: skipTask, pauseTask (SIGSTOP), resumeTask (SIGCONT), stopTask, replayTask */}
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              className={`devops-btn devops-btn-sm ${selectedTaskId === tId ? 'devops-btn-primary' : ''}`}
                              onClick={() => {
                                setSelectedTaskId(selectedTaskId === tId ? '' : tId);
                                setSelectedBatchId('');
                              }}
                            >
                              {selectedTaskId === tId ? 'Filtered' : 'Logs'}
                            </button>

                            {task.status === 'queued' && (
                              <button
                                type="button"
                                className="devops-btn devops-btn-sm devops-btn-warning"
                                onClick={() => onTaskAction('skip', tId)}
                              >
                                ⏭ Skip
                              </button>
                            )}

                            {(task.status === 'running' || task.status === 'started') && (
                              <button
                                type="button"
                                className="devops-btn devops-btn-sm devops-btn-warning"
                                onClick={() => onTaskAction('pause', tId)}
                                title="Send SIGSTOP to process group (-pid)"
                              >
                                ⏸ Pause (SIGSTOP)
                              </button>
                            )}

                            {task.status === 'paused' && (
                              <button
                                type="button"
                                className="devops-btn devops-btn-sm devops-btn-success"
                                onClick={() => onTaskAction('resume', tId)}
                                title="Send SIGCONT to process group (-pid)"
                              >
                                ▶ Resume (SIGCONT)
                              </button>
                            )}

                            {['running', 'started', 'paused'].includes(task.status) && (
                              <button
                                type="button"
                                className="devops-btn devops-btn-sm devops-btn-danger"
                                onClick={() => onTaskAction('stop', tId)}
                                title="Send SIGTERM -> SIGKILL to process group (-pid)"
                              >
                                ⏹ Stop
                              </button>
                            )}

                            {['done', 'failed', 'stopped', 'skipped', 'timeout'].includes(
                              task.status
                            ) && (
                              <button
                                type="button"
                                className="devops-btn devops-btn-sm devops-btn-purple"
                                onClick={() => onTaskAction('replay', tId)}
                                title="Truncate log file, reset retryCount: 0, re-run & sync parent status"
                              >
                                ↻ Replay Task
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar (Use Case 4) */}
                        {(pct > 0 || task.status === 'running') && (
                          <div className="devops-progress-track">
                            <div
                              className="devops-progress-fill"
                              style={{ width: `${Math.min(100, Math.max(5, pct))}%` }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Right: Real-Time SSE Log Terminal (Use Cases 4 & 15) */}
      <div className="devops-terminal">
        <div className="devops-terminal-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              className={`devops-badge ${
                sseState.connected ? 'status-completed' : 'status-paused'
              }`}
            >
              ● SSE {sseState.mode}: {sseState.connected ? 'LIVE' : 'STANDBY'}
            </span>
            {(selectedBatchId || selectedTaskId) && (
              <span className="devops-kv-pill">
                Filter: {selectedTaskId ? `Task ${selectedTaskId.slice(-6)}` : `Batch ${selectedBatchId.slice(-6)}`}
                <button
                  type="button"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    marginLeft: 6
                  }}
                  onClick={() => {
                    setSelectedBatchId('');
                    setSelectedTaskId('');
                  }}
                >
                  ✕
                </button>
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{ fontSize: 11.5, color: 'var(--text-secondary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={autoScroll}
                onChange={(e) => setAutoScroll(e.target.checked)}
                style={{ marginRight: 4 }}
              />
              Auto-scroll
            </label>
            <button
              type="button"
              className="devops-btn devops-btn-sm"
              onClick={onReconnectSse}
              title="Simulate Page Refresh / Reconnect with ?replayHistory=true&includeState=true"
            >
              ⟳ Reconnect + Replay History
            </button>
            <button
              type="button"
              className="devops-btn devops-btn-sm"
              onClick={onClearTerminal}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="devops-terminal-body" ref={terminalBodyRef}>
          {renderedLogItems.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', padding: 16 }}>
              Waiting for real-time SSE log events (`stdout`, `stderr`, `step-start`, `progress`,
              `warning`, `error`, `output`)...
            </div>
          ) : (
            renderedLogItems.map((item, idx) => {
              if (item.isSectionHeader) {
                const isCollapsed = Boolean(collapsedSections[item.sectionKey]);
                return (
                  <div
                    key={idx}
                    className="devops-log-line type-section-start"
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      setCollapsedSections((prev) => ({
                        ...prev,
                        [item.sectionKey]: !prev[item.sectionKey]
                      }))
                    }
                  >
                    <span className="devops-log-ts">{formatTime(item.ts)}</span>
                    <span className="devops-log-type">SECTION</span>
                    <span>
                      {isCollapsed ? '▶' : '▼'} <strong>{item.msg}</strong> (click to toggle group)
                    </span>
                  </div>
                );
              }
              if (item.isSectionFooter) {
                return null;
              }
              if (item.parentSection && collapsedSections[item.parentSection]) {
                return null;
              }
              return (
                <div key={idx} className={`devops-log-line type-${item.type || 'stdout'}`}>
                  <span className="devops-log-ts">{formatTime(item.ts)}</span>
                  <span className="devops-log-type">{item.type || 'stdout'}</span>
                  <span>
                    {typeof item.progress === 'number' && `[${item.progress}%] `}
                    {item.msg}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Sub-Component 3: Manual Approval Gates Console (Use Case 9)
// Covers all 7 APPROVAL_STATUS enum states & every approval lifecycle use case
// ============================================================================
export const ApprovalGatesPanel = ({
  batches,
  onApprove,
  onReject,
  onSkipGate,
  onCancelGate,
  onExpireGate,
  onBulkApprove,
  onBulkReject
}) => {
  const [approver, setApprover] = useState('release-manager@company.com');
  const [comment, setComment] = useState('Staging smoke tests verified. Approved for production rollout.');
  const [rejectReason, setRejectReason] = useState('Blocked due to pending security review.');
  const [showAllBatches, setShowAllBatches] = useState(true);

  const displayedBatches = showAllBatches
    ? batches
    : batches.filter(
        (b) =>
          b.requiresApproval ||
          b.approvalStatus !== null ||
          b.status === 'waiting_approval' ||
          b.status === 'awaiting-approval'
      );

  return (
    <div className="devops-card">
      <div className="devops-card-header">
        <div>
          <h3 className="devops-card-title">
            Use Case 9 — Manual Approval Gates & `APPROVAL_STATUS` Lifecycle Console
          </h3>
          <div style={{ fontSize: 11.5, color: 'var(--text-secondary)', marginTop: 4 }}>
            Enum States: <code>NONE (null)</code> | <code>PENDING (&quot;pending&quot;)</code> |{' '}
            <code>APPROVED (&quot;approved&quot;)</code> | <code>REJECTED (&quot;rejected&quot;)</code> |{' '}
            <code>SKIPPED (&quot;skipped&quot;)</code> | <code>CANCELLED (&quot;cancelled&quot;)</code> |{' '}
            <code>EXPIRED (&quot;expired&quot;)</code>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <label style={{ fontSize: 11.5, color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showAllBatches}
              onChange={(e) => setShowAllBatches(e.target.checked)}
              style={{ marginRight: 4 }}
            />
            Show `NONE (null)` Batches
          </label>
          {onBulkApprove && (
            <button
              type="button"
              className="devops-btn devops-btn-sm devops-btn-success"
              onClick={() => onBulkApprove({ approvedBy: approver, comment, includePreApproval: true })}
              title="approveBatches with includePreApproval: true"
            >
              ✓ Bulk Approve All Pending
            </button>
          )}
          {onBulkReject && (
            <button
              type="button"
              className="devops-btn devops-btn-sm devops-btn-danger"
              onClick={() => onBulkReject({ rejectedBy: approver, reason: rejectReason })}
              title="rejectBatches for all awaiting-approval gates"
            >
              ✕ Bulk Reject Awaiting
            </button>
          )}
        </div>
      </div>

      <div className="devops-grid-3">
        <div className="devops-field">
          <label>Approver / Rejector Identity</label>
          <input
            className="devops-input mono"
            value={approver}
            onChange={(e) => setApprover(e.target.value)}
          />
        </div>
        <div className="devops-field">
          <label>Approval Comment (`approveBatch`)</label>
          <input
            className="devops-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="devops-field">
          <label>Rejection / Expiration Reason (`rejectBatch` / `expireBatchApproval`)</label>
          <input
            className="devops-input"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </div>
      </div>

      {displayedBatches.length === 0 ? (
        <div style={{ color: 'var(--text-secondary)', padding: 14 }}>
          No batches found in the current runner. Select{' '}
          <strong>9. Manual Approval Gates</strong> in the sidebar and click Trigger!
        </div>
      ) : (
        <table className="devops-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Stage Name</th>
              <th>Batch Status</th>
              <th>requiresApproval</th>
              <th>approvalStatus Enum</th>
              <th>Audit Metadata</th>
              <th>Lifecycle Actions (All Use Cases)</th>
            </tr>
          </thead>
          <tbody>
            {displayedBatches.map((b) => {
              const bId = String(b.batchId || b._id);
              const isWaiting =
                b.status === 'waiting_approval' || b.status === 'awaiting-approval';
              const canPreApprove =
                b.status === 'queued' &&
                (b.requiresApproval || b.approvalStatus === APPROVAL_STATUS.PENDING);
              const canReApprove =
                b.status === 'stopped' ||
                b.status === 'skipped' ||
                [
                  APPROVAL_STATUS.REJECTED,
                  APPROVAL_STATUS.EXPIRED,
                  APPROVAL_STATUS.CANCELLED,
                  APPROVAL_STATUS.SKIPPED
                ].includes(b.approvalStatus);
              const approvalBadgeLabel =
                b.approvalStatus === null || b.approvalStatus === undefined
                  ? 'null (NONE)'
                  : b.approvalStatus;

              return (
                <tr key={bId}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{bId.slice(-8)}</td>
                  <td>
                    <strong>{b.name}</strong>
                    {b.approvalTimeoutMs ? (
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                        SLA Timeout: {b.approvalTimeoutMs}ms
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <span className={`devops-badge status-${b.status}`}>{b.status}</span>
                  </td>
                  <td>
                    <span className="devops-badge status-queued">
                      {b.requiresApproval ? 'true' : 'false'}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`devops-badge status-${
                        b.approvalStatus || 'queued'
                      }`}
                    >
                      {approvalBadgeLabel}
                    </span>
                  </td>
                  <td style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>
                    {b.approvedBy && (
                      <div>
                        ✓ By <code>{b.approvedBy}</code>
                      </div>
                    )}
                    {b.rejectedBy && (
                      <div>
                        ✕ By <code>{b.rejectedBy}</code>
                      </div>
                    )}
                    {b.approvalComment && <div>&ldquo;{b.approvalComment}&rdquo;</div>}
                    {!b.approvedBy && !b.rejectedBy && !b.approvalComment && '—'}
                  </td>
                  <td style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="devops-btn devops-btn-sm devops-btn-success"
                      disabled={!isWaiting && !canPreApprove && !canReApprove}
                      onClick={() =>
                        onApprove(bId, { approvedBy: approver, comment })
                      }
                      title={
                        canPreApprove
                          ? 'Pre-approve queued batch so it runs without pausing when reached'
                          : canReApprove
                          ? 'Re-open and approve rejected/expired/cancelled/skipped batch'
                          : 'Approve awaiting gate and resume pipeline'
                      }
                    >
                      {canPreApprove
                        ? '✓ Pre-Approve'
                        : canReApprove
                        ? '✓ Re-Approve & Resume'
                        : '✓ Approve & Resume'}
                    </button>
                    <button
                      type="button"
                      className="devops-btn devops-btn-sm devops-btn-danger"
                      disabled={!isWaiting && !canPreApprove}
                      onClick={() =>
                        onReject(bId, { rejectedBy: approver, reason: rejectReason })
                      }
                      title="Set approvalStatus='rejected' and stop runner"
                    >
                      ✕ Reject
                    </button>
                    <button
                      type="button"
                      className="devops-btn devops-btn-sm devops-btn-warning"
                      disabled={!isWaiting && b.status !== 'queued'}
                      onClick={() => onSkipGate(bId)}
                      title="Skip batch (sets approvalStatus='skipped') and continue pipeline"
                    >
                      ⏭ Skip (`skipped`)
                    </button>
                    {onCancelGate && (
                      <button
                        type="button"
                        className="devops-btn devops-btn-sm"
                        disabled={!isWaiting && b.status !== 'queued'}
                        onClick={() => onCancelGate(bId)}
                        title="Stop batch while pending approval (sets approvalStatus='cancelled')"
                      >
                        ⏹ Cancel (`cancelled`)
                      </button>
                    )}
                    {onExpireGate && (
                      <button
                        type="button"
                        className="devops-btn devops-btn-sm devops-btn-purple"
                        disabled={!isWaiting && !canPreApprove}
                        onClick={() =>
                          onExpireGate(bId, { reason: `Expired: ${rejectReason}` })
                        }
                        title="Expire approval gate (sets approvalStatus='expired') and stop runner"
                      >
                        ⌛ Expire (`expired`)
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

// ============================================================================
// Sub-Component 4: Delayed & Scheduled Runners Manager (Use Case 11)
// Covers getScheduledRunners, stopRunner, cancelScheduledRunners
// ============================================================================
export const ScheduledRunnersPanel = ({
  scheduledRunners,
  onRefreshScheduled,
  onScheduleNew,
  onCancelSingle,
  onCancelAllScheduled
}) => {
  const [mapId, setMapId] = useState('scheduled-maintenance-window');
  const [delayMs, setDelayMs] = useState(45000);
  const [cmd, setCmd] = useState('echo "Running scheduled maintenance job"');

  return (
    <div className="devops-card">
      <div className="devops-card-header">
        <h3 className="devops-card-title">
          Use Case 11 — Delayed & Scheduled Runners (`getScheduledRunners`, `stopRunner`, `cancelScheduledRunners`)
        </h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            className="devops-btn devops-btn-sm"
            onClick={onRefreshScheduled}
          >
            ↻ Refresh Scheduled List
          </button>
          <button
            type="button"
            className="devops-btn devops-btn-sm devops-btn-danger"
            disabled={scheduledRunners.length === 0}
            onClick={() => onCancelAllScheduled()}
          >
            ✕ Cancel All Scheduled Runners ({scheduledRunners.length})
          </button>
        </div>
      </div>

      {/* Quick Schedule Form */}
      <div className="devops-grid-3" style={{ alignItems: 'end' }}>
        <div className="devops-field">
          <label>Application mapId</label>
          <input
            className="devops-input mono"
            value={mapId}
            onChange={(e) => setMapId(e.target.value)}
          />
        </div>
        <div className="devops-field">
          <label>Delay Milliseconds (`delayMs`)</label>
          <input
            type="number"
            className="devops-input mono"
            value={delayMs}
            onChange={(e) => setDelayMs(Number(e.target.value))}
          />
        </div>
        <div className="devops-field">
          <label>Task Command</label>
          <div style={{ display: 'flex', gap: 6 }}>
            <input
              className="devops-input mono"
              style={{ flex: 1 }}
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
            />
            <button
              type="button"
              className="devops-btn devops-btn-primary"
              onClick={() => onScheduleNew({ mapId, delayMs, tasks: [cmd] })}
            >
              + Schedule Run
            </button>
          </div>
        </div>
      </div>

      {/* Table of Pending Scheduled Runners */}
      <table className="devops-table">
        <thead>
          <tr>
            <th>Runner ID</th>
            <th>mapId</th>
            <th>Status</th>
            <th>Scheduled Start (`scheduledAt`)</th>
            <th>In-Memory Timer Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {scheduledRunners.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                No pending scheduled runners (`status: &quot;scheduled&quot;`). Click{' '}
                <strong>+ Schedule Run</strong> above to create one!
              </td>
            </tr>
          ) : (
            scheduledRunners.map((r) => {
              const rId = String(r.runnerId || r._id);
              return (
                <tr key={rId}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{rId}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{r.mapId}</td>
                  <td>
                    <span className="devops-badge status-scheduled">{r.status}</span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>
                    {r.scheduledAt ? new Date(r.scheduledAt).toISOString() : '—'}
                  </td>
                  <td>
                    <span
                      className={`devops-badge ${
                        r.hasActiveTimer ? 'status-completed' : 'status-queued'
                      }`}
                    >
                      {r.hasActiveTimer ? 'YES (Timer Armed)' : 'DB Scheduled'}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="devops-btn devops-btn-sm devops-btn-danger"
                      onClick={() => onCancelSingle(rId)}
                    >
                      ✕ Cancel Scheduled Run (`stopRunner`)
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================================
// Sub-Component 5: 3-Tier Discovery & Bulk Process Controls (Use Case 13)
// Covers getRunningTasks, getPausedTasks, getSkippableBatches, pauseTasks, resumeTasks, skipBatches, stopRunners
// ============================================================================
export const DiscoveryAndBulkControlsPanel = ({
  discoveryData,
  onRefreshDiscovery,
  onBulkAction,
  onTaskAction,
  onBatchAction
}) => {
  const { runningTasks = [], pausedTasks = [], skippableBatches = [], pausedRunners = [] } =
    discoveryData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="devops-card">
        <div className="devops-card-header">
          <h3 className="devops-card-title">
            Use Case 13 — 3-Tier Live Discovery & Bulk Process Controls (`pauseTasks`, `resumeTasks`, `skipBatches`, `stopRunners`)
          </h3>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="devops-btn devops-btn-sm"
              onClick={onRefreshDiscovery}
            >
              ↻ Refresh Discovery Queries
            </button>
            <button
              type="button"
              className="devops-btn devops-btn-sm devops-btn-warning"
              onClick={() => onBulkAction('pauseTasks')}
            >
              ⏸ Bulk Pause Running Tasks ({runningTasks.length})
            </button>
            <button
              type="button"
              className="devops-btn devops-btn-sm devops-btn-success"
              onClick={() => onBulkAction('resumeTasks')}
            >
              ▶ Bulk Resume Paused Tasks ({pausedTasks.length})
            </button>
            <button
              type="button"
              className="devops-btn devops-btn-sm devops-btn-warning"
              onClick={() => onBulkAction('skipBatches')}
            >
              ⏭ Bulk Skip Skippable Batches ({skippableBatches.length})
            </button>
            <button
              type="button"
              className="devops-btn devops-btn-sm devops-btn-danger"
              onClick={() => onBulkAction('stopRunners')}
            >
              ⏹ Bulk Stop All Active Runners
            </button>
          </div>
        </div>

        <div className="devops-grid-2">
          {/* Running Tasks Table (getRunningTasks) */}
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>
              Running Tasks (`getRunningTasks` — Eligible for `pauseTask` SIGSTOP)
            </h4>
            <table className="devops-table">
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>Name</th>
                  <th>PID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {runningTasks.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ color: 'var(--text-secondary)' }}>
                      No currently running tasks.
                    </td>
                  </tr>
                ) : (
                  runningTasks.map((t) => {
                    const tId = String(t.taskId || t._id);
                    return (
                      <tr key={tId}>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{tId.slice(-8)}</td>
                        <td>{t.name}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{t.pid || '—'}</td>
                        <td>
                          <button
                            type="button"
                            className="devops-btn devops-btn-sm devops-btn-warning"
                            onClick={() => onTaskAction('pause', tId)}
                          >
                            ⏸ Pause
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Paused Tasks Table (getPausedTasks) */}
          <div>
            <h4 style={{ margin: '0 0 8px 0' }}>
              Paused Tasks (`getPausedTasks` — Eligible for `resumeTask` SIGCONT)
            </h4>
            <table className="devops-table">
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>Name</th>
                  <th>PID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pausedTasks.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ color: 'var(--text-secondary)' }}>
                      No currently paused tasks (`Pausedrunners`: {pausedRunners.length}).
                    </td>
                  </tr>
                ) : (
                  pausedTasks.map((t) => {
                    const tId = String(t.taskId || t._id);
                    return (
                      <tr key={tId}>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{tId.slice(-8)}</td>
                        <td>{t.name}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{t.pid || '—'}</td>
                        <td>
                          <button
                            type="button"
                            className="devops-btn devops-btn-sm devops-btn-success"
                            onClick={() => onTaskAction('resume', tId)}
                          >
                            ▶ Resume
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Skippable Batches Table (getSkippableBatches) */}
        <div style={{ marginTop: 12 }}>
          <h4 style={{ margin: '0 0 8px 0' }}>
            Skippable Batches (`getSkippableBatches` — `queued`, `paused`, `waiting_approval`)
          </h4>
          <table className="devops-table">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Batch Name</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {skippableBatches.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ color: 'var(--text-secondary)' }}>
                    No skippable batches found.
                  </td>
                </tr>
              ) : (
                skippableBatches.map((b) => {
                  const bId = String(b.batchId || b._id);
                  return (
                    <tr key={bId}>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{bId.slice(-8)}</td>
                      <td>{b.name}</td>
                      <td>{b.mode}</td>
                      <td>
                        <span className={`devops-badge status-${b.status}`}>{b.status}</span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="devops-btn devops-btn-sm devops-btn-warning"
                          onClick={() => onBatchAction('skip', bId)}
                        >
                          ⏭ Skip Batch
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Sub-Component 6: Fine-Grained Replay & `fromFailed` Recovery Center (Use Case 14)
// Covers getFailedRunners, getFailedBatches, getFailedTasks, replayTask, replayBatch, replayRunner
// ============================================================================
export const ReplayAndFromFailedPanel = ({
  failedData,
  onRefreshFailed,
  onRunnerAction,
  onBatchAction,
  onTaskAction
}) => {
  const { failedRunners = [], failedBatches = [], failedTasks = [] } = failedData;

  return (
    <div className="devops-card">
      <div className="devops-card-header">
        <div>
          <h3 className="devops-card-title">
            Use Case 14 — Fine-Grained Replay & `fromFailed` Recovery Center
          </h3>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
            Automatically resets `retryCount: 0`, preserves `done` steps when `fromFailed: true`, and
            synchronizes parent Batch & Runner statuses (`syncParentHierarchyStatus`).
          </div>
        </div>
        <button
          type="button"
          className="devops-btn devops-btn-sm"
          onClick={onRefreshFailed}
        >
          ↻ Refresh Failed Items
        </button>
      </div>

      {/* Tier 1: Failed Runners (getFailedRunners) */}
      <h4 style={{ margin: '4px 0' }}>
        1. Failed / Stopped / Timed-Out Runners (`getFailedRunners`)
      </h4>
      <table className="devops-table">
        <thead>
          <tr>
            <th>Runner ID</th>
            <th>mapId</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Replay Options</th>
          </tr>
        </thead>
        <tbody>
          {failedRunners.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ color: 'var(--text-secondary)' }}>
                No failed runners found. Trigger <strong>14. Replay & fromFailed</strong> to simulate a
                failure!
              </td>
            </tr>
          ) : (
            failedRunners.map((r) => {
              const rId = String(r.runnerId || r._id);
              return (
                <tr key={rId}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{rId}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{r.mapId}</td>
                  <td>
                    <span className={`devops-badge status-${r.status}`}>{r.status}</span>
                  </td>
                  <td>{formatDuration(r.durationMs)}</td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      className="devops-btn devops-btn-sm devops-btn-purple"
                      onClick={() => onRunnerAction('replay-from-failed', rId)}
                    >
                      ↻ Replay Runner (`fromFailed: true`)
                    </button>
                    <button
                      type="button"
                      className="devops-btn devops-btn-sm"
                      onClick={() => onRunnerAction('replay-full', rId)}
                    >
                      ↻ Full Replay (From Batch 0)
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Tier 2: Failed Batches (getFailedBatches) */}
      <h4 style={{ margin: '12px 0 4px' }}>
        2. Failed / Stopped Batches (`getFailedBatches`)
      </h4>
      <table className="devops-table">
        <thead>
          <tr>
            <th>Batch ID</th>
            <th>Batch Name</th>
            <th>Status</th>
            <th>Replay Options</th>
          </tr>
        </thead>
        <tbody>
          {failedBatches.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ color: 'var(--text-secondary)' }}>
                No failed batches found.
              </td>
            </tr>
          ) : (
            failedBatches.map((b) => {
              const bId = String(b.batchId || b._id);
              return (
                <tr key={bId}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{bId}</td>
                  <td>{b.name}</td>
                  <td>
                    <span className={`devops-badge status-${b.status}`}>{b.status}</span>
                  </td>
                  <td style={{ display: 'flex', gap: 6 }}>
                    <button
                      type="button"
                      className="devops-btn devops-btn-sm devops-btn-purple"
                      onClick={() => onBatchAction('replay-from-failed', bId)}
                    >
                      ↻ Replay Batch (`fromFailed: true` — Keep Done Tasks)
                    </button>
                    <button
                      type="button"
                      className="devops-btn devops-btn-sm"
                      onClick={() => onBatchAction('replay-full', bId)}
                    >
                      ↻ Full Batch Replay
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Tier 3: Failed Tasks (getFailedTasks) */}
      <h4 style={{ margin: '12px 0 4px' }}>
        3. Failed / Stopped / Timed-Out Tasks (`getFailedTasks`)
      </h4>
      <table className="devops-table">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Exit Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {failedTasks.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ color: 'var(--text-secondary)' }}>
                No failed tasks found.
              </td>
            </tr>
          ) : (
            failedTasks.map((t) => {
              const tId = String(t.taskId || t._id);
              return (
                <tr key={tId}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{tId}</td>
                  <td>{t.name}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>
                    {t.exitCode !== null && t.exitCode !== undefined ? t.exitCode : '—'}
                  </td>
                  <td>
                    <span className={`devops-badge status-${t.status}`}>{t.status}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="devops-btn devops-btn-sm devops-btn-purple"
                      onClick={() => onTaskAction('replay', tId)}
                    >
                      ↻ Replay Single Task (`replayTask`)
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================================
// Sub-Component 7: Historical Logs Query & Raw Build Log Export (Use Cases 16 & 17)
// ============================================================================
export const HistoricalLogsAndExportPanel = ({
  activeRunnerId,
  activeMapId,
  onQueryHistoricalLogs,
  onExportLogs
}) => {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [queryResult, setQueryResult] = useState({ totalLogs: 0, hasMore: false, logs: [] });
  const [exportedPreview, setExportedPreview] = useState(null);

  const ALL_LOG_TYPES = [
    'stdout',
    'stderr',
    'error',
    'warning',
    'step-start',
    'step-ok',
    'step-fail',
    'progress',
    'output',
    'system'
  ];

  const runSearch = useCallback(
    async (newOffset = 0) => {
      const res = await onQueryHistoricalLogs({
        runnerId: activeRunnerId || undefined,
        mapId: !activeRunnerId ? activeMapId : undefined,
        type: selectedTypes.length > 0 ? selectedTypes.join(',') : undefined,
        search: search.trim() || undefined,
        limit,
        offset: newOffset
      });
      if (res) {
        setOffset(newOffset);
        setQueryResult(res);
      }
    },
    [activeRunnerId, activeMapId, selectedTypes, search, limit, onQueryHistoricalLogs]
  );

  useEffect(() => {
    runSearch(0);
  }, [runSearch]);

  const toggleType = (t) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleExport = async (format) => {
    const content = await onExportLogs(activeRunnerId, format);
    setExportedPreview({ format, content });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Use Case 17: Raw Build Log Exporter */}
      <div className="devops-card">
        <div className="devops-card-header">
          <h3 className="devops-card-title">
            Use Case 17 — Downloadable Raw Build Log Export (`txt`, `ndjson`, `json`)
          </h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              className="devops-btn devops-btn-sm devops-btn-primary"
              onClick={() => handleExport('txt')}
            >
              ⬇ Export Plain Text (.txt)
            </button>
            <button
              type="button"
              className="devops-btn devops-btn-sm devops-btn-purple"
              onClick={() => handleExport('ndjson')}
            >
              ⬇ Export NDJSON (.ndjson)
            </button>
            <button
              type="button"
              className="devops-btn devops-btn-sm"
              onClick={() => handleExport('json')}
            >
              ⬇ Export JSON (.json)
            </button>
          </div>
        </div>
        {exportedPreview && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 6,
                fontSize: 12
              }}
            >
              <strong>Export Preview ({exportedPreview.format.toUpperCase()}):</strong>
              <button
                type="button"
                className="devops-btn devops-btn-sm"
                onClick={() => setExportedPreview(null)}
              >
                Close Preview
              </button>
            </div>
            <pre
              style={{
                background: 'var(--bg-terminal)',
                padding: 12,
                borderRadius: 6,
                maxHeight: 180,
                overflowY: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: 11.5,
                margin: 0
              }}
            >
              {typeof exportedPreview.content === 'string'
                ? exportedPreview.content
                : JSON.stringify(exportedPreview.content, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Use Case 16: Paginated & Filtered Historical Log Search */}
      <div className="devops-card">
        <div className="devops-card-header">
          <h3 className="devops-card-title">
            Use Case 16 — Paginated, Filtered & Searchable Bucketed Log Query (`queryLogs`)
          </h3>
          <span className="devops-badge status-completed">
            Total Matching Logs: {queryResult.totalLogs || 0}
          </span>
        </div>

        <div className="devops-grid-3" style={{ alignItems: 'end' }}>
          <div className="devops-field">
            <label>Case-Insensitive Substring Search (`search`)</label>
            <input
              className="devops-input"
              placeholder="Search errors, warnings, output keys..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="devops-field">
            <label>Page Size (`limit`)</label>
            <select
              className="devops-select"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value={25}>25 rows / page</option>
              <option value={50}>50 rows / page</option>
              <option value={100}>100 rows / page</option>
            </select>
          </div>
          <div>
            <button
              type="button"
              className="devops-btn devops-btn-primary"
              onClick={() => runSearch(0)}
            >
              🔍 Search MongoDB Log Buckets
            </button>
          </div>
        </div>

        {/* Multi-Type Filter Pills */}
        <div className="devops-pill-list">
          {ALL_LOG_TYPES.map((t) => {
            const active = selectedTypes.includes(t);
            return (
              <button
                key={t}
                type="button"
                className={`devops-btn devops-btn-sm ${active ? 'devops-btn-primary' : ''}`}
                onClick={() => toggleType(t)}
              >
                {active ? '✓ ' : ''}
                {t}
              </button>
            );
          })}
        </div>

        <table className="devops-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Type</th>
              <th>Task ID</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {(queryResult.logs || []).length === 0 ? (
              <tr>
                <td colSpan={4} style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                  No matching log lines found for current filter criteria.
                </td>
              </tr>
            ) : (
              queryResult.logs.map((l, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: 'var(--font-mono)', width: 110 }}>
                    {formatTime(l.ts)}
                  </td>
                  <td style={{ width: 95 }}>
                    <span className="devops-badge status-queued">{l.type}</span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', width: 110 }}>
                    {l.taskId ? String(l.taskId).slice(-8) : '—'}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{l.msg}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
            Showing offset {offset} – {offset + (queryResult.logs ? queryResult.logs.length : 0)} of{' '}
            {queryResult.totalLogs || 0}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              type="button"
              className="devops-btn devops-btn-sm"
              disabled={offset === 0}
              onClick={() => runSearch(Math.max(0, offset - limit))}
            >
              ← Previous Page
            </button>
            <button
              type="button"
              className="devops-btn devops-btn-sm"
              disabled={!queryResult.hasMore}
              onClick={() => runSearch(offset + limit)}
            >
              Next Page →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Sub-Component 8: Pipeline Telemetry & Bottleneck Analytics (Use Case 18)
// ============================================================================
export const TelemetryAnalyticsPanel = ({ metrics, onRefreshMetrics }) => {
  if (!metrics) {
    return (
      <div className="devops-card">
        <div className="devops-card-header">
          <h3 className="devops-card-title">
            Use Case 18 — Pipeline Telemetry & Bottleneck Analytics (`getRunnerMetrics`)
          </h3>
          <button
            type="button"
            className="devops-btn devops-btn-sm"
            onClick={onRefreshMetrics}
          >
            ↻ Load Telemetry
          </button>
        </div>
        <div style={{ color: 'var(--text-secondary)', padding: 16 }}>
          Select or trigger a Runner to view bottleneck analytics, slowest stage/task callouts, and
          percentage duration waterfalls.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="devops-card">
        <div className="devops-card-header">
          <h3 className="devops-card-title">
            Use Case 18 — Pipeline Telemetry & Bottleneck Analytics (`getRunnerMetrics`)
          </h3>
          <button
            type="button"
            className="devops-btn devops-btn-sm"
            onClick={onRefreshMetrics}
          >
            ↻ Refresh Metrics
          </button>
        </div>

        {/* Summary KPI Cards */}
        <div className="devops-grid-3">
          <div className="devops-card" style={{ background: 'var(--bg-card)' }}>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
              WALL-CLOCK RUNNER DURATION (`durationMs`)
            </span>
            <strong style={{ fontSize: 20 }}>
              {formatDuration(metrics.durationMs)}
            </strong>
            <span style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>
              Cumulative Task CPU Time: {formatDuration(metrics.totalTaskExecutionMs)}
            </span>
          </div>

          <div className="devops-card" style={{ background: 'var(--bg-card)' }}>
            <span style={{ fontSize: 11, color: 'var(--accent-amber)' }}>
              SLOWEST BATCH BOTTLENECK (`slowestBatch`)
            </span>
            <strong style={{ fontSize: 15 }}>
              {metrics.slowestBatch ? metrics.slowestBatch.name : '—'}
            </strong>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>
              {metrics.slowestBatch ? formatDuration(metrics.slowestBatch.durationMs) : '—'}
            </span>
          </div>

          <div className="devops-card" style={{ background: 'var(--bg-card)' }}>
            <span style={{ fontSize: 11, color: 'var(--accent-red)' }}>
              SLOWEST TASK BOTTLENECK (`slowestTask`)
            </span>
            <strong style={{ fontSize: 15 }}>
              {metrics.slowestTask ? metrics.slowestTask.name : '—'}
            </strong>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>
              {metrics.slowestTask ? formatDuration(metrics.slowestTask.durationMs) : '—'}
            </span>
          </div>
        </div>

        {/* Batch Waterfall Breakdown */}
        <h4 style={{ margin: '8px 0 4px' }}>Batch Execution Breakdown (`batchBreakdown`)</h4>
        <table className="devops-table">
          <thead>
            <tr>
              <th>Batch Name</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Duration</th>
              <th>% of Runner</th>
              <th>Waterfall</th>
            </tr>
          </thead>
          <tbody>
            {(metrics.batchBreakdown || []).map((b) => (
              <tr key={b.batchId}>
                <td>
                  <strong>{b.name}</strong>
                </td>
                <td>{b.mode}</td>
                <td>
                  <span className={`devops-badge status-${b.status}`}>{b.status}</span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatDuration(b.durationMs)}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>
                  {b.percentageOfRunner !== null && b.percentageOfRunner !== undefined
                    ? `${b.percentageOfRunner}%`
                    : '—'}
                </td>
                <td>
                  <div className="devops-waterfall-bar-wrap">
                    <div
                      className="devops-waterfall-bar"
                      style={{ width: `${Math.min(100, b.percentageOfRunner || 0)}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================================================
// Sub-Component 9: Cluster Mode Switcher & Temp File GC (Use Cases 20, 21, 22, 23)
// ============================================================================
export const ClusterAndOperationsPanel = ({
  clusterConfig,
  activeRunnerId,
  onUpdateClusterConfig,
  onCleanupRunnerTemp,
  onSweepStaleTemp
}) => {
  const [pollInterval, setPollInterval] = useState(
    (clusterConfig && clusterConfig.clusterPollIntervalMs) || 400
  );
  const [maxAgeMs, setMaxAgeMs] = useState(86400000);
  const [opMessage, setOpMessage] = useState('');

  const handleToggleCluster = async (useRedis) => {
    const updated = await onUpdateClusterConfig({
      useRedis,
      clusterMode: useRedis ? 'redis' : 'mongo',
      clusterPollIntervalMs: Number(pollInterval)
    });
    if (updated) {
      setOpMessage(
        `Cluster configuration updated: useRedis=${updated.useRedis} (clusterMode="${updated.clusterMode}")`
      );
    }
  };

  return (
    <div className="devops-grid-2">
      {/* Use Cases 21 & 22: Dual Multi-Node Cluster Engine */}
      <div className="devops-card">
        <div className="devops-card-header">
          <h3 className="devops-card-title">
            Use Cases 21 & 22 — Multi-Node Cluster Engine (`useRedis` Switch Flag)
          </h3>
          <span className="devops-badge status-completed">
            Active Mode: {clusterConfig ? clusterConfig.clusterMode : 'mongo'}
          </span>
        </div>

        {opMessage && <div className="devops-alert devops-alert-success">{opMessage}</div>}

        <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>
          By default, <strong>`useRedis` is `false`</strong> (`clusterMode: &quot;mongo&quot;`),
          providing zero-dependency cross-node SSE delta tailing and DB-backed process signal
          delegation (`pause-requested`, `resume-requested`, `stop-requested`). Flip{' '}
          <strong>`useRedis: true`</strong> when Redis Pub/Sub clients are attached.
        </div>

        <div className="devops-field">
          <label>MongoDB Delta Poll Interval (`clusterPollIntervalMs`)</label>
          <input
            type="number"
            className="devops-input mono"
            value={pollInterval}
            onChange={(e) => setPollInterval(Number(e.target.value))}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`devops-btn ${
              clusterConfig && !clusterConfig.useRedis ? 'devops-btn-primary' : ''
            }`}
            onClick={() => handleToggleCluster(false)}
          >
            Use Case 21: Enable MongoDB-Native Cluster (`useRedis: false` Default)
          </button>
          <button
            type="button"
            className={`devops-btn ${
              clusterConfig && clusterConfig.useRedis ? 'devops-btn-primary' : ''
            }`}
            onClick={() => handleToggleCluster(true)}
          >
            Use Case 22: Enable Redis Pub/Sub Cluster (`useRedis: true` Switch)
          </button>
        </div>
      </div>

      {/* Use Case 20: Temp File Garbage Collection */}
      <div className="devops-card">
        <div className="devops-card-header">
          <h3 className="devops-card-title">
            Use Case 20 — `/tmp/express-script-logs` Garbage Collection
          </h3>
        </div>

        <div className="devops-field">
          <label>Manual Per-Runner `/tmp` File Cleanup (`POST /runners/:runnerId/cleanup`)</label>
          <button
            type="button"
            className="devops-btn devops-btn-warning"
            disabled={!activeRunnerId}
            onClick={async () => {
              const res = await onCleanupRunnerTemp(activeRunnerId);
              setOpMessage(`Cleaned /tmp files for runner ${activeRunnerId}: ${JSON.stringify(res)}`);
            }}
          >
            🗑 Delete `/tmp` Log & `.sh` Files for Runner {activeRunnerId ? activeRunnerId.slice(-8) : ''}
          </button>
        </div>

        <div className="devops-field">
          <label>Stale Temp Sweep Threshold `maxAgeMs` (`POST /maintenance/cleanup-temp`)</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="number"
              className="devops-input mono"
              style={{ flex: 1 }}
              value={maxAgeMs}
              onChange={(e) => setMaxAgeMs(Number(e.target.value))}
            />
            <button
              type="button"
              className="devops-btn devops-btn-danger"
              onClick={async () => {
                const res = await onSweepStaleTemp(maxAgeMs);
                setOpMessage(`Stale /tmp sweep complete: ${JSON.stringify(res)}`);
              }}
            >
              🧹 Sweep Stale `/tmp` Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Root Dashboard Component (`DevOpsRunnerDashboard`)
// Connects all 23 Use Cases, Live SSE Stream, and REST API Client
// ============================================================================
export const DevOpsRunnerDashboard = ({
  apiBaseUrl = '/api/devops',
  customApiClient = null
}) => {
  const api = useMemo(
    () => customApiClient || createRunnerApiClient(apiBaseUrl),
    [apiBaseUrl, customApiClient]
  );

  const [selectedUseCase, setSelectedUseCase] = useState(USE_CASE_CATALOG[0]);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [activeTab, setActiveTab] = useState('builder');
  const [payloadText, setPayloadText] = useState(
    JSON.stringify(USE_CASE_CATALOG[0].payload, null, 2)
  );

  const [runnersList, setRunnersList] = useState([]);
  const [activeRunnerId, setActiveRunnerId] = useState('');
  const [activeRunner, setActiveRunner] = useState(null);
  const [batches, setBatches] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState(null);

  const [scheduledRunners, setScheduledRunners] = useState([]);
  const [discoveryData, setDiscoveryData] = useState({
    runningTasks: [],
    pausedTasks: [],
    skippableBatches: [],
    pausedRunners: []
  });
  const [failedData, setFailedData] = useState({
    failedRunners: [],
    failedBatches: [],
    failedTasks: []
  });
  const [clusterConfig, setClusterConfig] = useState({
    useRedis: false,
    clusterMode: 'mongo',
    clusterPollIntervalMs: 400
  });
  const [conflictError, setConflictError] = useState(null);
  const [sseState, setSseState] = useState({ connected: false, mode: 'SSE' });

  const streamRef = useRef(null);

  // Group Use Cases by category for the sidebar
  const groupedUseCases = useMemo(() => {
    const q = sidebarSearch.trim().toLowerCase();
    const filtered = USE_CASE_CATALOG.filter(
      (uc) =>
        !q ||
        uc.title.toLowerCase().includes(q) ||
        uc.shortTitle.toLowerCase().includes(q) ||
        uc.description.toLowerCase().includes(q)
    );
    const groups = {};
    filtered.forEach((uc) => {
      groups[uc.category] = groups[uc.category] || [];
      groups[uc.category].push(uc);
    });
    return groups;
  }, [sidebarSearch]);

  // Refresh current runner hierarchy state
  const refreshRunnerDetails = useCallback(
    async (rId = activeRunnerId) => {
      if (!rId) return;
      try {
        const res = await api.getRunner(rId);
        if (res && res.runner) {
          setActiveRunner(res.runner);
          setBatches(res.batches || []);
          setTasks(res.tasks || []);
        }
      } catch (_err) {
        // ignore
      }
    },
    [api, activeRunnerId]
  );

  const refreshAllLists = useCallback(async () => {
    try {
      const [
        allRunners,
        sched,
        runT,
        pauseT,
        skipB,
        pauseR,
        failR,
        failB,
        failT,
        cConfig
      ] = await Promise.all([
        api.listRunners({ limit: 25 }),
        api.getScheduledRunners(),
        api.getRunningTasks(),
        api.getPausedTasks(),
        api.getSkippableBatches(),
        api.getPausedRunners(),
        api.getFailedRunners(),
        api.getFailedBatches(),
        api.getFailedTasks(),
        api.getClusterConfig()
      ]);

      if (allRunners && allRunners.runners) setRunnersList(allRunners.runners);
      if (sched && sched.runners) setScheduledRunners(sched.runners);
      setDiscoveryData({
        runningTasks: (runT && runT.tasks) || [],
        pausedTasks: (pauseT && pauseT.tasks) || [],
        skippableBatches: (skipB && skipB.batches) || [],
        pausedRunners: (pauseR && pauseR.runners) || []
      });
      setFailedData({
        failedRunners: (failR && failR.runners) || [],
        failedBatches: (failB && failB.batches) || [],
        failedTasks: (failT && failT.tasks) || []
      });
      if (cConfig) setClusterConfig(cConfig);
    } catch (_err) {
      // ignore if offline
    }
  }, [api]);

  // Connect SSE stream when activeRunnerId changes (Use Case 15)
  const connectRunnerSse = useCallback(
    (rId = activeRunnerId) => {
      if (streamRef.current) {
        streamRef.current.close();
        streamRef.current = null;
      }
      if (!rId) return;

      const conn = api.connectStream(
        { runnerId: rId, replayHistory: true, includeState: true },
        {
          onOpen: () => setSseState({ connected: true, mode: 'LIVE' }),
          onError: () => setSseState({ connected: false, mode: 'RECONNECTING' }),
          onState: (snapshot) => {
            if (snapshot.runners && snapshot.runners[0]) {
              setActiveRunner(snapshot.runners[0]);
            }
            if (snapshot.batches) setBatches(snapshot.batches);
            if (snapshot.tasks) setTasks(snapshot.tasks);
          },
          onLog: (logEntry) => {
            setLogs((prev) => [...prev, logEntry]);
          },
          onProgress: ({ taskId, progress }) => {
            setTasks((prev) =>
              prev.map((t) =>
                String(t.taskId || t._id) === String(taskId) ? { ...t, progress } : t
              )
            );
          },
          onStatusChange: () => {
            refreshRunnerDetails(rId);
            refreshAllLists();
          }
        }
      );
      streamRef.current = conn;
    },
    [api, activeRunnerId, refreshRunnerDetails, refreshAllLists]
  );

  useEffect(() => {
    refreshAllLists();
  }, [refreshAllLists]);

  useEffect(() => {
    if (activeRunnerId) {
      setLogs([]);
      refreshRunnerDetails(activeRunnerId);
      connectRunnerSse(activeRunnerId);
    }
    return () => {
      if (streamRef.current) streamRef.current.close();
    };
  }, [activeRunnerId, refreshRunnerDetails, connectRunnerSse]);

  // Select a Use Case from the sidebar
  const handleSelectUseCase = (uc) => {
    setSelectedUseCase(uc);
    setPayloadText(JSON.stringify(uc.payload, null, 2));
    setConflictError(null);
    if (uc.defaultTab) {
      setActiveTab(uc.defaultTab);
    }
  };

  // Trigger a Runner
  const handleTriggerRunner = async (payload) => {
    setConflictError(null);
    try {
      const res = await api.triggerRunner(payload);
      const rId = String(res.runnerId || (res.runner && res.runner._id));
      setActiveRunnerId(rId);
      await refreshAllLists();
      await refreshRunnerDetails(rId);
      if (payload.delayMs || payload.runAt) {
        setActiveTab('scheduled');
      } else {
        setActiveTab('monitor');
      }
    } catch (err) {
      if (err.status === 409 || err.code === 'RUNNER_CONFLICT') {
        setConflictError(err);
      } else {
        window.alert(`Trigger Error: ${err.message}`);
      }
    }
  };

  // Runner-level Actions (pause, resume, stop, replay-full, replay-from-failed)
  const handleRunnerAction = async (action, rId) => {
    if (!rId) return;
    if (action === 'pause') await api.pauseRunner(rId);
    else if (action === 'resume') await api.resumeRunner(rId);
    else if (action === 'stop') await api.stopRunner(rId);
    else if (action === 'replay-from-failed') {
      await api.replayRunner(rId, { fromFailed: true });
      setActiveRunnerId(rId);
      setActiveTab('monitor');
    } else if (action === 'replay-full') {
      await api.replayRunner(rId, { fromFailed: false });
      setActiveRunnerId(rId);
      setActiveTab('monitor');
    }
    await refreshRunnerDetails(rId);
    await refreshAllLists();
  };

  // Batch-level Actions (skip, force-skip, stop, approve, reject, expire, replay-from-failed, replay-full)
  const handleBatchAction = async (action, bId, extra = {}) => {
    if (!bId) return;
    if (action === 'skip') await api.skipBatch(bId);
    else if (action === 'force-skip') await api.skipBatch(bId, { force: true });
    else if (action === 'stop') await api.stopBatch(bId);
    else if (action === 'approve') await api.approveBatch(bId, extra);
    else if (action === 'reject') await api.rejectBatch(bId, extra);
    else if (action === 'expire') await api.expireBatchApproval(bId, extra);
    else if (action === 'replay-from-failed') {
      await api.replayBatch(bId, { fromFailed: true });
    } else if (action === 'replay-full') {
      await api.replayBatch(bId, { fromFailed: false });
    }
    await refreshRunnerDetails();
    await refreshAllLists();
  };

  // Task-level Actions (skip, pause, resume, stop, replay)
  const handleTaskAction = async (action, tId) => {
    if (!tId) return;
    if (action === 'skip') await api.skipTask(tId);
    else if (action === 'pause') await api.pauseTask(tId);
    else if (action === 'resume') await api.resumeTask(tId);
    else if (action === 'stop') await api.stopTask(tId);
    else if (action === 'replay') await api.replayTask(tId);
    await refreshRunnerDetails();
    await refreshAllLists();
  };

  // Bulk Actions (pauseTasks, resumeTasks, skipBatches, stopRunners)
  const handleBulkAction = async (bulkType) => {
    const scope = activeRunnerId ? { runnerId: activeRunnerId } : {};
    if (bulkType === 'pauseTasks') await api.pauseTasks(scope);
    else if (bulkType === 'resumeTasks') await api.resumeTasks(scope);
    else if (bulkType === 'skipBatches') await api.skipBatches(scope);
    else if (bulkType === 'stopRunners') await api.stopRunners({});
    await refreshRunnerDetails();
    await refreshAllLists();
  };

  const handleLoadMetrics = useCallback(async () => {
    if (!activeRunnerId) return;
    try {
      const m = await api.getRunnerMetrics(activeRunnerId);
      setMetrics(m);
    } catch (_e) {
      // ignore
    }
  }, [api, activeRunnerId]);

  useEffect(() => {
    if (activeTab === 'telemetry' && activeRunnerId) {
      handleLoadMetrics();
    }
  }, [activeTab, activeRunnerId, handleLoadMetrics]);

  return (
    <div className="devops-app">
      {/* Top Global Header */}
      <header className="devops-header">
        <div className="devops-brand">
          <div className="devops-brand-logo">3T</div>
          <div>
            <h1 className="devops-brand-title">
              Express 3-Tier Script Runner & Real-Time SSE Orchestrator
            </h1>
            <p className="devops-brand-subtitle">
              Plain React JS & CSS Template Covering All 23+ Use Cases (Runner → Batch → Task)
            </p>
          </div>
        </div>

        <div className="devops-header-controls">
          <div className="devops-inline-field">
            <label>Active Runner:</label>
            <select
              value={activeRunnerId}
              onChange={(e) => setActiveRunnerId(e.target.value)}
            >
              <option value="">-- Select Runner ({runnersList.length}) --</option>
              {runnersList.map((r) => {
                const rId = String(r.runnerId || r._id);
                return (
                  <option key={rId} value={rId}>
                    {r.mapId} ({r.status}) #{rId.slice(-6)}
                  </option>
                );
              })}
            </select>
          </div>

          <span className="devops-badge status-triggered">
            Cluster: {clusterConfig.useRedis ? 'REDIS PUB/SUB' : 'MONGO-NATIVE'}
          </span>
        </div>
      </header>

      <div className="devops-body">
        {/* Left Sidebar: Interactive Catalog of All 23 Use Cases */}
        <aside className="devops-sidebar">
          <div className="devops-sidebar-header">
            <h3>All 23+ Use Case Templates</h3>
            <input
              className="devops-sidebar-search"
              placeholder="Filter use cases (e.g. matrix, pause, replay)..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
            />
          </div>

          {Object.entries(groupedUseCases).map(([category, items]) => (
            <div key={category} className="devops-uc-group">
              <div className="devops-uc-group-title">{category}</div>
              {items.map((uc) => (
                <button
                  key={uc.id}
                  type="button"
                  className={`devops-uc-item ${
                    selectedUseCase.id === uc.id ? 'active' : ''
                  }`}
                  onClick={() => handleSelectUseCase(uc)}
                >
                  <div>
                    <span className="devops-uc-item-title">{uc.shortTitle}</span>
                    <span className="devops-uc-item-desc">{uc.description}</span>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* Main Right Workspace */}
        <main className="devops-main">
          {/* Active Use Case Banner with 1-Click Trigger */}
          <div className="devops-active-uc-banner">
            <div className="devops-active-uc-info">
              <h2>
                Use Case {selectedUseCase.number}: {selectedUseCase.title}
              </h2>
              <p>{selectedUseCase.description}</p>
            </div>
            <div className="devops-active-uc-actions">
              <button
                type="button"
                className="devops-btn"
                onClick={() => setActiveTab('builder')}
              >
                ⚙ Customize Payload
              </button>
              <button
                type="button"
                className="devops-btn devops-btn-primary"
                onClick={() => {
                  try {
                    handleTriggerRunner(JSON.parse(payloadText));
                  } catch (_e) {
                    handleTriggerRunner(selectedUseCase.payload);
                  }
                }}
              >
                ▶ Run Use Case #{selectedUseCase.number} Now
              </button>
            </div>
          </div>

          {/* Workspace Navigation Tabs */}
          <nav className="devops-tabs">
            <button
              type="button"
              className={`devops-tab-btn ${activeTab === 'builder' ? 'active' : ''}`}
              onClick={() => setActiveTab('builder')}
            >
              1. Pipeline Builder & Trigger
            </button>
            <button
              type="button"
              className={`devops-tab-btn ${activeTab === 'monitor' ? 'active' : ''}`}
              onClick={() => setActiveTab('monitor')}
            >
              2. Live 3-Tier Tree & SSE Terminal
              {logs.length > 0 && <span className="devops-tab-badge">{logs.length}</span>}
            </button>
            <button
              type="button"
              className={`devops-tab-btn ${activeTab === 'approvals' ? 'active' : ''}`}
              onClick={() => setActiveTab('approvals')}
            >
              3. Approval Gates (UC 9)
            </button>
            <button
              type="button"
              className={`devops-tab-btn ${activeTab === 'scheduled' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('scheduled');
                refreshAllLists();
              }}
            >
              4. Scheduled & Delayed Runs (UC 11)
              {scheduledRunners.length > 0 && (
                <span className="devops-tab-badge">{scheduledRunners.length}</span>
              )}
            </button>
            <button
              type="button"
              className={`devops-tab-btn ${activeTab === 'controls' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('controls');
                refreshAllLists();
              }}
            >
              5. Discovery & Bulk Controls (UC 13)
            </button>
            <button
              type="button"
              className={`devops-tab-btn ${activeTab === 'replay' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('replay');
                refreshAllLists();
              }}
            >
              6. Replay & fromFailed (UC 14)
              {failedData.failedRunners.length > 0 && (
                <span className="devops-tab-badge">{failedData.failedRunners.length}</span>
              )}
            </button>
            <button
              type="button"
              className={`devops-tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
              onClick={() => setActiveTab('logs')}
            >
              7. Historical Logs & Export (UC 16–17)
            </button>
            <button
              type="button"
              className={`devops-tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
              onClick={() => setActiveTab('telemetry')}
            >
              8. Telemetry & Bottlenecks (UC 18)
            </button>
            <button
              type="button"
              className={`devops-tab-btn ${activeTab === 'operations' ? 'active' : ''}`}
              onClick={() => setActiveTab('operations')}
            >
              9. Cluster & /tmp GC (UC 20–23)
            </button>
          </nav>

          {/* Active Tab Content */}
          {activeTab === 'builder' && (
            <PipelineBuilderPanel
              selectedUseCase={selectedUseCase}
              payloadText={payloadText}
              setPayloadText={setPayloadText}
              onTrigger={handleTriggerRunner}
              conflictError={conflictError}
              onResolveConflictStop={async (mapId) => {
                await api.stopRunners({ mapId });
                setConflictError(null);
                await refreshAllLists();
              }}
            />
          )}

          {activeTab === 'monitor' && (
            <LiveExecutionAndTerminalPanel
              activeRunner={activeRunner}
              batches={batches}
              tasks={tasks}
              logs={logs}
              sseState={sseState}
              onReconnectSse={() => connectRunnerSse(activeRunnerId)}
              onClearTerminal={() => setLogs([])}
              onRunnerAction={handleRunnerAction}
              onBatchAction={handleBatchAction}
              onTaskAction={handleTaskAction}
            />
          )}

          {activeTab === 'approvals' && (
            <ApprovalGatesPanel
              batches={batches}
              onApprove={(bId, payload) => handleBatchAction('approve', bId, payload)}
              onReject={(bId, payload) => handleBatchAction('reject', bId, payload)}
              onSkipGate={(bId) => handleBatchAction('skip', bId)}
              onCancelGate={(bId) => handleBatchAction('stop', bId)}
              onExpireGate={(bId, payload) => handleBatchAction('expire', bId, payload)}
              onBulkApprove={async (payload) => {
                const scope = activeRunnerId ? { runnerId: activeRunnerId } : {};
                await api.approveBatches({ ...scope, ...payload });
                await refreshRunnerDetails();
                await refreshAllLists();
              }}
              onBulkReject={async (payload) => {
                const scope = activeRunnerId ? { runnerId: activeRunnerId } : {};
                await api.rejectBatches({ ...scope, ...payload });
                await refreshRunnerDetails();
                await refreshAllLists();
              }}
            />
          )}

          {activeTab === 'scheduled' && (
            <ScheduledRunnersPanel
              scheduledRunners={scheduledRunners}
              onRefreshScheduled={refreshAllLists}
              onScheduleNew={handleTriggerRunner}
              onCancelSingle={async (rId) => {
                await api.stopRunner(rId);
                await refreshAllLists();
              }}
              onCancelAllScheduled={async () => {
                await api.cancelScheduledRunners({});
                await refreshAllLists();
              }}
            />
          )}

          {activeTab === 'controls' && (
            <DiscoveryAndBulkControlsPanel
              discoveryData={discoveryData}
              onRefreshDiscovery={refreshAllLists}
              onBulkAction={handleBulkAction}
              onTaskAction={handleTaskAction}
              onBatchAction={handleBatchAction}
            />
          )}

          {activeTab === 'replay' && (
            <ReplayAndFromFailedPanel
              failedData={failedData}
              onRefreshFailed={refreshAllLists}
              onRunnerAction={handleRunnerAction}
              onBatchAction={handleBatchAction}
              onTaskAction={handleTaskAction}
            />
          )}

          {activeTab === 'logs' && (
            <HistoricalLogsAndExportPanel
              activeRunnerId={activeRunnerId}
              activeMapId={activeRunner && activeRunner.mapId}
              onQueryHistoricalLogs={(q) => api.queryLogs(q)}
              onExportLogs={(rId, fmt) =>
                rId
                  ? api.exportRunnerLogsText(rId, fmt)
                  : Promise.resolve('Select or trigger a runner first to export its logs.')
              }
            />
          )}

          {activeTab === 'telemetry' && (
            <TelemetryAnalyticsPanel
              metrics={metrics}
              onRefreshMetrics={handleLoadMetrics}
            />
          )}

          {activeTab === 'operations' && (
            <ClusterAndOperationsPanel
              clusterConfig={clusterConfig}
              activeRunnerId={activeRunnerId}
              onUpdateClusterConfig={async (cfg) => {
                const res = await api.configureCluster(cfg);
                setClusterConfig(res);
                return res;
              }}
              onCleanupRunnerTemp={(rId) => api.cleanupRunnerFiles(rId)}
              onSweepStaleTemp={(maxAge) => api.cleanupStaleTempFiles(maxAge)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default DevOpsRunnerDashboard;
