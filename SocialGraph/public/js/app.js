const userValue = document.querySelector("#username");
const passwordValue = document.querySelector("#password");
const searchButton = document.querySelector("#searchButton");
const reposList = document.querySelector(".list-group");
const arrowButton = document.querySelector("#arrowButton");
const warningMessage = document.querySelector("#warningMessage");
let loggedUser;


const fetchRepositories = async (username, password) => {
    const url = "https://api.github.com/user/repos"; 
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

const fetchUserInfo = async (username, password) => {
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
   if (validateParameters()){
       fetchUserInfo(userValue.value, passwordValue.value).then((resp) => {
           loggedUser = resp.data.login;
       })
       fetchRepositories(userValue.value, passwordValue.value).then((response) => {
           for (var i in response.data) {
               if (response.data[i].private !== true) {
                   var repository = createRepo(response.data[i]);
                   reposList.appendChild(repository);
               }
           }
           arrowButton.style.display = 'block';
       })
   }
};

const createRepo = (repositoryData) => {
    let repoOwner = repositoryData.owner.login;
    let repoName = repositoryData.name;

    var repo = document.createElement('a');
    repo.innerHTML = repoName;
    repo.dataset.owner = repoOwner;
    repo.dataset.name = repoName;
    repo.href = `punchCard.html?repoName=${repoName}&repoOwner=${repoOwner}`;
    repo.className += "list-group-item list-group-item-action";
    
    if (repoOwner !== loggedUser) {
        repo.innerHTML += ` (Owned by ${repoOwner})`;
    }

    return repo;
};

const validateParameters = () =>{
    if (userValue.value == "" || passwordValue.value == ""){
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

