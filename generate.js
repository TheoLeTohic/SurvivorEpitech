//generatename and put it in firebase

const urlmanname = " https://www.randomlists.com/data/names-male.json"
const urlfemalname = "https://www.randomlists.com/data/names-female.json"
const urllastname = "https://www.randomlists.com/data/names-last.json"


async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response.json());
      return response.json();
    } catch (error) {
      console.error('Unable to fetch data:', error);
    }
  }

  fetchData(urlmanname);