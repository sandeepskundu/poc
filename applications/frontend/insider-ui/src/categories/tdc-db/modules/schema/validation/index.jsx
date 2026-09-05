import schema from './schema';

const start = (arg) => {
    return {
        schema:schema.start(arg.schema || {})
    };
}

export default {
    start:start
}