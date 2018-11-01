const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const nameContainer = document.querySelector(".main__profile-name");
const unContainer = document.querySelector(".main__profile-username");
const reposContainer = document.querySelector(".main__profile-repos");
const urlContainer = document.querySelector(".main__profile-url");

const client_id = 'Iv1.998edc0aa181fcce';
const client_secret = 'cc10fc862c91e2ea6cfbdaf26410f2c65e38ac19';

const fetchUsers = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);

    const data = await api_call.json();
    return { data }
};

const showData = () => {
    console.log(`Querying user ${inputValue.value}`);
    fetchUsers(inputValue.value).then((res) => {
        console.log(res);
    })
};

searchButton.addEventListener("click", () => {
    showData();
})