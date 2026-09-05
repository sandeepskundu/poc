const immediate = [
    {id:'SELF', label:'Self'},
    {id:'SPOUSE', label:'Spouse'},
    {id:'FATHER', label:'Father'},
    {id:'MOTHER', label:'Mother'},
    {id:'BROTHER', label:'Brother'},
    {id:'SISTER', label:'Sister'},
    {id:'SON', label:'Son'},
    {id:'DAUGHTER', label:'Daughter'},
]

const inlaw = [
    {id:'FATHER_IN_LAW', label:'Father-in-law'},
    {id:'MOTHER_IN_LAW', label:'Mother-in-law'},
    {id:'BROTHER_IN_LAW', label:'Brother-in-law'},
    {id:'SISTER_IN_LAW', label:'Sister-in-law'},
]

const immediateAndInlaws = [...immediate, ...inlaw];

const all = [...immediate, ...inlaw]

module.exports = {
    all:all,
    inlaw:inlaw,
    immediate:immediate,
    immediateAndInlaws:immediateAndInlaws,
}