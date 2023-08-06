import './style.css';
import  addListItem  from './leaderboard.js';

const list = JSON.parse(localStorage.getItem('list')) || [];
const addForm = document.getElementById('addForm');
const displayScores = document.getElementById('displayScores').querySelector('ul');
const refreshBtn = document.querySelector('.refreshBtn');

document.addEventListener('DOMContentLoaded', () => {
  list.forEach((data) => {
    addListItem(data.name, data.score);
  });
});

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value1 = addForm.querySelector('.input1').value;
  const value2 = addForm.querySelector('.input2').value;
  const data = { name: value1, score: value2 };
  addListItem(data.name, data.score);
  list.push(data);
  localStorage.setItem('list', JSON.stringify(list));
});

refreshBtn.addEventListener('click', () => {
  displayScores.innerHTML = '';
  list.length = 0;
});
