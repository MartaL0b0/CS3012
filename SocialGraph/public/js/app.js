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
            reposList.innerHTML += `<a href="${response.data[i].html_url}" class="list-group-item list-group-item-action" id="${response.data[i].owner.login}_${response.data[i].name}">
                                        ${response.data[i].name}</a>`; 
            if (response.data[i].owner.login.toLowerCase() !== userValue.value.toLowerCase()){
                document.querySelector(`#${response.data[i].owner.login}_${response.data[i].name}`).innerHTML += ` (Owned by ${response.data[i].owner.login})`; 
            }
         
        }
       
    })
};

searchButton.addEventListener("click", () => {
    showData();
})

