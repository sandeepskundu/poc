exports.run = {
    mode: [
        {
            id: 'queue',
            label: "Queue"
        }, {
            id: "parallel",
            label: 'Parallel'
        }
    ],
    status: [
        {
            id: 'queued',
            label: "Queued"
        }, {
            id: "running",
            label: 'Running'
        }, {
            id: "completed",
            label: "Completed"
        }, {
            id: "failed",
            label: "Failed"
        }, {
            id: "stopped",
            label: "Stopped"
        }
    ]
}