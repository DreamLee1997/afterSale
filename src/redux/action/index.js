
// 1.定义事件类型
export const type = {
    SWITCH_MENE:'SWITCH_MENE',
    ACCESS_TOKEN:'ACCESS_TOKEN' 
}
//2.定义事件方法
export function switchMenu(menuName){
    // 返回一个object对象
    return{
        type:type.SWITCH_MENE,
        menuName
    }
}
export function getToken(token){
    return{
        type:type.ACCESS_TOKEN,
        token
    }
}