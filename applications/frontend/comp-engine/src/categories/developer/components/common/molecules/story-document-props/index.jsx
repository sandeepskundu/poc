import helpers from 'ui-helpers';
import ReactJson from 'react-json-view'

const Comp = (props) => {
    const id = helpers.random.key();
    const blank = helpers.json.get(props, 'blank', false);
    const defaults = helpers.json.get(props, 'data.props.default', {});
    const data = helpers.json.get(props, 'data.storybook.propTypes.data', {});

    const list = (() => {
        let rval = helpers.json.keys(data);
            rval.sort((a, b) => a.localeCompare(b));

        return rval;
    })();

    const required = (n) => {
        let req = helpers.json.get(data, `${n}.required`, false);

        if(req){
            return <span className='txt-c00307'>*</span>
        }else{
            return <></>
        }
    }

    const name = (n) => {
        return (
            <li className='grid-w2 pd-20 bxs bdr-1 bdr-tn bdr-bn bdr-ln bdr-c00103 fm-sb txt-sm'>
                {n}
                {required(n)}
            </li>
        )
    }

    const type = (n) => {
        let map = {
            shape:'object',
            nested:'object'
        }
        let typ = helpers.json.get(data, `${n}.type`, '');

        if(typ){
            return <span className='pd-rl16 pd-tb4 bg-c00101 bdr-round mr-t6 bdr-1 bdr-c00103 txt-xs fm-md'>{map[typ] || typ}</span>
        }
    }

    const description = (n) => {
        let desc = helpers.json.get(data, `${n}.desc`, '');

        return (
            <li className='grid-w9 pd-20 bxs bdr-1 bdr-tn bdr-bn bdr-ln bdr-c00103'>
                {desc?<p className='full bxs pd-b12' dangerouslySetInnerHTML={{ __html:desc}}></p>:<></>}
                {type(n)}
            </li>
        )
    }   

    const defaultValue = (n) => {
        let val = helpers.json.get(defaults, n);
        let typ = helpers.json.get(data, `${n}.type`, '');

        if(typ === 'shape'){
            return (
                <ReactJson 
                    src={val}
                    name={null}
                    collapsed={1}
                    sortKeys={true}
                    indentWidth={6}
                    iconStyle="square"
                    theme="bright:inverted"
                    enableClipboard={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    collapseStringsAfterLength={5}
                    _onEdit={(arg) => {
                        console.log(arg)
                    }}
                    onEdit={false}
                />
            )
        }else{
            return `${val}`
        }
    }
    
    const defaultUi = (n) => {
        return (
            <li className='grid-w2 pd-rl4 pd-tb10 bxs bdr-1 bdr-tn bdr-bn bdr-ln bdr-c00103'>
                {defaultValue(n)}
            </li>
        )
    }

    const propui = () => {
        if(list && list.length > 0){
            return list.map((n, i) => {
                return (
                    <ul className={`full anim grid-wrapper anim bdr-1 bdr-c00103 hbg-c00102 bdr-tn txt-sm ${(i === list.length -1)?'bdr-b8':''} ${helpers.is.odd(i)?'bg-c00100':'bg-c0000   '}`} key={`${id}${i}`}>
                        {name(n)}
                        {description(n)}
                        {/*--defaultUi(n)--*/}
                    </ul>
                )
            })
        }
    }

    const ui = () => {
        if(blank){

        }else{
            return (
                <>
                    <p className='full bxs pd-rl16 txt-lg fm-md pd-b12 pd-t30'>Props API</p>
                    <div className='full pd-rl16 bxs'>
                        <div className='full shdw-md bdr-8'>
                            <ul className='full grid-wrapper bg-c00101 bdr-t8 bdr-1 bdr-c00103 fm-md txt-sm'>
                                <li className='grid-w2 pd-rl16 pd-tb10 bxs bdr-1 bdr-tn bdr-bn bdr-ln bdr-c00103'>Props Name</li>
                                <li className='grid-w9 pd-rl16 pd-tb10 bxs bdr-1 bdr-tn bdr-bn bdr-ln bdr-c00103'>Description</li>
                                <li className='grid-w2 pd-rl16 pd-tb10 bxs bdr-1 bdr-tn bdr-bn bdr-ln bdr-c00103 hide'>Default</li>
                                <li className='grid-w1 pd-rl16 pd-tb10 bxs bdr-1 bdr-tn bdr-bn bdr-rn bdr-ln bdr-c00103'>Schema</li>
                            </ul>
                            {propui()}
                        </div>
                    </div>
                </>
            )
        }
    }

    return ui();
}

export default Comp;
