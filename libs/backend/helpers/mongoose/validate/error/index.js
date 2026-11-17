const keymap = async (list, error, req, modelConfig) => {
    let rval = {};

    list.map((a) => {
        rval[a.key || 'unknown'] = a
    });

    return rval;
}

const extract = async (error, req, modelConfig) => {
    const rval = [];
    const dkey = 'unknown';

    // --- Case 1: Mongoose Validation Error (Required fields, custom validations) ---
    if (error.name === 'ValidationError' && error.errors) {
        Object.keys(error.errors).forEach(path => {
            const field = error.errors[path];
            const message = field.message || `Validation failed for path "${field.path}".`;
            // Pulls the schema-defined custom message, or defaults to the standard message

            rval.push({
                key: field.path, // e.g., "name" or "metadata.theme"
                message: message,
                value: field.value, // e.g., "" or undefined
                code: 'validation_error'
            });
        });

        return await keymap(rval, error, req, modelConfig);
    }

    // --- Case 2: MongoDB 11000/11001 Duplicate Key Error (Unique index violation) ---
    if (error.code === 11000 || error.code === 11001) {
        const getKey = (k) => { return req.helpers.json.get(modelConfig, `validation.errors.${k}.mapTo`, k)}

        // A. Modern MongoDB drivers populate `keyValue` directly
        if (error.keyValue && req.helpers.data.type.is(error.keyValue, 'object') && req.helpers.json.length(error.keyValue) > 0) {
            let kv = req.helpers.json.get(error, 'keyValue', {})

            for(let a in kv){
                rval.push({
                    key:getKey(a),
                    code:'duplicate_key_error',
                    message:req.helpers.json.get(modelConfig || {}, `validation.errors.${a}.messages.${error.code}`, `Duplicate value is not allowed`)
                });
            };

            return await keymap(rval, error, req, modelConfig);
        }
        // B. Fallback parsing for legacy drivers or raw connection strings
        else if (error.message) {
            let msg = error.message.split('dup key:');
                msg = msg[1] || '';

            if(msg){
                try {
                    msg = msg.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":').replace(/'/g, '"');
                } catch {
                    msg = '';
                }

                if(msg){
                    try {
                        msg = JSON.parse(msg);
                    } catch {
                        msg = {}
                    }
                }
            }

            if(req.helpers.data.type.is(msg, 'object') && req.helpers.json.length(msg) > 0){
                for(let a in msg){
                    rval.push({
                        key:getKey(a),
                        code:'duplicate_key_error',
                        message:req.helpers.json.get(modelConfig || {}, `validation.errors.${a}.messages.${error.code}`, `Duplicate value is not allowed`)
                    });
                }

                return await keymap(rval, error, req, modelConfig);
            }
        }
    }

    // --- Case 3: Mongoose CastError (Type mismatch, e.g., passing a string to an Array or Date field) ---
    if (error.name === 'CastError') {
        rval.push({
            key:error.path,                       // e.g., "age"
            value:error.value,                    // e.g., "not_a_number"
            code:'type_cast_error',
            message:`Type mismatch: Value "${error.value}" is not a valid ${error.kind} for the field "${error.path}".`
        });

        return await keymap(rval, error, req, modelConfig);
    }

    // --- Case 4: Default Fallback for other errors (Network loss, server timeout) ---
    rval.push({
        key:dkey,
        value:null,
        code:'generic_error',
        message:error.message || 'An unexpected database error occurred.'
    });

    return await keymap(rval, error, req, modelConfig);;
}


exports.extract = extract;