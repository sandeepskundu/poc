import {useState} from "react";
import helpers from 'ui-helpers';

const Comp = (props) => {
    const [data, setData] = useState(false);
    const id = helpers.json.get(_siteProps_, 'router.params.hash', '');

    const onColorResp = (resp) => {
        setData(helpers.json.val(resp, 'data.data'))
    }

    if(!data){
        helpers.request.init({
            'url': 'http://localhost:5000/api/props-engine/ds/colors/v1/list/fetch'
        }, onColorResp)
    }

    const category = (arg) => {
        return (
            <>
                <p className='full fm-sb txt-14'>{arg.heading}</p>
                <p className='full txt-12 mr-t4 txt-c00105 pd-b14'>{arg.description}</p>
            </>
        )
    }

    const shade = (arg) => {
        let shds = helpers.react.map.data(arg, 'shades');
        return shds.map((arg, i) => {
            return (
                <div className={`grid bxs dib`} key={`${id}${i}${i}`}>
                    <div className='full bxs'>
                        <div className={`txt-12 fm-m ac pd-tb40 full bg-${arg.vname} ${(i > 3)?'txt-c00000':''}`}>{arg.vname}</div>
                        <div className='full bg-c00000 pd-l4 pd-b6'>
                            <p className='full txt-10 fm-m pd-8 pd-bn fm-md bxs'>{arg.code}</p>
                            <p className='full txt-10 fm-m pd-8 bxs'>{arg.hex}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const shades = (arg) => {
        return (
            <div className='grid-wrapper grid-layout-12 full bxs bdr-8 oh bdr-1 bdr-c00104 shdw-sm'>
                {shade(arg)}
            </div>
        )
    }

    const types = (arg) => {
        const rv = helpers.react.map.data(arg, 'types');
        return rv.map((arg, i) => {
            return (
                <ul className='full mr-tb40 bxs bdr-8 oh' key={`${id}${i}`}>
                    <li className='full bxs'>{category(arg)}</li>
                    <li className='full bxs'>{shades(arg)}</li>
                </ul>
            )
        })
    }

    const colors = () => {
        const rv = helpers.react.map.data(data, 'colors');
        return rv.map((arg, i) => {
            return (
                <div className='full pd-t32 pd-b24 bxs' key={`${id}${i}${i}${i}`}>
                    <p className='pd-r40 full -txt-c00110 fm-sb txt-20 bxs'>{arg.heading}</p>
                    <p className='pd-r40 full txt-14 pd-t6 pd-b8 bxs'>{arg.description}</p>
                    {types(arg)}
                </div>
            )
        });
    }

    return (
        <>
            <div className='full pd-t24 bxs'>
                <p className='dis-48 fm-sb pd-b24 bxs full'>{data.heading}</p>
                <p className='full txt-14 bxs'>{data.description}</p>
            </div>
            {colors()}
        </>
    )
}

export default Comp;