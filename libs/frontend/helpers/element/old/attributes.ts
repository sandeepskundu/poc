export default {
	
	get(el:any, atr:any){
		if(el && (el.getAttribute(atr) || el.getAttribute(atr) === '')){
			return el.getAttribute(atr);
		}
		return false;
	},

	setAtr(){
		let rv = ['s', 'e', 't', 'A', 't', 't', 'r', 'i', 'b', 'u', 't', 'e'];
		return (rv.join(''));
	},
			
	set(elm:any, attr:any, val:any){
		let sa:any = this.setAtr();
		if(elm && elm[sa]){
			elm[sa](attr, val);
		};
	},
	
	has(elm:any, attr:any){
		
	},
	
	remove(elm:any, attr:any){
		if(elm && elm.removeAttribute){
			elm.removeAttribute(attr);
		};
	}
	
}