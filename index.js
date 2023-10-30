const teamDetailsContainer = document.querySelector("#teams-container");
let searchBtn = document.querySelector("#search-button");
let searchInput = document.querySelector("#search-input");

async function fetchFootballData() {
  const url = "http://127.0.0.1:3000/teams";
  const options = {
    method: "GET",
  };

  let teams = await fetch(url, options)
    .then((response) => response.json())
    .then((data) => data);

  return teams;
}

async function searchTeam(team) {
  let allTeams = await fetchFootballData();

  return allTeams.filter(({ name }) => name === team);
}

async function postData(data) {
  return await fetch("http://127.0.0.1:3000/teams", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data);
}

function displayTeamDetails(teamData) {
  teamData.forEach((team) => {
    const teamCard = document.createElement("div");
    teamCard.classList.add("team-card");

    const clubName = document.createElement("h2");
    clubName.textContent = team.name;

    const yearFounded = document.createElement("p");
    yearFounded.textContent = `Year Founded: ${team.founded}`;

    const trophiesWon = document.createElement("p");
    trophiesWon.textContent = `Address: ${team.address}`;

    const location = document.createElement("p");
    location.textContent = `Stadium: ${team.stadium} | ${team.capacity}}`;

    const likeContainer = document.createElement("div");

    const like = document.createElement("button");
    like.classList.add("like-button");
    like.textContent = `Like: ${team.dislikes}`;
    like.addEventListener("click", async () => {
      let _allTeams = await fetchFootballData();
      _allTeams.forEach(async (_team) => {
        if (_team.name === team.name) {
          console.log(_team);
          let count = _team.likes += 1;
          like.textContent = `Like(s): ${count}`;
        }
      });
    });

    const dislike = document.createElement("button");
    dislike.classList.add("dislike-button");
    dislike.textContent = `DisLike: ${team.dislikes}`;
    dislike.addEventListener("click", async () => {
      let _allTeams = await fetchFootballData();
      _allTeams.forEach((_team) => {
        if (_team.name === team.name) {
          console.log(_team);
          _team.dislikes += 1;
          dislike.textContent = `DisLike(s): ${(_team.dislikes += 1)}`;
        }
      });
    });

    likeContainer.appendChild(like);
    likeContainer.appendChild(dislike);

    teamCard.appendChild(clubName);
    teamCard.appendChild(yearFounded);
    teamCard.appendChild(trophiesWon);
    teamCard.appendChild(location);
    teamCard.appendChild(likeContainer);

    teamDetailsContainer.appendChild(teamCard);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  let response = await fetchFootballData();

  displayTeamDetails(response);
});

searchBtn.addEventListener("click", async () => {
  let filtered = await searchTeam("Liverpool");

  teamDetailsContainer.textContent = "";

  displayTeamDetails(filtered);
});

searchInput.addEventListener("input", async (e) => {
  console.log(e.target.value);

  let allTeams = await fetchFootballData();

  let filtered = allTeams.filter((team) =>
    team
      ? team.name.toLowerCase().startsWith(String(e.target.value)) == true
      : ""
  );
  teamDetailsContainer.textContent = "";

  displayTeamDetails(filtered);
});
