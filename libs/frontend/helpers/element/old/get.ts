export default {
	
	byClass(a:any){
		
	},

	byName(name:any){
		if(name){
			let elm = document.getElementsByTagName(name)[0];
			if(elm){
				return elm;
			}
		};
		return false;
	},
	
	byId(a:any){
		if(a){
			const elm = document.getElementById(a);
			if(elm){
				return elm;
			}
		}
		return false;
	},
	
	byAttr(a:any){
		
	},

	height(elm:any){
		if(elm){
			return elm.offsetHeight;
		}
		return 0;
	},

	scrollToChild(pId:any, cId:any, from:any){
		let diff = 0;
		let elm = this.byId(pId);
		let cElm = this.offsetObj(cId);
		let pElm = this.offsetObj(pId);
		
		if(from === 'left'){
			diff = (cElm.left-pElm.left);
		}else{
			diff = (cElm.top-pElm.top);
		}

		if(diff && elm){
			this.scrollTo(elm, 'left', diff)
		}
	},

	offsetObj(id:any){
		let elm:any = this.byId(id);
		let rect = elm.getBoundingClientRect();

		if(elm){
			return {
				top:rect.top+window.scrollY,
				left:rect.left+window.scrollX,
			};
		}else{
			return {
				top:0,
				left:0
			}
		}
	},
	offsetByElement(ele:any){
		let curEle 
		if(ele){
			curEle = ele.currentTarget
			curEle = curEle.getBoundingClientRect()
		}else{
			curEle = {
				bottom: 50,
				height: 20,
				left: 50,
				right: 50,
				top: 50,
				width: 50,
				x: 50,
				y: 50
			}
			}

		return curEle
	},
	offset(elm:any, from:any){
		if(typeof elm === 'string'){
			elm = this.byId(elm);
		};

		if(elm){
			if(from !== 'left'){
				return elm.offsetTop;
			}
		}
		return 0;
	},

	scrollTo(elm:any, from:any, px:any){
		let val = (px?px:0)
		if(elm){
			if(from === 'left'){
				elm.scrollLeft = Math.round(val);
			} else{
				elm.scrollTop = Math.round(val);
			}
		}
	},

	scroll(elm:any, from:any){
		if(elm){
			if(from !== 'left'){
				return elm.offsetTop;
			}
		}
	}
	
}