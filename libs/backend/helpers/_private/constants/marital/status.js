const others = [
  {id:'SEPARATED', label:'Separated'},
  {id:'ENGAGED', label:'Engaged'},
  {id:'IN_RELATIONSHIP', label:'In a Relationship'},
  {id:'LIVE_IN', label:'Live-in Relationship'},
  {id:'PREFER_NOT_TO_SAY', label:'Prefer not to say'},
  {id:'OTHER', label:'Other'},
];

const _default = [
  {id:'SINGLE', label:'Single'},
  {id:'MARRIED', label:'Married'},
  {id:'DIVORCED', label:'Divorced'},
  {id:'WIDOWED', label:'Widowed'},
]

const all = [..._default, ...others];

module.exports = {
  all:all,
  default:_default
}