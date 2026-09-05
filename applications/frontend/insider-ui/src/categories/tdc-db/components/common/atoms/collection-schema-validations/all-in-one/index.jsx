import helpers from 'ui-helpers';
import React, {useState, useEffect} from 'react';
import Enums from 'aio-app-ui-tdc-db-atoms/collection-schema-validations/enums';
import Match from 'aio-app-ui-tdc-db-atoms/collection-schema-validations/match';
import MinMax from 'aio-app-ui-tdc-db-atoms/collection-schema-validations/min-max';
import Required from 'aio-app-ui-tdc-db-atoms/collection-schema-validations/required';
import DefaultValue from 'aio-app-ui-tdc-db-atoms/collection-schema-validations/default-value';

const AllInOne = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const ui = () => {
        const type = helpers.json.val(props, 'item.id');

        switch (type) {
            case 'min':
            case 'max':
            case 'minLength':
            case 'maxLength':
                return <MinMax {...props} />
            break;
            case 'match':
                return <Match {...props} />
            break;
            case 'enum':
                return <Enums {...props} />
            break;
            case 'required':
                return <Required {...props} />
            break;
            case 'default' :
                return <DefaultValue {...props} />
            break;
            default:
            break;
        }
    }

    return ui()
}

export default AllInOne;