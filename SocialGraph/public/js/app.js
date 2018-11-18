const userValue = document.querySelector("#username");
const passwordValue = document.querySelector("#password");
const searchButton = document.querySelector("#searchButton");
const reposList = document.querySelector(".list-group");
let userName;
let auth;
let userParams;

const fetchRepositories = async (username, password) => {
    const url = "https://api.github.com/user/repos"; 
    auth = btoa(username + ":" + password);
    userParams = {
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
    userName = userValue.value;
    fetchRepositories(userValue.value, passwordValue.value).then((response) => {
        console.log(response);
        for (var i in response.data){
            let repoOwner = response.data[i].owner.login;
            let repoName = response.data[i].name;
            reposList.innerHTML += `<a href="#" 
                                    class="list-group-item list-group-item-action" 
                                    id="${repoName}">
                                    ${repoName}
                                    </a>`; 
            if (repoOwner.toLowerCase() !== userName.toLowerCase()){
                document.querySelector(`#${repoName}`).innerHTML += ` (Owned by ${repoOwner})`; 
            }
         
        }
        var elementsArray = document.querySelectorAll(".list-group-item-action");
        console.log(elementsArray);

        elementsArray.forEach(function (elem) {
            elem.addEventListener("click", function () {
                showRepoStats(elem.id);
            });
        });
       
    })
};

const fetchRepositoryPunchCard = async (username, repository) => {
    
    //GET /repos/:owner/:repo/stats/punch_card
    const url = `https://api.github.com/repos/${username}/${repository}/stats/punch_card`;

    const api_call = await fetch(url);

    const data = await api_call.json();
    return { data }
};

const showRepoStats = (repository) => {
    console.log(`Querying user ${userName} and repo ${repository}`);
    fetchRepositoryPunchCard(userName, repository).then((response) => {
        console.log(response);
    })
};



searchButton.addEventListener("click", () => {
    showData();
})

