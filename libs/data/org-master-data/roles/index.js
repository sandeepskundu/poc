module.exports = {
    details:{
        "details": {},
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Employees Roles",
        "code":"EMPLOYEE_ROLES",
        "description": "Employee Roles represent the set of responsibilities, permissions, and expectations assigned to an employee within an organization. Roles define what tasks an employee can perform, what decisions they are authorized to make, and what level of access they have to company resources, systems, and data."
    },
    childs:{
        0:require('./global-roles')
    }
}