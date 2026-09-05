import schema from './schema';

const start = (arg) => {
    arg.schema = schema.start(arg.schema || {});

    
    return arg;
}

export default {
    start:start
}