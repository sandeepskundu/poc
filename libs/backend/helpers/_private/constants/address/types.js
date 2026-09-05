
const others = [
    {id: 'SHIPPING', label:'Shipping Address'},
    {id: 'HOME', label:'Home Address'},
    {id: 'WORK', label:'Work Address'},
    {id: 'OFFICE', label:'Office Address'},
    {id: 'TEMPORARY', label:'Temporary Address'},
    {id: 'OTHER', label:'Other Address'}
];

const _default = [
    {id:'CURRENT', label:'Current Address'},
    {id:'PERMANENT', label:'Permanent Address'},
    {id:'BILLING', label:'Billing Address'},
]


module.exports = {
    default:_default,
    all:[..._default, ...others]
}