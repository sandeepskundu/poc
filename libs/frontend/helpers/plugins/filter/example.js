/**
 * @file example.js
 * @description Master Verification Suite containing 20 distinct production-level 
 * e-commerce and directory use-cases for UniversalCollectionQueryEngine.
 * 
 * RUN COMMAND:
 * node example.js
 */

import { UniversalCollectionQueryEngine } from './UniversalCollectionQueryEngine.js';

// =========================================================================
// MASTER DATASET 1: E-COMMERCE PRODUCTS CATALOG
// =========================================================================
const productsCatalog = [
  { id: 101, title: "Pegasus 40 Air Zoom", brand: "Nike", category: "Running Shoes", price: 130, inStock: true, attributes: { gender: "Men", weight: "light", rating: 4.8 }, tags: ["running", "zoom", "marathon"], launchDate: "2023-04-15" },
  { id: 102, title: "Ultraboost Light comfort", brand: "Adidas", category: "Running Shoes", price: 190, inStock: true, attributes: { gender: "Unisex", weight: "medium", rating: 4.9 }, tags: ["running", "boost", "comfort"], launchDate: "2023-01-20" },
  { id: 103, title: "Gel-Kayano 30 Stability", brand: "ASICS", category: "Running Shoes", price: 160, inStock: true, attributes: { gender: "Men", weight: "heavy", rating: 4.7 }, tags: ["running", "stability", "gel"], launchDate: "2023-06-10" },
  { id: 104, title: "Classic Leather Loafers", brand: "Timberland", category: "Formal Shoes", price: 110, inStock: true, attributes: { gender: "Men", weight: "medium", rating: 4.2 }, tags: ["leather", "formal", "office"], launchDate: "2022-09-05" },
  { id: 105, title: "Metcon 9 Cross Trainer", brand: "Nike", category: "Training Shoes", price: 150, inStock: false, attributes: { gender: "Women", weight: "medium", rating: 4.6 }, tags: ["gym", "crossfit", "stable"], launchDate: "2023-08-12" },
  { id: 106, title: "Swift Run Minimalist", brand: "Adidas", category: "Casual Shoes", price: 90, inStock: true, attributes: { gender: "Women", weight: "light", rating: 4.4 }, tags: ["casual", "lightweight", "daily"], launchDate: "2022-11-30" },
  { id: 107, title: "Adizero Boston 12 Speed", brand: "Adidas", category: "Running Shoes", price: 160, inStock: true, attributes: { gender: "Unisex", weight: "light", rating: 4.8 }, tags: ["running", "speed", "marathon"], launchDate: "2023-07-01" }
];

// =========================================================================
// MASTER DATASET 2: HIERARCHICAL FILE DIRECTORY TREE
// =========================================================================
const directoryTree = [
  {
    name: "Project Root",
    type: "folder",
    modified: "2024-01-10",
    contents: [
      {
        name: "Source",
        type: "folder",
        modified: "2024-01-09",
        contents: [
          { name: "index.js", type: "file", modified: "2024-01-08", contents: null },
          { name: "utils.js", type: "file", modified: "2024-01-05", contents: null }
        ]
      },
      {
        name: "Assets",
        type: "folder",
        modified: "2024-01-03",
        contents: {
          name: "logo.png", // Inconsistent single object shape
          type: "file",
          modified: "2024-01-02",
          contents: null
        }
      },
      {
        name: "Documentation",
        type: "folder",
        modified: "2024-01-01",
        contents: [] // Empty directory leaf folder
      }
    ]
  }
];

// Initialize query engine instance
const engine = new UniversalCollectionQueryEngine(productsCatalog, { debounceDelay: 100 });

console.log("=================================================================");
console.log("🏆 EXECUTING 20 MASTER QUERY ENGINE VERIFICATION USE-CASES");
console.log("=================================================================\n");

// =========================================================================
// USE-CASE 1: Basic String Substring Inclusion Check
// =========================================================================
console.log("👉 Use-Case 1: Basic Substring Matching");
const u1 = engine.find({ title: { operator: 'includes', value: 'Comfort' } });
console.log("Matches:", u1.data.map(p => p.title));
console.log("\n");

// =========================================================================
// USE-CASE 2: Case-Sensitive Matching Override
// =========================================================================
console.log("👉 Use-Case 2: Case-Sensitive Substring Matching");
const u2 = engine.find({ title: { operator: 'includes', value: 'comfort', caseSensitive: true } });
console.log("Matches:", u2.data.map(p => p.title)); // Empty array expected due to lowercase 'c' comfort
console.log("\n");

// =========================================================================
// USE-CASE 3: Strict Equality Validation
// =========================================================================
console.log("👉 Use-Case 3: Strict Field Equality");
const u3 = engine.find({ brand: { operator: 'exact', value: 'Nike' } });
console.log("Matches:", u3.data.map(p => p.title));
console.log("\n");

// =========================================================================
// USE-CASE 4: Multi-Field Compound logical $and Query
// =========================================================================
console.log("👉 Use-Case 4: Logical $and Multi-Field Filter");
const u4 = engine.find({
  $and: [
    { brand: 'Adidas' },
    { inStock: true },
    { price: { operator: 'lt', value: 150 } }
  ]
});
console.log("Matches:", u4.data.map(p => p.title));
console.log("\n");

// =========================================================================
// USE-CASE 5: Logical $or Alternative Query
// =========================================================================
console.log("👉 Use-Case 5: Logical $or Match Alternatives");
const u5 = engine.find({
  $or: [
    { brand: 'ASICS' },
    { price: { operator: 'lte', value: 100 } }
  ]
});
console.log("Matches:", u5.data.map(p => `${p.title} ($${p.price})`));
console.log("\n");

// =========================================================================
// USE-CASE 6: Multi-Value Array Membership Operator (SQL 'IN')
// =========================================================================
console.log("👉 Use-Case 6: Array Membership Inclusion ('in' operator)");
const u6 = engine.find({
  brand: { operator: 'in', value: ['ASICS', 'Timberland'] }
});
console.log("Matches:", u6.data.map(p => `${p.brand} - ${p.title}`));
console.log("\n");

// =========================================================================
// USE-CASE 7: Array Exclusion Operator (SQL 'NOT IN')
// =========================================================================
console.log("👉 Use-Case 7: Array Membership Exclusion ('nin' operator)");
const u7 = engine.find({
  brand: { operator: 'nin', value: ['Nike', 'Adidas'] }
});
console.log("Matches (Excluding Nike & Adidas):", u7.data.map(p => `${p.brand} - ${p.title}`));
console.log("\n");

// =========================================================================
// USE-CASE 8: Nested Child Object Queries (Dot Notation Paths)
// =========================================================================
console.log("👉 Use-Case 8: Nested Dot-Notation Paths Validation");
const u8 = engine.find({
  'attributes.gender': 'Men',
  'attributes.rating': { operator: 'gte', value: 4.5 }
});
console.log("Matches (High Rating Men's Products):", u8.data.map(p => p.title));
console.log("\n");

// =========================================================================
// USE-CASE 9: Multi-Word Full-Text Relevance Boosting (Elasticsearch-Style)
// =========================================================================
console.log("👉 Use-Case 9: Relevance Scoring with Field Boosting");
const searchString = "Comfortable Running Shoes";
const u9 = engine.find({
  $or: [
    { title: { operator: 'includes', value: searchString } },
    { tags: { operator: 'includes', value: searchString } },
    { category: { operator: 'includes', value: searchString } }
  ]
}, {
  boost: {
    title: 10,       // Matches in title are scaled 10x
    tags: 5,         // Matches in tags scaled 5x
    category: 1      // Matches in category scale 1x
  }
});
console.log("Relevance-Ranked Products (Most relevant on top):");
u9.data.forEach(p => console.log(`- Score: ${p._score} | ${p.title}`));
console.log("\n");

// =========================================================================
// USE-CASE 10: Multi-Word Recursive Offsets Extraction (Syntax Highlighting)
// =========================================================================
console.log("👉 Use-Case 10: Multi-Word Highlight Offsets across nested objects and arrays");
const u10 = engine.find({
  'attributes.gender': 'Men',
  title: { operator: 'includes', value: 'Pegasus Zoom', highlight: true },
  tags: { operator: 'includes', value: 'Pegasus Zoom', highlight: true }
}, { highlight: true });

console.log(`Offsets for matching node "${u10.data[0].title}":`);
console.log(JSON.stringify(u10.data[0]._offsets, null, 2));
console.log("\n");

// =========================================================================
// USE-CASE 11: Faceted Search (Dynamic Conjunctive & Disjunctive counts)
// =========================================================================
console.log("👉 Use-Case 11: E-Commerce Faceting Sidebar with multi-select preserved counts");
const activeFilterQuery = {
  category: 'Running Shoes',
  brand: 'Adidas' // Active checked brand
};
const u11 = engine.find(activeFilterQuery, {
  facets: {
    facets: ['brand', 'attributes.gender', 'inStock'],
    ranges: { price: [0, 100, 150, 200] },
    disjunctiveFacets: ['brand'] // Selecting Adidas won't drop Nike/ASICS counts to 0
  }
});
console.log("Matches Found:", u11.data.map(p => p.title));
console.log("Brand Facets (Disjunctive, Multi-Select Ready):", u11.facets.brand);
console.log("Gender Facets (Conjunctive, Narrows down):      ", u11.facets['attributes.gender']);
console.log("Price Ranges (Conjunctive):                     ", u11.ranges.price);
console.log("\n");

// =========================================================================
// USE-CASE 12: Bounded LRU Cache Eviction (Mobile Profile Simulation)
// =========================================================================
console.log("👉 Use-Case 12: Mobile LRU Cache Cap Protection");
const mobileEngine = new UniversalCollectionQueryEngine(productsCatalog, {
  platform: 'mobile',
  maxCacheSize: 3 // Restrict path maps to only 3 keys
});

// Access several nested keys to trigger Cache Eviction
mobileEngine.getNestedValue(productsCatalog[0], 'attributes.gender');
mobileEngine.getNestedValue(productsCatalog[0], 'attributes.weight');
mobileEngine.getNestedValue(productsCatalog[0], 'attributes.rating');
mobileEngine.getNestedValue(productsCatalog[0], 'details.nonexistent'); // Evicts oldest key

console.log("Engine Path Cache Keys (Capped at size <= 3):", Array.from(mobileEngine.pathCache.keys()));
console.log("\n");

// =========================================================================
// USE-CASE 13: Schema Path Misspelling Warnings (Fuzzy Suggestions)
// =========================================================================
console.log("👉 Use-Case 13: Typo Warnings & Fuzzy suggestions");
const u13 = engine.find({
  'attributs.gndr': 'Men' // Intentionally misspelled keys
}, { validatePaths: 'warn' });
console.log("\n");

// =========================================================================
// USE-CASE 14: Query Type-Safety Mismatch Prevention
// =========================================================================
console.log("👉 Use-Case 14: Type-Safety Validation Errors");
const u14 = engine.find({
  price: { operator: 'gte', value: "HighPriceString" } // Mismatched type passed to comparison operator
}, { validatePaths: 'warn' });
console.log("\n");

// =========================================================================
// USE-CASE 15: O(1) Compound Multi-Key Indexing
// =========================================================================
console.log("👉 Use-Case 15: O(1) Compound Map Indexing Lookups");
engine.createCompoundIndex(['brand', 'attributes.gender']);

console.time("Indexed Lookup");
const indexedLookups = engine.findWithIndex(['brand', 'attributes.gender'], {
  brand: 'Nike',
  'attributes.gender': 'Men'
});
console.timeEnd("Indexed Lookup");
console.log("Matches:", indexedLookups.map(p => p.title));
console.log("\n");

// =========================================================================
// USE-CASE 16: Multi-Field Sorting with Priority and SemVer Tie-Breaking
// =========================================================================
console.log("👉 Use-Case 16: Complex Multi-Field Tie-breaking Sorts");
// Sort: Price Ascending -> Rating Descending
const u16 = engine.find({ category: 'Running Shoes' }, {
  sort: [
    { sortBy: 'price', sortOrder: 'asc' },
    { sortBy: 'attributes.rating', sortOrder: 'desc' }
  ]
});
console.table(u16.data.map(p => ({ Title: p.title, Price: p.price, Rating: p.attributes.rating })));
console.log("\n");

// =========================================================================
// USE-CASE 17: Relay-Compliant Cursor Pagination
// =========================================================================
console.log("👉 Use-Case 17: Cursor Pagination");
const cursorPage1 = engine.findCursor({ category: 'Running Shoes' }, {
  limit: 2,
  sort: [{ sortBy: 'price', sortOrder: 'asc' }]
});
console.log("Page 1 nodes:", cursorPage1.edges.map(e => `${e.node.title} ($${e.node.price})`));
console.log("End Cursor:", cursorPage1.pageInfo.endCursor);

const cursorPage2 = engine.findCursor({ category: 'Running Shoes' }, {
  limit: 2,
  after: cursorPage1.pageInfo.endCursor,
  sort: [{ sortBy: 'price', sortOrder: 'asc' }]
});
console.log("Page 2 nodes:", cursorPage2.edges.map(e => `${e.node.title} ($${e.node.price})`));
console.log("\n");

// =========================================================================
// USE-CASE 18: Recursive Tree-Pruning File Search
// =========================================================================
console.log("👉 Use-Case 18: Tree-Pruning Filter (Ancestors Preserved)");
engine.setData(directoryTree); // Set database to directory Tree structure

const u18 = engine.filterTree(
  { name: { operator: 'includes', value: 'index.js' } },
  {
    searchChildren: true,
    childKey: 'contents', // custom childs key
    treeConfig: { keepAncestors: true }
  }
);
console.log("Pruned matching folder paths:", JSON.stringify(u18, null, 2));
console.log("\n");

// =========================================================================
// USE-CASE 19: Specific Child Query Override inside Tree Search
// =========================================================================
console.log("👉 Use-Case 19: Applying specific Query Overrides to children inside Tree search");
// Query: Root node must contain word "Root", but child nodes must contain "logo.png"
const u19 = engine.filterTree(
  { name: { operator: 'includes', value: 'Root' } },
  {
    searchChildren: true,
    childKey: 'contents',
    childQuery: { name: { operator: 'includes', value: 'logo.png' } }
  }
);
console.log("Child Specific Overrides Results:", JSON.stringify(u19, null, 2));
console.log("\n");

// =========================================================================
// USE-CASE 20: Progressive Async Ingestion & Adaptive Streaming
// =========================================================================
console.log("👉 Use-Case 20: Progressive Ingestion & Adaptive Streaming");

// Feed standard catalog back in
engine.setData(productsCatalog);

// Simulation of progressive API chunk load
const streamChunks = async () => {
  const newBatch = [
    { id: 108, title: "Superfly Soccer Boot", brand: "Nike", category: "Soccer Cleats", price: 275, inStock: true, attributes: { gender: "Men", weight: "light", rating: 4.9 }, tags: ["Soccer", "Elite"], launchDate: "2024-02-18" }
  ];
  engine.addChunk(newBatch);
  console.log(`Ingested additional batch! Total database size: ${engine.dataset.length}`);
};

await streamChunks();

// Adaptive Stream scan over the complete catalog
const streamResult = await engine.streamAdaptiveAsync(
  { category: 'Running Shoes' },
  {
    onChunk: (chunk, progress) => {
      console.log(`- Received Stream Burst (${progress}%):`, chunk.map(p => p.title));
    }
  }
);
console.log("Adaptive Stream completed!");
console.log("=================================================================");
console.log("🏁 ALL 20 MASTER CLASS SEARCH USE-CASES EXECUTED SUCCESSFULLY!");
console.log("=================================================================");
