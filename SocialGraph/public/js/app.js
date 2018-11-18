const userValue = document.querySelector("#username");
const passwordValue = document.querySelector("#password");
const searchButton = document.querySelector("#searchButton");
const reposList = document.querySelector(".list-group");

const fetchRepositories = async (username, password) => {
    const url = "https://api.github.com/user/repos"; //change this with reposGET /users/:username/repos
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
    fetchRepositories(userValue.value, passwordValue.value).then((response) => {
        console.log(response);
        for (var i in response.data){
            if (response.data[i].owner.login == userValue.value){
                reposList.innerHTML += `<a href="${response.data[i].html_url}" class="list-group-item list-group-item-action">${response.data[i].name}</a>`;
            }
        }
       
    })
};

searchButton.addEventListener("click", () => {
    showData();
})

