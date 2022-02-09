import { useState, useContext } from 'react';
import GithubContext from '../context/github/GithubContext';
import AlertContext from '../context/alert/AlertContext';
import {searchUser} from '../context/github/GithubActions';
function UserSearch() {

    const { user, dispatch, } = useContext(GithubContext);
   const {setAlert}=  useContext(AlertContext);

    const [text, setText] = useState('');
    const handleChange = (e) => setText(e.target.value)
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (text === '') {
            // alert("Please Enter Something")
            setAlert('Please Enter Something', 'error')
        } else {
            // @todo - Search user
            dispatch({type:'SET_LOADING'})
            const users = await searchUser(text)
            dispatch({type:'GET_USER', payload: users})
            setText('')
        }
    }


  
    return <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <div className="relative">
                        <input type="text" className='w-full pr-40 bg-gray-200 input input-lg text-black' placeholder='Search' value={text} onChange={handleChange} />
                        <button type='submit' className="absolute right-0 top-0 rounded-l-none w-36 btn btn-lg">Go</button>
                    </div>
                </div>
            </form>

        </div>
        {user.length >0 && (
            <div>
            <button onClick={()=>{dispatch({type:'CLEAR_USER'})}} className="btn btn-ghost btn-lg">
                Clear
            </button>
        </div>
        )}
    </div>;
}

export default UserSearch;
