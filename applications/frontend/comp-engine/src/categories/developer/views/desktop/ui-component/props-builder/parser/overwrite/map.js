import helpers from 'ui-helpers';
/**
 * Safely checks if a value is a plain JavaScript object.
 */
const isPlainObject = (val) => {
    return helpers.data.type.is(val, 'object');
};

const injectSchemaMappings = (schema, options = {}) => {
    const {types = ['compProps', 'predefined', 'enum'], nestedKey = '___'} = options;
    const targetSet = new Set(types);
    const traverse = (current, currentPath = '') => {
        if(!isPlainObject(current)){
            return current;
        }

        const result = {};

        for (const [key, value] of Object.entries(current)) {
            if (!isPlainObject(value)) {
                result[key] = value;
                continue;
            }

            const nodeType = value.type;
            const nodePath = currentPath ? `${currentPath}.${key}` : key;

            // 1. Matched Target Leaf: Inject "__mapping" properties directly
            if (nodeType && targetSet.has(nodeType)) {
                const clonedNode = { ...value };
                const innerContainer = clonedNode[nestedKey];

                if (isPlainObject(innerContainer)) {
                    const configBlock = innerContainer[nodeType];

                    if (isPlainObject(configBlock)) {
                        // Reconstruct the inner block with the injected "__mapping" node
                        clonedNode[nestedKey] = {
                            ...innerContainer,
                            [nodeType]: {
                                ...configBlock,
                                __mapping: {
                                    node: nodePath, // Uses the complete path to the parent element (e.g. "unlabeledWrapper.sandeep")
                                    overwrite: `${nodePath}.${nestedKey}.${nodeType}` // Complete path to the inner configuration block
                                }
                            }
                        };
                    }
                }
                result[key] = clonedNode;
                continue;
            }

            // 2. Structural Descent: Recursively crawl child keys
            result[key] = traverse(value, nodePath);
        }

        return result;
    };

    return traverse(schema);
};







const get = (data) => {
    let rval = injectSchemaMappings(data);

    return rval;
}

export default {
    get:get
}