module.exports = {
    type:{
        default:[
            {
                id: 'viewer',
                label: 'Viewer',
                description: 'Read-only access'
            }, {
                id: 'editor',
                label: 'Editor',
                description: 'Read and update existing content'
            }, {
                id: 'contributor',
                label: 'Contributor',
                description: 'Create, read, and update content'
            }, {
                id: 'manager',
                label: 'Manager',
                description: 'Full CRUD access except ownership transfer'
            }, {
                id: 'owner',
                label: 'Owner',
                description: 'Full control including access management'
            }, {
                id: 'superadmin',
                label: 'Super Admin',
                description: 'System-wide unrestricted access'
            }, {
                id: 'blocked',
                label: 'Blocked',
                description: 'No access'
            }
        ]
    },
    PERMISSION_MATRIX:{
        viewer:['read'],
        editor:['read', 'update'],
        contributor:['create', 'read', 'update'],
        manager:['create', 'read', 'update', 'delete'],
        owner:['create', 'read', 'update', 'delete', 'grant'],
        superadmin: ['*'],
        blocked:     []
    }
}