module.exports = {
    details:{
        "details": {
            "value": "DSAN"
        },
        "hasChilds":true,
        "isAccessControlled":true,
        "name":"Data Science & Analytics",
        "description":"Data Science & Analytics – This function is responsible for transforming raw data into actionable insights that drive strategic and operational decision-making. It involves collecting, processing, and analyzing data from various internal and external sources using statistical methods, machine learning algorithms, and advanced analytics techniques. The team works on building predictive models, trend analysis, customer behavior analysis, and operational performance dashboards. They collaborate closely with product, marketing, operations, and leadership teams to identify opportunities, optimize processes, and improve business outcomes. In addition, the function ensures data quality, governance, and compliance, while leveraging cutting-edge tools for big data processing, data visualization, and AI-driven analytics. By turning data into intelligence, the Data Science & Analytics team empowers the organization to be proactive, competitive, and innovation-driven.",
    },
    childs:{
        0:require('./data-engineering'),
        1:require('./data-analysis'),
        2:require('./machine-learning')
    }
}