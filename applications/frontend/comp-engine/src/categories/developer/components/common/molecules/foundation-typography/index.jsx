import helpers from 'ui-helpers';

const Comp = (props) => {
    let id = helpers.random.key();
    let familyMap = {
        rg:'Regular',
        md:'Medium',
        sb:'Semibold',
        bd:'Bold'
    }

    const familyList = () => {
        let order = ['rg', 'md', 'sb', 'bd']
        let weight = {
            rg:'400',
            md:'500',
            sb:'600',
            bd:'700'
        }
        
        return order.map((name, i) => {
            return (
                <li className='full bxs pd-b18 flx-vc' key={`${id}${i}`}>
                    <div className={`fm-${name} dis-xs`}>
                        Aa
                    </div>
                    <div className='pd-l16'>
                        <p className='full pd-b2 txt-xs fm-md'>{familyMap[name]}</p>
                        <p className='full txt-xxs txt-c00105'>Font weight: {weight[name]}</p>
                    </div>
                </li>
            )
        })
    }

    const family = () => {
        return (
            <div className='full bxs mr-t30 pd-b40'>
                <ul className='full flx-sb'>
                    <li className='grid-w9'>
                        <p className='full txt-md'>Inter</p>
                        <p className='full mr-t6 dis-lg'>Ag</p>
                        <p className='full mr-t16'>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                        <p className='full mr-t6'>abcdefghijklmnopqrstuvwxyz</p>
                        <p className='full mr-t6'>0123456789!@#$%^&*()</p>
                    </li>
                     <li className='grid-w2'>
                        <ul className='full bxs'>
                            {familyList()}
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }

    const topts = (fm, type) => {
        let v = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs'];

        return v.map((n, i) => {
            return (
                <li className={`full pd-20 bxs bdr-1 bdr-tn bdr-rn bdr-ln bdr-c00103`} key={`${fm}${id}${i}`}>
                    <p className={`full bxs ${type}-${n} fm-${fm}`}>{(type === 'dis')?'Dis':'Text'}</p>
                    <p className='full bxs txt-xxs fm-rg txt-c00106 pd-b10 pd-t4'>
                        <span className='mr-r6'>{familyMap[fm]}</span>
                        <span className='mr-r6 txt-c00104'>|</span>
                        <span className='mr-r6'>{n}</span>
                        <span className='mr-r6 txt-xxs txt-c00104'>|</span>
                        <span>{type}-{n}</span>
                    </p>
                </li>
            )
        })
    }

    const txtOptions = (fm, bg) => {
        return (
            <li className={`grid bxs`}>
                <ul className='full bxs'>
                    {topts(fm, 'dis')}
                    {topts(fm, 'txt')}
                </ul>
            </li>
        )
    }

    const text = () => {
        return (
            <div className='full bxs mr-t30'>
                <ul className='full grid-wrapper grid-layout-4 bxs'>
                    {txtOptions('rg')}
                    {txtOptions('md', 'c00106')}
                    {txtOptions('sb')}
                    {txtOptions('bd', 'c00101')}
                </ul>
            </div>
        )
    }

    return (
        <>
            <div className='full pd-t24 bxs pd-b40'>
                <p className='dis-48 fm-sb pd-b24 bxs full'>Typography</p>
                <p className='full txt-14 bxs'>Our design system leverages a purposeful set of typographic styles. We’ve stress-tested this typographic scale across dozens of projects to make sure it’s robust enough to use across (almost) any project, while remaining as accessible as possible for everyone.</p>
            </div>
            {family()}
            {text()}
        </>
    )
}

export default Comp;