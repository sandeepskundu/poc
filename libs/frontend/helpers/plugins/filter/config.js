/**
 * @file configBlueprint.js
 * @description Master Configuration Blueprint for the UniversalCollectionQueryEngine,
 * detailing every available setting across engine setup, search executions, and tree queries.
 */

// =========================================================================
// 1. ENGINE INSTANTIATION CONFIGURATION (Constructor Options)
// =========================================================================
const engineConfig = {
    /**
     * Environment Runtime Profile.
     * Options:
     *   - 'auto': Automatically detects Node.js vs. Browser and Mobile vs. Desktop.
     *   - 'mobile': Activates strict LRU cache size limits and frame-rate caps.
     *   - 'desktop': Maximize raw execution throughput with unbound caches.
     *   - 'node': Configures Base64 cursor helpers to run via native Node Buffers.
     */
    platform: 'auto',

    /**
     * Default Keystroke Debounce Delay (in milliseconds).
     * Used as the default execution lag during asynchronous input searches
     * (e.g. `findDebounced` and `filterTreeDebounced`) to prevent thread lag.
     */
    debounceDelay: 250,

    /**
     * Hard Cap boundary for Bounded LRU Caches (Preserves memory footprint).
     * When platform is set to 'mobile' (or mobile is auto-detected), the engine
     * will cap the key maps for paths (`pathCache`) and compiled regexes (`regexCache`)
     * to this maximum size. Once exceeded, the oldest cached item is evicted.
     */
    maxCacheSize: 100,

    /**
     * Target Maximum Frame Time (in milliseconds).
     * Used during `streamAdaptiveAsync` tasks. The loop evaluates items progressively
     * and yields execution back to the browser UI thread if active execution exceeds
     * this frame budget (default is 8ms, which easily fits within standard 60fps).
     */
    targetFrameTime: 8,

    /**
     * Default property name used for recursive child tree traversal.
     * Set this globally to match your tree's structure (e.g., 'childs', 'children', or 'contents').
     */
    defaultChildKey: 'childs'
};


// =========================================================================
// 2. SEARCH & PAGINATION QUERY OPTIONS (`find` & `findCursor` Options)
// =========================================================================
const searchOptions = {
    /**
     * Offset-based Pagination: Current Page Index (Base 1).
     */
    page: 1,

    /**
     * Pagination Size Boundary: Maximum number of rows returned per page.
     * If omitted or null, returns the entire matched dataset.
     */
    limit: 25,

    /**
     * Syntax Highlighting Flag.
     * If true, forces the query engine to extract character highlight offsets
     * globally for all fields matching search queries, appending a compiled
     * `_offsets` key mapping to each returned record.
     */
    highlight: true,

    /**
     * Run-time Query Path Validation & Type-Safety Policy.
     * Options:
     *   - 'warn': Log fuzzy typo corrections and type mismatches to console.warn.
     *   - 'throw': Throw a JavaScript exception immediately to halt execution.
     *   - 'silent': Bypass all verification checks for maximum production speed.
     */
    validatePaths: 'warn',

    /**
     * Full-Text Relevance Scoring and Field Boosting configuration.
     * A key-value map defining the weights (multipliers) of target attributes.
     * If present, the engine automatically calculates a numerical `_score`
     * for each item and defaults sorting to `_score` descending.
     */
    boost: {
        'details.name': 10,  // High priority boost (10x multiplier)
        'details.role': 5,   // Medium priority boost (5x multiplier)
        'department': 2      // Lower priority boost (2x multiplier)
    },

    /**
     * Multi-Field Sorting & Tie-Breaking criteria.
     * Acceptable formats:
     *   - An array of sorting rules (with custom comparators for SemVer or Enums):
     *     `sort: [{ sortBy: 'price', sortOrder: 'desc' }, { sortBy: 'rating', sortOrder: 'desc' }]`
     *   - A key-value sort map:
     *     `sort: { 'metrics.salary': 'desc', 'id': 'asc' }`
     */
    sort: [
        {
            sortBy: 'metrics.salary',
            sortOrder: 'desc' // 'asc' (ascending) | 'desc' (descending)
        },
        {
            sortBy: 'version',
            sortOrder: 'desc',
            // Custom optional tie-breaking comparator function (e.g. Semantic Versioning)
            comparator: (a, b) => {
                const parse = (v) => String(v).replace(/^v/, '').split('.').map(Number);
                const [majA, minA, patchA] = parse(a);
                const [majB, minB, patchB] = parse(b);
                if (majA !== majB) return majA - majB;
                if (minA !== minB) return minA - minB;
                return (patchA || 0) - (patchB || 0);
            }
        }
    ],

    /**
     * Faceted Search & Range Bucketing configurations.
     * Generates dynamic category histograms and numeric range bucket distributions in a single pass.
     */
    facets: {
        // Array of discrete/category fields to calculate counts for
        facets: ['brand', 'attributes.gender', 'inStock'],

        // Numeric fields to divide into discrete range buckets
        ranges: {
            price: [0, 50, 100, 200, 500] // Buckets: 0-50, 50-100, 100-200, 200-500
        },

        // Fields that allow multi-selection without dropping sibling counts to 0
        disjunctiveFacets: ['brand']
    }
};


// =========================================================================
// 3. RECURSIVE HIERARCHICAL TREE SEARCH CONFIGURATION (`filterTree` Options)
// =========================================================================
const treeSearchOptions = {
    /**
     * Active child recursion flag.
     * If false (default), the tree filter only inspects top-level root items.
     * Set this to true to enable deep hierarchical search and pruning.
     */
    searchChildren: true,

    /**
     * The property name pointing to child nodes for this specific search.
     * Overrides the engine's constructor-level `defaultChildKey`.
     */
    childKey: 'subfolders',

    /**
     * Deep Character Offset Extraction.
     * If true, extracts highlighted character offsets from matching tree nodes,
     * appending them as a `_offsets` object on those nodes.
     */
    highlight: true,

    /**
     * Child Query Override Rule.
     * An optional, specific AST query applied exclusively to child elements.
     * If null, child nodes are evaluated against the main root query.
     */
    childQuery: {
        name: { operator: 'includes', value: 'index.js' }
    },

    /**
     * Advanced Tree Pruning Behaviors.
     */
    treeConfig: {
        /**
         * Keep Ancestor Nodes.
         * If a nested leaf node matches, keeps the entire chain of parents
         * leading up to the root folder visible in the returned tree.
         */
        keepAncestors: true,

        /**
         * Keep Descendant Nodes.
         * If a parent node matches directly, retains its entire nested
         * child subtree unconditionally without filtering them further.
         */
        keepDescendantsOnParentMatch: false,

        /**
         * Maximum Recursion Depth Limit.
         * Restricts deep traversal up to a maximum hierarchical level
         * to protect performance on extremely deep trees.
         */
        maxDepth: 10
    }
};



/**
 * Consolidated Engine Configuration & Execution Defaults
 */
const MasterQueryEngineDefaults = {
    // ==========================================
    // Engine Constructor Configurations
    // ==========================================
    platform: 'auto',              // Options: 'auto' | 'mobile' | 'desktop' | 'node'
    debounceDelay: 250,            // Time delay in milliseconds before executing debounced queries
    maxCacheSize: 100,             // LRU cached paths and regexes ceiling size before eviction
    targetFrameTime: 8,            // Maximum CPU execution slice in ms per frame for async streaming
    defaultChildKey: 'childs',     // Default object key targeting recursive tree child collections

    // ==========================================
    // Core Search & Filtering Options (find / findCursor)
    // ==========================================
    page: 1,                       // Offset-pagination: current active page index (base 1)
    limit: null,                   // Max records returned per page. Default null (returns all matched rows)
    highlight: false,              // If true, extracts matching character interval offsets: [{ start, end }]
    validatePaths: 'warn',         // Policy: 'warn' (console) | 'throw' (exceptions) | 'silent' (disabled)
    boost: null,                   // Field weight map for relevance scoring. Default null (no scoring)
    sort: null,                    // Sorting definitions. Default null (retains natural array sequence)
    facets: null,                  // Sidebar counts configuration. Default null (no faceting executed)

    // ==========================================
    // Hierarchical Tree Search Options (filterTree)
    // ==========================================
    searchChildren: false,         // If false, children are ignored and only top-level roots are evaluated
    childKey: 'childs',            // Target child key name. Defaults to constructor 'defaultChildKey'
    childQuery: null,              // Specific query override applied only to child elements. Default null
    highlightTree: false,          // Extract match offsets on matching nodes in tree search. Default false
    customTree: null,              // Optional local override dataset array passed to filterTree. Default null

    // Advanced Tree Behavior Profiles
    treeConfig: {
        keepAncestors: true,                  // If child matches, preserve and render the parent path to root
        keepDescendantsOnParentMatch: false,  // If parent matches, retain all its children unconditionally
        maxDepth: Infinity                    // Recursion limit cutoff to prevent call-stack overflows
    }
};


/**
 * Master Query Configuration and AST Operator Defaults
 */
const MasterQueryConfigDefaults = {
    // =========================================================================
    // 1. SIMPLE FIELD EQUALITY (Root level implicit $and)
    // =========================================================================
    "anyFieldPath": null,              // Default: null (matches everything if field is missing or null)

    // =========================================================================
    // 2. EXPLICIT OPERATOR RULE SCHEMA
    // =========================================================================
    "targetedFieldPath": {
        /**
         * Comparison Operator.
         * Tells the engine how to compare the record value with the query `value`.
         * Default: 'includes' for string fields, 'exact' for other types.
         * Options: 'exact', 'equals', 'eq', 'notequals', 'ne', 'includes', 'contains',
         *          'startswith', 'endswith', 'regex', 'in', 'nin', 'gt', 'gte', 'lt', 'lte'
         */
        operator: 'includes',

        /**
         * Target Evaluation Value.
         * The value compared against the record's property.
         * Can be a string, number, boolean, date, regex pattern, or array (for 'in'/'between').
         * Default: null
         */
        value: null,

        /**
         * Character Offset Highlighting Toggle.
         * If true, extracts precise character match intervals for this specific field.
         * Default: false
         */
        highlight: false,

        /**
         * Case Sensitivity Toggle.
         * Dictates whether string comparisons respect upper/lowercase characters.
         * Default: false (Case-insensitive)
         */
        caseSensitive: false
    },

    // =========================================================================
    // 3. GLOBAL & MULTI-KEY SEARCH SCHEMA
    // =========================================================================
    "globalSearch": {
        /**
         * Target Keys Dot-Paths.
         * An array of nested path locations to evaluate.
         * Default: [] (no fields evaluated)
         * Example => keys:['title', 'brand', 'attributes.color']
         */
        keys: [],



        /**
         * Match Value.
         * The query token to search for across the configured keys.
         * Default: null
         * Example => value: 'Air Zoom', 
         */
        value: null,

        /**
         * Multi-Key Evaluation Logic.
         * Dictates how multi-key matches are combined:
         *   - 'OR': Matches if ANY of the keys contain the target value (Default).
         *   - 'AND': Matches only if ALL of the keys contain the target value.
         */
        keyMatch: 'OR',

        /**
         * Comparison Operator.
         * Default: 'includes'
         */
        operator: 'includes',

        /**
         * Character Offset Highlighting Toggle.
         * Default: false
         */
        highlight: false,

        /**
         * Case Sensitivity Toggle.
         * Default: false (Case-insensitive)
         */
        caseSensitive: false
    },

    // =========================================================================
    // 4. EXPLICIT LOGICAL OPERATORS (AST Branches)
    // =========================================================================

    /**
     * Logical OR Branch.
     * Matches if any of the child query blocks inside the array evaluate to true.
     * Default: Empty array [] (evaluates to true)
     */
    $or: [],

    /**
     * Logical AND Branch.
     * Matches only if all child query blocks inside the array evaluate to true.
     * Default: Empty array [] (evaluates to true)
     */
    $and: [],

    /**
     * Logical NOT Branch.
     * Inverts the result of the query block. Items matching this block are excluded.
     * Default: null
     */
    $not: null,

    /**
     * Logical NOR Branch.
     * Excludes items that match any of the query blocks inside the array.
     * Default: Empty array []
     */
    $nor: []
};



const query = {
  technicalSearch: {
    // Deeply nested dot-paths
    keys: [
      'specifications.dimensions.weight', 
      'specifications.dimensions.depth'
    ],
    
    value: 'Ultra-Slim',
    
    // Strict Match: BOTH fields must contain the value
    keyMatch: 'AND', 
    
    operator: 'includes',
    highlight: false,
    caseSensitive: false
  }
};


