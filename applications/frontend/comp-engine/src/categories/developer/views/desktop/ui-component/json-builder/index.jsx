
import Builder from './builder';
import helpers from 'ui-helpers';

const id = helpers.random.uuid();

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({

    }, dprops, helpers);

   const handleSchemaChange = (serializedDefinition, rawAstTree) => {
    // Read compile changes
  };

  const customMetaRenderer = ({ meta, onChangeValue }) => {
    const keyLower = (meta.key || '').toLowerCase();

    // Color Swatch Picker
    if (keyLower.includes('color')) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="color"
            value={meta.value || '#000000'}
            onChange={(e) => onChangeValue(e.target.value)}
            style={{ cursor: 'pointer', border: 'none', width: '30px', height: '30px', padding: 0 }}
          />
          <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#475569' }}>
            {meta.value || '#000000'}
          </span>
        </div>
      );
    }

    // Dropdown Select for enums
    if (keyLower === 'enum') {
      return (
        <select
          value={meta.value}
          onChange={(e) => onChangeValue(e.target.value)}
          style={{
            padding: '6px 8px',
            borderRadius: '4px',
            border: '1px solid #cbd5e1',
            fontSize: '12px',
            width: '100%',
            background: '#ffffff',
          }}
        >
          <option value="dark">dark</option>
          <option value="light">light</option>
          <option value="system">system</option>
        </select>
      );
    }

    return null;
  };

  const handleGetCustomIcon = (type, node) => {
    if (type === 'boolean' && node.required) return '🚨';

    const customMap = {
      string: '📝',
      number: '🔢',
      boolean: '🔘',
      object: '📦',
      array: '🗂️',
      function: '🚀',
      jsx: '🎨',
    };
    return customMap[type] || '📄';
  };

    return (
        <div className='full'>
            <header className='full bxs pd-18 hide bxs'>
                <h1>Custom Template Meta Schema Builder</h1>
                <p></p>
            </header>
            <div className='full'>
                <Builder />
                {/*--<JsonSchemaBuilder
                  onChange={handleSchemaChange}
                  renderCustomMetaAttribute={customMetaRenderer}
                  getTypeIcon={handleGetCustomIcon}
                />--*/}
            </div>
        </div>
    )
}

export default Comp;
