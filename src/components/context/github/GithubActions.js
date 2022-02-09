import axios from "axios";
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
    baseURL: GITHUB_URL,
    headers:{Authorization: `token ${GITHUB_TOKEN}`}
})

// Search User
// export const searchUser = async (text) => {

//     const params = new URLSearchParams({
//         q: text
//     })
//     const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
//         headers: {
//             Authorization: `token ${GITHUB_TOKEN}`
//         },
//     });
//     const { items } = await response.json();
    
//     return items
// }
// Search User
export const searchUser = async (text) => {

    const params = new URLSearchParams({
        q: text
    })
    const response = await github.get(`search/users?${params}`)
    return response.data.items
}


export const getUserAndRepos = async(login)=>{
    const params = new URLSearchParams({
        sort: 'created',
        per_page: 10,
    })
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos?${params}`)
    ])

    return {user: user.data, repos: repos.data}
}