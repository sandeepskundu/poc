const states = [
    {"id":"AP", "type":"STATE", "label":"Andhra Pradesh"},
    {"id":"AR", "type":"STATE", "label":"Arunachal Pradesh"},
    {"id":"AS", "type":"STATE", "label":"Assam"},
    {"id":"BR", "type":"STATE", "label":"Bihar"},
    {"id":"CT", "type":"STATE", "label":"Chhattisgarh"},
    {"id":"GA", "type":"STATE", "label":"Goa"},
    {"id":"GJ", "type":"STATE", "label":"Gujarat"},
    {"id":"HR", "type":"STATE", "label":"Haryana"},
    {"id":"HP", "type":"STATE", "label":"Himachal Pradesh"},
    {"id":"JH", "type":"STATE", "label":"Jharkhand"},
    {"id":"KA", "type":"STATE", "label":"Karnataka"},
    {"id":"KL", "type":"STATE", "label":"Kerala"},
    {"id":"MP", "type":"STATE", "label":"Madhya Pradesh"},
    {"id":"MH", "type":"STATE", "label":"Maharashtra"},
    {"id":"MN", "type":"STATE", "label":"Manipur"},
    {"id":"ML", "type":"STATE", "label":"Meghalaya"},
    {"id":"MZ", "type":"STATE", "label":"Mizoram"},
    {"id":"NL", "type":"STATE", "label":"Nagaland"},
    {"id":"OR", "type":"STATE", "label":"Odisha"},
    {"id":"PB", "type":"STATE", "label":"Punjab"},
    {"id":"RJ", "type":"STATE", "label":"Rajasthan"},
    {"id":"SK", "type":"STATE", "label":"Sikkim"},
    {"id":"TN", "type":"STATE", "label":"Tamil Nadu"},
    {"id":"TG", "type":"STATE", "label":"Telangana"},
    {"id":"TR", "type":"STATE", "label":"Tripura"},
    {"id":"UP", "type":"STATE", "label":"Uttar Pradesh"},
    {"id":"UT", "type":"STATE", "label":"Uttarakhand"},
    {"id":"WB", "type":"STATE", "label":"West Bengal"},
]

const ut = [
    {"id":"AN", "type":"UNION_TERRITORY", "label":"Andaman and Nicobar Islands"},
    {"id":"CH", "type":"UNION_TERRITORY", "label":"Chandigarh"},
    {"id":"DH", "type":"UNION_TERRITORY", "label":"Dadra and Nagar Haveli and Daman and Diu"},
    {"id":"DL", "type":"UNION_TERRITORY", "label":"Delhi"},
    {"id":"JK", "type":"UNION_TERRITORY", "label":"Jammu and Kashmir"},
    {"id":"LA", "type":"UNION_TERRITORY", "label":"Ladakh"},
    {"id":"LD", "type":"UNION_TERRITORY", "label":"Lakshadweep"},
    {"id":"PY", "type":"UNION_TERRITORY", "label":"Puducherry"}
]

module.exports = {
    ut:ut,
    states:states,
    all:[...states, ...ut]
}