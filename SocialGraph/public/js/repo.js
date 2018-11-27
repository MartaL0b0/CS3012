var url_string = window.location.href;
var url = new URL(url_string);
(url);
var repoName = url.searchParams.get("repoName");
var repoOwner = url.searchParams.get("repoOwner");
(`Getting repoName ${repoName} and repoOwner ${repoOwner}`);
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
    fetchRepositoryPunchCard(repoOwner, repoName).then((response) => {
        if(_isEmpty(response.data)){
            h1(`Repo ${repoName} is empty`, true);
        } else if (response.data.message == "Not Found") {
            h1(`Repo ${repoName} not found`, true);
        } else {
            h1(`Punchcard for repo ${repoName}`);
            chart.render(response.data);
            updateURLS();
        }
    })
};

const h1 = (text, error) => {
    var h1 = document.querySelector('#chartTitle');
    h1.appendChild(document.createTextNode(text));
    if (error) {
        var goBack = document.querySelector('#goBack'); 
        goBack.style.display = 'block';
    }
}

const updateURLS = () => {
    var buttonsUrl = url.search;
    var button1 = document.querySelector('#barchartDay');
    var button2 = document.querySelector('#barchartHour');
    button1.href = `barChartDays.html${buttonsUrl}`;
    button2.href = `barChartHours.html${buttonsUrl}`;
    button1.style.display = 'inline';
    button2.style.display = 'inline';

}

window.onload = function () {
    showRepoStats(repoOwner, repoName);
};

function _isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
}