import { createContext, useReducer } from "react";
import githubReducer  from "./GithubReducer"

const GithubContext = createContext();



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

    
      return <GithubContext.Provider value={{
        ...state,
        dispatch,
         
      }}>
          {children}
      </GithubContext.Provider>
}

export default GithubContext;