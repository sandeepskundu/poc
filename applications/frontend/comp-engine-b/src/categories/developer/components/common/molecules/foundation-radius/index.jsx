import helpers from 'ui-helpers';

const Comp = (props) => {
    const id = helpers.random.key();
    const radius = helpers.json.get(props, 'data.global.radius', {});

    const list = () => {
        let li = helpers.json.keys(radius);

        return li.map((name, i) => {
            return (
                <li className='grid pd-r40 bxs pd-b40' key={`${id}${i}`}>
                    <div className={`full bxs bg-c00000 pd-tb40 bdr-1 bdr-c00104 shdw-md bdr-${name}`}>
                        <p className='full bxs ac txt-md'>radius-{name}</p>
                        <p className='full bxs ac txt-xxs mr-t6 txt-c00105'>bdr-{name}</p>
                    </div>
                </li>
            )
        })
    }

    return (
        <>
            <div className='full pd-t24 bxs pd-b40'>
                <p className='dis-48 fm-sb pd-b24 bxs full'>Radius</p>
                <p className='full txt-14 bxs'>Use border radius values to quickly style the border-radius of an element. Border radius values are useful for rounding edges of images, buttons, or any other element. Just like pre-defined spacing values, working from a defined border radius system allows you to work faster and more consistently.</p>
            </div>
            <ul className='full grid-wrapper grid-layout-6 mr-t40'>
                {list()}
            </ul>
            <p className='full txt-14 bxs mr-t40'>Working from a pre-defined and limited radius system for adding border radiuses (or radii) to elements allows you to work faster and consistently. Untitled UI uses a pre-defined and limited radius system derived from the primitive spacing values.</p>
        </>
    )
}

export default Comp;