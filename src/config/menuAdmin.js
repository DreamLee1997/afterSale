const menuList = [
    {
        title:'首页',
        key:'/admin/home'
    },
    {
        title:'人员管理',
        key:'/admin/userManage',
    },

    {
        title:'审批管理',
        key:'/admin/approvalManage',
        children:[
            {
                title:'查看申请单',
                key:'/admin/approvalManage/watch',
            },
            {
                title:'等待审批',
                key:'/admin/approvalManage/waiting',
            },
            {
                title:'审批通过',
                key:'/admin/approvalManage/success',
            },
            {
                title:'审批未通过',
                key:'/admin/approvalManage/failure',
            }
        ]
    },
    {
        title:'资金管理',
        key:'/admin/capitalManage',
    },
];

export default menuList;