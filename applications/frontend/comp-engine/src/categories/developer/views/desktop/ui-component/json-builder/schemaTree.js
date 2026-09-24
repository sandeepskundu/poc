// src/utils/schemaTree.js

export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;

export const DATA_TYPES = [
  'string',
  'number',
  'boolean',
  'object',
  'array',
  'function',
  'jsx',
];

/*--
export const getDefaultValueForType = (type) => {
  switch (type) {
    case 'string':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'function':
      return '() => {\n  return null;\n}';
    case 'jsx':
      return '<div className="custom-node">\n  <span>Rendered Item</span>\n</div>';
    case 'object':
    case 'array':
    default:
      return undefined;
  }
};

/**
 * Defensive deep-cleaner: Guarantees every node has valid customMeta and children arrays
 * / 
export const sanitizeNodeStructure = (node) => {
  if (!node) return node;
  const cleanNode = {
    ...node,
    customMeta: node.customMeta || [],
  };
  if (cleanNode.children) {
    cleanNode.children = cleanNode.children.map(child => sanitizeNodeStructure(child));
  }
  return cleanNode;
};

/**
 * Node Factory: Generates standard AST node template
 * /
export const createDefaultNode = (key = '', type = 'string', overrides = {}) => {
  const initialDefault = getDefaultValueForType(type);
  return {
    id: typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 9),
    key,
    type,
    required: false,
    dvalue: initialDefault,
    value: initialDefault,
    isNull: false,
    customMeta: [], // Array of { id, key, value }
    children: type === 'object' || type === 'array' ? [] : undefined,
    isExpanded: true,
    showMetaSettings: false,
    ...overrides,
  };
};

export const updateNode = (nodes, targetId, updater) => {
  return (nodes || []).map((node) => {
    if (node.id === targetId) return sanitizeNodeStructure(updater(node));
    if (node.children) {
      return { ...node, children: updateNode(node.children, targetId, updater) };
    }
    return node;
  });
};

export const deleteNode = (nodes, targetId) => {
  return (nodes || [])
    .filter((node) => node.id !== targetId)
    .map((node) => ({
      ...node,
      children: node.children ? deleteNode(node.children, targetId) : undefined,
    }));
};

export const addChildNode = (nodes, parentId, newNode) => {
  return (nodes || []).map((node) => {
    if (node.id === parentId) {
      const destinationType = node.type;
      const preparedChild = {
        ...newNode,
        key: destinationType === 'array' ? '' : newNode.key,
      };
      return {
        ...node,
        isExpanded: true,
        children: [...(node.children || []), sanitizeNodeStructure(preparedChild)],
      };
    }
    if (node.children) {
      return { ...node, children: addChildNode(node.children, parentId, newNode) };
    }
    return node;
  });
};

export const isSiblingKeyDuplicate = (nodes, targetId, newKey) => {
  const normalizedKey = (newKey || '').trim();
  if (!normalizedKey) return false;

  const activeNodes = nodes || [];
  const targetIndex = activeNodes.findIndex((node) => node.id === targetId);
  if (targetIndex !== -1) {
    return activeNodes.some(
      (node) => node.id !== targetId && (node.key || '').trim() === normalizedKey
    );
  }

  for (const node of activeNodes) {
    if (node.children) {
      const isDuplicate = isSiblingKeyDuplicate(node.children, targetId, normalizedKey);
      if (isDuplicate) return true;
    }
  }
  return false;
};

export const isTreeValid = (nodes, parentType = 'object') => {
  for (const node of (nodes || [])) {
    if (parentType !== 'array') {
      if (!node.key || !node.key.trim()) return false;
      if (isSiblingKeyDuplicate(nodes, node.id, node.key)) return false;
    }
    const metaArray = node.customMeta || [];
    if (metaArray.some((meta) => !meta.key || !meta.key.trim())) {
      return false;
    }
    if (node.children && (node.type === 'object' || node.type === 'array')) {
      const childrenValid = isTreeValid(node.children, node.type);
      if (!childrenValid) return false;
    }
  }
  return true;
};--*/

const parseMetaValue = (val) => {
  const trimmed = String(val).trim();
  if (trimmed.toLowerCase() === 'true') return true;
  if (trimmed.toLowerCase() === 'false') return false;
  if (!isNaN(trimmed) && trimmed !== '') return Number(trimmed);
  return val;
};

/**
 * Mode A Serialization: Definition output with merged custom attributes and flattened nested elements.
 * Checking "Set Null" overrides the active node representation completely, serializing the field as key: null.
 */
export const serializeSchemaDefinition = (nodes, parentType = 'object') => {
  const activeNodes = nodes || [];
  if (parentType === 'array') {
    return activeNodes.map((child) => {
      // STRICT NULL OVERRIDE
      if (child.isNull) {
        return null;
      }

      const base = {
        type: child.type,
        required: Boolean(child.required),
        dvalue: child.dvalue,
      };

      const metaArray = child.customMeta || [];
      if (metaArray.length > 0) {
        metaArray.forEach((meta) => {
          if (meta.key && meta.key.trim()) {
            base[meta.key.trim()] = parseMetaValue(meta.value);
          }
        });
      }

      if (child.type === 'object') {
        const nestedProps = serializeSchemaDefinition(child.children || [], 'object');
        Object.assign(base, nestedProps);
      } else if (child.type === 'array') {
        base.items = serializeSchemaDefinition(child.children || [], 'array');
      } else if (child.type === 'function') {
        base.code = child.value;
      } else if (child.type === 'jsx') {
        base.template = child.value;
      } else {
        base.value = child.value;
      }

      return base;
    });
  }

  const result = {};
  for (const node of activeNodes) {
    const key = (node.key || '').trim() || `unnamed_${node.id.slice(0, 4)}`;

    // STRICT NULL OVERRIDE
    if (node.isNull) {
      result[key] = null;
      continue;
    }

    const definition = {
      type: node.type,
      required: Boolean(node.required),
      dvalue: node.dvalue,
    };

    const metaArray = node.customMeta || [];
    if (metaArray.length > 0) {
      metaArray.forEach((meta) => {
        if (meta.key && meta.key.trim()) {
          definition[meta.key.trim()] = parseMetaValue(meta.value);
        }
      });
    }

    if (node.type === 'object') {
      const nestedChildren = serializeSchemaDefinition(node.children || [], 'object');
      Object.assign(definition, nestedChildren);
    } else if (node.type === 'array') {
      definition.items = serializeSchemaDefinition(node.children || [], 'array');
    } else if (node.type === 'function') {
      definition.code = node.value;
    } else if (node.type === 'jsx') {
      definition.template = node.value;
    } else {
      definition.value = node.value;
    }

    result[key] = definition;
  }
  return result;
};

/**
 * Mode B Serialization: Evaluated raw JSON data output (resolves nulls cleanly).
 * Checking "Set Null" overrides the active node representation completely, serializing the field as key: null.
 */
export const serializeEvaluatedData = (nodes, parentType = 'object') => {
  const activeNodes = nodes || [];
  if (parentType === 'array') {
    return activeNodes.map((child) => {
      if (child.isNull) return null;
      if (child.type === 'object') {
        return serializeEvaluatedData(child.children || [], 'object');
      }
      if (child.type === 'array') {
        return serializeEvaluatedData(child.children || [], 'array');
      }
      return child.value;
    });
  }

  const result = {};
  for (const node of activeNodes) {
    const key = (node.key || '').trim() || `unnamed_${node.id.slice(0, 4)}`;

    if (node.isNull) {
      result[key] = null;
    } else if (node.type === 'object') {
      result[key] = serializeEvaluatedData(node.children || [], 'object');
    } else if (node.type === 'array') {
      result[key] = serializeEvaluatedData(node.children || [], 'array');
    } else {
      result[key] = node.value;
    }
  }
  return result;
};

/*--
export const extractNode = (nodes, targetId) => {
  let draggedNode = null;
  const filterTree = (list) => {
    return (list || [])
      .filter((node) => {
        if (node.id === targetId) {
          draggedNode = sanitizeNodeStructure(node);
          return false;
        }
        return true;
      })
      .map((node) => {
        if (node.children) {
          return { ...node, children: filterTree(node.children) };
        }
        return node;
      });
  };
  const cleanedTree = filterTree(nodes);
  return { cleanedTree, draggedNode };
};

export const insertNodeAtActiveLevel = (nodes, targetParentId, draggedNode, targetIndex) => {
  if (targetParentId === 'root') {
    const updated = [...(nodes || [])];
    updated.splice(targetIndex, 0, sanitizeNodeStructure(draggedNode));
    return updated;
  }
  return (nodes || []).map((node) => {
    if (node.id === targetParentId) {
      const updatedChildren = [...(node.children || [])];
      updatedChildren.splice(targetIndex, 0, sanitizeNodeStructure(draggedNode));
      return { ...node, children: updatedChildren };
    }
    if (node.children) {
      return {
        ...node,
        children: insertNodeAtActiveLevel(node.children, targetParentId, draggedNode, targetIndex),
      };
    }
    return node;
  });
};--*/

/*--
const sanitizeNodeForParent = (node, destinationType) => {
  if (!node) return node;
  const clean = sanitizeNodeStructure(node);
  if (destinationType === 'array') {
    return { ...clean, key: '' };
  }
  if (destinationType === 'object' && (!clean.key || !clean.key.trim())) {
    return { ...clean, key: `prop_${Math.random().toString(36).substring(2, 6)}` };
  }
  return clean;
};


export const reparentNode = (nodes, draggedId, targetParentId) => {
  const { cleanedTree, draggedNode } = extractNode(nodes, draggedId);
  if (!draggedNode) return nodes;

  if (targetParentId === 'root') {
    return [...cleanedTree, sanitizeNodeForParent(draggedNode, 'object')];
  }

  const insertRecursive = (treeList) => {
    return (treeList || []).map((node) => {
      if (node.id === targetParentId) {
        return {
          ...node,
          isExpanded: true,
          children: [...(node.children || []), sanitizeNodeForParent(draggedNode, node.type)],
        };
      }
      if (node.children) {
        return { ...node, children: insertRecursive(node.children) };
      }
      return node;
    });
  };

  return insertRecursive(cleanedTree);
};

export const nodeMatchesQuery = (node, query) => {
  if (!query) return true;
  const q = query.toLowerCase();

  const keyMatch = (node.key || '').toLowerCase().includes(q);
  const typeMatch = (node.type || '').toLowerCase().includes(q);
  const valueMatch = String(node.value || '').toLowerCase().includes(q);
  
  const metaArray = node.customMeta || [];
  const metaMatch = metaArray.some(
    (meta) => (meta.key || '').toLowerCase().includes(q) || String(meta.value || '').toLowerCase().includes(q)
  );

  if (keyMatch || typeMatch || valueMatch || metaMatch) return true;

  const childrenArray = node.children || [];
  if (childrenArray.length > 0) {
    return childrenArray.some((child) => nodeMatchesQuery(child, query));
  }
  return false;
};


export const expandMatchingNodes = (nodes, query) => {
  if (!query) return nodes;
  return (nodes || []).map((node) => {
    const hasMatch = nodeMatchesQuery(node, query);
    if (node.children) {
      return {
        ...node,
        isExpanded: hasMatch ? true : node.isExpanded,
        children: expandMatchingNodes(node.children, query),
      };
    }
    return node;
  });
};


--*/