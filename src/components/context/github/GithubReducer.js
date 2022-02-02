 const githubReducer = (state, action)=>{
    switch (action.type){
        case 'GET_USER':
            return{
                ...state,
                user: action.payload,
                loading: false
            }
        case 'SET_LOADING':{
            return {
                ...state,
                loading: true
            }
        } 
       case 'CLEAR_USER':{
           return{
               ...state,
               user: [],
           }
       }    
        default:
            return state
    }
}
export default githubReducer