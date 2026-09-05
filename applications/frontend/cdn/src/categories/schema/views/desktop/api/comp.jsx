import helpers from 'ui-helpers';

const JsxBuilder = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const itag = {
        'img':true
    }

    const child = (elem) => {
        const elm = helpers.json.val(elem, 'name');
        const clem = helpers.json.val(elem, 'childs');
        const ctype = helpers.data.type.get(clem);

        if(elm && !itag[elm]){
            if(ctype === 'object'){
                return build(clem)
            }else{
                return helpers.json.val(elem, 'content');
            }
        }else{
            return null;
        }
    }

    const getProps = (elem) => {
        let rval = {};
        let pprops = helpers.json.val(elem, 'props');
        let pmap = helpers.json.val(elem, 'propsMap');

        if(pmap){
            for(const a in pmap){
                rval = helpers.json.set(rval, a, helpers.json.get(props.componentProps, pmap[a], {}), false, false)
            }
        }

        for(const a in pprops){
            rval[a] = helpers.json.merge(helpers.json.get(rval, a, {}), helpers.json.get(pprops, a, {}));
        }

        return rval;
    }

    const extendProps = (rval, elem) => {
        let dv = {};
        let pmap = helpers.json.val(elem, 'dataPropsMap');
        let dp = helpers.json.merge(rval, helpers.json.get(elem, 'dataProps', {}));

        if(pmap){
            for(const a in pmap){
                dv = helpers.json.set(dv, a, helpers.json.get(props.componentProps, pmap[a], {}), false, false)
            }
        }

        dp = helpers.json.merge(dv, dp);

        return {...rval, ...dp};
    }

    const jsxAttrs = (elem) => {
        return extendProps(helpers.element.jsx.attrs(getProps(elem)), elem);
    }

    const html = (elem) => {
        return helpers.react.utils.createElement(helpers.json.val(elem, 'name'), jsxAttrs(elem), child(elem))
    }

    const jsx = (elem) => {
        let comp = helpers.json.val(props.componentsList, elem.name);
        let cProps = extendProps(getProps(elem), elem);
            cProps.componentProps = props.componentProps;
            cProps.componentsList = props.componentsList;

        return comp(cProps);
    }

    const compile = (elem) => {
        const type = helpers.json.val(elem, 'type');
        switch(type) {
            case 'html':
                return html(elem);
            break;
            case 'jsx':
                return jsx(elem);
            break;
            default:
            return ''
        }
    }

    const build = (resp) => {
        const list = Object.keys(resp);

        if(list && list.length > 0){
            return list.map((a, i) => {
                return compile(resp[a]);
            })
        }else{
            return ''
        }
    }

    const parse = (resp) => {
        let t = helpers.data.type.get(resp);
        if(t === 'object'){
            return build(resp)
        }
    }

    const ui = () => {
        return parse(props.schema);
    }

    return ui();
}

JsxBuilder.__PROP__TYPES__

JsxBuilder.__DEFAULT__PROP__

export default JsxBuilder;