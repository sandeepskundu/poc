const others = [
  { id: 'TRANSGENDER', label: 'Transgender' },
  { id: 'NON_BINARY', label: 'Non-binary' },
  { id: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' }
];

const _default = [
  {id:'MALE', label:'Male'},
  {id:'FEMALE', label:'Female'},
  {id:'OTHER', label:'Other'},
]

const all = [..._default, ...others]

module.exports = {
  all:all,
  default:_default
}