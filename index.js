const teamDetailsContainer = document.querySelector("#teams-container");
let searchBtn = document.querySelector("#search-button");
let searchInput = document.querySelector("#search-input");
let closeBtn = document.querySelector(".close");
let modal = document.querySelector(".modal");
let likeBtn = document.querySelector("#like-button");
let dislikeBtn = document.querySelector("#dislike-button");

let modalContent = document.querySelector(".modal-content");

const teamData = fetchFootballData();

const url = "http://127.0.0.1:3000/teams";

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
    teamCard.addEventListener("click", () => {
      modal.style.display = "block";

      let name = team.name;

      let header = document.createElement("h2");
      header.classList.add("h2");

      header.textContent = "";
      header.textContent = team.name;

      let modalTeam = teamData.filter(({ name }) => name === team.name);

      let dt = modalTeam[0];

      console.log(dt);

      modalContent.prepend(header);

      likeBtn.addEventListener("click", async () => {
        likeBtn.textContent = `Like ${modalTeam[0].likes + 1}`;
        let postReq = await fetch(`http://127.0.0.1:3000/teams`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dt),
        }).then((response) => response.json());

        console.log(postReq);
      });
    });

    const clubName = document.createElement("h2");
    clubName.textContent = team.name;

    const yearFounded = document.createElement("p");
    yearFounded.textContent = `Year Founded: ${team.founded}`;

    const trophiesWon = document.createElement("p");
    trophiesWon.textContent = `Address: ${team.address}`;

    const location = document.createElement("p");
    location.textContent = `Stadium: ${team.stadium} | ${team.capacity}}`;

    const likeContainer = document.createElement("div");

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

  let filtered = allTeams.filter((team) =>
    team
      ? team.name.toLowerCase().startsWith(String(e.target.value)) == true
      : ""
  );
  teamDetailsContainer.textContent = "";

  displayTeamDetails(filtered);
});

closeBtn.addEventListener("click", () => {
  let h2 = document.querySelector(".modal-content h2");
  modal.style.display = "none";
  h2.textContent = "";
});
