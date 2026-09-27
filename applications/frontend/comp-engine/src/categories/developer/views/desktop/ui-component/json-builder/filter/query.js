/**
  * @file UniversalCollectionQueryEngine.js
 * @description Enterprise-grade query, search, sorting, compound indexing, chunk ingestion, 
 * streaming, pagination, and multi-word offset extraction engine for Browser, Mobile, and Node.js.
 */

// Cross-Platform Global Environment Detection
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
const isBrowser = typeof window !== 'undefined' || typeof self !== 'undefined';

/**
 * Universal Base64 Encoder / Decoder
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
  if (typeof globalThis.scheduler?.yield === 'function') {
    return globalThis.scheduler.yield();
  }
  if (typeof globalThis.requestAnimationFrame === 'function') {
    return new Promise(resolve => globalThis.requestAnimationFrame(() => resolve()));
  }
  if (typeof setImmediate === 'function') {
    return new Promise(resolve => setImmediate(resolve));
  }
  return new Promise(resolve => setTimeout(resolve, 0));
};

export class UniversalCollectionQueryEngine {
  /**
   * @param {Array<Object>} [dataset=[]] - Initial array of objects.
   * @param {Object} [config={}] - Engine configuration.
   * @param {'auto'|'mobile'|'desktop'|'node'} [config.platform='auto'] - Environment profile.
   * @param {number} [config.debounceDelay=250] - Keystroke debounce delay in ms.
   * @param {number} [config.maxCacheSize=100] - LRU cache size cap (mobile/memory protection).
   * @param {number} [config.targetFrameTime=8] - Target max execution time per frame (ms) for mobile streaming.
   */
  constructor(dataset = [], config = {}) {
    this.dataset = Array.isArray(dataset) ? dataset : [];
    this.debounceDelay = config.debounceDelay || 250;
    this.maxCacheSize = config.maxCacheSize || 100;
    this.targetFrameTime = config.targetFrameTime || 8;

    if (config.platform && config.platform !== 'auto') {
      this.platform = config.platform;
    } else {
      const isMobileUA = isBrowser && typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
      this.platform = isNode ? 'node' : (isMobileUA ? 'mobile' : 'desktop');
    }

    this.isConstrained = this.platform === 'mobile';

    // Bounded LRU caches (Maps preserve insertion order for constant-time eviction)
    this.pathCache = new Map();
    this.regexCache = new Map();

    // Active compound indexes & custom operators
    this.compoundIndexes = new Map();
    this.customOperators = new Map();

    // Debounce tracking
    this._debounceTimeout = null;
    this._activeResolve = null;
  }

  // =========================================================================
  // 1. DATASET MUTATIONS & CHUNK INGESTION
  // =========================================================================

  setData(newDataset) {
    this.dataset = Array.isArray(newDataset) ? newDataset : [];
    this.clearIndexes();
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
    const { onProgress = () => {}, signal = null } = options;
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
  // 4. COMPARISON OPERATORS & EXTENSIBILITY
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
  // 5. RECURSIVE AST QUERY EVALUATION (FIXED MULTI-PASS LOGIC)
  // =========================================================================

  /**
   * Recursively evaluates conditions across logical AST branches.
   * Disables logical short-circuiting when offset collection is active,
   * guaranteeing that all matching branches extract their highlights.
   */
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
            // MULTI-PASS AND EVALUATION: Force evaluate ALL branches to gather all highlights
            let matchesAll = true;
            for (let j = 0; j < clause.length; j++) {
              const matched = this.evaluateNode(item, clause[j], offsetCollector, globalHighlight);
              if (!matched) {
                matchesAll = false;
              }
            }
            if (!matchesAll) return false;
          } else {
            // FAST PATH (No Highlights): Use standard short-circuiting
            if (!clause.every(child => this.evaluateNode(item, child, null, false))) return false;
          }
          break;
        }

        case '$or': {
          if (!Array.isArray(clause)) return false;

          if (shouldCollectOffsets) {
            // MULTI-PASS OR EVALUATION: Force evaluate ALL branches to gather all highlights
            let matchesAny = false;
            for (let j = 0; j < clause.length; j++) {
              const matched = this.evaluateNode(item, clause[j], offsetCollector, globalHighlight);
              if (matched) {
                matchesAny = true;
              }
            }
            if (!matchesAny) return false;
          } else {
            // FAST PATH (No Highlights): Use standard short-circuiting
            if (!clause.some(child => this.evaluateNode(item, child, null, false))) return false;
          }
          break;
        }

        case '$not': {
          // Negated condition excludes the item entirely on match; no highlights needed
          if (clause && typeof clause === 'object') {
            if (this.evaluateNode(item, clause, null, false)) return false;
          }
          break;
        }

        case '$nor': {
          // Negated array excludes the item entirely on match; no highlights needed
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
  // 6. MULTI-WORD STRUCTURED OFFSET EXTRACTION
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
  // 7. MULTI-FIELD SORTING & TIE-BREAKING
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
  // 8. SEARCH & OFFSET-BASED PAGINATION
  // =========================================================================

  find(query = {}, options = {}) {
    const { sort = null, limit = null, page = 1, highlight = false } = options;
    const len = this.dataset.length;
    const hasLimit = typeof limit === 'number' && limit > 0;
    const normalizedSort = this._normalizeSortCriteria(sort);
    const hasSort = normalizedSort.length > 0;

    // Path A: Full Scan with Multi-Field Sort
    if (hasSort) {
      const matched = [];
      for (let i = 0; i < len; i++) {
        const item = this.dataset[i];
        const offsetCollector = {};
        if (this.evaluateNode(item, query, offsetCollector, highlight)) {
          const hasOffsets = Object.keys(offsetCollector).length > 0;
          matched.push(hasOffsets ? { ...item, _offsets: offsetCollector } : item);
        }
      }

      const totalItems = matched.length;
      const sorted = this.sort(matched, sort);

      let paginated = sorted;
      let totalPages = 1;
      if (hasLimit) {
        totalPages = Math.ceil(totalItems / limit) || 1;
        const start = (Math.max(1, page) - 1) * limit;
        paginated = sorted.slice(start, start + limit);
      }

      return {
        data: paginated,
        pagination: { totalItems, totalPages, currentPage: Math.max(1, page), limit: limit || totalItems }
      };
    }

    // Path B: Zero-Allocation Single-Pass Early Exit
    const paginated = [];
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

    const totalPages = hasLimit ? Math.ceil(totalCount / limit) || 1 : 1;

    return {
      data: paginated,
      pagination: { totalItems: totalCount, totalPages, currentPage: Math.max(1, page), limit: limit || totalCount }
    };
  }

  findOne(query = {}, options = {}) {
    const res = this.find(query, { ...options, limit: 1 });
    return res.data[0];
  }

  // =========================================================================
  // 9. RELAY-COMPLIANT CURSOR PAGINATION
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
  // 10. ASYNC CANCELABLE DEBOUNCE (UI Helper)
  // =========================================================================

  findDebounced(query = {}, options = {}, customDelay = null) {
    const delay = customDelay !== null ? customDelay : this.debounceDelay;

    if (this._debounceTimeout) clearTimeout(this._debounceTimeout);
    if (this._activeResolve) {
      this._activeResolve({ cancelled: true, data: [], pagination: null });
    }

    return new Promise((resolve) => {
      this._activeResolve = resolve;
      this._debounceTimeout = setTimeout(() => {
        try {
          const results = this.find(query, options);
          if (resolve === this._activeResolve) {
            resolve({ cancelled: false, ...results });
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
  // 11. DUAL STREAMING ENGINES
  // =========================================================================

  /**
   * Synchronous generator (O(1) Memory Pull)
   */
  *stream(query = {}) {
    const len = this.dataset.length;
    for (let i = 0; i < len; i++) {
      const item = this.dataset[i];
      if (this.evaluateNode(item, query)) {
        yield item;
      }
    }
  }

  /**
   * Adaptive async chunked stream (Frame-Budget Aware for 60fps Mobile & Desktop)
   */
  async streamAdaptiveAsync(query = {}, options = {}) {
    const { onChunk = () => {}, signal = null, highlight = false } = options;
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

  /**
   * Memory Cleanup for Component Unmounting
   */
  destroy() {
    this.pathCache.clear();
    this.regexCache.clear();
    this.compoundIndexes.clear();
    this.customOperators.clear();
    this.dataset = [];
    if (this._debounceTimeout) clearTimeout(this._debounceTimeout);
  }
}
