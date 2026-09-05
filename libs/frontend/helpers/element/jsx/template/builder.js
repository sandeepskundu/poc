const json = require('./../../../json');
const dtype = require('./../../../data/type');

const eventHandlers = {
  handleClick: () => alert('Button Clicked!')
};

const childLabel = (ch, data) => {
    debugger;
}

const childs = (arg, data) => {
    let ch = json.val(arg, 'children', {});
    let isObj = dtype.is(ch, 'object');
    let isList = dtype.is(ch, 'array');
    let isString = dtype.is(ch, 'string');

    if(isString){
        return ch;
    }else{
        if(isObj && !isList){
            let chl = json.length(ch);
            if(chl > 0){
                if(ch.valuemap){
                    return childLabel(ch, data);
                }else{
                    return ch;
                }
            }
        }else{
            if(isObj && isList){
                const rv = {};

                for(const a in ch){
                    rv[a] = ch[a];
                }

                return childs(rv, data);
            }else{
                return null
            }
        }
    }
}

const parseChilds = (children, data, comps, react) => {
    
    let isString = dtype.is(children, 'string');

    if(children){
        if(isString){
            return children;
        }else{
            let list = json.toList(children);

            return list.map((arg, i) => {
                return render(arg, data, comps, react);
            })
        }
    }else{
        return null;
    }
}

const render = (arg, data, comps, react) => {
    if(typeof arg === 'string') {
        return arg;
    }else{
        let name = json.val(arg, 'name', '');
        let props = json.val(arg, 'props', {});
        let type = json.val(arg, 'type', 'html');
        let children = childs(arg, data);

        switch (type) {
            case 'html':
                return react.lib.createElement(name, props, parseChilds(children, data, comps, react));
            break;
            case 'jsx':
            break;
            default:
                return null
        }
        
        //const {type, props = {}, children = [] } = node;
    }
}

/*--
function renderElement(node) {
  if (typeof node === 'string') return node;

  

  const processedProps = {
    ...props,
    onClick: typeof props.onClick === 'string' ? eventHandlers[props.onClick] : props.onClick
  };

  return React.createElement(
    type,
    processedProps,
    ...(Array.isArray(children)
      ? children.map((child, idx) => <React.Fragment key={idx}>{renderElement(child)}</React.Fragment>)
      : [renderElement(children)])
  );
}

export default function DynamicRenderer({ config }) {
  return renderElement(config);
}---*/


const start = (config, data, comps, rect) => {
    debugger;

    return render(config, data, comps, rect)
}

exports.start = start;