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
        h1(`Commits per hour in repo ${repoName}`);
        chart = c3.generate({
            bindto: '#chart',
            data: {
                x: 'x',
                columns: transformData(response.data),
                type: 'bar'
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
    console.log(array);
    console.log(typeof array[0][2]);
    var transformedData = [
        ['x', '12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a','10a','11a','12p',
        '1p','2p','3p','4p','5p','6p','7p','8p','9p','10','11p']
    ];
    var outputCommits = new Array(24);
    outputCommits.fill(0);

    for (var i = 0; i < array.length; i++) { 
        var counter = outputCommits[array[i][1]];
        console.log("counter");
        console.log(counter);
        if (counter === 0){
            outputCommits[array[i][1]] = array[i][2];
        } else{
            outputCommits[array[i][1]] = array[i][2] + counter;
        }

        
    }
    
    outputCommits.unshift('Commits per hour');
    console.log(outputCommits);
    console.log(transformedData);
    transformedData.push(outputCommits);
    console.log(transformedData);
    return transformedData;
};


const h1 = (text) => {
    var h1 = document.querySelector('#chartTitle');
    h1.appendChild(document.createTextNode(text));
}

window.onload = function () {
    showRepoStats(repoOwner, repoName);
};