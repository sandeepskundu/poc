/*--import props from './props';
import match from './match';
import param from './params';
import action from './actions';
import builder from "./builder";

const route = {
    match:match,
    props:props,
    param:param,
    action:action,
    builder:builder,
}

export default route;--*/

exports.props = require('./props');
exports.builder = require('./builder');