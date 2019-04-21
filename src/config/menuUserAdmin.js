/* 审批管理人员左侧导航栏菜单 */
const menuList = [
    {
        title:'首页',
        key:'/userAdmin/home'
    },
    {
        title:'查看申请',
        key:'/userAdmin/watchApplication',
        
    },
    {
        title:'普通售后审批',
        key:'/userAdmin/approveCharge',
        children:[    
            {
                title:'已审批',
                key:'/userAdmin/approveCharge/finsh',
            },
            {
                title:'待审批',
                key:'/userAdmin/approveCharge/waiting',
            },
        ]
        
    },
    {
        title:'出差审批',
        key:'/userAdmin/approveTrip',
        children:[
            {
                title:'已审批',
                key:'/userAdmin/approveTrip/success',
            },
            {
                title:'待审批',
                key:'/userAdmin/approveTrip/waiting',
            },
        ]
        
    },
];

export default menuList;