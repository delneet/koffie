document.addEventListener('DOMContentLoaded', () => {
  const names = [];

  document.getElementById('addNameButton').addEventListener('click', addName);
  document.getElementById('pickWinnerButton').addEventListener('click', pickWinner);

  function addName() {
    const nameInput = document.getElementById('name');
    const name = nameInput.value.trim();
    if (name) {
      names.push(name);
      updateNameList();
      nameInput.value = '';
    }
  }

  function removeName(index) {
    names.splice(index, 1);
    updateNameList();
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
    if (names.length > 0) {
      const winner = names[Math.floor(Math.random() * names.length)];
      winnerElement.textContent = `${winner} zet de koffie!`;
    } else {
      winnerElement.textContent = 'Voeg eerst namen toe';
    }
  }
});
