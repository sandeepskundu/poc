module.exports = {
    details:{
        "details": {},
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Global Roles",
        "code":"GLOBAL_ROLES",
        "description":"Employee Global Roles are organization-wide roles that apply to every employee, regardless of their department, team, or designation. Unlike department-specific roles (e.g., Frontend Developer in Technology or Recruiter in HR), global roles define the baseline responsibilities, permissions, and access that all employees share across the company. They ensure consistency, fairness, and security in how employees interact with organizational systems, policies, and resources.",
    },
    childs:{
        0:require('./identity')
    }
}