import React, { useEffect, useState } from 'react';
import helpers from 'ui-helpers';

const DESKTOPSRP = (propsny) => {
    const [data, setData] = useState(false);

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
                <p className='full txt-12 mr-t10 txt-c00105'>{arg.description}</p>
            </>
        )
    }

    const shade = (arg) => {
        let shds = helpers.react.map.data(arg, 'shades');
        return shds.map((arg, i) => {
            return (
                <div className='grid bxs dib'>
                    <div className='full pd-rl6 bxs'>
                        <div className='bdr-1 bdr-c00103 full bxs'>
                            <div className={`txt-12 ac pd-tb10 full bg-${arg.vname}`}>{arg.vname}</div>
                            <div className='full bg-c00000'>
                                <p className='full txt-10 pd-8 pd-bn fm-md bxs'>{arg.code}</p>
                                <p className='full txt-10 pd-8 bxs'>{arg.hex}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const shades = (arg) => {
        return (
            <div className='grid-wrapper grid-layout-12 full bxs'>
                {shade(arg)}
            </div>
        )
    }

    const types = (arg) => {
        const rv = helpers.react.map.data(arg, 'types');
        return rv.map((arg, i) => {
            return (
                <ul className='full grid-wrapper pd-tb14 bxs'>
                    <li className='grid-w2 bxs'>{category(arg)}</li>
                    <li className='grid-w10 pd-l20 bxs'>{shades(arg)}</li>
                </ul>
            )
        })
    }

    const colors = () => {
        const rv = helpers.react.map.data(data, 'colors');
        return rv.map((arg, i) => {
            return (
                <div className='full pd-t32 pd-b24 bxs' key={i}>
                    <p className='pd-r40 full -txt-c00110 fm-sb txt-20 bxs'>{arg.heading}</p>
                    <p className='pd-r40 full txt-14 pd-t6 pd-b24 bxs'>{arg.description}</p>
                    {types(arg)}
                </div>
            )
        });
    }

    return (
        <>
            <div className='full pd-40 bg-c00101 bxs'>
                <p className='dis-48 fm-sb pd-b24 bxs full'>{data.heading}</p>
                <p className='full txt-14 bxs'>{data.description}</p>
            </div>
            {colors()}
        </>
    )
}

export default DESKTOPSRP;