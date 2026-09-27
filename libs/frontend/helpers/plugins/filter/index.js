/**
 * @file UniversalCollectionQueryEngine.js
 * @description Enterprise-grade query, search, multi-field sorting, compound indexing, chunk ingestion, 
 * streaming, pagination, path/type-safety validation, relevance scoring with field boosting, 
 * multi-word offset extraction, conjunctive/disjunctive faceted search, and hierarchical 
 * tree-pruning search engine with asynchronous debouncing for Browser, Mobile, React Native, and Node.js.
 */

// =========================================================================
// CROSS-PLATFORM SYSTEM UTILITIES
// =========================================================================

const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
const isBrowser = typeof window !== 'undefined' || typeof self !== 'undefined';

/**
 * Universal Base64 Encoder / Decoder (Browser btoa/atob & Node.js Buffer Bridge)
 */
const toBase64 = (str) => {
    if (typeof btoa === 'function') return btoa(str);
    if (typeof Buffer !== 'undefined') return Buffer.from(str, 'utf8').toString('base64');
    throw new Error('No Base64 encoding support found in this environment.');
};

const fromBase64 = (b64) => {
    if (typeof atob === 'function') return atob(b64);
    if (typeof Buffer !== 'undefined') return Buffer.from(b64, 'base64').toString('utf8');
    throw new Error('No Base64 decoding support found in this environment.');
};

/**
 * Universal Cooperative Yield (Frame-budget & event loop management)
 */
const cooperativeYield = async () => {
    // 1. Prioritized Task Scheduling API (Chromium Desktop & Mobile)
    if (typeof globalThis.scheduler?.yield === 'function') {
        return globalThis.scheduler.yield();
    }
    // 2. Browser Animation Frame (Safari WebKit & React Native)
    if (typeof globalThis.requestAnimationFrame === 'function') {
        return new Promise(resolve => globalThis.requestAnimationFrame(() => resolve()));
    }
    // 3. Node.js Event Loop Microtask Yield
    if (typeof setImmediate === 'function') {
        return new Promise(resolve => setImmediate(resolve));
    }
    // 4. Universal Fallback
    return new Promise(resolve => setTimeout(resolve, 0));
};

// =========================================================================
// MAIN ENGINE CLASS
// =========================================================================

class SearchEngine {
    /**
     * @param {Array<Object>} [dataset=[]] - Initial array of objects.
     * @param {Object} [config={}] - Engine configuration.
     * @param {'auto'|'mobile'|'desktop'|'node'} [config.platform='auto'] - Environment profile.
     * @param {number} [config.debounceDelay=250] - Keystroke debounce delay in ms.
     * @param {number} [config.maxCacheSize=100] - LRU cache size cap (mobile/memory protection).
     * @param {number} [config.targetFrameTime=8] - Target max execution time per frame (ms) for mobile streaming.
     * @param {string} [config.defaultChildKey='childs'] - Default property name for recursive children.
     */
    constructor(dataset = [], config = {}) {
        this.dataset = Array.isArray(dataset) ? dataset : [];
        this.debounceDelay = config.debounceDelay || 250;
        this.maxCacheSize = config.maxCacheSize || 100;
        this.targetFrameTime = config.targetFrameTime || 8;
        this.defaultChildKey = config.defaultChildKey || 'childs';

        // Determine platform profile
        if (config.platform && config.platform !== 'auto') {
            this.platform = config.platform;
        } else {
            const isMobileUA = isBrowser && typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
            this.platform = isNode ? 'node' : (isMobileUA ? 'mobile' : 'desktop');
        }

        this.isConstrained = this.platform === 'mobile';

        // Bounded LRU Caches (Map preserves insertion order for constant-time eviction)
        this.pathCache = new Map();
        this.regexCache = new Map();

        // Active compound indexes & custom operators
        this.compoundIndexes = new Map();
        this.customOperators = new Map();

        // Declared & inferred schema caches
        this.declaredSchema = null;
        this._discoveredSchemaPaths = null;
        this._inferredSchemaCache = null;

        // Debounce tracking
        this._debounceTimeout = null;
        this._activeResolve = null;
    }

    // =========================================================================
    // 1. DATASET MUTATIONS & PROGRESSIVE CHUNK INGESTION
    // =========================================================================

    setData(newDataset) {
        this.dataset = Array.isArray(newDataset) ? newDataset : [];
        this.clearIndexes();
        this._discoveredSchemaPaths = null;
        this._inferredSchemaCache = null;
    }

    addItem(item) {
        if (!item) return;
        this.dataset.push(item);

        for (const [, indexConfig] of this.compoundIndexes.entries()) {
            const compositeKey = this._serializeCompositeKey(item, indexConfig.keyPaths);
            const bucket = indexConfig.map.get(compositeKey);
            if (bucket) {
                bucket.push(item);
            } else {
                indexConfig.map.set(compositeKey, [item]);
            }
        }
    }

    /**
     * Synchronous Batch Ingest: Appends an array of items and updates compound indexes in O(K) time.
     */
    addChunk(items) {
        if (!Array.isArray(items) || items.length === 0) return;

        for (let i = 0; i < items.length; i++) {
            this.dataset.push(items[i]);
        }

        // Sync all active compound indexes in O(K) bulk time
        for (const [, indexConfig] of this.compoundIndexes.entries()) {
            const { map, keyPaths } = indexConfig;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const compositeKey = this._serializeCompositeKey(item, keyPaths);
                const bucket = map.get(compositeKey);
                if (bucket) {
                    bucket.push(item);
                } else {
                    map.set(compositeKey, [item]);
                }
            }
        }
    }

    /**
     * Non-Blocking Async Chunk Ingest: Ingests chunks progressively from an async iterator or generator,
     * yielding control back to the UI/runtime between chunks.
     */
    async addChunksAsync(chunkSource, options = {}) {
        const { onProgress = () => { }, signal = null } = options;
        let totalIngested = 0;

        for await (const chunk of chunkSource) {
            if (signal && signal.aborted) {
                return { totalIngested, aborted: true };
            }

            if (Array.isArray(chunk) && chunk.length > 0) {
                this.addChunk(chunk);
                totalIngested += chunk.length;
                onProgress({ ingested: totalIngested, total: this.dataset.length });

                await cooperativeYield();
            }
        }

        return { totalIngested, aborted: false };
    }

    removeItem(item) {
        if (!item) return;
        const idx = this.dataset.indexOf(item);
        if (idx !== -1) {
            this.dataset.splice(idx, 1);
        }

        for (const [, indexConfig] of this.compoundIndexes.entries()) {
            const compositeKey = this._serializeCompositeKey(item, indexConfig.keyPaths);
            const bucket = indexConfig.map.get(compositeKey);
            if (bucket) {
                const itemIdx = bucket.indexOf(item);
                if (itemIdx !== -1) bucket.splice(itemIdx, 1);
                if (bucket.length === 0) indexConfig.map.delete(compositeKey);
            }
        }
    }

    updateItem(item, updatedProperties) {
        if (!item) return;

        const oldKeys = new Map();
        for (const [keyHash, indexConfig] of this.compoundIndexes.entries()) {
            oldKeys.set(keyHash, this._serializeCompositeKey(item, indexConfig.keyPaths));
        }

        Object.assign(item, updatedProperties);

        for (const [keyHash, indexConfig] of this.compoundIndexes.entries()) {
            const oldCompositeKey = oldKeys.get(keyHash);
            const newCompositeKey = this._serializeCompositeKey(item, indexConfig.keyPaths);

            if (oldCompositeKey !== newCompositeKey) {
                const oldBucket = indexConfig.map.get(oldCompositeKey);
                if (oldBucket) {
                    const idx = oldBucket.indexOf(item);
                    if (idx !== -1) oldBucket.splice(idx, 1);
                    if (oldBucket.length === 0) indexConfig.map.delete(oldCompositeKey);
                }

                const newBucket = indexConfig.map.get(newCompositeKey);
                if (newBucket) {
                    newBucket.push(item);
                } else {
                    indexConfig.map.set(newCompositeKey, [item]);
                }
            }
        }
    }

    clearIndexes() {
        this.compoundIndexes.clear();
    }

    // =========================================================================
    // 2. O(1) COMPOUND MAP INDEXING
    // =========================================================================

    _serializeCompositeKey(item, keyPaths) {
        const values = keyPaths.map(path => {
            const val = path.includes('.') ? this.getNestedValue(item, path) : item[path];
            return val !== undefined ? val : null;
        });
        return JSON.stringify(values);
    }

    createCompoundIndex(keyPaths) {
        if (!Array.isArray(keyPaths) || keyPaths.length === 0) return;
        const keyHash = keyPaths.join('::');
        const indexMap = new Map();

        for (let i = 0; i < this.dataset.length; i++) {
            const item = this.dataset[i];
            const compositeKey = this._serializeCompositeKey(item, keyPaths);
            const bucket = indexMap.get(compositeKey);
            if (bucket) {
                bucket.push(item);
            } else {
                indexMap.set(compositeKey, [item]);
            }
        }

        this.compoundIndexes.set(keyHash, { map: indexMap, keyPaths });
    }

    findWithIndex(keyPaths, queryValues) {
        const keyHash = keyPaths.join('::');
        if (!this.compoundIndexes.has(keyHash)) {
            this.createCompoundIndex(keyPaths);
        }

        const { map } = this.compoundIndexes.get(keyHash);
        let values;

        if (Array.isArray(queryValues)) {
            values = queryValues;
        } else if (typeof queryValues === 'object' && queryValues !== null) {
            values = keyPaths.map(k => (queryValues[k] !== undefined ? queryValues[k] : null));
        } else {
            return [];
        }

        const compositeKey = JSON.stringify(values);
        return map.get(compositeKey) || [];
    }

    // =========================================================================
    // 3. BOUNDED CACHE & PATH EXTRACTION
    // =========================================================================

    getNestedValue(obj, path) {
        if (!obj || !path) return undefined;

        let parts = this.pathCache.get(path);
        if (!parts) {
            if (this.isConstrained && this.pathCache.size >= this.maxCacheSize) {
                const oldestKey = this.pathCache.keys().next().value;
                this.pathCache.delete(oldestKey);
            }
            parts = path.split('.');
            this.pathCache.set(path, parts);
        }

        let current = obj;
        for (let i = 0; i < parts.length; i++) {
            if (current === null || current === undefined || typeof current !== 'object') {
                return undefined;
            }
            current = current[parts[i]];
        }
        return current;
    }

    _getCachedRegex(pattern, flags = 'i') {
        const key = `${pattern}_${flags}`;
        let rx = this.regexCache.get(key);
        if (rx) return rx;

        if (this.isConstrained && this.regexCache.size >= this.maxCacheSize) {
            const oldestKey = this.regexCache.keys().next().value;
            this.regexCache.delete(oldestKey);
        }

        try {
            rx = new RegExp(pattern, flags);
            this.regexCache.set(key, rx);
            return rx;
        } catch {
            return null;
        }
    }

    _getCachedTokenRegex(searchPattern, isRegex = false) {
        if (!searchPattern && searchPattern !== 0) return null;
        const key = `${searchPattern}_${isRegex ? 'raw' : 'tokenized'}`;
        let rx = this.regexCache.get(key);
        if (rx) return rx;

        if (this.isConstrained && this.regexCache.size >= this.maxCacheSize) {
            const oldestKey = this.regexCache.keys().next().value;
            this.regexCache.delete(oldestKey);
        }

        try {
            let finalPattern = '';
            if (isRegex) {
                finalPattern = String(searchPattern);
            } else {
                const tokens = String(searchPattern)
                    .split(/\s+/)
                    .filter(t => t.length > 0)
                    .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

                if (tokens.length === 0) return null;
                finalPattern = `(${tokens.join('|')})`;
            }

            rx = new RegExp(finalPattern, 'gi');
            this.regexCache.set(key, rx);
            return rx;
        } catch {
            return null;
        }
    }

    // =========================================================================
    // 4. NESTED OBJECT PATH & TYPE-SAFETY VALIDATION
    // =========================================================================

    _levenshteinDistance(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    getSchemaPaths(sampleSize = 20) {
        if (this._discoveredSchemaPaths) return this._discoveredSchemaPaths;

        const pathSet = new Set();
        const limit = Math.min(this.dataset.length, sampleSize);

        const extractPaths = (obj, prefix = '') => {
            if (!obj || typeof obj !== 'object') return;
            for (const [key, val] of Object.entries(obj)) {
                const fullPath = prefix ? `${prefix}.${key}` : key;
                pathSet.add(fullPath);
                if (val && typeof val === 'object' && !Array.isArray(val)) {
                    extractPaths(val, fullPath);
                }
            }
        };

        for (let i = 0; i < limit; i++) {
            extractPaths(this.dataset[i]);
        }

        this._discoveredSchemaPaths = pathSet;
        return pathSet;
    }

    setSchema(schema) {
        if (schema && typeof schema === 'object') {
            this.declaredSchema = schema;
        }
    }

    _inferType(value) {
        if (value === null || value === undefined) return 'null';
        if (Array.isArray(value)) return 'array';
        if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)) && String(value).includes('-'))) {
            return 'date';
        }
        return typeof value;
    }

    _getInferredSchema(sampleSize = 20) {
        if (this._inferredSchemaCache) return this._inferredSchemaCache;

        const schema = {};
        const validPaths = this.getSchemaPaths(sampleSize);
        const limit = Math.min(this.dataset.length, sampleSize);

        for (const path of validPaths) {
            for (let i = 0; i < limit; i++) {
                const val = this.getNestedValue(this.dataset[i], path);
                if (val !== undefined && val !== null) {
                    schema[path] = this._inferType(val);
                    break;
                }
            }
        }

        this._inferredSchemaCache = schema;
        return schema;
    }

    validateQueryPaths(query, mode = 'warn') {
        if (mode === 'silent' || !query || typeof query !== 'object') return [];

        const validPaths = this.getSchemaPaths();
        if (validPaths.size === 0) return [];

        const issues = [];
        const reservedOperators = new Set(['$and', '$or', '$not', '$nor', 'searchRule', '$global']);

        const inspectNode = (node) => {
            if (!node || typeof node !== 'object') return;

            for (const [key, val] of Object.entries(node)) {
                if (reservedOperators.has(key)) {
                    if (Array.isArray(val)) val.forEach(child => inspectNode(child));
                    else if (typeof val === 'object') inspectNode(val);
                    continue;
                }

                const targetKeys = (val && typeof val === 'object' && val.keys)
                    ? (Array.isArray(val.keys) ? val.keys : [val.keys])
                    : [key];

                for (const path of targetKeys) {
                    if (!validPaths.has(path)) {
                        let closestPath = null;
                        let lowestDistance = Infinity;

                        for (const validPath of validPaths) {
                            const distance = this._levenshteinDistance(path.toLowerCase(), validPath.toLowerCase());
                            if (distance < lowestDistance && distance <= 4) {
                                lowestDistance = distance;
                                closestPath = validPath;
                            }
                        }

                        issues.push({ invalidPath: path, suggestion: closestPath });
                    }
                }
            }
        };

        inspectNode(query);

        if (issues.length > 0) {
            const message = issues.map(iss =>
                `Invalid query path "${iss.invalidPath}".${iss.suggestion ? ` Did you mean "${iss.suggestion}"?` : ''}`
            ).join('\n');

            if (mode === 'throw') throw new Error(`[CollectionQueryEngine PathValidationError]:\n${message}`);
            else if (mode === 'warn') console.warn(`⚠️ [CollectionQueryEngine Warning]:\n${message}`);
        }

        return issues;
    }

    validateQueryTypes(query, mode = 'warn') {
        if (mode === 'silent' || !query || typeof query !== 'object') return [];

        const expectedSchema = this.declaredSchema || this._getInferredSchema();
        const issues = [];
        const reservedOperators = new Set(['$and', '$or', '$not', '$nor', 'searchRule', '$global']);

        const inspectNode = (node) => {
            if (!node || typeof node !== 'object') return;

            for (const [key, rule] of Object.entries(node)) {
                if (reservedOperators.has(key)) {
                    if (Array.isArray(rule)) rule.forEach(child => inspectNode(child));
                    else if (typeof rule === 'object') inspectNode(rule);
                    continue;
                }

                const path = (rule && typeof rule === 'object' && rule.keys) ? String(rule.keys) : key;
                const expectedType = expectedSchema[path];

                if (!expectedType) continue;

                const queryVal = (rule && typeof rule === 'object' && 'value' in rule) ? rule.value : rule;
                const queryType = this._inferType(queryVal);

                if (queryVal === null || queryType === 'null') continue;

                const isArrayQuery = Array.isArray(queryVal);
                const op = (rule && typeof rule === 'object' && rule.operator) ? rule.operator : 'exact';

                if (op === 'between' && isArrayQuery) {
                    const elementTypes = queryVal.map(v => this._inferType(v));
                    const hasMismatch = elementTypes.some(t => t !== expectedType && !(expectedType === 'date' && t === 'string'));
                    if (hasMismatch) {
                        issues.push(`Query operator "between" on "${path}" expects a range array of type [${expectedType}, ${expectedType}]. Found [${elementTypes.join(', ')}].`);
                    }
                } else if (op === 'in' && isArrayQuery) {
                    const elementTypes = queryVal.map(v => this._inferType(v));
                    const hasMismatch = elementTypes.some(t => t !== expectedType);
                    if (hasMismatch) {
                        issues.push(`Query operator "in" on "${path}" expects elements of type "${expectedType}". Found values of types [${elementTypes.join(', ')}].`);
                    }
                } else {
                    const isTypeMatch = (expectedType === queryType) ||
                        (expectedType === 'date' && queryType === 'string' && !isNaN(Date.parse(queryVal))) ||
                        (expectedType === 'number' && queryType === 'string' && !isNaN(Number(queryVal)));

                    if (!isTypeMatch) {
                        issues.push(`Query path "${path}" expects values of type "${expectedType}". Found value "${queryVal}" of type "${queryType}".`);
                    }
                }
            }
        };

        inspectNode(query);

        if (issues.length > 0) {
            const message = issues.map(iss => `⚠️ [Type Mismatch]: ${iss}`).join('\n');
            if (mode === 'throw') throw new TypeError(`[CollectionQueryEngine TypeValidationError]:\n${message}`);
            else if (mode === 'warn') console.warn(`⚠️ [CollectionQueryEngine Warning]:\n${message}`);
        }

        return issues;
    }

    // =========================================================================
    // 5. RELEVANCE SCORING & FIELD BOOSTING ENGINE
    // =========================================================================

    _computeTokenMatchScore(text, tokens) {
        if (!text || tokens.length === 0) return 0;
        const str = String(text).toLowerCase();
        let fieldScore = 0;

        for (let t = 0; t < tokens.length; t++) {
            const token = tokens[t];
            if (!token) continue;

            if (str === token) {
                fieldScore += 100;
                continue;
            }
            if (str.startsWith(token)) {
                fieldScore += 50;
                continue;
            }
            const wordBoundaryRx = this._getCachedRegex(`\\b${token}\\b`, 'i');
            if (wordBoundaryRx && wordBoundaryRx.test(str)) {
                fieldScore += 30;
                continue;
            }
            if (str.includes(token)) {
                fieldScore += 10;
                continue;
            }
        }

        return fieldScore;
    }

    computeRelevanceScore(item, searchPattern, boostConfig = {}) {
        if (!item || !searchPattern) return 0;

        const tokens = String(searchPattern)
            .toLowerCase()
            .split(/\s+/)
            .filter(t => t.length > 0);

        if (tokens.length === 0) return 0;

        let totalScore = 0;

        for (const [path, boostWeight] of Object.entries(boostConfig)) {
            const fieldVal = path.includes('.') ? this.getNestedValue(item, path) : item[path];
            if (fieldVal === undefined || fieldVal === null) continue;

            const weight = typeof boostWeight === 'number' && boostWeight > 0 ? boostWeight : 1;

            if (Array.isArray(fieldVal)) {
                for (let i = 0; i < fieldVal.length; i++) {
                    const elementScore = this._computeTokenMatchScore(fieldVal[i], tokens);
                    totalScore += elementScore * weight;
                }
            } else {
                const rawScore = this._computeTokenMatchScore(fieldVal, tokens);
                totalScore += rawScore * weight;
            }
        }

        return totalScore;
    }

    // =========================================================================
    // 6. FACET AGGREGATION ENGINE (Conjunctive & Disjunctive Faceting)
    // =========================================================================

    computeFacets(query = {}, facetConfig = {}) {
        const {
            facets = [],
            ranges = {},
            disjunctiveFacets = []
        } = facetConfig;

        const facetMap = {};
        const rangeMap = {};
        const disjunctiveSet = new Set(disjunctiveFacets);

        for (let f = 0; f < facets.length; f++) {
            facetMap[facets[f]] = Object.create(null);
        }
        for (const [rangePath, buckets] of Object.entries(ranges)) {
            rangeMap[rangePath] = Object.create(null);
            for (let b = 0; b < buckets.length - 1; b++) {
                const bucketLabel = `${buckets[b]}-${buckets[b + 1]}`;
                rangeMap[rangePath][bucketLabel] = 0;
            }
        }

        const len = this.dataset.length;
        let totalMatches = 0;

        const isDisjunctiveMatch = (item, excludeFacet) => {
            if (!query || Object.keys(query).length === 0) return true;
            const strippedQuery = {};
            for (const [k, v] of Object.entries(query)) {
                if (k !== excludeFacet) strippedQuery[k] = v;
            }
            return this.evaluateNode(item, strippedQuery);
        };

        for (let i = 0; i < len; i++) {
            const item = this.dataset[i];
            const isBaseMatch = this.evaluateNode(item, query);

            if (isBaseMatch) totalMatches++;

            for (let f = 0; f < facets.length; f++) {
                const path = facets[f];
                const isDisjunctive = disjunctiveSet.has(path);
                const qualifies = isDisjunctive ? isDisjunctiveMatch(item, path) : isBaseMatch;
                if (!qualifies) continue;

                const val = path.includes('.') ? this.getNestedValue(item, path) : item[path];
                if (val === undefined || val === null) continue;

                const targetBucket = facetMap[path];
                if (Array.isArray(val)) {
                    for (let a = 0; a < val.length; a++) {
                        const el = String(val[a]);
                        targetBucket[el] = (targetBucket[el] || 0) + 1;
                    }
                } else {
                    const str = String(val);
                    targetBucket[str] = (targetBucket[str] || 0) + 1;
                }
            }

            if (isBaseMatch) {
                for (const [rangePath, buckets] of Object.entries(ranges)) {
                    const numVal = rangePath.includes('.') ? this.getNestedValue(item, rangePath) : item[rangePath];
                    if (typeof numVal !== 'number') continue;

                    for (let b = 0; b < buckets.length - 1; b++) {
                        const min = buckets[b];
                        const max = buckets[b + 1];
                        if (numVal >= min && (b === buckets.length - 2 ? numVal <= max : numVal < max)) {
                            const label = `${min}-${max}`;
                            rangeMap[rangePath][label] = (rangeMap[rangePath][label] || 0) + 1;
                            break;
                        }
                    }
                }
            }
        }

        return { totalMatches, facets: facetMap, ranges: rangeMap };
    }

    // =========================================================================
    // 7. COMPARISON OPERATORS & EXTENSIBILITY
    // =========================================================================

    registerOperator(name, evaluationFn) {
        if (typeof name !== 'string' || typeof evaluationFn !== 'function') {
            throw new Error("registerOperator requires string name and evaluation function.");
        }
        this.customOperators.set(name.toLowerCase(), evaluationFn);
    }

    _evaluateOperator(itemVal, targetVal, op = 'includes', caseSensitive = false) {
        if (Array.isArray(itemVal) && op !== 'exact' && op !== 'equals' && op !== 'hasall') {
            return itemVal.some(val => this._evaluateOperator(val, targetVal, op, caseSensitive));
        }

        const opLower = String(op).toLowerCase();
        if (this.customOperators.has(opLower)) {
            return this.customOperators.get(opLower)(itemVal, targetVal, caseSensitive);
        }

        const normalize = (v) => {
            if (v === null || v === undefined) return '';
            const str = String(v);
            return caseSensitive ? str : str.toLowerCase();
        };

        switch (opLower) {
            case 'exact':
            case 'equals':
            case 'eq':
                if (typeof itemVal === 'string' && typeof targetVal === 'string' && !caseSensitive) {
                    return itemVal.toLowerCase() === targetVal.toLowerCase();
                }
                return itemVal === targetVal;

            case 'notequals':
            case 'ne':
                if (typeof itemVal === 'string' && typeof targetVal === 'string' && !caseSensitive) {
                    return itemVal.toLowerCase() !== targetVal.toLowerCase();
                }
                return itemVal !== targetVal;

            case 'includes':
            case 'contains': {
                if (itemVal === null || itemVal === undefined) return false;
                return normalize(itemVal).includes(normalize(targetVal));
            }

            case 'startswith': {
                if (itemVal === null || itemVal === undefined) return false;
                return normalize(itemVal).startsWith(normalize(targetVal));
            }

            case 'endswith': {
                if (itemVal === null || itemVal === undefined) return false;
                return normalize(itemVal).endsWith(normalize(targetVal));
            }

            case 'regex': {
                if (itemVal === null || itemVal === undefined) return false;
                const rx = this._getCachedRegex(String(targetVal), caseSensitive ? '' : 'i');
                return rx ? rx.test(String(itemVal)) : false;
            }

            case 'in': {
                if (!Array.isArray(targetVal)) return false;
                return targetVal.some(val => this._evaluateOperator(itemVal, val, 'exact', caseSensitive));
            }

            case 'nin': {
                if (!Array.isArray(targetVal)) return true;
                return !targetVal.some(val => this._evaluateOperator(itemVal, val, 'exact', caseSensitive));
            }

            case 'gt':
                return itemVal > targetVal;
            case 'gte':
                return itemVal >= targetVal;
            case 'lt':
                return itemVal < targetVal;
            case 'lte':
                return itemVal <= targetVal;

            default:
                return itemVal === targetVal;
        }
    }

    _evaluateField(item, key, rule, offsetCollector = null, globalHighlight = false) {
        if (rule === null || typeof rule !== 'object' || Array.isArray(rule)) {
            const itemVal = key.includes('.') ? this.getNestedValue(item, key) : item[key];
            const isMatch = this._evaluateOperator(itemVal, rule, 'exact', false);
            if (isMatch && globalHighlight && offsetCollector) {
                const offsets = this._extractDeepOffsets(itemVal, rule, false);
                if (offsets !== null) offsetCollector[key] = offsets;
            }
            return isMatch;
        }

        const {
            keys = key,
            value,
            operator = 'includes',
            caseSensitive = false,
            keyMatch = 'OR',
            highlight = false
        } = rule;

        const keyList = Array.isArray(keys) ? keys : [keys];
        if (keyList.length === 0) return true;

        const shouldExtractOffsets = offsetCollector && (highlight || globalHighlight);

        const testKey = (k) => {
            const itemVal = k.includes('.') ? this.getNestedValue(item, k) : item[k];
            const matched = this._evaluateOperator(itemVal, value, operator, caseSensitive);

            if (matched && shouldExtractOffsets) {
                const isRegex = operator === 'regex';
                const deepOffsets = this._extractDeepOffsets(itemVal, value, isRegex);
                if (deepOffsets !== null) {
                    offsetCollector[k] = deepOffsets;
                }
            }

            return matched;
        };

        return keyMatch === 'AND' ? keyList.every(testKey) : keyList.some(testKey);
    }

    // =========================================================================
    // 8. RECURSIVE AST QUERY EVALUATION (FIXED MULTI-PASS LOGIC)
    // =========================================================================

    evaluateNode(item, node, offsetCollector = null, globalHighlight = false) {
        if (!item || !node || typeof node !== 'object') return false;

        const entries = Object.entries(node);
        if (entries.length === 0) return true;

        const shouldCollectOffsets = offsetCollector && (globalHighlight || Object.keys(node).length > 0);

        for (let i = 0; i < entries.length; i++) {
            const [key, clause] = entries[i];

            switch (key) {
                case '$and': {
                    if (!Array.isArray(clause)) return false;

                    if (shouldCollectOffsets) {
                        let matchesAll = true;
                        for (let j = 0; j < clause.length; j++) {
                            const matched = this.evaluateNode(item, clause[j], offsetCollector, globalHighlight);
                            if (!matched) matchesAll = false;
                        }
                        if (!matchesAll) return false;
                    } else {
                        if (!clause.every(child => this.evaluateNode(item, child, null, false))) return false;
                    }
                    break;
                }

                case '$or': {
                    if (!Array.isArray(clause)) return false;

                    if (shouldCollectOffsets) {
                        let matchesAny = false;
                        for (let j = 0; j < clause.length; j++) {
                            const matched = this.evaluateNode(item, clause[j], offsetCollector, globalHighlight);
                            if (matched) matchesAny = true;
                        }
                        if (!matchesAny) return false;
                    } else {
                        if (!clause.some(child => this.evaluateNode(item, child, null, false))) return false;
                    }
                    break;
                }

                case '$not': {
                    if (clause && typeof clause === 'object') {
                        if (this.evaluateNode(item, clause, null, false)) return false;
                    }
                    break;
                }

                case '$nor': {
                    if (!Array.isArray(clause)) return false;
                    if (clause.some(child => this.evaluateNode(item, child, null, false))) return false;
                    break;
                }

                default: {
                    if (!this._evaluateField(item, key, clause, offsetCollector, globalHighlight)) return false;
                    break;
                }
            }
        }

        return true;
    }

    // =========================================================================
    // 9. MULTI-WORD STRUCTURED OFFSET EXTRACTION
    // =========================================================================

    _extractOffsets(rawText, searchPattern, isRegex = false) {
        if (rawText === null || rawText === undefined) return [];
        const textStr = String(rawText);

        const rx = this._getCachedTokenRegex(searchPattern, isRegex);
        if (!rx) return [];

        rx.lastIndex = 0;
        const rawIntervals = [];
        let match;

        while ((rx.lastIndex < textStr.length) && (match = rx.exec(textStr)) !== null) {
            if (match.index === rx.lastIndex) rx.lastIndex++;
            rawIntervals.push({ start: match.index, end: match.index + match[0].length });
        }

        if (rawIntervals.length === 0) return [];
        rawIntervals.sort((a, b) => a.start - b.start);

        const merged = [rawIntervals[0]];
        for (let i = 1; i < rawIntervals.length; i++) {
            const curr = rawIntervals[i];
            const last = merged[merged.length - 1];
            if (curr.start <= last.end) {
                last.end = Math.max(last.end, curr.end);
            } else {
                merged.push(curr);
            }
        }

        return merged;
    }

    _extractDeepOffsets(targetData, searchPattern, isRegex = false) {
        if (targetData === null || targetData === undefined) return null;

        if (typeof targetData !== 'object') {
            const offsets = this._extractOffsets(String(targetData), searchPattern, isRegex);
            return offsets.length > 0 ? offsets : null;
        }

        if (Array.isArray(targetData)) {
            let hasMatch = false;
            const arrayOffsets = targetData.map(item => {
                const itemOffsets = this._extractDeepOffsets(item, searchPattern, isRegex);
                if (itemOffsets !== null) hasMatch = true;
                return itemOffsets;
            });
            return hasMatch ? arrayOffsets : null;
        }

        const objectOffsets = {};
        let hasMatch = false;
        for (const [k, v] of Object.entries(targetData)) {
            const childOffsets = this._extractDeepOffsets(v, searchPattern, isRegex);
            if (childOffsets !== null) {
                objectOffsets[k] = childOffsets;
                hasMatch = true;
            }
        }

        return hasMatch ? objectOffsets : null;
    }

    // =========================================================================
    // 10. MULTI-FIELD SORTING & TIE-BREAKING
    // =========================================================================

    _normalizeSortCriteria(sortOptions) {
        const criteria = [];
        if (Array.isArray(sortOptions)) {
            sortOptions.forEach(opt => {
                if (opt && (opt.sortBy || typeof opt.comparator === 'function')) {
                    criteria.push({
                        path: opt.sortBy || null,
                        isDesc: String(opt.sortOrder || 'asc').toLowerCase() === 'desc',
                        comparator: typeof opt.comparator === 'function' ? opt.comparator : null
                    });
                }
            });
        } else if (typeof sortOptions === 'object' && sortOptions !== null) {
            if (sortOptions.sortBy || typeof sortOptions.comparator === 'function') {
                criteria.push({
                    path: sortOptions.sortBy || null,
                    isDesc: String(sortOptions.sortOrder || 'asc').toLowerCase() === 'desc',
                    comparator: typeof sortOptions.comparator === 'function' ? sortOptions.comparator : null
                });
            }
        }
        return criteria;
    }

    sort(array, sortOptions) {
        if (!Array.isArray(array)) return [];
        const normalizedCriteria = this._normalizeSortCriteria(sortOptions);
        if (normalizedCriteria.length === 0) return [...array];

        return [...array].sort((a, b) => {
            for (let i = 0; i < normalizedCriteria.length; i++) {
                const { path, isDesc, comparator } = normalizedCriteria[i];
                const valA = path ? (path.includes('.') ? this.getNestedValue(a, path) : a[path]) : undefined;
                const valB = path ? (path.includes('.') ? this.getNestedValue(b, path) : b[path]) : undefined;

                if (comparator) {
                    const res = comparator(valA, valB, a, b);
                    if (res !== 0) return isDesc ? -res : res;
                    continue;
                }

                if (valA === valB) continue;
                if (valA === undefined || valA === null) return 1;
                if (valB === undefined || valB === null) return -1;

                if (typeof valA === 'number' && typeof valB === 'number') {
                    const diff = isDesc ? valB - valA : valA - valB;
                    if (diff !== 0) return diff;
                    continue;
                }

                if (typeof valA === 'string' && typeof valB === 'string') {
                    const cmp = isDesc
                        ? valB.localeCompare(valA, undefined, { sensitivity: 'base' })
                        : valA.localeCompare(valB, undefined, { sensitivity: 'base' });
                    if (cmp !== 0) return cmp;
                    continue;
                }

                const strA = String(valA);
                const strB = String(valB);
                const fallback = isDesc ? strB.localeCompare(strA) : strA.localeCompare(strB);
                if (fallback !== 0) return fallback;
            }
            return 0;
        });
    }

    // =========================================================================
    // 11. SEARCH & OFFSET-BASED PAGINATION WITH FACETS & BOOSTING
    // =========================================================================

    find(query = {}, options = {}) {
        const {
            sort = null,
            limit = null,
            page = 1,
            highlight = false,
            validatePaths = 'warn',
            boost = null,
            facets = null
        } = options;

        if (validatePaths !== 'silent') {
            this.validateQueryPaths(query, validatePaths);
            this.validateQueryTypes(query, validatePaths);
        }

        let searchTerms = '';
        if (boost && typeof boost === 'object') {
            const extractQueryValues = (node) => {
                if (!node || typeof node !== 'object') return;
                for (const [, v] of Object.entries(node)) {
                    if (v && typeof v === 'object' && v.value) searchTerms += ' ' + v.value;
                    else if (typeof v === 'string') searchTerms += ' ' + v;
                    else if (Array.isArray(v)) v.forEach(extractQueryValues);
                }
            };
            extractQueryValues(query);
            searchTerms = searchTerms.trim();
        }

        const hasBoost = Boolean(boost && searchTerms);
        const len = this.dataset.length;
        const hasLimit = typeof limit === 'number' && limit > 0;
        const normalizedSort = this._normalizeSortCriteria(sort);

        if (hasBoost && normalizedSort.length === 0) {
            normalizedSort.push({ path: '_score', isDesc: true, comparator: null });
        }

        const hasSort = normalizedSort.length > 0;
        let paginated = [];
        let totalItems = 0;
        let totalPages = 1;

        if (hasSort) {
            const matched = [];
            for (let i = 0; i < len; i++) {
                const item = this.dataset[i];
                const offsetCollector = {};

                if (this.evaluateNode(item, query, offsetCollector, highlight)) {
                    const hasOffsets = Object.keys(offsetCollector).length > 0;
                    let entry = item;

                    if (hasBoost) {
                        const score = this.computeRelevanceScore(item, searchTerms, boost);
                        entry = { ...item, _score: score };
                    }

                    if (hasOffsets) {
                        entry = entry === item ? { ...item, _offsets: offsetCollector } : { ...entry, _offsets: offsetCollector };
                    }

                    matched.push(entry);
                }
            }

            totalItems = matched.length;
            const sorted = this.sort(matched, normalizedSort);

            paginated = sorted;
            if (hasLimit) {
                totalPages = Math.ceil(totalItems / limit) || 1;
                const start = (Math.max(1, page) - 1) * limit;
                paginated = sorted.slice(start, start + limit);
            }
        } else {
            let totalCount = 0;
            const startIdx = hasLimit ? (Math.max(1, page) - 1) * limit : 0;
            const endIdx = hasLimit ? startIdx + limit : Infinity;

            for (let i = 0; i < len; i++) {
                const item = this.dataset[i];
                const offsetCollector = {};
                if (this.evaluateNode(item, query, offsetCollector, highlight)) {
                    if (totalCount >= startIdx && totalCount < endIdx) {
                        const hasOffsets = Object.keys(offsetCollector).length > 0;
                        paginated.push(hasOffsets ? { ...item, _offsets: offsetCollector } : item);
                    }
                    totalCount++;

                    if (hasLimit && totalCount >= endIdx) {
                        break;
                    }
                }
            }

            totalItems = totalCount;
            totalPages = hasLimit ? Math.ceil(totalCount / limit) || 1 : 1;
        }

        let facetResults = null;
        if (facets && typeof facets === 'object') {
            facetResults = this.computeFacets(query, facets);
        }

        return {
            data: paginated,
            pagination: { totalItems, totalPages, currentPage: Math.max(1, page), limit: limit || totalItems },
            ...(facetResults && {
                facets: facetResults.facets,
                ranges: facetResults.ranges,
                facetTotal: facetResults.totalMatches
            })
        };
    }

    findOne(query = {}, options = {}) {
        const res = this.find(query, { ...options, limit: 1 });
        return res.data[0];
    }

    // =========================================================================
    // 12. HIERARCHICAL TREE FILTERING (Configurable Child Matching & Pruning)
    // =========================================================================

    /**
     * Recursively filters a hierarchical tree structure with configurable child handling.
     */
    filterTree(query = {}, options = {}) {
        const {
            searchChildren = false, // Requirement 1: OFF by default
            childKey = this.defaultChildKey, // Requirement 2: Configurable child key name
            childQuery = null, // Requirement 3: Child-specific query override
            treeConfig = {},
            highlight = false,
            customTree = null
        } = options;

        const {
            keepAncestors = true,
            keepDescendantsOnParentMatch = false,
            maxDepth = Infinity
        } = treeConfig;

        const sourceTree = customTree || this.dataset;
        const rootList = Array.isArray(sourceTree) ? sourceTree : [sourceTree];

        const pruneNode = (node, depth, isChildNode) => {
            if (!node || typeof node !== 'object') return null;

            const activeQuery = (isChildNode && childQuery) ? childQuery : query;
            const offsetCollector = {};
            const selfMatches = this.evaluateNode(node, activeQuery, offsetCollector, highlight);

            const rawChildren = node[childKey];
            const hasChildren = rawChildren !== undefined && rawChildren !== null;

            if (!searchChildren || depth >= maxDepth || !hasChildren) {
                if (selfMatches) {
                    const hasOffsets = Object.keys(offsetCollector).length > 0;
                    return {
                        ...node,
                        ...(hasOffsets && { _offsets: offsetCollector }),
                        _selfMatched: true
                    };
                }
                return null;
            }

            if (selfMatches && keepDescendantsOnParentMatch) {
                const hasOffsets = Object.keys(offsetCollector).length > 0;
                return {
                    ...node,
                    ...(hasOffsets && { _offsets: offsetCollector }),
                    _selfMatched: true
                };
            }

            let childArray = [];
            if (Array.isArray(rawChildren)) {
                childArray = rawChildren;
            } else if (typeof rawChildren === 'object') {
                childArray = [rawChildren];
            }

            const matchingChildren = [];
            for (let i = 0; i < childArray.length; i++) {
                const pruned = pruneNode(childArray[i], depth + 1, true);
                if (pruned) {
                    matchingChildren.push(pruned);
                }
            }

            const hasMatchingChild = matchingChildren.length > 0;

            if (selfMatches || (hasMatchingChild && keepAncestors)) {
                const hasOffsets = Object.keys(offsetCollector).length > 0;

                let resolvedChildren = null;
                if (Array.isArray(rawChildren)) {
                    resolvedChildren = matchingChildren;
                } else if (typeof rawChildren === 'object') {
                    resolvedChildren = matchingChildren[0] || null;
                }

                return {
                    ...node,
                    ...(hasOffsets && { _offsets: offsetCollector }),
                    _selfMatched: Boolean(selfMatches),
                    _hasMatchingChild: hasMatchingChild,
                    [childKey]: resolvedChildren
                };
            }

            return null;
        };

        const prunedTree = [];
        for (let i = 0; i < rootList.length; i++) {
            const pruned = pruneNode(rootList[i], 0, false);
            if (pruned) {
                prunedTree.push(pruned);
            }
        }

        return prunedTree;
    }

    // =========================================================================
    // 13. ASYNC CANCELABLE DEBOUNCED TREE SEARCH (UI Helper)
    // =========================================================================

    /**
     * Evaluates tree queries progressively with cancellation and debouncing.
     * Prevents UI race conditions when users type rapidly in hierarchical explorers.
     */
    findDebounced(query = {}, options = {}, customDelay = null) {
        const delay = customDelay !== null ? customDelay : this.debounceDelay;

        if (this._debounceTimeout) {
            clearTimeout(this._debounceTimeout);
        }

        if (this._activeResolve) {
            this._activeResolve({ cancelled: true, data: [] });
        }

        return new Promise((resolve) => {
            this._activeResolve = resolve;

            this._debounceTimeout = setTimeout(() => {
                try {
                    const results = this.filterTree(query, options);
                    if (resolve === this._activeResolve) {
                        resolve({ cancelled: false, data: results });
                        this._activeResolve = null;
                    }
                } catch (error) {
                    resolve({ cancelled: false, data: [], error });
                    this._activeResolve = null;
                }
            }, delay);
        });
    }

    // =========================================================================
    // 14. RELAY-COMPLIANT CURSOR PAGINATION
    // =========================================================================

    _encodeCursor(item, sortCriteria) {
        if (!item || !Array.isArray(sortCriteria)) return null;
        const values = sortCriteria.map(criterion => {
            const path = criterion.path;
            return path ? (path.includes('.') ? this.getNestedValue(item, path) : item[path]) : null;
        });
        values.push(item.id !== undefined ? item.id : null);
        try {
            return toBase64(JSON.stringify(values));
        } catch {
            return null;
        }
    }

    _decodeCursor(cursorStr) {
        if (!cursorStr || typeof cursorStr !== 'string') return null;
        try {
            return JSON.parse(fromBase64(cursorStr));
        } catch {
            return null;
        }
    }

    _isAfterCursor(item, cursorValues, sortCriteria) {
        if (!cursorValues || !Array.isArray(cursorValues)) return true;

        for (let i = 0; i < sortCriteria.length; i++) {
            const { path, isDesc, comparator } = sortCriteria[i];
            const targetVal = cursorValues[i];

            const itemVal = path ? (path.includes('.') ? this.getNestedValue(item, path) : item[path]) : undefined;

            if (comparator) {
                const res = comparator(itemVal, targetVal, item, null);
                if (res !== 0) return isDesc ? res < 0 : res > 0;
                continue;
            }

            if (itemVal === targetVal) continue;
            if (itemVal === undefined || itemVal === null) return false;
            if (targetVal === undefined || targetVal === null) return true;

            if (typeof itemVal === 'number' && typeof targetVal === 'number') {
                return isDesc ? itemVal < targetVal : itemVal > targetVal;
            }

            const strA = String(itemVal);
            const strB = String(targetVal);
            const cmp = strA.localeCompare(strB, undefined, { sensitivity: 'base' });
            return isDesc ? cmp < 0 : cmp > 0;
        }

        const targetId = cursorValues[sortCriteria.length];
        if (targetId !== null && item.id !== undefined) {
            return item.id > targetId;
        }

        return false;
    }

    findCursor(query = {}, options = {}) {
        const { limit = 10, after = null, sort = null, highlight = false } = options;

        let sortCriteria = this._normalizeSortCriteria(sort);
        if (sortCriteria.length === 0) {
            sortCriteria = [{ path: 'id', isDesc: false, comparator: null }];
        }

        const decodedCursorValues = this._decodeCursor(after);
        const matched = [];
        const len = this.dataset.length;

        for (let i = 0; i < len; i++) {
            const item = this.dataset[i];
            const offsetCollector = {};
            if (this.evaluateNode(item, query, offsetCollector, highlight)) {
                const hasOffsets = Object.keys(offsetCollector).length > 0;
                matched.push(hasOffsets ? { ...item, _offsets: offsetCollector } : item);
            }
        }

        const sorted = this.sort(matched, sortCriteria);
        const totalCount = sorted.length;

        let startIndex = 0;
        if (decodedCursorValues) {
            const cursorIndex = sorted.findIndex(item => this._encodeCursor(item, sortCriteria) === after);
            if (cursorIndex !== -1) {
                startIndex = cursorIndex + 1;
            } else {
                const fallbackIdx = sorted.findIndex(item => this._isAfterCursor(item, decodedCursorValues, sortCriteria));
                startIndex = fallbackIdx !== -1 ? fallbackIdx : sorted.length;
            }
        }

        const items = sorted.slice(startIndex, startIndex + limit);
        const hasNextPage = startIndex + limit < sorted.length;
        const hasPreviousPage = startIndex > 0;

        const edges = items.map(item => ({
            node: item,
            cursor: this._encodeCursor(item, sortCriteria)
        }));

        return {
            edges,
            pageInfo: {
                hasNextPage,
                hasPreviousPage,
                startCursor: edges.length > 0 ? edges[0].cursor : null,
                endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
                totalCount
            }
        };
    }

    // =========================================================================
    // 15. DUAL STREAMING ENGINES
    // =========================================================================

    *stream(query = {}) {
        const len = this.dataset.length;
        for (let i = 0; i < len; i++) {
            const item = this.dataset[i];
            if (this.evaluateNode(item, query)) {
                yield item;
            }
        }
    }

    async streamAdaptiveAsync(query = {}, options = {}) {
        const { onChunk = () => { }, signal = null, highlight = false } = options;
        const len = this.dataset.length;
        let currentBatch = [];
        let totalStreamed = 0;
        let frameStartTime = performance.now();

        for (let i = 0; i < len; i++) {
            if (signal && signal.aborted) {
                return { totalStreamed, aborted: true };
            }

            const item = this.dataset[i];
            const offsetCollector = {};
            if (this.evaluateNode(item, query, offsetCollector, highlight)) {
                const hasOffsets = Object.keys(offsetCollector).length > 0;
                currentBatch.push(hasOffsets ? { ...item, _offsets: offsetCollector } : item);
                totalStreamed++;
            }

            const elapsed = performance.now() - frameStartTime;
            if (elapsed >= this.targetFrameTime && currentBatch.length > 0) {
                const progress = +((i / len) * 100).toFixed(1);
                onChunk(currentBatch, progress);
                currentBatch = [];

                await cooperativeYield();
                frameStartTime = performance.now();
            }
        }

        if (currentBatch.length > 0 && (!signal || !signal.aborted)) {
            onChunk(currentBatch, 100.0);
        }

        return { totalStreamed, aborted: false };
    }

    destroy() {
        this.pathCache.clear();
        this.regexCache.clear();
        this.compoundIndexes.clear();
        this.customOperators.clear();
        this.dataset = [];
        this._discoveredSchemaPaths = null;
        this._inferredSchemaCache = null;
        if (this._debounceTimeout) clearTimeout(this._debounceTimeout);
    }
}

module.exports = {
    init: (data, config) => {
        return new SearchEngine(data, config)
    }
}