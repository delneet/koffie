document.addEventListener('DOMContentLoaded', () => {
  const names = JSON.parse(localStorage.getItem('names')) || [];

  const nameInput = document.getElementById('name');
  document.getElementById('addNameButton').addEventListener('click', addName);
  document.getElementById('pickWinnerButton').addEventListener('click', pickWinner);
  nameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addName();
    }
  });

  updateNameList();

  function addName() {
    const name = nameInput.value.trim();
    const winnerElement = document.getElementById('winner');
    if (name) {
      names.push(name);
      updateNameList();
      nameInput.value = '';
      winnerElement.hidden = true;
      saveNames();
    }
    nameInput.focus();
  }

  function removeName(index) {
    names.splice(index, 1);
    updateNameList();
    saveNames();
  }

  function updateNameList() {
    const nameList = document.getElementById('nameList');
    nameList.innerHTML = '';
    names.forEach((name, index) => {
      const li = document.createElement('li');
      li.textContent = name;
      li.appendChild(createRemoveButton(index));
      nameList.appendChild(li);
    });
  }

  function createRemoveButton(index) {
    const button = document.createElement('button');
    button.textContent = 'Verwijder';
    button.addEventListener('click', () => removeName(index));
    return button;
  }

  function pickWinner() {
    const winnerElement = document.getElementById('winner');
    winnerElement.hidden = false;
    if (names.length > 0) {
      const winner = names[Math.floor(Math.random() * names.length)];
      winnerElement.textContent = `${winner} zet de koffie!`;
    } else {
      winnerElement.textContent = 'Voeg eerst namen toe';
    }
  }

  function saveNames() {
    localStorage.setItem('names', JSON.stringify(names));
  }
});
