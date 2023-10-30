document.addEventListener('DOMContentLoaded', () => {
    function fetchFootballData(teamName) {
        const apiKey = 'f99ef6c7f4mshbcacdbbf20a09fdp1e50b8jsnd2b567586440';
        const apiUrl = `https://api-football-beta.p.rapidapi.com/teams?search=`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Host': 'api-football-beta.p.rapidapi.com',
                'X-RapidAPI-Key': apiKey,
            },
        })
        .then(response => response.json())
        .then(data => {
            const teamData = data.response;
            displayTeamDetails(teamData);
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    function displayTeamDetails(teamData) {
    
    
        const teamDetailsContainer = document.getElementById('team-details-container');
        teamDetailsContainer.innerHTML = '';
    
        teamData.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.classList.add('team-card');

            const clubName = document.createElement('h2');
            clubName.textContent = team.name;
    
            const yearFounded = document.createElement('p');
            yearFounded.textContent = `Year Founded: ${team.founded}`;
    
            const trophiesWon = document.createElement('p');
            trophiesWon.textContent = `Trophies Won: ${team.trophies}`;
    
            const location = document.createElement('p');
            location.textContent = `Location: ${team.country}, ${team.city}`;
    

            teamCard.appendChild(clubName);
            teamCard.appendChild(yearFounded);
            teamCard.appendChild(trophiesWon);
            teamCard.appendChild(location);

            teamDetailsContainer.appendChild(teamCard);
        });
    }
    


});
