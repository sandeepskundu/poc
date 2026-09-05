module.exports = {
    details:{
        "details": {
            "value": "HRMS"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Human Resources (HR) Department",
        "description":"Human Resources (HR) Department – The HR Department is responsible for managing the organization’s most valuable asset—its people. This function oversees recruitment, onboarding, employee development, performance management, compensation and benefits, and employee relations. HR ensures compliance with labor laws and organizational policies, promotes a positive work culture, and supports workforce planning to meet business objectives. Additionally, the department handles training and development programs, succession planning, employee engagement initiatives, and conflict resolution. By aligning employee needs with organizational goals, the HR Department fosters talent growth, retention, and overall organizational effectiveness.",
    },
    childs:{
        0:require('./recruitment'),
        1:require('./employee-relations'),
        2:require('./learning-development'),
        3:require('./compensation-benefits')
    }
}