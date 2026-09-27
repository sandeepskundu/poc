/**
 * @file CustomVirtualListDashboard.jsx
 * @description A fully self-contained React virtualization dashboard that handles 
 * 100,000+ items with zero third-party dependencies, featuring debouncing and offsets.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { UniversalCollectionQueryEngine } from './query.js';
import TextHighlighter from './highlight.jsx';

// ==========================================
// 1. LIGHTWEIGHT NATIVE VIRTUAL LIST COMPONENT
// ==========================================

/**
 * A lightweight, dependency-free virtual list component.
 * 
 * @param {Object} props
 * @param {Array<*>} props.items - The complete filtered dataset.
 * @param {number} props.itemHeight - The height of each individual row in pixels.
 * @param {number} props.containerHeight - The height of the scroll viewport window.
 * @param {Function} props.renderRow - Row renderer function: (item, index) => ReactNode.
 */
function NativeVirtualList({ items, itemHeight, containerHeight, renderRow }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const totalItems = items.length;
  const totalHeight = totalItems * itemHeight;

  // Calculate the range of items currently visible in the viewport
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2); // Buffer of 2 items above
  const endIndex = Math.min(totalItems - 1, Math.floor((scrollTop + containerHeight) / itemHeight) + 2); // Buffer of 2 items below

  // Get the visible slice of items
  const visibleItems = [];
  for (let i = startIndex; i <= endIndex; i++) {
    if (items[i]) {
      visibleItems.push({
        item: items[i],
        index: i,
        offsetTop: i * itemHeight // Absolute top position for this row
      });
    }
  }

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: `${containerHeight}px`,
        overflowY: 'auto',
        position: 'relative',
        willChange: 'transform',
        WebkitOverflowScrolling: 'touch' // Smooth momentum scrolling on iOS
      }}
    >
      {/* The invisible spacer that stretches the scroll container to its true height */}
      <div style={{ height: `${totalHeight}px`, width: '100%', position: 'absolute', top: 0, left: 0 }} />

      {/* Container holding only the visible rendered rows */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
        {visibleItems.map(({ item, index, offsetTop }) => (
          <div
            key={item.id || index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${itemHeight}px`,
              transform: `translateY(${offsetTop}px)` // Positions row perfectly in place
            }}
          >
            {renderRow(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 2. MAIN DASHBOARD COMPONENT
// ==========================================


const generateMockData = () => {
  const departments = ['IT', 'Design', 'Finance', 'Logistics', 'Operations'];
  const count = 100000;
  const data = new Array(count); // Pre-allocate array size

  for (let i = 0; i < count; i++) {
      data[i] = {
          id: i,
          department: departments[i % 5], // Avoid array length lookup overhead
          details: {
              // String template without the heavy locale-formatting logic
              name: `Employee ${i}`,
              role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
          },
          d: {
              id: i,
              department: departments[i % 5], // Avoid array length lookup overhead
              details: {
                  // String template without the heavy locale-formatting logic
                  name: `Employee ${i}`,
                  role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
              },
              d: {
                  id: i,
                  department: departments[i % 5], // Avoid array length lookup overhead
                  details: {
                      // String template without the heavy locale-formatting logic
                      name: `Employee ${i}`,
                      role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                  },
                  d: {
                      id: i,
                      department: departments[i % 5], // Avoid array length lookup overhead
                      details: {
                          // String template without the heavy locale-formatting logic
                          name: `Employee ${i}`,
                          role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                      },
                      d: {
                          id: i,
                          department: departments[i % 5], // Avoid array length lookup overhead
                          details: {
                              // String template without the heavy locale-formatting logic
                              name: `Employee ${i}`,
                              role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                          },
                          d: {
                              id: i,
                              department: departments[i % 5], // Avoid array length lookup overhead
                              details: {
                                  // String template without the heavy locale-formatting logic
                                  name: `Employee ${i}`,
                                  role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                              },
                              d: {
                                  id: i,
                                  department: departments[i % 5], // Avoid array length lookup overhead
                                  details: {
                                      // String template without the heavy locale-formatting logic
                                      name: `Employee ${i}`,
                                      role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                  },
                                  d: {
                                      id: i,
                                      department: departments[i % 5], // Avoid array length lookup overhead
                                      details: {
                                          // String template without the heavy locale-formatting logic
                                          name: `Employee ${i}`,
                                          role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                      },
                                      d: {
                                          id: i,
                                          department: departments[i % 5], // Avoid array length lookup overhead
                                          details: {
                                              // String template without the heavy locale-formatting logic
                                              name: `Employee ${i}`,
                                              role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                          },
                                          d: {
                                              id: i,
                                              department: departments[i % 5], // Avoid array length lookup overhead
                                              details: {
                                                  // String template without the heavy locale-formatting logic
                                                  name: `Employee ${i}`,
                                                  role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                              },
                                              d: {
                                                  id: i,
                                                  department: departments[i % 5], // Avoid array length lookup overhead
                                                  details: {
                                                      // String template without the heavy locale-formatting logic
                                                      name: `Employee ${i}`,
                                                      role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                  },
                                                  d: {
                                                      id: i,
                                                      department: departments[i % 5], // Avoid array length lookup overhead
                                                      details: {
                                                          // String template without the heavy locale-formatting logic
                                                          name: `Employee ${i}`,
                                                          role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                      },
                                                      d: {
                                                          id: i,
                                                          department: departments[i % 5], // Avoid array length lookup overhead
                                                          details: {
                                                              // String template without the heavy locale-formatting logic
                                                              name: `Employee ${i}`,
                                                              role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                          },
                                                          d: {
                                                              id: i,
                                                              department: departments[i % 5], // Avoid array length lookup overhead
                                                              details: {
                                                                  // String template without the heavy locale-formatting logic
                                                                  name: `Employee ${i}`,
                                                                  role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                              },
                                                              d: {
                                                                  id: i,
                                                                  department: departments[i % 5], // Avoid array length lookup overhead
                                                                  details: {
                                                                      // String template without the heavy locale-formatting logic
                                                                      name: `Employee ${i}`,
                                                                      role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                                  },
                                                                  d: {
                                                                      id: i,
                                                                      department: departments[i % 5], // Avoid array length lookup overhead
                                                                      details: {
                                                                          // String template without the heavy locale-formatting logic
                                                                          name: `Employee ${i}`,
                                                                          role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                                      },
                                                                      d: {
                                                                          id: i,
                                                                          department: departments[i % 5], // Avoid array length lookup overhead
                                                                          details: {
                                                                              // String template without the heavy locale-formatting logic
                                                                              name: `Employee ${i}`,
                                                                              role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                                          },
                                                                          d: {
                                                                              id: i,
                                                                              department: departments[i % 5], // Avoid array length lookup overhead
                                                                              details: {
                                                                                  // String template without the heavy locale-formatting logic
                                                                                  name: `Employee ${i}`,
                                                                                  role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                                              },
                                                                              d: {
                                                                                  id: i,
                                                                                  department: departments[i % 5], // Avoid array length lookup overhead
                                                                                  details: {
                                                                                      // String template without the heavy locale-formatting logic
                                                                                      name: `Employee ${i}`,
                                                                                      role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                                                  },
                                                                                  d: {
                                                                                      id: i,
                                                                                      department: departments[i % 5], // Avoid array length lookup overhead
                                                                                      details: {
                                                                                          // String template without the heavy locale-formatting logic
                                                                                          name: `Employee ${i}`,
                                                                                          role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                                                      },
                                                                                      d: {
                                                                                          id: i,
                                                                                          department: departments[i % 5], // Avoid array length lookup overhead
                                                                                          details: {
                                                                                              // String template without the heavy locale-formatting logic
                                                                                              name: `Employee ${i}`,
                                                                                              role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                                                          },
                                                                                          d: {
                                                                                              id: i,
                                                                                              department: departments[i % 5], // Avoid array length lookup overhead
                                                                                              details: {
                                                                                                  // String template without the heavy locale-formatting logic
                                                                                                  name: `Employee ${i}`,
                                                                                                  role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                                                              },
                                                                                              d: {
                                                                                                  id: i,
                                                                                                  department: departments[i % 5], // Avoid array length lookup overhead
                                                                                                  details: {
                                                                                                      // String template without the heavy locale-formatting logic
                                                                                                      name: `Employee ${i}`,
                                                                                                      role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
                                                                                                  }

                                                                                              }
                                                                                          }

                                                                                      }
                                                                                  }

                                                                              }
                                                                          }

                                                                      }
                                                                  }

                                                              }
                                                          }

                                                      }
                                                  }

                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      };
  }

  return data;
};
const generateMockData_ = () => {
  const departments = ['IT', 'Design', 'Finance', 'Logistics', 'Operations'];
  return Array.from({ length: 15000000 }, (_, i) => ({
    id:i,
    department: departments[i % departments.length],
    details: {
      name: `Employee ${i.toLocaleString()}`,
      role: i % 5 === 0 ? 'Lead UX Engineer' : 'Full Stack Developer'
    }
  }));
};

export function VirtualizedSearchDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const rawData = useMemo(() => generateMockData(), []);
  const engineRef = useRef(null);

  if (!engineRef.current) {
    engineRef.current = new UniversalCollectionQueryEngine(rawData, { 
      debounceDelay: 200 
    });
  }

  useEffect(() => {
    return () => {
      if (engineRef.current) engineRef.current.destroy();
    };
  }, []);

  // Sync / Debounced Search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults(rawData);
      setIsSearching(false);
      return;
    }

    let isCurrent = true;
    setIsSearching(true);

    const query = {
      $or: [
        { 'details.name': { operator: 'includes', value: searchQuery, highlight: true } },
        { 'details.role': { operator: 'includes', value: searchQuery, highlight: true } },
        { department: { operator: 'includes', value: searchQuery, highlight: true } }
      ]
    };

    engineRef.current.findDebounced(query, { highlight: true }).then((response) => {
        if (!isCurrent || response.cancelled) return;
        setResults(response.data);
        setIsSearching(false);
      })
      .catch(err => {
        if (isCurrent) {
          console.error("Search failed:", err);
          setIsSearching(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [searchQuery, rawData]);

  // Single Row Renderer
  const renderRow = (item, index) => {
    const offsets = item._offsets || {};

    console.log(offsets);

    return (
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #f0f0f0',
          padding: '0 15px',
          height: '100%',
          boxSizing: 'border-box',
          backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa'
        }}
      >
        <div style={{ width: '80px', fontWeight: 'bold', color: '#888' }}>
          #{item.id}
        </div>
        <div style={{ flex: 1, fontWeight: 600 }}>
          <TextHighlighter text={item.details.name} offsets={offsets['details.name']} />
        </div>
        <div style={{ flex: 1, color: '#555' }}>
          <TextHighlighter text={item.details.role} offsets={offsets['details.role']} />
        </div>
        <div style={{ width: '150px', color: '#1890ff' }}>
          <TextHighlighter text={item.department} offsets={offsets['department']} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '30px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>📋 Employee Directory (Native Virtualization)</h2>
      <p style={{ color: '#666' }}>
        Searching <strong>{rawData.length.toLocaleString()}</strong> rows with a custom lightweight, dependency-free virtual scroll container.
      </p>

      {/* Input */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Type to search name, role, or department..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
            outline: 'none'
          }}
        />
        {isSearching && (
          <span style={{ position: 'absolute', right: '15px', top: '15px', color: '#1890ff', fontSize: '13px' }}>
            Evaluating...
          </span>
        )}
      </div>

      {/* Virtual Table Container */}
      <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', backgroundColor: '#fafafa', borderBottom: '2px solid #e0e0e0', padding: '12px 15px', fontWeight: 'bold' }}>
          <div style={{ width: '80px', color: '#888' }}>ID</div>
          <div style={{ flex: 1 }}>Name</div>
          <div style={{ flex: 1 }}>Role</div>
          <div style={{ width: '150px' }}>Department</div>
        </div>

        {/* The Native Virtual Scroll Window */}
        {filteredResults.length > 0 ? (
          <NativeVirtualList
            items={filteredResults}
            itemHeight={50}
            containerHeight={400}
            renderRow={renderRow}
          />
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
            No matching records found.
          </div>
        )}
      </div>

      <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '13px', color: '#888' }}>
        Showing {filteredResults.length.toLocaleString()} of {rawData.length.toLocaleString()} rows
      </div>
    </div>
  );
}
