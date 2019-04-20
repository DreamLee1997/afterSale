import { type } from "../action";

/*Reducer 数据处理*/ 
const initialState = {
    menuName:'首页',
    token:'',
}
export default (state = initialState,action)=>{
    switch(action.type){
        case type.SWITCH_MENE:
            return{
                ...state,
                menuName:action.menuName
            }
        case type.ACCESS_TOKEN:
            return{
                ...state,
                token:action.token
            }
        default:
            return{
                ...state
            }
    }

}