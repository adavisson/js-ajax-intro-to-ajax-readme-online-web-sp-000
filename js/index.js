// your code here
function showRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">GetCommits</a></li>'
    )
    .join("")}</ul>`;

  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "http://api.github.com/users/adavisson/repos");
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open(
    "GET",
    "https://api.github.com/repos/adavisson/" + name + "/commits"
  );
  req.send();
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits
    .map(
      commit =>
        "<li><strong>" +
        commit.author.login +
        "</strong> - " +
        commit.commit.message +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById("commits").innerHTML = commitList;
}
