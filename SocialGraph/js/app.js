var github = require(octonode);

var client = github.client({
    id: 'Iv1.998edc0aa181fcce',
    secret: 'cc10fc862c91e2ea6cfbdaf26410f2c65e38ac19'
});

const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");

/* const client_id = 'Iv1.998edc0aa181fcce';
const client_secret = 'cc10fc862c91e2ea6cfbdaf26410f2c65e38ac19'; */

const fetchUsers = async (user) => {
   // const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);
    
    var data;
    client.get('/user', {}, function (err, status, body, headers) {
        data = body; //json object
    });
    return { data }
};

const showData = () => {
    console.log(`Querying user ${inputValue.value}`);
    fetchUsers(inputValue.value).then((res) => {
        console.log(res);

        nameContainer.innerHTML = `Name: <span class="main__profile-value">${res.data.name}</span>`;
        unContainer.innerHTML = `Username: <span class="main__profile-value">${res.data.login}</span>`;

        reposContainer.innerHTML = `Repositories: <span class="main__profile-value">${res.data.public_repos}</span>`;

        urlContainer.innerHTML = `URL: <span class="main__profile-value">${res.data.html_url}</span>`;


    })
};

searchButton.addEventListener("click", () => {
    showData();
})