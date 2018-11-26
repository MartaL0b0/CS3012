var url_string = window.location.href;
var url = new URL(url_string);
var repoName = url.searchParams.get("repoName");
var repoOwner = url.searchParams.get("repoOwner");
console.log(`Getting repoName ${repoName} and repoOwner ${repoOwner}`);
var chart = punchcard({
    target: '#punchcard-bubbles',
    width: 600
});

const fetchRepositoryPunchCard = async (repoOwner, repoName) => {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/stats/punch_card`;
    const api_call = await fetch(url);
    const data = await _parseJSON(api_call);

    return {data};
};

const _parseJSON = (response) => {
    return response.text().then(function (text) {
        return text ? JSON.parse(text) : {}
    })
}
const showRepoStats = (repoOwner, repoName) => {
    console.log(`Querying user ${repoOwner} and repo ${repoName}`);
    fetchRepositoryPunchCard(repoOwner, repoName).then((response) => {
        console.log(response);
        h1(`Punchcard for repo ${repoName}`);
        chart.render(response.data);
    })
};

const h1 = (text) => {
    var h1 = document.querySelector('#chartTitle');
    h1.appendChild(document.createTextNode(text));
}

window.onload = function () {
    showRepoStats(repoOwner, repoName);
};



/**
 * 
 * repo.appendChild(createButtonPunchCard(repoName, repoOwner));
repo.appendChild(createButtonDaysChart(repoName, repoOwner));
repo.appendChild(createButtonHoursChart(repoName, repoOwner));

const createButtonPunchCard = (repoName, repoOwner) => {
    var button = document.createElement('a');
    button.innerHTML = '1';
    button.className += "btn btn-info";
    button.href = `punchCard.html?repoName=${repoName}&repoOwner=${repoOwner}`;
    return button;
};

const createButtonDaysChart = (repoName, repoOwner) => {
    var button = document.createElement('a');
    button.innerHTML = '2';
    button.className += "btn btn-secondary";
    button.href = `barChartDays.html?repoName=${repoName}&repoOwner=${repoOwner}`;
    return button;
};

const createButtonHoursChart = (repoName, repoOwner) => {
    var button = document.createElement('a');
    button.innerHTML = '3';
    button.className += "btn btn-dark";
    button.href = `barChartHours.html?repoName=${repoName}&repoOwner=${repoOwner}`;
    return button;
};
 */