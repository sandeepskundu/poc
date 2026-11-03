import appHelpers from 'app-helpers';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const STATUS_BADGES = {
    triggered: '',
    queued: '',
    started: '',
    completed: '',
    done: '',
    failed: '',
    stopped: '',
    timeout: '',
};

const Comp = ({ runId, initialLogs = [], onStopRun }) => {
    const [events, setEvents] = useState(initialLogs);
    const [status, setStatus] = useState('queued');
    const [progress, setProgress] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [collapsedSteps, setCollapsedSteps] = useState({});
    const [autoScroll, setAutoScroll] = useState(true);

    // Mutable buffer so rapid SSE events don't thrash React state
    const eventBufferRef = useRef([]);
    const logContainerRef = useRef(null);

    const pushToBuffer = (data) => {


        console.log(data);


        if (data.type === 'heartbeat'){
            return;
        }

        debugger;

        eventBufferRef.current.push({
            ...data,
            id:`${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        });
    }

    // 1. High-Performance Buffered SSE Consumer
    useEffect(() => {
        if (!runId){
            return;
        }

        let dv = appHelpers.store.stream({
            name: 'devOps.builds.scripts.run',
            request: {
                options: {},
                request: {
                    data: {
                        "mode":"queue",
                        "stream":"raw/atoms/dot/sandeep",
                        "commands":"sklsl"
                    }
                },
                callbacks:{
                    onOpen:(resp, ajaxConfig, onResp, raw)=>{
                        pushToBuffer(resp.data);
                    },
                    onEvent:(resp, ajaxConfig, onResp, raw) => {
                        pushToBuffer(resp.data);
                    },
                    onError:(resp, ajaxConfig, onResp, raw)=>{
                        pushToBuffer(resp.data);
                    },
                    onComplete:(resp, ajaxConfig, onResp, raw)=>{
                        console.log('onComplete');
                        console.log(resp);
                    }
                }
            },
        }, () => {
            debugger;
        });


        const flushInterval = setInterval(() => {
            if (eventBufferRef.current.length === 0){
                return;
            }

            const batch = [...eventBufferRef.current];
            eventBufferRef.current = [];

            setEvents((prev) => [...prev, ...batch]);


            /*--

            // Extract latest status & progress from batch
            for (const item of batch) {
                if (['triggered', 'queued', 'started', 'completed', 'done', 'failed', 'stopped', 'timeout'].includes(item.type)) {
                    setStatus(item.type === 'done' ? 'completed' : item.type);
                }
                if (item.type === 'progress') {
                    const parsedPct = parseInt(String(item.msg).replace(/\D/g, ''), 10);
                    if (!isNaN(parsedPct)) setProgress(Math.min(100, Math.max(0, parsedPct)));
                }
                if (['completed', 'failed', 'stopped', 'timeout'].includes(item.type)) {
                    if (item.type === 'completed') setProgress(100);
                    es.close();
                }
            }--*/
        }, 120);

        return () => {
            clearInterval(flushInterval);
            //es.close();
        };
    }, [runId]);

    // 2. Group flat events into collapsible Jenkins-style steps
    const groupedSteps = useMemo(() => {
        const groups = [];
        let currentGroup = {
            id: 'init',
            title: 'Initialization & Lifecycle',
            status: 'running',
            logs: [],
            startTime: null,
            endTime: null,
        };
        groups.push(currentGroup);

        const query = searchQuery.trim().toLowerCase();

        for (const ev of events) {
            if (ev.type === 'step-start') {
                currentGroup = {
                    id: ev.id,
                    title: ev.msg || 'Execution Step',
                    status: 'running',
                    logs: [],
                    startTime: ev.ts,
                    endTime: null,
                    data:{}
                };
                groups.push(currentGroup);
                continue;
            }

            if (ev.type === 'step-done') {
                currentGroup.status = 'completed';
                currentGroup.endTime = ev.ts;
                continue;
            }

            if (ev.type === 'error' || ev.type === 'failed') {
                currentGroup.status = 'failed';
            }

            // Filter by search query if active
            if (!query || String(ev.msg).toLowerCase().includes(query)) {
                currentGroup.logs.push(ev);
            }
        }

        return groups.filter((g) => g.logs.length > 0 || g.id !== 'init');
    }, [events, searchQuery]);

    // 3. Smart Auto-Scroll Handler
    useEffect(() => {
        if (autoScroll && logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [groupedSteps, autoScroll]);

    const handleScroll = useCallback(() => {
        const el = logContainerRef.current;
        if (!el) return;
        const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
        setAutoScroll(isAtBottom);
    }, []);

    const toggleStep = useCallback((stepId) => {
        setCollapsedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
    }, []);

    return (
        <div className="flex flex-col h-[650px] w-full bg-zinc-950 text-zinc-100 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden font-mono text-sm">
            {/* Top Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-400">Run ID: #{String(runId).slice(-6)}</span>
                    <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border uppercase tracking-wider ${STATUS_BADGES[status] || STATUS_BADGES.queued}`}>
                        {status}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Debounced-style Search Input */}
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Filter logs..."
                        className="px-3 py-1 text-xs bg-zinc-950 border border-zinc-700 rounded-md focus:outline-none focus:border-blue-500 text-zinc-200"
                    />

                    {['queued', 'started'].includes(status) && (
                        <button
                            onClick={() => onStopRun?.(runId)}
                            className="px-3 py-1 text-xs font-semibold bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 rounded-md transition"
                        >
                            Stop Run
                        </button>
                    )}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-zinc-900 overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${status === 'failed' ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Main Collapsible Step Stream */}
            <div
                ref={logContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 space-y-3 select-text"
            >
                {groupedSteps.map((group) => {
                    const isCollapsed = !!collapsedSteps[group.id];
                    return (
                        <div key={group.id} className="border border-zinc-800/80 rounded-lg bg-zinc-900/40 overflow-hidden">
                            {/* Step Accordion Header */}
                            <button
                                onClick={() => toggleStep(group.id)}
                                className="w-full flex items-center justify-between px-3 py-2 bg-zinc-900/90 hover:bg-zinc-800/80 text-left transition"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-400 text-xs">{isCollapsed ? '▶' : '▼'}</span>
                                    <span className="font-semibold text-zinc-200">{group.title}</span>
                                    <span className="text-xs text-zinc-500">({group.logs.length} lines)</span>
                                </div>
                                <span className="text-xs text-zinc-400">
                                    {group.status === 'completed' && '✅'}
                                    {group.status === 'failed' && '❌'}
                                    {group.status === 'running' && '⏳'}
                                </span>
                            </button>

                            {/* Step Log Lines */}
                            {!isCollapsed && (
                                <div className="p-3 space-y-1 bg-zinc-950/80">
                                    {group.logs.map((log) => (
                                        <div
                                            key={log.id}
                                            className={`flex items-start gap-3 px-2 py-0.5 rounded leading-relaxed whitespace-pre-wrap break-all ${log?.data?.type === 'error' || log?.data?.type === 'failed'
                                                    ? 'bg-red-950/40 text-red-300 border-l-2 border-red-500'
                                                    : log?.data?.type === 'stderr' || log?.data?.type === 'retrying'
                                                        ? 'bg-amber-950/30 text-amber-300 border-l-2 border-amber-500'
                                                        : log?.data?.type === 'artifact'
                                                            ? 'bg-blue-950/30 text-blue-300 border-l-2 border-blue-500'
                                                            : 'text-zinc-300 hover:bg-zinc-900/60'
                                                }`}
                                        >
                                            <span className="text-zinc-600 text-xs shrink-0 select-none">
                                                {console.log(log)}
                                                {log?.data?.ts ? new Date(log?.data?.ts).toLocaleTimeString() : '--:--:--'}
                                            </span>
                                            <span className="flex-1">{log?.data?.msg}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Floating Resume Auto-Scroll Button */}
            {!autoScroll && (
                <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 flex justify-end">
                    <button
                        onClick={() => setAutoScroll(true)}
                        className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                        ↓ Resume auto-scroll
                    </button>
                </div>
            )}
        </div>
    );
}

export default Comp;
