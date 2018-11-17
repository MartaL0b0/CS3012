const userValue = document.querySelector("#username");
const passwordValue = document.querySelector("#password");
const searchButton = document.querySelector("#searchButton");
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
    })
};

searchButton.addEventListener("click", () => {
    showData();
})

