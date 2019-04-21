/* 普通售后人员左侧导航栏菜单 */
const menuList = [
    {
        title:'首页',
        key:'/user/home'
    },
    {
        title:'申请',
        key:'/user/application',
        children:[
            {
                title:'普通售后服务费申请',
                key:'/user/application/charge',
            },
            {
                title:'出差申请',
                key:'/user/application/trip',
            },    
        ]
    },

    {
        title:'申请结果',
        key:'/user/applicationResult',
        
    },


];

export default menuList;