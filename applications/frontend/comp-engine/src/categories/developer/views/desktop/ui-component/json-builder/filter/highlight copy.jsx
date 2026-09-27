/**
 * @file TextHighlighter.jsx
 * @description Safe, XSS-free component to highlight multi-word character offsets.
 * @param {Object} props
 * @param {string} props.text - The raw string text.
 * @param {Array<{start: number, end: number}>} [props.offsets=[]] - Sorted, non-overlapping intervals.
 * @param {string} [props.className=''] - Container class.
 * @param {string} [props.highlightClassName='query-highlight'] - Highlight tag class.
 * @param {React.CSSProperties} [props.highlightStyle] - Inline styles for matches.
 */
const Comp = ({text, offsets = [], className = '', highlightClassName = 'query-highlight', highlightStyle = { backgroundColor: '#ffe58f', borderRadius: '2px', padding: '0 2px'}}) => {
  if (!text && text !== 0){
    return null;
  }
  const rawString = String(text);

  if (!offsets || !Array.isArray(offsets) || offsets.length === 0) {
    return <span className={className}>{rawString}</span>;
  }

  const chunks = [];
  let currentIndex = 0;

  offsets.forEach((interval, i) => {
    if (interval.start > currentIndex) {
      chunks.push(
        <span key={`text-${i}`}>
          {rawString.substring(currentIndex, interval.start)}
        </span>
      );
    }

    chunks.push(
      <mark
        key={`mark-${i}`}
        className={highlightClassName}
        style={highlightStyle}
      >
        {rawString.substring(interval.start, interval.end)}
      </mark>
    );

    currentIndex = interval.end;
  });

  if (currentIndex < rawString.length) {
    chunks.push(<span key="text-end">{rawString.substring(currentIndex)}</span>);
  }

  return <>{chunks}</>;
}

export default Comp;
