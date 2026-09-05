import helpers from 'ui-helpers';
import React, {createElement, useMemo} from 'react';
import Text from 'aio-global-ui/atoms/typography/text';
import Display from 'aio-global-ui/atoms/typography/display';

const TitleWithDescription = (dprops) => {
    const props = helpers.element.jsx.props.define(__DEFAULT__PROP__VALUES__, dprops, helpers);

    const title = () => {
        let type = helpers.data.type.get(props.title || '');
        switch(type) {
            case 'function':
              return props.title(props)
            break;
            case 'string':
                return <Display 
                    content={props.title}
                    ds={helpers.json.val(props, 'titleDs', {})}
                    attrs={helpers.json.val(props, 'titleDs.attrs', {})}
                    dataAttrs={helpers.json.val(props, 'titleDs.dataAttrs', {})}
                />
            break;
            default:
                return props.title || '';
          }
    }

    const description = () => {
        let type = helpers.data.type.get(props.description || '');
        switch(type) {
            case 'function':
              return props.description(props)
            break;
            case 'string':
                return <Text
                    content={props.description}
                    ds={helpers.json.val(props, 'descriptionDs', {})}
                    moreLess={helpers.json.val(props, 'descriptionMoreLess', {})}
                    element={helpers.json.val(props, 'descriptionDs.element', 'p')}    
                    attrs={helpers.json.val(props, 'descriptionDs.attrs', {})}
                    dataAttrs={helpers.json.val(props, 'descriptionDs..dataAttrs', {})}
                />
            break;
            default:
                return props.description || '';
          }
    }

    const child = () => {
        return <>
            {title()}
            {description()}
        </>
    }

    const gridAttrs = () => {
        const attrs = helpers.element.jsx.attrs(props, false, 'attrs')
        return {...attrs, ...{className:helpers.element.jsx.css.get(props, 'wrapperDs') || 'full'}};
    }

    return createElement(helpers.json.val(props, 'wrapperDs.element', 'div'), gridAttrs(), child())
}

TitleWithDescription.__PROP__TYPES__

TitleWithDescription.__DEFAULT__PROP__

export default TitleWithDescription;