import React, { useState, useEffect } from 'react';

/**
 * Dynamic JSON Key-Value Editor Component
 * 
 * @param {Object} initialData - The initial JSON data to edit.
 * @param {Function} onChange - Callback function triggered whenever data updates.
 */
export default function DynamicJsonEditor({ initialData = {}, onChange }) {
  const [formData, setFormData] = useState(initialData);

  // Sync state if initialData prop changes from parent
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Helper to notify parent component
  const emitChange = (updatedData) => {
    setFormData(updatedData);
    if (typeof onChange === 'function') {
      onChange(updatedData);
    }
  };

  // 1. Update the value of an existing key
  const handleValueChange = (key, rawValue, originalType) => {
    let formattedValue = rawValue;

    // Preserve the original data type (number, boolean, string)
    if (originalType === 'number') {
      formattedValue = rawValue === '' ? '' : Number(rawValue);
    } else if (originalType === 'boolean') {
      formattedValue = rawValue === 'true' || rawValue === true;
    }

    const updated = {
      ...formData,
      [key]: formattedValue,
    };
    emitChange(updated);
  };

  // 2. Rename a key without losing order or value
  const handleKeyRename = (oldKey, newKey) => {
    if (oldKey === newKey || !newKey.trim()) return;

    // Prevent overwriting existing keys unintentionally
    if (Object.prototype.hasOwnProperty.call(formData, newKey)) {
      alert(`Key "${newKey}" already exists!`);
      return;
    }

    const updated = {};
    Object.keys(formData).forEach((k) => {
      if (k === oldKey) {
        updated[newKey] = formData[oldKey];
      } else {
        updated[k] = formData[k];
      }
    });

    emitChange(updated);
  };

  // 3. Delete a key-value row
  const handleDeleteRow = (keyToDelete) => {
    const { [keyToDelete]: _, ...rest } = formData;
    emitChange(rest);
  };

  // 4. Add a new row
  const handleAddRow = () => {
    let newKeyName = 'newKey';
    let counter = 1;
    while (Object.prototype.hasOwnProperty.call(formData, newKeyName)) {
      newKeyName = `newKey_${counter++}`;
    }

    const updated = {
      ...formData,
      [newKeyName]: '',
    };
    emitChange(updated);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>JSON Key-Value Editor</h3>

      <div style={styles.tableHeader}>
        <span style={{ flex: 1, fontWeight: 'bold' }}>Key</span>
        <span style={{ flex: 1.5, fontWeight: 'bold' }}>Value</span>
        <span style={{ width: '80px', textAlign: 'center', fontWeight: 'bold' }}>Action</span>
      </div>

      {Object.entries(formData).map(([key, value]) => {
        const valueType = typeof value;

        return (
          <div key={key} style={styles.row}>
            {/* Key Input */}
            <input
              type="text"
              defaultValue={key}
              onBlur={(e) => handleKeyRename(key, e.target.value)}
              placeholder="Key"
              style={styles.keyInput}
            />

            {/* Value Input (Adapts to Type) */}
            {valueType === 'boolean' ? (
              <select
                value={String(value)}
                onChange={(e) => handleValueChange(key, e.target.value === 'true', 'boolean')}
                style={styles.selectInput}
              >
                <option value="true">true (boolean)</option>
                <option value="false">false (boolean)</option>
              </select>
            ) : (
              <input
                type={valueType === 'number' ? 'number' : 'text'}
                value={value ?? ''}
                onChange={(e) => handleValueChange(key, e.target.value, valueType)}
                placeholder="Value"
                style={styles.valueInput}
              />
            )}

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => handleDeleteRow(key)}
              style={styles.deleteButton}
              title="Delete row"
            >
              ✕
            </button>
          </div>
        );
      })}

      <div style={styles.footer}>
        <button type="button" onClick={handleAddRow} style={styles.addButton}>
          + Add Field
        </button>
      </div>
    </div>
  );
}

// Basic inline styling (can easily be replaced with Tailwind CSS, SCSS, or styled-components)
const styles = {
  container: {
    maxWidth: '650px',
    padding: '20px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    fontFamily: 'sans-serif',
  },
  header: {
    margin: '0 0 16px 0',
    fontSize: '18px',
    color: '#333333',
  },
  tableHeader: {
    display: 'flex',
    gap: '12px',
    paddingBottom: '8px',
    borderBottom: '2px solid #f0f0f0',
    marginBottom: '12px',
    fontSize: '14px',
    color: '#666666',
  },
  row: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '10px',
  },
  keyInput: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'monospace',
  },
  valueInput: {
    flex: 1.5,
    padding: '8px 12px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    fontSize: '14px',
  },
  selectInput: {
    flex: 1.5,
    padding: '8px 12px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  deleteButton: {
    width: '32px',
    height: '32px',
    border: 'none',
    backgroundColor: '#ffebee',
    color: '#d32f2f',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  addButton: {
    padding: '8px 16px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
  },
};
