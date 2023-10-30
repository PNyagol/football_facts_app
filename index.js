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

    teamCard.appendChild(clubName);
    teamCard.appendChild(yearFounded);
    teamCard.appendChild(trophiesWon);
    teamCard.appendChild(location);

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

  let filtered = allTeams.filter((team) => team ? team.name.toLowerCase().startsWith(String(e.target.value))==true: '')
  teamDetailsContainer.textContent = "";

  displayTeamDetails(filtered);


});
