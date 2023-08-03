import './style.css';
import addListItem from './leaderboard.js';

const list = JSON.parse(localStorage.getItem('list')) || [];
const addForm = document.getElementById('addForm');
const refreshBtn = document.querySelector('.refreshBtn');
let gameId = null;

const createGameAndGetId = async (gameName) => {
  const apiBaseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
  const response = await fetch(`${apiBaseUrl}games/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: gameName }),
  });

  if (!response.ok) {
    throw new Error('Failed to create the game.');
  }

  return response.json();
};

const objectsToPost = [];

const addObjectsToAPI = async () => {
  const apiBaseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

  try {
    const postPromises = objectsToPost.map(async (obj) => {
      const response = await fetch(`${apiBaseUrl}games/${gameId}/scores/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        console.error('Failed to add object:', obj);
        return false;
      }

      return true;
    });

    const results = await Promise.all(postPromises);
    return results.every((result) => result);
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  list.forEach((data) => {
    addListItem(data.name, data.score);
  });

  try {
    const { result } = await createGameAndGetId('Super Mario');
    [gameId] = result.split('ID: ');
    await addObjectsToAPI();
  } catch (error) {
    console.error('Error:', error);
  }
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value1 = addForm.querySelector('.input1').value;
  const value2 = addForm.querySelector('.input2').value;

  if (!value1 || !value2) {
    console.error('Please provide both a valid username and score.');
    return;
  }

  const data = { name: value1, score: value2 };
  addListItem(data.name, data.score);
  list.push(data);
  localStorage.setItem('list', JSON.stringify(list));

  fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`, {
    method: 'POST',
    body: JSON.stringify({
      user: value1,
      score: value2,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then(() => {
      // Removed console.log here
    });
});

refreshBtn.addEventListener('click', () => {
  fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`)
    .then((res) => res.json())
    .then((data) => {
      const scores = data.result;
      const ul = document.querySelector('ul');
      ul.innerHTML = '';
      scores.forEach((user, index) => {
        const markup = `<li>${user.user} : ${user.score}</li>`;
        ul.insertAdjacentHTML('beforeend', markup);

        if (index % 2 === 0) {
          const li = ul.children[index];
          li.style.backgroundColor = 'white';
        } else {
          const li = ul.children[index];
          li.style.backgroundColor = 'lightgray';
        }
      });
    })
    .catch((error) => console.error('Error:', error));
});
