const align = (props) => {
    let al = props?.layerAlignFrom || 'c';

    return `aln-${al}`
}

const size = (props) => {
    let sz = props?.layerSize || 20;

    return `lyr-${sz}`
}

const height = (props) => {
    return props?.layerSize || 20;
}

const colorPairing = (props) => {
    let sz = props?.layerColorParing || 'xxx';

    return `cp-${sz}`
}

const className = (props) => {
    return props?.layerClassName || 'xxx';
}

const alignment = (props) => {
    let aln = align(props);
    let size = height(props);
    let map = {
        'aln-c':'',
        'aln-tl':'pd-l__SIZE__',
        'aln-tlcc ':'pd-l__SIZE__',
        'aln-tlc':'pd-l__SIZE__',
        'aln-tlo':'pd-t__SIZE__',
        'aln-tc':'pd-t__SIZE__',
        'aln-tcc':'pd-t__SIZE__',
        'aln-tco':'pd-t__SIZE__',
        'aln-tr':'pd-r__SIZE__',
        'aln-trcc':'pd-r__SIZE__',
        'aln-trc':'pd-r__SIZE__',
        'aln-tro':'pd-r__SIZE__',
        'aln-rtc':'pd-r__SIZE__',
        'aln-rto':'pd-r__SIZE__',
        'aln-rc':'pd-r__SIZE__',
        'aln-rcc':'pd-r__SIZE__',
        'aln-rco':'pd-r__SIZE__',
        'aln-rb':'pd-r__SIZE__',
        'aln-rbc':'pd-r__SIZE__',
        'aln-rbo':'pd-r__SIZE__',
        'aln-rbcc':'pd-r__SIZE__',
        'aln-brc':'pd-b__SIZE__',
        'aln-bro':'pd-b__SIZE__',
        'aln-bc':'pd-b__SIZE__',
        'aln-bcc':'pd-b__SIZE__',
        'aln-bco':'pd-b__SIZE__',
        'aln-bl':'pd-b__SIZE__',
        'aln-blc':'pd-b__SIZE__',
        'aln-blcc':'pd-b__SIZE__',
        'aln-blo':'pd-b__SIZE__',
        'aln-lbc':'pd-l__SIZE__',
        'aln-lbo':'pd-l__SIZE__',
        'aln-lc':'pd-l__SIZE__',
        'aln-lcc':'pd-l__SIZE__',
        'aln-lco':'pd-l__SIZE__',
        'aln-ltc':'pd-l__SIZE__',
        'aln-lto':'pd-l__SIZE__'
    }

    if(map && aln && map[aln]){
        let rg = new RegExp('__SIZE__', 'g')
        return map[aln].replaceAll(rg, size);
    }

    return '';
}

exports.size = size;
exports.align = align;
exports.height = height;
exports.className = className;
exports.alignment = alignment;
exports.colorPairing = colorPairing;