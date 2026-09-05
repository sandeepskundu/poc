export default {
  loadSsrWidget(d: any) {
    let data = d
      ? d
      : {
          aiportHomePageWidget: {
            data: {
              tt: 'O',
              ac: 'BOM',
              popup: 'x',
              tenant: 'D',
              class: 'ECO',
              pax: '1_0_0',
              q: 'DEL-BOM-14032022',
              lables: {
                tripTypePlaceholder: 'Trip type',
                tripType: 'One Way',
                fromPlaceholder: 'From - DEL',
                from: 'New Delhi',
                toPlaceholder: 'To - BOM',
                to: 'Mumbai',
                departOnPlaceholder: 'Depart on',
                departDate: 'Fri, 27 Jan',
                returnOnPlaceholder: 'Return on',
                travelAndClassPlaceholder: 'Travellers &amp; Class',
                paxAndClass: '1 Traveller(s) | Economy',
                searchButtonPlaceholder: 'Search',
              },
            },
            env: helpers.url.get.envByHostName(),
            version: 'base',
            language: 'en',
            container: 'flight-be',
            client: {
              name: 'airport-home-page',
              last: 'Kundu',
            },
            rVersion: {
              js: 'home-page',
              css: 'home-demo',
            },
            extra: {
              excludeFids: false,
              labels: {
                to: '',
              },
            },
            widgetsLoader: {
              env: helpers.url.get.envByHostName(),
            },
            channelId: 'Web',
          },
        };

    this.init({
      conf: {
        submit: true,
        skipAppend: true,
        attrs: {
          method: 'post',
          action: '/flight/middleware/ui/widget/ssrWidgets',
        },
      },
      inputs: [
        {
          name: 'data',
          id: 'data',
          value: JSON.stringify(data),
        },
      ],
    });
  },

  init(arg: any) {
    /*--var temp = {
				conf:{
					submit:false,
					skipAppend:true,
					attrs:{
						method:'post',
						action:''
					}
				},
				inputs:[
				   {
					   name:'test',
					   id:'testid'
				   },
				   {
					   name:'test1',
					   id:'testid1',
					   type:'text'
				   }
				]
			}
		arg = temp;--*/

    let conf = arg.conf;

    if (conf && arg.inputs) {
      let inputs = arg.inputs,
        f = this.createForm(conf.attrs);

      for (let i in inputs) {
        f.appendChild(this.createInput(inputs[i]));
      }

      return this.submitForm(f, conf);
    }

    return false;
  },

  submitForm(f: any, arg: any) {
    if (arg.submit) {
      document.body.appendChild(f);
      f.submit();
    } else {
      return f;
    }
  },

  createForm(arg: any) {
    return this.setMultipleAttr(document.createElement('form'), arg);
  },

  createInput(arg: any) {
    if (!arg.type) {
      arg.type = 'hidden';
    }

    return this.setMultipleAttr(document.createElement('input'), arg);
  },

  setAtr() {
    let rv = ['s', 'e', 't', 'A', 't', 't', 'r', 'i', 'b', 'u', 't', 'e'];

    return rv.join('');
  },

  setMultipleAttr(el: any, arg: any) {
    for (let a in arg) {
      if (arg[a]) {
        let sa = this.setAtr();

        el[sa](a, arg[a]);
      }
    }

    return el;
  },
};
