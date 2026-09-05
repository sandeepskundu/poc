/*---
{
    type:"bool",
    to:"user.permissions.canEdit", // Output node destination
    map:{
        type:"dynamic",
        from:"auth.role.isEditor", // 1st try: missing
        fallback: {
            type:"dynamic",
            from:"legacyAuth.can_edit", // 2nd try: missing
            fallback: {
                type:"static",
                value:"true" // 3rd try: fallback value used
            }
        }
    }
}
---*/