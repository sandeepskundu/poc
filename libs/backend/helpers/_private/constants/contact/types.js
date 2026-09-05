const others = [
  {id:'HOME', label:'Home'},
  {id:'WORK', label:'Work'},
  {id:'OFFICE', label:'Office'},
  {id:'FAMILY', label:'Family'},
  {id:'FRIEND', label:'Friend'},
  {id:'OTHER', label:'Other'}
];

const _default = [
    {id:'PERSONAL', label:'Personal Contact'},
    {id:'EMERGENCY_1', label:'Emergency Contact'},
    {id:'EMERGENCY_2', label:'Emergency Contact 2'},
]

module.exports = {
    default:_default,
    all:[..._default, ...others]
}