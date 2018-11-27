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
    if (validateParameters()) {
        fetchUsers(userValue.value, passwordValue.value).then((response) => {
            if (response.data.message == "Bad credentials") {
                badCredentials.style.display = 'block';
            } else {
                badCredentials.style.display = 'none';
                nameContainer.innerHTML = `Name: <span class="main__profile-value">${response.data.name}</span>`;
                unContainer.innerHTML = `Username: <span class="main__profile-value">${response.data.login}</span>`;

                reposContainer.innerHTML = `Repositories: <span class="main__profile-value">${response.data.public_repos}</span>`;

                urlContainer.innerHTML = `URL: <span class="main__profile-value">${response.data.html_url}</span>`;

                avatarContainer.innerHTML = `<img src="${response.data.avatar_url}" alt="Smiley face" height="150">`;
            }
            
        })
    }
};

const validateParameters = () => {
    if (userValue.value == "" || passwordValue.value == "") {
        warningMessage.style.display = 'block';
        return false;
    } else {
        warningMessage.style.display = 'none';
        return true;
    }
}

searchButton.addEventListener("click", () => {
    showData();
})
