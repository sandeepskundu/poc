/*--const start = (url, {
    method = 'POST',
    headers = {},
    body,
    onOpen,
    onEvent,
    onError,
    onComplete,
} = {}) => {
    const controller = new AbortController();

    (async () => {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Accept: 'text/event-stream, application/x-ndjson, text/plain',
                    ...(body ? { 'Content-Type': 'application/json' } : {}),
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
                signal: controller.signal,
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => response.statusText);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            if (!response.body) {
                throw new Error('ReadableStream is not supported or response body is empty.');
            }

            onOpen?.(response);

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                // Split by double newline (SSE standard) or single newline (NDJSON)
                const parts = buffer.split(/\r?\n\r?\n/);
                buffer = parts.pop() || ''; // Keep incomplete trailing chunk in buffer

                for (const part of parts) {
                    const parsed = parseStreamChunk(part);
                    if (parsed) {
                        onEvent?.(parsed);
                    }
                }
            }

            // Flush any remaining buffered data
            if (buffer.trim()) {
                const parsed = parseStreamChunk(buffer);
                if (parsed) {
                    onEvent?.(parsed);
                }
            }

            onComplete?.();
        } catch (err) {
            if (err.name === 'AbortError') {
                // Stream intentionally cancelled via abort()
                return;
            }
            onError?.(err);
        }
    })();

    return {
        abort: () => controller.abort(),
    };
}

/**
 * Parses an SSE block (`event: ...\ndata: ...`) or raw JSON/text line.
 * /
function parseStreamChunk(rawChunk) {
    const trimmed = rawChunk.trim();
    if (!trimmed || trimmed.startsWith(':')) {
        return null; // Ignore empty chunks or SSE heartbeat comments
    }

    let eventName = 'message';
    const dataLines = [];

    for (const line of trimmed.split(/\r?\n/)) {
        if (line.startsWith('event:')) {
            eventName = line.slice(6).trim();
        } else if (line.startsWith('data:')) {
            dataLines.push(line.slice(5).trim());
        } else {
            dataLines.push(line);
        }
    }

    const rawData = dataLines.join('\n');
    if (rawData === '[DONE]') {
        return { event: 'done', data: '[DONE]', raw: rawChunk };
    }

    let parsedData = rawData;
    try {
        parsedData = JSON.parse(rawData);
    } catch {
        // Keep as plain string if not valid JSON
    }

    return {
        event: eventName,
        data: parsedData,
        raw: rawChunk,
    };
}--*/

const json  = require('./../json');

const headers = (conf) => {
    return json.merge({
        Accept:'text/event-stream, application/x-ndjson, text/plain'
    }, json.get(conf, 'headers', {}));
}

const body = (conf) => {
    return JSON.stringify(json.get(conf, 'data', {}))
}

const getCallback = (rawConfig, name) => {
    let cb = json.get(rawConfig, `callbacks.${name}`);

    if(cb && typeof cb === 'function'){
        return cb;
    }else{
        return null;
    }
}

const parseChunk = (chunk) => {
    let trimmed = chunk.trim();

    if (!trimmed || trimmed.startsWith(':')) {
        console.log('heartbeat');
        return null; // Ignore empty chunks or SSE heartbeat comments
    }

    let dataLines = [];
    let eventName = 'message';

    for (const line of trimmed.split(/\r?\n/)) {
        if (line.startsWith('event:')) {
            eventName = line.slice(6).trim();
        } else if (line.startsWith('data:')) {
            dataLines.push(line.slice(5).trim());
        } else {
            dataLines.push(line);
        }
    }

    const rawData = dataLines.join('\n');
    if (rawData === '[DONE]') {
        return { event: 'done', data: '[DONE]', raw: chunk };
    }

    let parsedData = rawData;
    try {
        parsedData = JSON.parse(rawData);
    } catch {
        // Keep as plain string if not valid JSON
    }

    return {
        event:eventName,
        data:parsedData,
        raw:chunk,
    };
}

const parseResp = async (response, reqConfig, onResp, rawConfig, error) => {
    debugger;
    const onError = getCallback(rawConfig, 'onError');
    if(error){
        if(onError){
            onError({
                data:null,
                valid:false,
                error:error,
                type:'ON_ERROR'
            }, reqConfig, onResp, rawConfig)
        }
    }else{
        if(!response.ok) {
            if(onError){
                onError({
                    data:null,
                    valid:false,
                    error:{
                        response:response,
                        statusText:await response.text().catch(() => response.statusText)
                    },
                    type:'ON_ERROR'
                }, reqConfig, onResp, rawConfig)
            }
        }else{
            if(!response.body) {
                if(onError){
                    onError({
                        data:null,
                        valid:false,
                        error:{
                            response:response,
                            statusText:'ReadableStream is not supported or response body is empty.'
                        },
                        type:'ON_ERROR'
                    }, reqConfig, onResp, rawConfig)
                }
            }else{
                let buffer = '';
                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                const onEvent = getCallback(rawConfig, 'onEvent');
                const onComplete = getCallback(rawConfig, 'onComplete');

                while (true) {
                    const {value, done} = await reader.read();
                    if (done){
                        break;
                    }

                    buffer += decoder.decode(value, {stream: true});

                    
                    let parts = buffer.split(/\r?\n\r?\n/); // Split by double newline (SSE standard) or single newline (NDJSON)
                        buffer = parts.pop() || ''; // Keep incomplete trailing chunk in buffer

                    for (const part of parts) {
                        const parsed = parseChunk(part);
                        if (parsed && onEvent) {
                            onEvent({
                                valid:true,
                                error:null,
                                data:parsed,
                                type:'ON_EVENT'
                            }, reqConfig, onResp, rawConfig);
                        }
                    }
                }

                if (buffer.trim()) {
                    const parsed = parseChunk(buffer);
                    if (parsed && onEvent) {
                        onEvent({
                            valid:true,
                            error:null,
                            data:parsed,
                            type:'ON_EVENT'
                        }, reqConfig, onResp, rawConfig);
                    }
                }

                if(onComplete){
                    onComplete(null, reqConfig, onResp, rawConfig);
                }
            }
        }
    }
}

const init = (config, onresp, rawConfig) => {
    const url = json.get(config, 'url', '');
    const controller = new AbortController();
    const onOpen = getCallback(rawConfig, 'onOpen');

    if(url){
        (async () => {
            try {
                const response = await fetch(url, {
                    body:body(config),
                    headers:headers(config),
                    signal:controller.signal,
                    method:json.get(config, 'method', 'post').toUpperCase(),
                });

                if(onOpen){
                    onOpen({
                        valid:true,
                        error:null,
                        data:response,
                        type:'ON_OPEN'
                    });
                }

                await parseResp(response, config, onresp, rawConfig);
            } catch (err) {
                if (err.name === 'AbortError') {
                    return
                };
                debugger;
                await parseResp({}, config, onresp, rawConfig, err);
            }
        })();

        return {
            controller:{
                abort:() => controller.abort(),
            }
        };
    }else{
        return null;
    }
}

exports.init = init;