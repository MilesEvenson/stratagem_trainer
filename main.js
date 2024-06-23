const KEY_ICONS = {
  u: '⬆️',
  r: '➡️',
  d: '⬇️',
  l: '⬅️',
};


const KEY_LABELS = {
  u: 'up',
  r: 'right',
  d: 'down',
  l: 'left',
};


const KEY_MAP = {
  w: 'u',
  d: 'r',
  s: 'd',
  a: 'l',
};



if (!ALL_COMBOS) {
  console.error('Combo list failed to load');
}
let selectedCombos = (ALL_COMBOS).slice(0);
let currentCombo = null;
let currentCodeIndex = -1;


// ///////////////////////////////////////////////////////////////////////////


function reset() {
  document.getElementById('current').innerHTML = '';
  document.getElementById('log').innerHTML = '';

  document.getElementById('skip').style.setProperty('display', 'none');
  document.getElementById('start').style.setProperty('display', 'inline');

  currentCombo = null;
  currentCodeIndex = -1;
  stopListenCombo();
}


function buildComboBox(combo) {
  const container = document.createElement('div');
  container.classList.add('card');

  const icon = document.createElement('div');
  icon.classList.add('icon');
  icon.classList.add(combo.category);

  const label = document.createElement('p');
  label.classList.add('label');
  label.innerText = combo.label;

  const code = document.createElement('p');
  code.classList.add('code');
  combo.code
    .split('')
    .forEach(c => {
      const key = document.createElement('span');
      key.classList.add('code-key');
      key.innerText = KEY_ICONS[c];
      code.append(key);
    });

  container.append(icon);
  container.append(label);
  container.append(code);

  return container;
}


function cueCombo(combo) {
  const prevBox = document.querySelector('#current > :first-child');

  if (prevBox) {
    const prevItem = document.createElement('li');
    prevItem.append(prevBox);
    document.getElementById('log').prepend(prevItem);
  }

  const nextBox = buildComboBox(combo);
  document.getElementById('current').innerHTML = '';
  document.getElementById('current').append(nextBox);
}


function nextCombo() {
  const pick = Math.floor(Math.random() * selectedCombos.length);
  currentCombo = selectedCombos[pick];
  currentCodeIndex = 0;
  cueCombo(currentCombo);
}


function handleComboKey(ev) {
  console.log('document heard keydown:', ev);
  const trainer = document.getElementById('trainer');
  if (!trainer?.classList.contains('listening')) {
    return;
  } else if (!currentCombo || currentCodeIndex < 0) {
    console.warn('handling combo key with bad state', { currentCombo, currentCodeIndex });
    return;
  }
  // map ev.key to direction
  if (!(ev.key in KEY_MAP)) {
    console.log(`Ignoreing non-combo key (${ev.key})`);
    return;
  }
  const key = KEY_MAP[ev.key];
  // check direction against current combo
  // show some feedback (log for now)
  if (currentCombo.code[currentCodeIndex] === key) {
    currentCodeIndex++;
    console.log(`GOOD KEY: ${key}`);
    if (currentCodeIndex === currentCombo.code.length) {
      console.log('next combo!');
      nextCombo();
    }
  } else {
    console.log(`resetting after bad key: ${key}`);
    currentCodeIndex = 0;
  }
}


function startListenCombo() {
  document.getElementById('trainer').classList.add('listening');
  document.addEventListener('keydown', handleComboKey, true);
}
function stopListenCombo() {
  document.getElementById('trainer').classList.remove('listening');
  document.removeEventListener('keydown', handleComboKey, true);
}


function init() {
  document.getElementById('reset').addEventListener('click', reset);
  document.getElementById('skip').addEventListener('click', nextCombo);
  document.getElementById('start').addEventListener('click', (e) => {
    document.getElementById('skip').style.setProperty('display', 'inline');
    document.getElementById('start').style.setProperty('display', 'none');
    startListenCombo();
    nextCombo();
  });
}


function main() {
  init();
  reset();
  console.log('main');
}


addEventListener('DOMContentLoaded', main);

