const userValue = document.querySelector("#username");
const passwordValue = document.querySelector("#password");
const searchButton = document.querySelector("#searchButton");
const reposList = document.querySelector(".list-group");
const arrowButton = document.querySelector("#arrowButton");
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
    console.log(`Querying user ${userValue.value}`);
    fetchUserInfo(userValue.value, passwordValue.value).then((resp) => {
        loggedUser = resp.data.login;
    })
    fetchRepositories(userValue.value, passwordValue.value).then((response) => {
        console.log(response);
        for (var i in response.data) {
            if (response.data[i].private !== true) {
                var repository = createRepo(response.data[i]);
                reposList.appendChild(repository);
            }
        }
        arrowButton.style.display = 'block';
    })
   
};

const createRepo = (repositoryData) => {
    let repoOwner = repositoryData.owner.login;
    let repoName = repositoryData.name;

    var repo = document.createElement('a');
    repo.innerHTML = repoName;
    repo.dataset.owner = repoOwner;
    repo.dataset.name = repoName;
    repo.href = "#";
    repo.className += "list-group-item list-group-item-action";
    
    if (repoOwner !== loggedUser) {
        repo.innerHTML += ` (Owned by ${repoOwner})`;
    }
    
    repo.appendChild(createButtonPunchCard(repoName, repoOwner));
    repo.appendChild(createButtonDaysChart(repoName, repoOwner));
    repo.appendChild(createButtonHoursChart(repoName, repoOwner));

    return repo;
};

const createButtonPunchCard = (repoName, repoOwner) => {
    var button = document.createElement('a');
    button.innerHTML = 'Punchcard';
    button.className += "btn btn-info";
    button.href = `chart.html?repoName=${repoName}&repoOwner=${repoOwner}`;
    return button;
};

const createButtonDaysChart = (repoName, repoOwner) => {
    var button = document.createElement('a');
    button.innerHTML = 'Commits by day';
    button.className += "btn btn-secondary";
    button.href = `barChartDays.html?repoName=${repoName}&repoOwner=${repoOwner}`;
    return button;
};

const createButtonHoursChart = (repoName, repoOwner) => {
    var button = document.createElement('a');
    button.innerHTML = 'Commits by hour';
    button.className += "btn btn-dark";
    button.href = `barChartHours.html?repoName=${repoName}&repoOwner=${repoOwner}`;
    return button;
};

searchButton.addEventListener("click", () => {
    showData();
})

