/**
 * @file example.js
 * @description Universal test suite runnable directly on Node.js or browser consoles.
 * 
 * RUN COMMAND:
 * node example.js
 */

import { UniversalCollectionQueryEngine } from './query.js';

// =========================================================================
// 1. DATA SEEDING (PROGRESSIVE CHUNK SIMULATION)
// =========================================================================

const initialEmployees = [
  {
    id: 101,
    status: 'active',
    department: 'IT Infrastructure',
    type: 'permanent',
    priority: 'Critical',
    version: 'v1.10.0',
    location: 'Mumbai Central',
    skills: ['React Native', 'TypeScript', 'Node.js Streams'],
    projects: [
      { name: 'Schema Builder UI', client: 'Internal Labs', status: 'Active' },
      { name: 'Real-time Chat Assistant', client: 'AI Lab', status: 'Planning' }
    ],
    metrics: { rating: 4.8, experience: 8, salary: 125000 },
    details: { name: 'Sandeep Kumar', role: 'Staff UI Lead' }
  }
];

// Initialize engine with initial batch
const engine = new UniversalCollectionQueryEngine(initialEmployees, { 
  platform: 'auto',
  debounceDelay: 150 
});

// Register Custom Operator Plugin: 'between' range check
engine.registerOperator('between', (val, range) => {
  return typeof val === 'number' && Array.isArray(range) && val >= range[0] && val <= range;
});

// Build compound index upfront
engine.createCompoundIndex(['department', 'location']);

console.log("=================================================================");
console.log(`🚀 RUNNING REFRESHED SUITE ON DETECTED PLATFORM: [${engine.platform.toUpperCase()}]`);
console.log("=================================================================\n");

// =========================================================================
// TEST 1: Progressive Chunk Ingestion
// =========================================================================
console.log("--- 1. Progressive Async Chunk Ingestion ---");

async function* streamApiChunks() {
  yield [
    {
      id: 102,
      status: 'active',
      department: 'IT Security',
      type: 'contractor',
      priority: 'High',
      version: 'v1.2.0',
      location: 'Mumbai South',
      skills: ['Docker Engine', 'Kubernetes Cluster', 'Go Lang'],
      projects: [{ name: 'Security Vault', client: 'Enterprise', status: 'Active' }],
      metrics: { rating: 4.9, experience: 12, salary: 140000 },
      details: { name: 'Rohan Verma', role: 'Cloud DevOps Architect' }
    }
  ];
  yield [
    {
      id: 103,
      status: 'active',
      department: 'Design Studio',
      type: 'permanent',
      priority: 'Low',
      version: 'v2.0.1',
      location: 'Ahmedabad Hub',
      skills: ['Figma Prototyping', 'UX Research', 'CSS Design Systems'],
      projects: [{ name: 'Component Library', client: 'Design Org', status: 'Completed' }],
      metrics: { rating: 4.7, experience: 7, salary: 95000 },
      details: { name: 'Ananya Sen', role: 'Senior UX Lead' }
    }
  ];
}

await engine.addChunksAsync(streamApiChunks(), {
  onProgress: ({ ingested, total }) => {
    console.log(`📥 Progress: Ingested ${ingested} items. Total in dataset: ${total}`);
  }
});
console.log(`Total Dataset Records after chunk ingestion: ${engine.dataset.length}\n`);

// =========================================================================
// TEST 2: Recursive AST + Custom Plugin + Deep Multi-Word Offset Extraction
// =========================================================================
console.log("--- 2. Recursive AST & Deep Offset Extraction ---");
const res2 = engine.find({
  $and: [
    { status: 'active' },
    { 'metrics.experience': { operator: 'between', value: [5, 10] } }
  ],
  skills: { operator: 'includes', value: 'React Streams', highlight: true }
});

console.log("Matched Record:", res2.data[0].details.name);
console.log("Deep Offsets on Skills Array:", JSON.stringify(res2.data[0]._offsets.skills, null, 2));
console.log("\n");

// =========================================================================
// TEST 3: Multi-Field Sorting (Priority Enum + Semantic Versioning)
// =========================================================================
console.log("--- 3. Multi-Field Sorting (Custom Priority & SemVer Comparators) ---");
const priorityRanks = { Critical: 4, High: 3, Medium: 2, Low: 1 };
const comparePriority = (a, b) => (priorityRanks[a] || 0) - (priorityRanks[b] || 0);

const compareSemver = (a, b) => {
  const pA = String(a).replace(/^v/, '').split('.').map(Number);
  const pB = String(b).replace(/^v/, '').split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (pA[i] !== pB[i]) return pA[i] - pB[i];
  }
  return 0;
};

const res3 = engine.find({}, {
  sort: [
    { sortBy: 'priority', sortOrder: 'desc', comparator: comparePriority },
    { sortBy: 'version', sortOrder: 'desc', comparator: compareSemver }
  ]
});

console.table(res3.data.map(e => ({ Name: e.details.name, Priority: e.priority, Version: e.version })));
console.log("\n");

// =========================================================================
// TEST 4: Relay-Compliant Cursor Pagination
// =========================================================================
console.log("--- 4. Relay Cursor Pagination (Cross-Platform Base64) ---");
const page1 = engine.findCursor(
  { status: 'active' },
  { limit: 2, sort: [{ sortBy: 'metrics.salary', sortOrder: 'desc' }] }
);

console.log("Page 1 Nodes:", page1.edges.map(e => `${e.node.details.name} ($${e.node.metrics.salary})`));
console.log("End Cursor:", page1.pageInfo.endCursor);

const page2 = engine.findCursor(
  { status: 'active' },
  { limit: 2, after: page1.pageInfo.endCursor, sort: [{ sortBy: 'metrics.salary', sortOrder: 'desc' }] }
);

console.log("Page 2 Resumed Nodes:", page2.edges.map(e => `${e.node.details.name} ($${e.node.metrics.salary})`));
console.log("Page 2 hasNextPage:", page2.pageInfo.hasNextPage);
console.log("\n");

// =========================================================================
// TEST 5: O(1) Compound Map Indexing with Live Mutation
// =========================================================================
console.log("--- 5. O(1) Compound Map Indexing & Live Mutation ---");
const indexed = engine.findWithIndex(['department', 'location'], {
  department: 'IT Infrastructure',
  location: 'Mumbai Central'
});
console.log("O(1) Indexed Lookup:", indexed.map(e => e.details.name));

engine.updateItem(engine.dataset[0], { location: 'Ahmedabad Hub' });
const updatedLookups = engine.findWithIndex(['department', 'location'], ['IT Infrastructure', 'Ahmedabad Hub']);
console.log("After O(1) Mutation (Now in Ahmedabad):", updatedLookups.map(e => e.details.name));
console.log("\n");

// =========================================================================
// TEST 6: Adaptive Frame-Budget Non-Blocking Streaming
// =========================================================================
console.log("--- 6. Adaptive Non-Blocking Async Streaming ---");
const streamResult = await engine.streamAdaptiveAsync(
  { status: 'active' },
  {
    onChunk: (chunk, progress) => {
      console.log(`📦 Streamed Chunk (${progress}% progress):`, chunk.map(e => e.details.name));
    }
  }
);
console.log("Stream Complete! Total items streamed:", streamResult.totalStreamed);
console.log("\n");

// =========================================================================
// TEST 7: Cancelable Keystroke Debounce
// =========================================================================
console.log("--- 7. Async Cancelable Debounce (Simulating Keystrokes) ---");
const testDebounce = async () => {
  const trigger = async (term) => {
    const res = await engine.findDebounced(
      { 'details.name': { operator: 'includes', value: term } },
      { limit: 5 }
    );
    if (res.cancelled) {
      console.log(`❌ Keystroke "${term}" canceled by newer keypress.`);
    } else {
      console.log(`✅ Keystroke "${term}" resolved:`, res.data.map(e => e.details.name));
    }
  };

  trigger("S");
  setTimeout(() => trigger("Sa"), 30);
  setTimeout(() => trigger("San"), 70);
};

await testDebounce();
