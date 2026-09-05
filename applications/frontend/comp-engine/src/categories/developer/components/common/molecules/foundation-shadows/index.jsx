import helpers from 'ui-helpers';

const Comp = (props) => {
    const id = helpers.random.key();
    const shadow = helpers.json.get(props, 'data.global.shadow', {});

    const list = () => {
        let li = helpers.json.keys(shadow);

        return li.map((name, i) => {
            return (
                <li className='grid pd-r60 bxs pd-b60' key={`${id}${i}`}>
                    <div className={`full bxs pd-tb80 bg-c00000 bdr-8 bdr-1 bdr-c00103 shdw-${name}`}>
                        <p className='full bxs ac txt-md'>shadow-{name}</p>
                        <p className='full bxs ac txt-xxs mr-t6 txt-c00105'>shdw-{name}</p>
                    </div>
                </li>
            )
        })
    }

    return (
        <>
            <div className='full pd-t24 bxs pd-b40'>
                <p className='dis-48 fm-sb pd-b24 bxs full'>Shadows</p>
                <p className='full txt-14 bxs'>Shadows allow you to add depth and realism to designs by positioning elements on a z-axis.</p>
            </div>
            <ul className='full grid-wrapper grid-layout-4 mr-t40'>
                {list()}
            </ul>
            
        </>
    )
}

export default Comp;