import React, { useEffect, useState } from 'react';
import helpers from 'ui-helpers';
import Grid from 'aio-global-ui/atoms/grid';
import Container from 'aio-global-ui/atoms/container';
import Text from 'aio-global-ui/atoms/typography/text';
import Display from 'aio-global-ui/atoms/typography/display';

const DESKTOPSRP = (propsny) => {
    const [data, setData] = useState(false);

    const onColorResp = (resp) => {
        setData(helpers.json.val(resp, 'data.data'))
    }

    if(!data){
        helpers.request.init({
            'url': 'http://localhost:1000/builder/dsystem/typography/fonts'
        }, onColorResp)
    }

    const sizes = (fam) => {
        const rv = helpers.react.map.data(data, 'sizes');
        return rv.map((arg, i) => {
            return (
                <div className='full '>
                    <p className={`full mr-t80 ${arg.code} txt-c00110`}>{arg.label}</p>
                    <p className={`full ${arg.code} txt-c00110 cap mr-t16`}>{fam.type}</p>
                </div>
            )
        });
    }

    const fonts = () => {
        const rv = helpers.react.map.data(data, 'fonts');
        return rv.map((arg, i) => {
            return (
                <div className={`grid-w3 fm-${arg.code}`}>
                    {sizes(arg)}
                </div>
            )
        });
    }

    const families = () => {
        const rv = helpers.react.map.data(data, 'fonts');
        return rv.map((arg, i) => {
            return (
                <div className='full grid-wrapper mr-b16'>
                    <div className={`fm-${arg.code} txt-18 grid-w2`}>Aa</div>
                    <div className={`fm-${arg.code} grid-w10`}>
                        <p className='full txt-18 txt-c00110 cap'>{arg.type}</p>
                        <p className='full txt-14 txt-c00107'>Font weight: {arg.weight} | fm-{arg.code}</p>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            <Container background='c00101'>
                <Display element="h1" size="48" family="sb">{data.heading}</Display>
                <Text>{data.description}</Text>
            </Container>
            <Container className="mr-t36">
                <div className='grid-wrapper'>
                    <div className='grid-w4'>
                        <p className='txt-18'>Inter</p>
                        <p className='dis-30 mr-t10'>Ag</p>
                        <p className='full mr-t20'>ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789<br />!@#$%^&*()</p>
                    </div>
                    <div className='grid-w4'>&nbsp;</div>
                    <div className='grid-w4'>{families()}</div>
                </div>
            </Container>
            <div className='grid-wrapper'>
                {fonts()}
            </div>
        </>
    )
}

export default DESKTOPSRP;