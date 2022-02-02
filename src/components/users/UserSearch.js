import { useState, useContext } from 'react';
import GithubContext from '../context/github/GithubContext';

function UserSearch() {

    const { user, searchUser, clearUser } = useContext(GithubContext);
    const [text, setText] = useState('');
    const handleChange = (e) => setText(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault();

        if (text === '') {
            alert("Please Enter Something")
        } else {
            // @todo - Search user
            searchUser(text)
            setText('')
        }
    }

  
    return <div className='grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
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
            <button onClick={clearUser} className="btn btn-ghost btn-lg">
                Clear
            </button>
        </div>
        )}
    </div>;
}

export default UserSearch;
