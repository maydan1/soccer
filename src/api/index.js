import axios from "axios";

const url = "https://api.football-data.org/v2/teams/";

export const fetchData = async () => {
  try {
    const {
      data
    } = await axios.get(url, {
      headers: {
        'X-Auth-Token': 'd29584b4e0e54a0a8e447e51c503d91d'
      }
    });

    const teamsData = data.teams.map((team) => ({
      id: team.id,
      crest: team.crestUrl,
      name: team.name,
      yearFounded: team.founded,
    }));

    return teamsData;

  } catch (error) {
    console.log(error);
  }
};