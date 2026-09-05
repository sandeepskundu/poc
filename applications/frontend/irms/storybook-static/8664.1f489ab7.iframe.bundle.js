"use strict";(self.webpackChunkirms=self.webpackChunkirms||[]).push([[8664],{"./scrap/ui-libs/components/atoms/0/list/box/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/index.js"),aio_global_ui_atoms_0_list_item__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./scrap/ui-libs/components/atoms/0/list/item/index.jsx"),aio_global_ui_atoms_0_list_header__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./scrap/ui-libs/components/atoms/0/list/header/index.jsx"),React=__webpack_require__("./node_modules/react/index.js");function _array_like_to_array(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _array_without_holes(arr){if(Array.isArray(arr))return _array_like_to_array(arr)}function _iterable_to_array(iter){if("u">typeof Symbol&&null!=iter[Symbol.iterator]||null!=iter["@@iterator"])return Array.from(iter)}function _non_iterable_spread(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _to_consumable_array(arr){return _array_without_holes(arr)||_iterable_to_array(arr)||_unsupported_iterable_to_array(arr)||_non_iterable_spread()}function _unsupported_iterable_to_array(o,minLen){if(o){if("string"==typeof o)return _array_like_to_array(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if("Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array(o,minLen)}}var Comp=function Comp(dprops){var wrp,props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({callbacks:{item:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null},group:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null}},templates:{},data:{},mapping:{group:{end:"",after:"",start:"",before:"",center:"label"},item:{end:"",after:"",start:"",before:"",center:"label"}},childs:{item:{},group:{}},dsTheme:{boxWrapper:{},item:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},group:{end:{},after:{},start:{},before:{},center:{},wrapper:{}}},config:{item:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},group:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},boxWrapper:{ds:{},markup:{}}}},dprops);props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge(props,{data:{},templates:{}});var id=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.random.id(10),rn=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.random.number(),data=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"data",{}),list=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.keys(data||{}),dval="r".concat(id).concat(rn),defaults=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge({mapping:{keys:{type:"type"},group:{end:"",after:"",start:"",before:"",center:"label"},item:{end:"",after:"",start:"",before:"",center:"label"}},childs:{item:{end:dval,after:dval,start:dval,before:dval,center:dval},group:{end:dval,after:dval,start:dval,before:dval,center:dval}},dsTheme:{boxWrapper:{radius:"6",shadow:"md",border:"c00104",background:"c00000"},item:{end:{},after:{},start:{},before:{},center:{},wrapper:{hbackground:"c00101"}},group:{end:{},after:{},start:{},before:{},center:{},wrapper:{background:"c00102"}}},config:{item:{end:{},after:{},start:{},before:{},center:{},wrapper:{markup:{element:"a"}}},group:{end:{},after:{},start:{},before:{},center:{},wrapper:{markup:{element:"div"}}},boxWrapper:{markup:{element:"ul"},ds:{css:{class:{borderNone:{1:!1,2:!1,3:!0,4:!1}}}}}}},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"defaults",{})),typeKey=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(defaults,"mapping.keys.type","type"),getRadius=function getRadius(rval,arg,itemProps,confType,type,first,last){if("config"===confType&&"boxWrapper"!=type){var boxConfig=getConfigByType({},{},"dsTheme","boxWrapper",first,last),radius=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(boxConfig,"radius","");radius&&(last&&(rval=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.set(rval,"wrapper.ds.css.class.radius",{1:0,2:radius})),first&&(rval=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.set(rval,"wrapper.ds.css.class.radius",{1:radius,2:0})))}return rval},borderColor=function borderColor(rval,arg,itemProps,confType,type,first,last){if("dsTheme"===confType&&"boxWrapper"!=type&&("item"===type||"group"===type)){var boxConfig=getConfigByType({},{},"dsTheme","boxWrapper",first,last),border=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(boxConfig,"border",""),hborder=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(boxConfig,"hborder",""),iborder=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(rval,"wrapper.border",""),ihborder=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(rval,"wrapper.hborder","");border&&!iborder&&(rval=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.set(rval,"wrapper.border",border)),hborder&&!ihborder&&(rval=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.set(rval,"wrapper.hborder",hborder))}return rval},getConfigByType=function getConfigByType(arg,itemProps,confType,type,first,last){var iprops=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(itemProps,confType,{}),pprops=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"".concat(confType,".").concat(type),{}),_$dprops=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(defaults,"".concat(confType,".").concat(type),{}),rval=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge(_$dprops,pprops);return rval=borderColor(rval=getRadius(rval,arg,itemProps,confType,type,first,last),arg,itemProps,confType,type,first,last),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge(rval,iprops)},getContent=function getContent(arg,itemProps,confType,type,name){var map=getConfigByType(arg,itemProps,"mapping",type),key=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(map,name,"label"),val=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(arg,key,dval);if(val!=dval)return val},getChilds=function getChilds(arg,itemProps,confType,type){var rval={},childs=getConfigByType(arg,itemProps,confType,type);for(var a in childs){var val=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(childs,a,dval);val!=dval?rval[a]=val:rval[a]=getContent(arg,itemProps,confType,type,a)}return rval},getProps=function getProps(arg,map,first,last){var iprops=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(arg,"props",{}),type=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(arg,typeKey,"item");return{_details:{map:map,data:arg,last:last,first:first},childs:getChilds(arg,iprops,"childs",type),config:getConfigByType(arg,iprops,"config",type,first,last),dsTheme:getConfigByType(arg,iprops,"dsTheme",type,first,last),callbacks:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"callbacks.".concat(type),{}),ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(iprops,"callbacks.".concat(type),{}))}},templates=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge({item:function item(arg,map,first,last){return React.createElement(aio_global_ui_atoms_0_list_item__WEBPACK_IMPORTED_MODULE_3__.A,getProps(arg,map,first,last))},group:function group(arg,map,first,last){return React.createElement(aio_global_ui_atoms_0_list_header__WEBPACK_IMPORTED_MODULE_4__.A,getProps(arg,map,first,last))},noresults:function noresults(){}},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"templates",{})),content=function content(item,map,first,last){var type=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(item,typeKey,"item"),template=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(templates,type,dval),isFun=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.data.type.is(template,"function"),childs=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(item,"childs",{}),clist=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.keys(childs||{});return isFun?React.createElement(React.Fragment,null,template(item,map,first,last&&0===clist.length),clist&&clist.length>0?getList(clist,childs,_to_consumable_array(map),!1):React.createElement(React.Fragment,null)):React.createElement(React.Fragment,null)},getList=function getList(li,data,map,first){return li.map(function(key,i){var m=_to_consumable_array(map),item=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(data,key);return m.push(key),React.createElement("li",{className:"full bxs",key:"dval".concat(i).concat(m.join(""))},content(item,m,first&&0===i,i===li.length-1))})},mergeDs=function mergeDs(map,type){return"ds"===type?ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.merge.ds(props,map,defaults):ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.merge.predefined(props,map,defaults)};return wrp={dsTheme:mergeDs("boxWrapper"),config:mergeDs("boxWrapper","ds")},(0,react__WEBPACK_IMPORTED_MODULE_2__.createElement)("ul",ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.attrs(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge(ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(wrp,"config",{}),{ds:{predefined:ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(wrp,"dsTheme",{})}}),"anim list-box bdr-1"),list&&list.length>0?getList(list,data,[],!0):void 0)};Comp.propTypes={callbacks:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,templates:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,data:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,mapping:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,childs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,dsTheme:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,config:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Comp.defaultProps={callbacks:{item:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null},group:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null}},templates:{},data:{},mapping:{group:{end:"",after:"",start:"",before:"",center:"label"},item:{end:"",after:"",start:"",before:"",center:"label"}},childs:{item:{},group:{}},dsTheme:{boxWrapper:{},item:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},group:{end:{},after:{},start:{},before:{},center:{},wrapper:{}}},config:{item:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},group:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},boxWrapper:{ds:{},markup:{}}}};let __WEBPACK_DEFAULT_EXPORT__=Comp;Comp.__docgenInfo={description:"",methods:[],displayName:"Comp",props:{callbacks:{defaultValue:{value:`{
	item:{
		onBlur:null,
		onClick:null,
		onFocus:null,
		onKeyUp:null,
		dsTheme:null,
		onKeyDown:null,
		onDragStart:null,
		onMouseDown:null,
		onPointerUp:null,
		onPointerDown:null,
		onPointerEnter:null,
		onPointerLeave:null,
		beforeRender:null
	},
	group:{
		onBlur:null,
		onClick:null,
		onFocus:null,
		onKeyUp:null,
		dsTheme:null,
		onKeyDown:null,
		onDragStart:null,
		onMouseDown:null,
		onPointerUp:null,
		onPointerDown:null,
		onPointerEnter:null,
		onPointerLeave:null,
		beforeRender:null
	}
}`,computed:!1},description:"Callback methods",type:{name:"object"},required:!1},templates:{defaultValue:{value:`{

}`,computed:!1},description:"Childs content of list item",type:{name:"object"},required:!1},data:{defaultValue:{value:`{

}`,computed:!1},description:"Childs content of list item",type:{name:"object"},required:!1},mapping:{defaultValue:{value:`{
	group:{
		end:'',
		after:'',
		start:'',
		before:'',
		center:"label"
	},
	item:{
		end:'',
		after:'',
		start:'',
		before:'',
		center:"label"
	}
}`,computed:!1},description:"Childs content of list item",type:{name:"object"},required:!1},childs:{defaultValue:{value:`{
	item:{

	},
	group:{

	}
}`,computed:!1},description:"Childs content of list item",type:{name:"object"},required:!1},dsTheme:{defaultValue:{value:`{
	boxWrapper:{

	},
	item:{
		end:{

		},
		after:{

		},
		start:{

		},
		before:{

		},
		center:{

		},
		wrapper:{

		}
	},
	group:{
		end:{

		},
		after:{

		},
		start:{

		},
		before:{

		},
		center:{

		},
		wrapper:{

		}
	}
}`,computed:!1},description:"Predefined ds theme config",type:{name:"object"},required:!1},config:{defaultValue:{value:`{
	item:{
		end:{

		},
		after:{

		},
		start:{

		},
		before:{

		},
		center:{

		},
		wrapper:{

		}
	},
	group:{
		end:{

		},
		after:{

		},
		start:{

		},
		before:{

		},
		center:{

		},
		wrapper:{

		}
	},
	boxWrapper:{
		ds:{

		},
		markup:{

		}
	}
}`,computed:!1},description:"Ds theme",type:{name:"object"},required:!1}}}},"./scrap/ui-libs/components/atoms/0/list/header/index.jsx"(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var prop_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/prop-types/index.js"),prop_types__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__),ui_helpers__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./build/scripts/ui-helpers/index.js"),aio_global_ui_atoms_0_list_item__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./scrap/ui-libs/components/atoms/0/list/item/index.jsx"),React=__webpack_require__("./node_modules/react/index.js");function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable}))),ownKeys.forEach(function(key){_define_property(target,key,source[key])})}return target}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)}return keys}function _object_spread_props(target,source){return source=null!=source?source:{},Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}),target}var Comp=function Comp(dprops){var props=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.element.jsx.props.define({callbacks:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null},childs:{end:"",after:"",start:"",before:"",center:""},dsTheme:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},config:{end:{},after:{},start:{},before:{},center:{},wrapper:{}}},dprops),defaults=ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.merge({dsTheme:{wrapper:{font__d__family:"sb",className:"item-header bdr-1 bxs"}},config:{center:{},wrapper:{}}},ui_helpers__WEBPACK_IMPORTED_MODULE_1__.json.get(props,"defaults",{}));return React.createElement(aio_global_ui_atoms_0_list_item__WEBPACK_IMPORTED_MODULE_2__.A,_object_spread_props(_object_spread({},props),{defaults:defaults}))};Comp.propTypes={callbacks:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,childs:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,dsTheme:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object,config:prop_types__WEBPACK_IMPORTED_MODULE_0___default().object},Comp.defaultProps={callbacks:{onBlur:null,onClick:null,onFocus:null,onKeyUp:null,dsTheme:null,onKeyDown:null,onDragStart:null,onMouseDown:null,onPointerUp:null,onPointerDown:null,onPointerEnter:null,onPointerLeave:null,beforeRender:null},childs:{end:"",after:"",start:"",before:"",center:""},dsTheme:{end:{},after:{},start:{},before:{},center:{},wrapper:{}},config:{end:{},after:{},start:{},before:{},center:{},wrapper:{}}};let __WEBPACK_DEFAULT_EXPORT__=Comp;Comp.__docgenInfo={description:"",methods:[],displayName:"Comp",props:{callbacks:{defaultValue:{value:`{
	onBlur:null,
	onClick:null,
	onFocus:null,
	onKeyUp:null,
	dsTheme:null,
	onKeyDown:null,
	onDragStart:null,
	onMouseDown:null,
	onPointerUp:null,
	onPointerDown:null,
	onPointerEnter:null,
	onPointerLeave:null,
	beforeRender:null
}`,computed:!1},description:"Callback methods",type:{name:"object"},required:!1},childs:{defaultValue:{value:`{
	end:'',
	after:'',
	start:'',
	before:'',
	center:''
}`,computed:!1},description:"Childs content of list item",type:{name:"object"},required:!1},dsTheme:{defaultValue:{value:`{
	end:{

	},
	after:{

	},
	start:{

	},
	before:{

	},
	center:{

	},
	wrapper:{

	}
}`,computed:!1},description:"Predefined ds theme config",type:{name:"object"},required:!1},config:{defaultValue:{value:`{
	end:{

	},
	after:{

	},
	start:{

	},
	before:{

	},
	center:{

	},
	wrapper:{

	}
}`,computed:!1},description:"Ds theme",type:{name:"object"},required:!1}}}}}]);
//# sourceMappingURL=8664.1f489ab7.iframe.bundle.js.map