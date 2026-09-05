const adults = [
    {
        id:'Mr', 
        label: 'Mr.' 
    }, {
        id:'Mrs', 
        label: 'Mrs.'
    }, {
        id:'Ms',
        label:'Ms.'
    },
]

const child = [
    {
        id:'Miss', 
        label: 'Miss'
    }, {
        id:'Master',
        label:'Master'
    }
]

const infant = [
    {
        id:'Miss', 
        label: 'Miss'
    }, {
        id:'Master',
        label:'Master'
    }
]

module.exports = {
    child:child,
    infant:infant,
    adults:adults,
    all:[...adults, ...child, ...infant]
}