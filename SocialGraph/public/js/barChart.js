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
        h1(`Punchcard for repo ${repoName}`);
        chart = c3.generate({
            bindto: '#chart',
            data: {
                rows: transformData(response.data)
            }
        });
    })
};

const transformData = (response) => {
    /*transdorm response to look like this: 
        [
            ['data1', 30, 200, 100, 400, 150, 250],
            ['data2', 50, 20, 10, 40, 15, 25]
        ]*/
    transformedData = 
        [
            ['commits per hour'],
            [90], [120], [300]
        ];
    
    return transformedData;
};


const h1 = (text) => {
    var h1 = document.querySelector('#chartTitle');
    h1.appendChild(document.createTextNode(text));
}

window.onload = function () {
    showRepoStats(repoOwner, repoName);
};