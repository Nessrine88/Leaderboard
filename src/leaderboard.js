export default function addListItem(name, score) {
  const displayScores = document.getElementById('displayScores').querySelector('ul');
  let i = 0;
  const li = document.createElement('li');
  li.innerHTML = `<p>${name}: ${score}</p>`;

  i += 1;
  if (i % 2 === 0) {
    li.style.backgroundColor = 'white';
  } else {
    li.style.backgroundColor = 'lightgray';
  }

  displayScores.appendChild(li);
}
