export default function addListItem(name, score) {
  const displayScores = document.getElementById('displayScores').querySelector('ul');
  const li = document.createElement('li');
  li.innerHTML = `${name} : ${score}`;
  li.style.width = '100%';

  displayScores.appendChild(li);
}
