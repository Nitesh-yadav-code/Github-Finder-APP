 const githubReducer = (state, action)=>{
    switch (action.type){
        case 'GET_USER':
            return{
                ...state,
                user: action.payload,
                loading: false
            }
        case 'GET_USER_AND_REPOS':{
            return{
                ...state,
                singleUser: action.payload.user,
                repos: action.payload.repos,
                loading: false
            }
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