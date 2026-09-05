const get = (props) => {
    return {
        schema:props.childComponents,
        componentProps:props.componentProps,
        componentsList:props.componentsList
    }
}

exports.get = get;