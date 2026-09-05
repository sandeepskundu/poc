
const sanitize = (svg) => {
    if (!svg){
        return ''
    };

    let cleaned = svg;
        cleaned = cleaned.replace(/<\?xml[\s\S]*?\?>/gi, '').replace(/<!doctype[\s\S]*?>/gi, '');
        cleaned = cleaned.replace(/\sfill="(?!none\b|currentColor\b|url\(#)[^"]*"/gi, ''); // Remove hardcoded fill except allowed values
        cleaned = cleaned.replace(/\sstroke="(?!none\b|currentColor\b|url\(#)[^"]*"/gi, ''); // Remove hardcoded stroke except allowed values

        //Clean inline styles
        cleaned = cleaned.replace(/\sstyle="([^"]*)"/gi, (_, styleValue) => {
            let kept = styleValue.split(';').map(s => s.trim()).filter(Boolean).filter(rule => {
            let lower = rule.toLowerCase().replace(/\s+/g, '');

            if (lower.startsWith('fill:')) {
                return (lower === 'fill:none' || lower === 'fill:currentcolor' || lower.startsWith('fill:url(#'));
            }

            if (lower.startsWith('stroke:')) {
                return (lower === 'stroke:none' || lower === 'stroke:currentcolor' || lower.startsWith('stroke:url(#'));
            }

            return true;

            }).join('; ');

            return kept ? ` style="${kept}"` : '';
        });

        // Ensure svg uses currentColor and remove fixed size

        cleaned = cleaned.replace(/<svg\b([^>]*)>/i, (match, attrs) => {
            let next = attrs;

            if (!/\bfill=/.test(next) && !/\bstroke=/.test(next)) {
                next += ' fill="currentColor"';
            }

            next = next.replace(/\swidth="[^"]*"/gi, '').replace(/\sheight="[^"]*"/gi, '');

            return `<svg${next}>`;
        });

    return cleaned;
}

exports.sanitize = sanitize;