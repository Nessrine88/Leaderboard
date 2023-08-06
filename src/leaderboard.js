export default function addListItem(name, score) {
  const displayScores = document.getElementById('displayScores').querySelector('ul');
  const li = document.createElement('li');
  li.innerHTML = `<p>${name} : ${score}</p>`;
  li.style.boxSizing = 'border-box';

  displayScores.appendChild(li);
}
