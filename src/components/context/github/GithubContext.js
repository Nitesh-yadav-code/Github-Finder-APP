import { createContext, useReducer } from "react";
import githubReducer  from "./GithubReducer"

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) =>{
    // const [user, setUser] = useState([]);
    // const [loading, setLoading] = useState(true);
    const intialState = {
        user: [],
        singleUser:{},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, intialState)

    

      // Get Single User
    const getUser = async(login)=>{

        setLoading();
        const response =await fetch( `${GITHUB_URL}/users/${login}`, {
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            },
        });
        if(response.status === 404){
            window.location = '/notfound'
        }else{

            const data = await response.json();
    
            dispatch({
                type: 'GET_SINGLEUSER',
                payload: data,
            })
        }
      }
      // Get Single User
    const getUserRepos = async(login)=>{
        const params = new URLSearchParams({
            sort: 'created',
            per_page:10,
        })

        setLoading();
        const response =await fetch( `${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            },
        });
        if(response.status === 404){
            window.location = '/notfound'
        }else{

            const data = await response.json();
    
            dispatch({
                type: 'GET_REPOS',
                payload: data,
            })
        }
      }
      //Set loading function
      const setLoading = ()=>{
          dispatch({
              type: 'SET_LOADING',

          })
      }
      const clearUser = ()=>{
        dispatch({
            type: 'CLEAR_USER',
        })
    }
      return <GithubContext.Provider value={{
        ...state,
        dispatch,
          clearUser,
          getUser,
          getUserRepos,
      }}>
          {children}
      </GithubContext.Provider>
}

export default GithubContext;