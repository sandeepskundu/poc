
import helpers from 'ui-helpers';
import Grid from 'aio-global-ui/atoms/grid';
import React, {useEffect, useState} from 'react';
import Container from 'aio-global-ui/atoms/container';
import Text from 'aio-global-ui/atoms/typography/text';
import Display from 'aio-global-ui/atoms/typography/display';

const DESKTOPSRP = (propsny) => {

    debugger;
    const [data, setData] = useState(false);

    const onColorResp = (resp) => {
        setData(helpers.json.val(resp, 'data.data'))
    }

    if(!data){
        helpers.request.init({
            'url': 'http://localhost:1000/builder/dsystem/colors/codes'
        }, onColorResp)
    }

    const category = (arg) => {
        return (
            <>
                <Text size="18" family="sb" color="c00110" cssClass="mr-tn">{arg.heading}</Text>
                <Text size="14">{arg.description}</Text>
            </>
        )
    }

    const shade = (arg) => {
        let shds = helpers.react.map.data(arg, 'shades');
        return shds.map((arg, i) => {
            return (
                <div className='grid bxs'>
                    <div className='full pd-rl6'>
                        <div className='bdr-1 bdr-c00103 full bxs'>
                            <div className={`txt-12 ac pd-tb10 full bg-${arg.vname}`}>{arg.vname}</div>
                            <div className='full bg-c00000'>
                                <p className='full txt-10 pd-8 pd-bn fm-md'>{arg.code}</p>
                                <p className='full txt-10 pd-8'>{arg.hex}</p>
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
                <Grid 
                    data={{
                        "desktop":{
                            "wrapperCls":"pd-tb16",
                            "grids":{
                                0:{
                                    "size":3,
                                    "element":"div",
                                    "cssClass":"",
                                    "component":category(arg)
                                },
                                2:{
                                    "size":9,
                                    "element":"div",
                                    "cssClass":"",
                                    "component":shades(arg)
                                },
                            }
                        }
                    }}
                />
            )
        })
    }

    const colors = () => {
        const rv = helpers.react.map.data(data, 'colors');
        return rv.map((arg, i) => {
            return (
                <div className='full pd-t32' key={i}>
                    <Display size="20" color="c00110">{arg.heading}</Display>
                    <Text color="c00110">{arg.description}</Text>
                    {types(arg)}
                </div>
            )
        });
    }

    return (
        <>
            <Container background='c00101'>
                <Display element="h1" size="48" family="sb">{data.heading}</Display>
                <Text>{data.description}</Text>
            </Container>
            {colors()}
        </>
    )
}

export default DESKTOPSRP;