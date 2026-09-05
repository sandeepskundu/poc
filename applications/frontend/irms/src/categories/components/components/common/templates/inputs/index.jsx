import helpers from 'ui-helpers';
import Icon from 'aio-global-ui/atoms/0/icons/font';
import Input from 'aio-global-ui/atoms/0/form/input';

const Comp = (dprops) => {
    const props = helpers.element.jsx.props.define({}, dprops);

    const inputs = () => {
        let li = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

        return [1].map(() => {
            return (
                <div className='grid pd-b20 pd-r20'>
                    <Input
                        type="text"
                        prefix={false}
                        suffix={false}
                        readonly={false}
                        label="Label"
                        invalid={false}
                        placeholder="Sandeep kundu"
                        dsTheme={{
                            theme:'000',
                            size:'xl'
                        }}
                        callback={{
                            onEnter:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onBeforeInput:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onBlur:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onChangeStart:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onChangeEnd:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onChange:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onCompositionEnd:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onCompositionStart:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onCompositionUpdate:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onCopy:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onCut:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onFocus:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onInput:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onKeyDown:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onKeyUp:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onPaste:(e) => { console.log(e.type, e?.target?.tagName || '')},
                            onSelect:(e) => { console.log(e.type, e?.target?.tagName || '')}
                        }}

                        config={{
                            config:{
			icons:{
                right:null,
				left:{
					svg:{},
					attrs:{},
					markup:{},
					type:'font',
					icon:{
						name:'da'
					},					
					ds:{
                        theme:{
                            default:{
                                text:{
                                    default:'c10906'
                                }
                            },
                            focused:{
                                text:{
                                    default:'c11008'
                                }
                            }
                        }
					}
				}
			}}
                        }}


                    />
                </div>
            )
        })
    }
    
    const ui = () => {
        return (
            <div className='full pd-t60 grid-wrapper grid-layout-6'>
                {inputs()}
                {inputs()}
                {inputs()}
                {inputs()}
                {inputs()}
                {inputs()}
                {inputs()}
                {inputs()}
                {inputs()}
                {inputs()}
            </div>
        )  
    }

    return ui();
}

export default Comp;