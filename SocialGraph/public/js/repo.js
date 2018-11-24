var url_string = window.location.href;
var url = new URL(url_string);
var repoName = url.searchParams.get("repoName");
var repoOwner = url.searchParams.get("repoOwner");
console.log(`Getting repoName ${repoName} and repoOwner ${repoOwner}`);

const fetchRepositoryPunchCard = async (repoOwner, repoName) => {

    //GET /repos/:owner/:repo/stats/punch_card
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
    })
};



window.onload = function () {
    showRepoStats(repoOwner, repoName);
};