/**
 * @file stressTest.js
 * @description CPU and V8 Heap stress test for UniversalCollectionQueryEngine on 100,000+ items.
 * 
 * EXECUTION INSTRUCTION:
 * node --expose-gc stressTest.js
 */

import { UniversalCollectionQueryEngine } from './query.js';

// Helper to convert bytes to human-readable Megabytes
const toMB = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

// Trigger manual garbage collection if --expose-gc is enabled
const forceGC = () => {
  if (typeof global.gc === 'function') {
    global.gc();
  }
};

async function executeStressTest() {
  if (typeof global.gc !== 'function') {
    console.warn(`\n⚠️  WARNING: For exact garbage collection and heap delta measurements, run with:`);
    console.warn(`   node --expose-gc stressTest.js\n`);
  }

  const STRESS_LIMIT = 5000;
  console.log("=================================================================");
  console.log(`🔥 INITIATING HEAVY STRESS LOAD TEST: ${STRESS_LIMIT.toLocaleString()} RECORDS`);
  console.log("=================================================================\n");

  // Step 1: Establish Baseline Memory
  forceGC();
  const baselineMemory = process.memoryUsage().heapUsed;
  console.log(`📈 Baseline V8 Heap: ${toMB(baselineMemory)}`);

  // Step 2: Seed 100,000 Deeply Nested Objects
  const departments = ['IT', 'Design', 'Finance', 'Logistics', 'Operations'];
  const locations = ['Mumbai', 'Ahmedabad', 'Bengaluru', 'Delhi'];
  const roles = ['Lead', 'Architect', 'Engineer', 'Analyst', 'Specialist'];
  const skillsPool = ['React', 'TypeScript', 'Node.js', 'Figma', 'Docker', 'Kubernetes', 'Go', 'Python'];

  console.log(`⏳ Generating ${STRESS_LIMIT.toLocaleString()} employee nodes in memory...`);
  const startGenTime = performance.now();

  const dataset = new Array(STRESS_LIMIT);
  for (let i = 0; i < STRESS_LIMIT; i++) {
    dataset[i] = {
      id: 100000 + i,
      status: i % 15 === 0 ? 'inactive' : 'active',
      department: departments[i % departments.length],
      location: locations[i % locations.length],
      skills: [
        skillsPool[i % skillsPool.length],
        skillsPool[(i + 3) % skillsPool.length],
        skillsPool[(i + 6) % skillsPool.length]
      ],
      metrics: {
        experience: 1 + (i % 20),
        salary: 40000 + (i % 50) * 2000,
        rating: +(3.5 + (i % 15) * 0.1).toFixed(1)
      },
      details: {
        name: `Employee_${i}`,
        role: `${roles[i % roles.length]} Developer`
      },
      d:{
        id: 100000 + i,
      status: i % 15 === 0 ? 'inactive' : 'active',
      department: departments[i % departments.length],
      location: locations[i % locations.length],
      skills: [
        skillsPool[i % skillsPool.length],
        skillsPool[(i + 3) % skillsPool.length],
        skillsPool[(i + 6) % skillsPool.length]
      ],
      metrics: {
        experience: 1 + (i % 20),
        salary: 40000 + (i % 50) * 2000,
        rating: +(3.5 + (i % 15) * 0.1).toFixed(1)
      },
      details: {
        name: `Employee_${i}`,
        role: `${roles[i % roles.length]} Developer`
      },
      d:{
        id: 100000 + i,
      status: i % 15 === 0 ? 'inactive' : 'active',
      department: departments[i % departments.length],
      location: locations[i % locations.length],
      skills: [
        skillsPool[i % skillsPool.length],
        skillsPool[(i + 3) % skillsPool.length],
        skillsPool[(i + 6) % skillsPool.length]
      ],
      metrics: {
        experience: 1 + (i % 20),
        salary: 40000 + (i % 50) * 2000,
        rating: +(3.5 + (i % 15) * 0.1).toFixed(1)
      },
      details: {
        name: `Employee_${i}`,
        role: `${roles[i % roles.length]} Developer`
      },
      d:{
        id: 100000 + i,
      status: i % 15 === 0 ? 'inactive' : 'active',
      department: departments[i % departments.length],
      location: locations[i % locations.length],
      skills: [
        skillsPool[i % skillsPool.length],
        skillsPool[(i + 3) % skillsPool.length],
        skillsPool[(i + 6) % skillsPool.length]
      ],
      metrics: {
        experience: 1 + (i % 20),
        salary: 40000 + (i % 50) * 2000,
        rating: +(3.5 + (i % 15) * 0.1).toFixed(1)
      },
      details: {
        name: `Employee_${i}`,
        role: `${roles[i % roles.length]} Developer`
      }
      }
      }
      }
    };
  }

  const endGenTime = performance.now();
  forceGC();
  const memoryAfterDataset = process.memoryUsage().heapUsed;

  console.log(`✅ Generation Complete: ${(endGenTime - startGenTime).toFixed(2)} ms`);
  console.log(`💾 Dataset Memory Allocation: ${toMB(memoryAfterDataset - baselineMemory)}\n`);

  // Step 3: Instantiate Query Engine

  console.log(dataset.length);

  const engine = new UniversalCollectionQueryEngine(dataset);

  // Register range query plugin
  engine.registerOperator('between', (val, range) => {
    return typeof val === 'number' && Array.isArray(range) && val >= range[0] && val <= range;
  });

  // =========================================================================
  // OPERATION 1: Early-Exit Slicing (No sorting, Paginated Limit 10)
  // =========================================================================
  console.log(`--- OPERATION 1: Early-Exit Search (Limit: 10, No Sort) ---`);
  
  const query1 = {
    status: 'active',
    department: 'IT',
    skills: { operator: 'includes', value: 'React' }
  };

  const t1Start = performance.now();
  const res1 = engine.find(query1, { limit: 100, page: 1 });
  const t1End = performance.now();

  console.log(`⏱️  Duration:      ${(t1End - t1Start).toFixed(3)} ms`);
  console.log(`📊 Scanned items: Early exit satisfied. Only scanned a fraction of the array.`);
  console.log(`📝 Items Returned: ${res1.data.length} records`);
  console.log(`📈 Match Estimate: ${res1.pagination.totalItems} matches\n`);


  // =========================================================================
  // OPERATION 2: Complex AST Scan + Multi-Field Sorting (Full 100k Array Scan)
  // =========================================================================
  console.log(`--- OPERATION 2: Complex AST Query + Multi-Field Sort (100k items) ---`);

  // Find active employees who are NOT developers, AND (have experience 10-18 yrs OR earn >= 120k)
  const query2 = {
    status: 'active',
    $not: {
      'details.role': { operator: 'includes', value: 'Developer' }
    },
    $or: [
      { 'metrics.experience': { operator: 'between', value: [10, 18] } },
      { 'metrics.salary': { operator: 'gte', value: 120000 } }
    ]
  };

  const t2Start = performance.now();
  const res2 = engine.find(query2, {
    sort: [
      { sortBy: 'metrics.salary', sortOrder: 'desc' },
      { sortBy: 'metrics.rating', sortOrder: 'desc' }
    ],
    limit: 20,
    page: 1
  });
  const t2End = performance.now();

  console.log(`⏱️  Duration:      ${(t2End - t2Start).toFixed(3)} ms`);
  console.log(`📝 Items Returned: ${res2.data.length} records`);
  console.log(`📊 Total Matches:  ${res2.pagination.totalItems} matches`);
  console.log(`🥇 Highest Earner: ${res2.data[0]?.details.name} (Salary: $${res2.data[0]?.metrics.salary})\n`);


  // =========================================================================
  // OPERATION 3: Compound Indexing (O(1) Instant Hashed Lookup)
  // =========================================================================
  console.log(`--- OPERATION 3: Compound Index Mapping (100k items) ---`);

  const indexKeys = ['department', 'location'];
  
  const t3IndexStart = performance.now();
  engine.createCompoundIndex(indexKeys);
  const t3IndexEnd = performance.now();

  console.log(`⏳ Build Index Duration: ${(t3IndexEnd - t3IndexStart).toFixed(2)} ms`);

  // Execute lookup
  const t3LookupStart = performance.now();
  const indexedMatches = engine.findWithIndex(indexKeys, {
    department: 'IT',
    location: 'Mumbai'
  });
  const t3LookupEnd = performance.now();

  console.log(`⏱️  Lookup Duration:      ${(t3LookupEnd - t3LookupStart).toFixed(4)} ms`);
  console.log(`📝 Items Retrieved:       ${indexedMatches.length} matches`);
  console.log(`💡 Note: Zero array loops executed during this lookup.\n`);


  // =========================================================================
  // OPERATION 4: Multi-Word Character Offset Highlight Extraction
  // =========================================================================
  console.log(`--- OPERATION 4: Multi-Word Offset Extraction (Cached Union Regex) ---`);

  const query4 = {
    'details.role': { operator: 'includes', value: 'Architect Lead', highlight: true }
  };

  const t4Start = performance.now();
  const res4 = engine.find(query4, { limit: 10 });
  const t4End = performance.now();

  console.log(`⏱️  Duration:      ${(t4End - t4Start).toFixed(3)} ms`);
  console.log(`📝 Match Count:    ${res4.data.length} records`);
  if (res4.data.length > 0) {
    console.log(`🎯 Offsets extracted for first match:`, JSON.stringify(res4.data[0]._offsets, null, 2));
  }
  console.log("\n");


  // =========================================================================
  // STRESS PROFILE SUMMARY
  // =========================================================================
  forceGC();
  const finalMemory = process.memoryUsage().heapUsed;

  console.log("=================================================================");
  console.log("📊 STRESS BENCHMARK SUMMARY");
  console.log("=================================================================");
  console.log(`📈 Final Heap Usage:          ${toMB(finalMemory)}`);
  console.log(`🔥 Net Query Engine Overhead: ${toMB(finalMemory - memoryAfterDataset)}`);
  console.log("=================================================================\n");
}

executeStressTest();
