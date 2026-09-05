const ssr = () => {
    return (typeof window === 'undefined')
}

const client = () => {
    return !ssr();
}

const odd = (i) => {
    return (i % 2 != 0)
}

exports.ssr = ssr;
exports.odd = odd;
exports.client = client;