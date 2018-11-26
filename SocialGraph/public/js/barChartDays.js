var url_string = window.location.href;
var url = new URL(url_string);
var repoName = url.searchParams.get("repoName");
var repoOwner = url.searchParams.get("repoOwner");
var chart;

const fetchRepositoryPunchCard = async (repoOwner, repoName) => {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/stats/punch_card`;
    const api_call = await fetch(url);
    const data = await _parseJSON(api_call);

    return { data };
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
        console.log(response.data[0]);
        console.log(typeof response.data[0]);
        console.log(transformData(response.data));
        h1(`Commits per day in repo ${repoName}`);
        chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: transformData(response.data)
            }, 
            axis: {
                x: {
                    type: 'category',
                    tick: {
                        multiline: false
                    },
                    height: 130
                }
            }
        });
    })
};

const transformData = (array) => {
    var transformedData = [
        ['x','Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'], 
        ['Commits per day', 0, 0, 0, 0, 0, 0, 0]
    ]; 
    var counter = 0;
    var currentDay = 0;
    for (var i = 1; i < array.length; i++){
        if (array[i][0] === currentDay) {
            counter += array[i][2];
        } else {
            transformedData[1][currentDay + 1] = counter;
            currentDay++;
            counter = 0;
        }
    }
    return transformedData;
};


const h1 = (text) => {
    var h1 = document.querySelector('#chartTitle');
    h1.appendChild(document.createTextNode(text));
}

window.onload = function () {
    showRepoStats(repoOwner, repoName);
};