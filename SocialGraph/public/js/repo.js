var url_string = window.location.href;
var url = new URL(url_string);
var repoName = url.searchParams.get("repoName");
var repoOwner = url.searchParams.get("repoOwner");
console.log(`Getting repoName ${repoName} and repoOwner ${repoOwner}`);