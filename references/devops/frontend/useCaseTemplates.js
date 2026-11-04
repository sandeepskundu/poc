/**
 * Complete Catalog of All 23+ Use Cases for Express Hierarchical Script Runner
 * Provides ready-to-run pipeline templates, descriptions, and interactive presets.
 */

export const USE_CASE_CATALOG = [
  {
    id: 'uc-1',
    number: 1,
    category: 'Execution Modes',
    title: 'Simple Single-Stage Command Execution',
    shortTitle: '1. Simple Commands',
    description:
      'Pass an array of shell commands directly in `tasks` without defining explicit batches. Automatically creates a sequential queue batch.',
    defaultTab: 'builder',
    builderMode: 'simple',
    payload: {
      mapId: 'project-alpha-build',
      concurrencyPolicy: 'allow',
      awaitCompletion: false,
      tasks: [
        'echo "##[step-start] Checking Node.js & OS Environment" && node -v && uname -a',
        'echo "##[progress 50%] Running static lint check..." && sleep 1 && echo "##[step-ok] Lint passed"',
        'echo "##[progress 100%] Build completed successfully!"'
      ]
    }
  },
  {
    id: 'uc-2',
    number: 2,
    category: 'Execution Modes',
    title: 'Multi-Stage Sequential (queue) & Parallel (parallel) Batches',
    shortTitle: '2. Queue & Parallel Stages',
    description:
      'Organize complex pipelines into ordered Batches using FIFO `queue` mode (with `maxQueueConcurrency: N` worker pool) and simultaneous `parallel` mode.',
    defaultTab: 'builder',
    builderMode: 'stages',
    payload: {
      mapId: 'microservice-deploy-42',
      batches: [
        {
          name: 'Stage 1: Install & Compile (Sequential FIFO)',
          mode: 'queue',
          maxQueueConcurrency: 1,
          continueOnError: false,
          tasks: [
            { name: 'Install Dependencies', cmd: 'echo "Installing packages..." && sleep 1 && echo "Done"' },
            { name: 'Compile Bundle', cmd: 'echo "Compiling TypeScript..." && sleep 1 && echo "Bundle ready"' }
          ]
        },
        {
          name: 'Stage 2: Quality Gates (Parallel Execution)',
          mode: 'parallel',
          continueOnError: false,
          tasks: [
            { name: 'Unit Tests', cmd: 'echo "Running unit suite..." && sleep 1 && echo "##[step-ok] 142 tests passed"' },
            { name: 'ESLint Check', cmd: 'echo "Checking code style..." && sleep 1 && echo "##[step-ok] 0 warnings"' },
            { name: 'Security Audit', cmd: 'echo "Scanning CVEs..." && sleep 1 && echo "##[step-ok] 0 high vulnerabilities"' }
          ]
        },
        {
          name: 'Stage 3: Bounded Rolling Restart (2 Concurrent Workers)',
          mode: 'queue',
          maxQueueConcurrency: 2,
          continueOnError: false,
          tasks: [
            { name: 'Restart Pod 1', cmd: 'echo "Restarting pod-1..." && sleep 1 && echo "pod-1 healthy"' },
            { name: 'Restart Pod 2', cmd: 'echo "Restarting pod-2..." && sleep 1 && echo "pod-2 healthy"' },
            { name: 'Restart Pod 3', cmd: 'echo "Restarting pod-3..." && sleep 1 && echo "pod-3 healthy"' },
            { name: 'Restart Pod 4', cmd: 'echo "Restarting pod-4..." && sleep 1 && echo "pod-4 healthy"' }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-3',
    number: 3,
    category: 'Execution Modes',
    title: 'External .sh Script Files & Multi-Line Inline Scripts',
    shortTitle: '3. .sh & Inline Scripts',
    description:
      'Execute direct `cmd` strings, external `.sh` files (`scriptPath` + escaped `args`), or multi-line inline scripts (`script` + `args`) with custom `cwd`, `shell`, and merged `env`.',
    defaultTab: 'builder',
    builderMode: 'scripts',
    payload: {
      mapId: 'shell-modes-demo',
      shell: '/bin/bash',
      env: {
        GLOBAL_REGION: 'ap-south-1',
        DEPLOYMENT_ENV: 'staging'
      },
      batches: [
        {
          name: 'Mixed Shell Execution Modes',
          mode: 'queue',
          env: { STAGE_TIER: 'backend-api' },
          tasks: [
            {
              name: 'Inline Multi-Line Bash Health Script',
              script: [
                '#!/usr/bin/env bash',
                'set -euo pipefail',
                'echo "##[step-start] Starting Inline Script in Region: $GLOBAL_REGION ($STAGE_TIER)"',
                'echo "Received safely escaped arguments: Arg1=$1 | Arg2=$2"',
                'for i in 1 2 3; do',
                '  echo "##[progress $((i * 33))%] Health ping $i OK"',
                'done',
                'echo "##[step-ok] Inline script completed!"'
              ].join('\n'),
              args: ['https://api.internal.example/healthz', 'cluster main 01']
            },
            {
              name: 'Direct POSIX Command with Custom Env',
              cmd: 'echo "Verifying NODE_ENV=$NODE_ENV in $GLOBAL_REGION"',
              env: { NODE_ENV: 'production' }
            }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-4',
    number: 4,
    category: 'Observability & Logs',
    title: 'Structured CI/CD Log Headers & Real-Time Progress Parsing',
    shortTitle: '4. CI/CD Log Headers',
    description:
      'Emit `##[step-start]`, `##[progress 65%]`, `##[warning]`, `##[error]`, `##[step-ok]`, `##[step-fail]`, and collapsible `##[section-start]` / `##[section-end]` groups.',
    defaultTab: 'monitor',
    builderMode: 'stages',
    payload: {
      mapId: 'structured-logs-showcase',
      batches: [
        {
          name: 'Docker Build & Terraform Plan (Rich Annotations)',
          mode: 'queue',
          tasks: [
            {
              name: 'Build & Push Container Image',
              script: [
                '#!/usr/bin/env bash',
                'echo "##[step-start] Building Docker Image sha256:9f82a1"',
                'echo "##[section-start] Layer Caching & Dependencies"',
                'echo "Pulling base layer node:22-alpine..."',
                'echo "Restoring npm cache /root/.npm"',
                'echo "##[section-end] Layer Caching & Dependencies"',
                'echo "##[progress 25%] Compiling assets..."',
                'sleep 1',
                'echo "##[warning] Peer dependency deprecation notice in legacy-pkg@1.0.2"',
                'echo "##[progress 75%] Pushing image layers to registry..."',
                'sleep 1',
                'echo "##[progress 100%] Image pushed"',
                'echo "##[step-ok] Container image published successfully"'
              ].join('\n')
            }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-5',
    number: 5,
    category: 'Data & Security',
    title: 'Inter-Task Output Variable Passing (##[set-output KEY=VAL])',
    shortTitle: '5. Output Variables',
    description:
      'Tasks emit `##[set-output KEY=VALUE]` to dynamically pass build tags, commit SHAs, or artifact paths into `runner.outputs` and downstream task `process.env`.',
    defaultTab: 'monitor',
    builderMode: 'stages',
    payload: {
      mapId: 'artifact-promotion-pipeline',
      batches: [
        {
          name: 'Stage 1: Produce Build Metadata & Artifact',
          mode: 'queue',
          tasks: [
            {
              name: 'Generate Release Version & Checksum',
              cmd: 'echo "##[set-output RELEASE_TAG=v2.4.0-rc1]" && echo "##[set-output ARTIFACT_PATH=/tmp/release-v2.4.0.tar.gz]" && echo "##[set-output GIT_SHA=8f91c2b]"'
            }
          ]
        },
        {
          name: 'Stage 2: Consume Upstream Outputs in Downstream Env',
          mode: 'queue',
          tasks: [
            {
              name: 'Promote Artifact Using Upstream Variables',
              cmd: 'echo "Deploying tag $RELEASE_TAG (SHA: $GIT_SHA) from artifact $ARTIFACT_PATH" && echo "##[step-ok] Promoted $RELEASE_TAG"'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-6',
    number: 6,
    category: 'Data & Security',
    title: 'Automatic Secret & Credential Redaction',
    shortTitle: '6. Secret Masking',
    description:
      'Automatically redacts sensitive `env` keys (`PASSWORD`, `SECRET`, `TOKEN`, `API_KEY`, etc.), explicit `secretKeys`, and raw `secrets` literals as `***REDACTED***` before saving to MongoDB or streaming over SSE.',
    defaultTab: 'builder',
    builderMode: 'secrets',
    payload: {
      mapId: 'secure-vault-deploy',
      env: {
        AWS_SECRET_ACCESS_KEY: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
        DB_PASSWORD: 'super-secret-prod-db-password-2026',
        CUSTOM_INTERNAL_VAULT: 'internal-vault-cipher-98765'
      },
      secretKeys: ['CUSTOM_INTERNAL_VAULT'],
      secrets: ['raw-inline-bearer-token-xyz-999'],
      batches: [
        {
          name: 'Verify Zero-Leak Secret Redaction',
          mode: 'queue',
          tasks: [
            {
              name: 'Echo Credentials (Masked Automatically)',
              cmd: 'echo "AWS Key: $AWS_SECRET_ACCESS_KEY | DB Pass: $DB_PASSWORD | Vault: $CUSTOM_INTERNAL_VAULT | Bearer: raw-inline-bearer-token-xyz-999"'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-7',
    number: 7,
    category: 'Resilience & Branching',
    title: 'Automatic Task Retries with Exponential Backoff',
    shortTitle: '7. Auto Retries & Backoff',
    description:
      'Configure `maxRetries`, `retryDelayMs`, and `retryBackoffFactor` at the Runner, Batch, or Task level to recover from transient network glitches automatically.',
    defaultTab: 'builder',
    builderMode: 'retries',
    payload: {
      mapId: 'flaky-network-registry-sync',
      batches: [
        {
          name: 'Resilient Task Execution with Exponential Backoff',
          mode: 'queue',
          tasks: [
            {
              name: 'Sync Remote Package Registry (Retries up to 3x)',
              cmd: 'echo "Syncing registry..." && echo "##[step-ok] Registry synced"',
              maxRetries: 3,
              retryDelayMs: 500,
              retryBackoffFactor: 2
            }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-8',
    number: 8,
    category: 'Resilience & Branching',
    title: 'Conditional Execution (when Rules: on-success, on-failure, always, output)',
    shortTitle: '8. Conditional (when) Rules',
    description:
      'Branch pipelines dynamically using `when: "on-success" | "on-failure" | "always"` or declarative `{ status, output, notOutput, env }` rules for automated rollbacks and guaranteed teardown stages.',
    defaultTab: 'builder',
    builderMode: 'conditional',
    payload: {
      mapId: 'canary-with-auto-rollback',
      batches: [
        {
          name: '1. Pre-Flight Environment Evaluation',
          mode: 'queue',
          tasks: [
            {
              name: 'Detect Deployment Target & Migration Flag',
              cmd: 'echo "##[set-output DEPLOY_TARGET=production]" && echo "##[set-output RUN_DB_MIGRATION=false]"'
            }
          ]
        },
        {
          name: '2. Conditional DB Migration (Skipped when RUN_DB_MIGRATION != true)',
          mode: 'queue',
          when: { output: { RUN_DB_MIGRATION: 'true' } },
          tasks: [
            { name: 'Run Prisma Migration', cmd: 'echo "Running DB migration..."' }
          ]
        },
        {
          name: '3. Production Rollout (Runs when DEPLOY_TARGET == production)',
          mode: 'queue',
          when: { status: 'on-success', output: { DEPLOY_TARGET: 'production' } },
          tasks: [
            { name: 'Rollout Canary v2', cmd: 'echo "##[step-ok] Canary v2 deployed to production"' }
          ]
        },
        {
          name: '4. Automated Rollback (Runs ONLY on Failure)',
          mode: 'queue',
          when: 'on-failure',
          tasks: [
            { name: 'Revert Traffic to Stable v1', cmd: 'echo "##[warning] Reverting traffic to v1!"' }
          ]
        },
        {
          name: '5. Ephemeral Bastion Teardown (ALWAYS Runs)',
          mode: 'queue',
          when: 'always',
          tasks: [
            { name: 'Close Temporary SSH Tunnel', cmd: 'echo "Closing bastion tunnel (always executes)"' }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-9',
    number: 9,
    category: 'Governance & Scheduling',
    title: 'Manual Approval Gates (requiresApproval, approveBatch, rejectBatch)',
    shortTitle: '9. Manual Approval Gates',
    description:
      'Pause execution before sensitive stages (`requiresApproval: true`). Release managers can Approve & Resume (`approveBatch`), Reject & Abort (`rejectBatch`), or Skip the gated batch (`skipBatch`).',
    defaultTab: 'approvals',
    builderMode: 'stages',
    payload: {
      mapId: 'prod-release-v3-gated',
      batches: [
        {
          name: 'Stage 1: Deploy to Staging & Run Smoke Suite',
          mode: 'queue',
          tasks: [
            { name: 'Deploy Staging', cmd: 'echo "Staging deployed OK"' },
            { name: 'Smoke Tests', cmd: 'echo "##[step-ok] All 28 smoke checks passed"' }
          ]
        },
        {
          name: 'Stage 2: Production Cutover (Requires Release Manager Approval)',
          mode: 'queue',
          requiresApproval: true,
          tasks: [
            { name: 'Production Blue/Green Cutover', cmd: 'echo "##[step-ok] Production traffic switched to Green!"' }
          ]
        },
        {
          name: 'Stage 3: Post-Cutover Verification',
          mode: 'queue',
          tasks: [
            { name: 'Verify Live Metrics', cmd: 'echo "Error rate 0.00% - Release complete"' }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-10',
    number: 10,
    category: 'Execution Modes',
    title: 'Matrix Task Expansion (Cartesian Product Strategy)',
    shortTitle: '10. Matrix Expansion',
    description:
      'Expand a task template across multiple dimensions (`REGION × SERVICE` or `OS × NODE_VERSION`). Automatically generates the Cartesian product and injects `matrixValues` into `task.env`.',
    defaultTab: 'builder',
    builderMode: 'matrix',
    payload: {
      mapId: 'multi-region-matrix-rollout',
      batches: [
        {
          name: 'Parallel Multi-Region × Service Matrix Rollout (3 × 2 = 6 Tasks)',
          mode: 'parallel',
          matrix: {
            REGION: ['us-east-1', 'eu-west-1', 'ap-south-1'],
            SERVICE: ['api-gateway', 'auth-worker']
          },
          tasks: [
            {
              name: 'Deploy Service',
              cmd: 'echo "Deploying service=$SERVICE to region=$REGION" && sleep 1 && echo "##[step-ok] $SERVICE live in $REGION"'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-11',
    number: 11,
    category: 'Governance & Scheduling',
    title: 'Delayed & Scheduled Triggers (delayMs, runAt & Pre-Start Cancellation)',
    shortTitle: '11. Delayed & Scheduled Runs',
    description:
      'Schedule a runner with `delayMs` or `runAt` (`status: "scheduled"`). List all pending scheduled runners (`getScheduledRunners`) and cancel individual or all scheduled runs before they start.',
    defaultTab: 'scheduled',
    builderMode: 'scheduled',
    payload: {
      mapId: 'scheduled-maintenance-window',
      delayMs: 30000,
      batches: [
        {
          name: 'Scheduled Maintenance Window Tasks',
          mode: 'queue',
          tasks: [
            { name: 'Vacuum Database Indexes', cmd: 'echo "Running scheduled maintenance..." && echo "##[step-ok] Done"' }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-12',
    number: 12,
    category: 'Governance & Scheduling',
    title: 'Per-Application (mapId) Concurrency & Locking Policies',
    shortTitle: '12. Concurrency Policies',
    description:
      'Prevent conflicting deployments on the same `mapId` using `concurrencyPolicy`: `allow`, `reject` (`409 Conflict`), `cancel-previous` (auto-stops active runs), or `queue` (waits in line).',
    defaultTab: 'builder',
    builderMode: 'concurrency',
    payload: {
      mapId: 'prod-payment-gateway',
      concurrencyPolicy: 'reject',
      batches: [
        {
          name: 'Exclusive Production Deployment (Policy: reject)',
          mode: 'queue',
          tasks: [
            { name: 'Acquire Lock & Rollout', cmd: 'echo "Deploying payment gateway..." && sleep 3 && echo "##[step-ok] Done"' }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-13',
    number: 13,
    category: 'Process & Pipeline Controls',
    title: 'Granular 3-Tier OS Process Controls & Bulk Discovery (skip, pause, resume, stop)',
    shortTitle: '13. Pause / Resume / Skip / Stop',
    description:
      'Freeze running OS process groups mid-execution via `SIGSTOP` (`pauseTask` / `pauseTasks`), unfreeze via `SIGCONT` (`resumeTask` / `resumeTasks`), skip queued or `waiting_approval` batches (`skipBatch` / `skipBatches`), and kill process trees (`SIGTERM` → `SIGKILL`).',
    defaultTab: 'controls',
    builderMode: 'stages',
    payload: {
      mapId: 'interactive-process-control-demo',
      batches: [
        {
          name: 'Stage 1: Long-Running Process (Test SIGSTOP Pause & SIGCONT Resume)',
          mode: 'queue',
          tasks: [
            {
              name: '15-Second Incremental Worker',
              script: [
                '#!/usr/bin/env bash',
                'for i in 1 2 3 4 5 6 7 8 9 10; do',
                '  echo "##[progress $((i * 10))%] Worker tick $i/10 (PID: $$)"',
                '  sleep 1',
                'done',
                'echo "##[step-ok] Worker finished!"'
              ].join('\n')
            }
          ]
        },
        {
          name: 'Stage 2: Queued Downstream Stage (Test Skip Batch)',
          mode: 'queue',
          tasks: [
            { name: 'Downstream Integration Task', cmd: 'echo "Running downstream stage..."' }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-14',
    number: 14,
    category: 'Process & Pipeline Controls',
    title: 'Fine-Grained Replay (replayTask, replayBatch, replayRunner Full & fromFailed)',
    shortTitle: '14. Replay & fromFailed',
    description:
      'Discover failed runners, batches, and tasks (`getFailedRunners`, `getFailedBatches`, `getFailedTasks`). Replay a single task, replay a batch (`full` or `fromFailed: true`), or replay an entire runner (`full` or `fromFailed: true`) with automatic parent status synchronization.',
    defaultTab: 'replay',
    builderMode: 'stages',
    payload: {
      mapId: 'replay-recovery-demo',
      batches: [
        {
          name: 'Stage 1: Build Assets (Succeeds)',
          mode: 'queue',
          tasks: [
            { name: 'Compile Frontend', cmd: 'echo "##[step-ok] Frontend compiled"' }
          ]
        },
        {
          name: 'Stage 2: Database & Integration (Contains Failing Step)',
          mode: 'queue',
          tasks: [
            { name: 'Seed Test Data', cmd: 'echo "##[step-ok] Test data seeded"' },
            { name: 'Flaky Integration Step', cmd: 'echo "##[error] Simulated integration failure" && exit 1' }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-15',
    number: 15,
    category: 'Observability & Logs',
    title: 'Real-Time SSE Streaming & Seamless Browser Page Refresh / Reconnect',
    shortTitle: '15. Live SSE & Reconnect',
    description:
      'Connect via `EventSource` to `/stream?replayHistory=true&includeState=true`. Receives initial `{ runners, batches, tasks }` state snapshot, historical bucket logs, and live events with `afterTs` watermark deduplication.',
    defaultTab: 'monitor',
    builderMode: 'stages',
    payload: {
      mapId: 'sse-live-stream-demo',
      batches: [
        {
          name: 'Live Streaming Log Generator',
          mode: 'queue',
          tasks: [
            {
              name: 'Emit Real-Time Stream Events',
              cmd: 'for i in 1 2 3 4 5; do echo "##[progress $((i * 20))%] Streaming chunk $i"; sleep 1; done'
            }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-16',
    number: 16,
    category: 'Observability & Logs',
    title: 'Paginated, Filtered & Searchable Historical Log Queries (queryLogs)',
    shortTitle: '16. Historical Log Search',
    description:
      'Search across 500-entry MongoDB log buckets by `runnerId`, `batchId`, `taskId`, `mapId`, `type` (`error`, `warning`, `stderr`, `stdout`, etc.), case-insensitive `search` substring, `afterTs`/`beforeTs`, and `limit`/`offset` pagination.',
    defaultTab: 'logs',
    builderMode: 'simple',
    payload: {
      mapId: 'log-search-demo',
      tasks: [
        'echo " Normal info log line 1"',
        'echo "##[warning] High memory watermark detected (82%)"',
        'echo "##[error] Connection timeout while reaching replica-03"'
      ]
    }
  },
  {
    id: 'uc-17',
    number: 17,
    category: 'Observability & Logs',
    title: 'Downloadable Raw Build Log Export (txt, ndjson, json)',
    shortTitle: '17. Raw Log Export',
    description:
      'Download or preview complete pipeline logs in Plain Text (`.txt`), Newline-Delimited JSON (`.ndjson` for Datadog/Elastic/BigQuery), or formatted JSON (`.json`).',
    defaultTab: 'logs',
    builderMode: 'simple',
    payload: {
      mapId: 'compliance-archive-export',
      tasks: [
        'echo "##[step-start] Generating compliance audit trail"',
        'echo "Audit verification passed for release 2026.11"',
        'echo "##[step-ok] Ready for export"'
      ]
    }
  },
  {
    id: 'uc-18',
    number: 18,
    category: 'Observability & Logs',
    title: 'Pipeline Telemetry & Bottleneck Analytics (getRunnerMetrics)',
    shortTitle: '18. Telemetry & Bottlenecks',
    description:
      'Analyze `durationMs`, `totalTaskExecutionMs`, `slowestBatch`, `slowestTask`, `percentageOfRunner` waterfall breakdown, task status distribution, and log counts.',
    defaultTab: 'telemetry',
    builderMode: 'stages',
    payload: {
      mapId: 'telemetry-bottleneck-demo',
      batches: [
        {
          name: 'Fast Pre-Check Stage',
          mode: 'queue',
          tasks: [{ name: 'Verify Config', cmd: 'echo "Config valid"' }]
        },
        {
          name: 'Heavy Parallel Integration Stage (Bottleneck)',
          mode: 'parallel',
          tasks: [
            { name: 'Fast API Test', cmd: 'sleep 1 && echo "API test done"' },
            { name: 'Slow E2E Browser Suite', cmd: 'sleep 2 && echo "Slow E2E suite done"' }
          ]
        }
      ]
    }
  },
  {
    id: 'uc-19',
    number: 19,
    category: 'Data & Security',
    title: 'HMAC-Signed Outbound Webhooks & Lifecycle Hooks',
    shortTitle: '19. Signed Webhooks',
    description:
      'Configure `webhookUrl`, `webhookSecret` (`X-Runner-Signature-256: sha256=<hmac>`), and custom `webhookHeaders` to notify Slack, PagerDuty, or external orchestrators whenever a runner reaches a terminal state.',
    defaultTab: 'builder',
    builderMode: 'webhooks',
    payload: {
      mapId: 'webhook-notification-demo',
      webhookUrl: 'https://ops.example.com/webhooks/ci-events',
      webhookSecret: 'whsec_prod_hmac_secret_2026',
      webhookHeaders: {
        'X-Environment': 'production',
        'X-Team': 'platform-engineering'
      },
      tasks: [
        'echo "Running job with signed outbound webhook notification..."',
        'echo "##[set-output DEPLOY_STATUS=healthy]"'
      ]
    }
  },
  {
    id: 'uc-20',
    number: 20,
    category: 'Cluster & Operations',
    title: 'Temp File Garbage Collection & MongoDB Log TTL Auto-Purge',
    shortTitle: '20. Temp GC & Log TTL',
    description:
      'Enable automatic per-run `/tmp` file cleanup (`cleanupTempOnFinish: true`), manually clean a runner\'s `/tmp/express-script-logs/<taskId>.log` & `.sh` files (`POST /runners/:id/cleanup`), or sweep stale `/tmp` files (`POST /maintenance/cleanup-temp`).',
    defaultTab: 'operations',
    builderMode: 'simple',
    payload: {
      mapId: 'ephemeral-clean-runner',
      cleanupTempOnFinish: true,
      tasks: [
        'echo "This task automatically deletes its /tmp log and .sh files upon completion!"'
      ]
    }
  },
  {
    id: 'uc-21-22',
    number: 21,
    category: 'Cluster & Operations',
    title: 'Multi-Node Cluster Modes: MongoDB-Native (useRedis: false) vs. Redis Pub/Sub (useRedis: true)',
    shortTitle: '21–23. Cluster & Boot Recovery',
    description:
      'Inspect and toggle between Zero-Dependency MongoDB-Native Cluster Mode (`useRedis: false` default, watermark delta polling + DB `controlState` delegation) and Redis Pub/Sub Mode (`useRedis: true` switch), plus `hostId` tracking for crash-safe boot recovery.',
    defaultTab: 'operations',
    builderMode: 'simple',
    payload: {
      mapId: 'cluster-distributed-run',
      tasks: [
        'echo "Executing on cluster node hostId with cross-node SSE & signal delegation"'
      ]
    }
  }
];
