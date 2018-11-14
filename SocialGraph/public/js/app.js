const userValue = document.querySelector("#username");
const passwordValue = document.querySelector("#password");
const repoUser = document.querySelector("#repoUser");
const repoName = document.querySelector("#repoName");
const searchButton = document.querySelector("#searchButton");
const statsButton = document.querySelector("#statsButton");
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");
const avatarContainer = document.querySelector(".main__profile-avatar");

const fetchUsers = async (username, password) => {
    const url = "https://api.github.com/user";
    const auth = btoa(username + ":" + password);
    const userParams = {
        headers: {
            'Authorization': 'Basic ' + auth
        }
    }

    const api_call = await fetch(url, userParams);

    const data = await api_call.json();
    return { data }
};

const showData = () => {
    console.log(`Querying user ${userValue.value}`);
    fetchUsers(userValue.value, passwordValue.value).then((res) => {
        console.log(res);

        nameContainer.innerHTML = `Name: <span class="main__profile-value">${res.data.name}</span>`;
        unContainer.innerHTML = `Username: <span class="main__profile-value">${res.data.login}</span>`;

        reposContainer.innerHTML = `Repositories: <span class="main__profile-value">${res.data.public_repos}</span>`;

        urlContainer.innerHTML = `URL: <span class="main__profile-value">${res.data.html_url}</span>`;

        avatarContainer.innerHTML = `<img src="${res.data.avatar_url}" alt="Smiley face" height="150">`;
    })
};

const showGithubData = () => {
    console.log(`Querying user  ${repoUser.value} and repo ${repoName.value}`);
    fetchPunchCard(repoUser.value, repoName.value).then((res) => {
        console.log(res);

        /* nameContainer.innerHTML = `Name: <span class="main__profile-value">${res.data.name}</span>`;
        unContainer.innerHTML = `Username: <span class="main__profile-value">${res.data.login}</span>`;

        reposContainer.innerHTML = `Repositories: <span class="main__profile-value">${res.data.public_repos}</span>`;

        urlContainer.innerHTML = `URL: <span class="main__profile-value">${res.data.html_url}</span>`;

        avatarContainer.innerHTML = `<img src="${res.data.avatar_url}" alt="Smiley face" height="150">`;
 */    
    })
};


const fetchPunchCard = async (username, repository) => {
   /*  GET / repos /: owner /: repo / stats / punch_card */
    const url = `https://api.github.com/repos/${username}/${repository}/stats/punch_card`;
    const auth = btoa(username + ":" + password);
   

    const api_call = await fetch(url);

    const data = await api_call.json();
    return { data }
};

searchButton.addEventListener("click", () => {
    showData();
})

statsButton.addEventListener("click", () => {
    showGithubData();
})