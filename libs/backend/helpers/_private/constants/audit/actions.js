const defaults = [
    {
        id:'CREATE',
        label:"Create",
        desc:"A brand-new Root or Child node was created."
    }, {
        id:"UPDATE",
        label:'Update',
        desc:"A single node's key, name, summary, description, value, or extend was modified."
    }, {
        id:"BATCH_CREATE",
        label:"Batch create",
        desc:"Multiple nodes were created together in a single atomic batch request."
    }, {
        id:"BATCH_UPDATE",
        label:"Batch update",
        desc:"Multiple nodes were updated together in a single atomic batch request."
    }, {
        id:"MOVE",
        label:"Move",
        desc:"A node (and its subtree) was moved under a different parent (mapId changed)."
    }, {
        id:"MERGE",
        label:"Merge",
        desc:"Changes from a source tree (e.g., UAT) were promoted/merged into a target tree (e.g., Prod)."
    }, {
        id:"SOFT_DELETE",
        label:"Soft delete",
        desc:"DELETE /api/nodes/:id	A node and its descendants were moved to the Trash (extend.lifecycle.isDeleted = true)."
    }, {
        id:"RESTORE",
        label:"Restore",
        desc:"A soft-deleted node and its descendants were restored from the Trash (isDeleted = false)."
    }, {
        id:"DRAFT_SUBMIT",
        label:"Draft submit",
        desc:"(Maker–Checker) A user proposed a new value (extend.lifecycle.pendingValue) waiting for admin approval."
    }, {
        id:"DRAFT_APPROVE",
        label:"Draft approve",
        desc:"(Maker–Checker) An admin approved the pending draft, promoting pendingValue into the live value."
    }, {
        id:"ROLLBACK",
        label:"Rollback",
        desc:"A single node was reverted back to an older state from its audit history."
    }, {
        id:"RELEASE_RESTORE",
        label:"Release restore",
        desc:"An entire tree was rolled back to a tagged release snapshot (e.g., v1.0.0)."
    }
]

exports.defaults = defaults;