export default {

	keyup(elm:any, arg:any, clb:any){
		if(elm){
			elm.onkeyup = function(e:any) {
			    if(clb){
			    	clb(e, arg);
			    }
			};
		};
	},
			
	keydown(elm:any, arg:any, clb:any){
		if(elm){
			elm.onkeydown = function(e:any) {
			    if(clb){
			    	clb(e, arg);
			    }
			};
		};
	},

	onfocus(elm:any, arg:any, clb:any){
		if(elm){
			elm.onkeydown = function(e:any) {
			    if(clb){
			    	clb(e, arg);
			    }
			};
		};
	},

	bindCallback(e:any, type:any){
        let arg = e.currentTarget.arg;
        if(arg.callback && arg.callback[type]){
            arg.callback[type](e, e.currentTarget);
        };
	},

	bindEvents(elm:any, events:any){
        for(let a in events){
            elm.addEventListener(a, this.bindCallback);
        }
    },

	init(id:any, arg:any){
        let that = this;
        setTimeout(function(){
            let elm = window[_CN].element.get.byId(id);
            if(elm && arg){
                elm.arg = arg;
                that.bindEvents(elm, arg.events);
            }
        }, 100);
    },

	noSubmitOnEnter(id:any){
		let elm:any = window[_CN].element.get.byId(id);
		if(elm && elm.addEventListener){
			const noEnter = (e:any) => {
				if (e.keyCode == 13) {
					e.preventDefault();
				}
			}

			elm.removeEventListener('keyup', noEnter);
			elm.removeEventListener('keydown', noEnter);
			elm.removeEventListener('keypress', noEnter);

			elm.addEventListener('keyup', noEnter);
			elm.addEventListener('keydown', noEnter);
			elm.addEventListener('keypress', noEnter);
		}
	},

	
}