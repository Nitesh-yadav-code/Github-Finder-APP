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
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer, intialState)
    const searchUser = async(text)=>{

        const params = new URLSearchParams({
            q: text
        })
        setLoading();
        const response =await fetch( `${GITHUB_URL}/search/users?${params}`, {
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            },
        });
        const {items} = await response.json();
        // setUser(data);
        // setLoading(false);

        dispatch({
            type: 'GET_USER',
            payload: items,
        })
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
          user: state.user,
          loading: state.loading,
          searchUser,
          clearUser,
      }}>
          {children}
      </GithubContext.Provider>
}

export default GithubContext;