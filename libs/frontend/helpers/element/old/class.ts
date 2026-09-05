export default {
	animation(id:any, cls:any){
		if(id){
			let el:any = window[_CN].element.get.byId(id);
			if(el){
				this.add(el, cls);
				el.addEventListener('animationend',()=>{
					el.classList.remove(cls);
				});
			}
		}
	},

	setAtr(){
		let rv = ['s', 'e', 't', 'A', 't', 't', 'r', 'i', 'b', 'u', 't', 'e'];
		return (rv.join(''));
	},

	add(el:any, cls:any) {
		if(el){
			let sa = this.setAtr();
			let hasCls = this.has(el, cls);
			if(!hasCls){
				if(el.classList.value){
					let clses = el.classList.value;
						el.classList.value = clses+' '+cls;
				}else{
					let	clsList =	el.getAttribute('class');
					if(clsList){
						clsList = clsList.split(' ');
					}else{
						clsList = []
					}
					clsList.push(cls);
					el[sa]('class', clsList.join(' '));
				}
			}
		}
	},
	
	remove(elm:any, cls:any) {
		if(elm){
			let sa = this.setAtr();
			let clss = elm.classList.value;
			if(!clss){
				clss = elm.getAttribute('class');
			};

			if(clss){
				clss = clss.split(' ');
				let clsI = clss.indexOf(cls);
				if(clsI >= 0){
					clss.splice(clsI, 1);
					clss = clss.join(' ');	
					elm[sa]('class', clss);
					this.remove(elm, cls);
				};
			}	  
		}
	},
			
	has(elm:any, cls:any){
		let clsList = []
		
		if(elm && elm.classList){
			clsList =	elm.getAttribute('class');
		    if(clsList){
		    	clsList = clsList.split(' ');
		    }
		};
		if(clsList && clsList.indexOf(cls) > -1){
			return true;
		};
		return false;
	},
	
	toggle(elm:any, cls:any){
		let hasClass = this.has(elm, cls);
	    if(hasClass){
	      this.remove(elm, cls);
	    }else{
	      this.add(elm, cls)
	    }
	}
}