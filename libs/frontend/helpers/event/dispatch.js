const json = require('./../json');

const fromEvent = (props, ...args) => {
    let evntId = json.val(props, 'formConfig.ids.eventId');
    let dispatch = json.val(props, 'formConfig.eventBus.dispatch');

        if(evntId && dispatch){
            dispatch(evntId, ...args);
        }
}

exports.fromEvent = fromEvent;