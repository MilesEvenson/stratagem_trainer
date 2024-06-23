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

  ArrowUp: 'u',
  ArrowRight: 'r',
  ArrowDown: 'd',
  ArrowLeft: 'l',
};



if (!ALL_COMBOS) {
  console.error('Combo list failed to load');
}
let selectedCombos = {
  'ship-reinforce': ALL_COMBOS.find(c => c.slug === 'ship-reinforce'),
  'ship-resupply': ALL_COMBOS.find(c => c.slug === 'ship-resupply'),
};
let currentCombo = null;
let currentCodeIndex = -1;


// ///////////////////////////////////////////////////////////////////////////


function reset() {
  document.getElementById('current').innerHTML = '';
  document.getElementById('log').innerHTML = '';
  document.getElementById('loadout').innerHTML = '';

  document.getElementById('config').style.setProperty('display', 'inline');
  document.getElementById('skip').style.setProperty('display', 'none');
  document.getElementById('start').style.setProperty('display', 'inline');

  document.getElementById('current').style.setProperty('display', 'none');
  document.getElementById('log').style.setProperty('display', 'none');
  document.getElementById('loadout').style.setProperty('display', 'none');

  currentCombo = null;
  currentCodeIndex = -1;
  stopListenCombo();
}


function buildComboCard(combo) {
  const container = document.createElement('div');
  container.classList.add('card');

  const icon = document.createElement('div');
  icon.classList.add('icon');
  icon.classList.add(combo.category);

  const stack = document.createElement('div');
  stack.classList.add('stack');

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

  const pips = document.createElement('p');
  pips.classList.add('pips');

  stack.append(label);
  stack.append(code);
  stack.append(pips);

  container.append(icon);
  container.append(stack);

  return container;
}


function cueCombo(combo) {
  const prevCard = document.querySelector('#current > :first-child');

  if (prevCard) {
    prevCard.querySelector('.pips').remove();
    const prevItem = document.createElement('li');
    prevItem.append(prevCard);
    document.getElementById('log').prepend(prevItem);
  }

  const nextCard = buildComboCard(combo);
  document.getElementById('current').innerHTML = '';
  document.getElementById('current').append(nextCard);
}


function nextCombo() {
  const pick = Math.floor(Math.random() * Object.keys(selectedCombos).length);
  const slug = Object.keys(selectedCombos)[pick];
  currentCombo = selectedCombos[slug];
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
  if (ev.key === 'R') {
    console.log('User reset trainer');
    reset();
    ev.preventDefault();
    return;
  } else if (ev.key === ' ' || ev.key === 'Shift' || ev.key === 'Control') {
    console.log('User reset combo entry');
    currentCodeIndex = 0;
    document.querySelector('#current .pips').innerText = '';
    ev.preventDefault();
    return;
  }
  // map ev.key to direction
  if (!(ev.key in KEY_MAP)) {
    console.log(`Ignoring non-combo key (${ev.key})`);
    return;
  }
  const key = KEY_MAP[ev.key];
  // check direction against current combo
  // and show some feedback.
  if (currentCombo.code[currentCodeIndex] === key) {
    document.querySelector('#current .pips').innerText = document.querySelector('#current .pips').innerText + '◾️';
    currentCodeIndex++;
    console.log(`GOOD KEY: ${key}`);
    if (currentCodeIndex === currentCombo.code.length) {
      console.log('next combo!');
      nextCombo();
    }
  } else {
    document.querySelector('#current .card').classList.add('mistake');
    window.setTimeout(
      () => document.querySelector('#current .card').classList.remove('mistake'),
      250,
    );
    console.log(`resetting after bad key: ${key}`);
    currentCodeIndex = 0;
    document.querySelector('#current .pips').innerText = '';
  }
  ev.preventDefault();
}


function toggleComboInLoadout(combo) {
  if (combo.slug in selectedCombos) {
    delete selectedCombos[combo.slug];
    document.querySelector(`#${combo.slug} input[type="checkbox"]`).checked = false;
  } else {
    selectedCombos[combo.slug] = combo;
    document.querySelector(`#${combo.slug} input[type="checkbox"]`).checked = true;
  }
}


function drawLoadout() {
  if (!ALL_COMBOS) {
    console.error('Combo list failed to load');
    return;
  }

  document.getElementById('current').style.setProperty('display', 'none');
  document.getElementById('log').style.setProperty('display', 'none');
  document.getElementById('loadout').style.setProperty('display', 'block');

  document.getElementById('log').innerText = '';
  document.getElementById('loadout').innerText = '';

  const loadoutList = document.getElementById('loadout');

  for (const combo of ALL_COMBOS) {
    const isSelected = combo.slug in selectedCombos;

    const nextCard = buildComboCard(combo);
    document.getElementById('current').innerHTML = '';
    document.getElementById('current').append(nextCard);

    const loadoutItem = document.createElement('li');
    loadoutItem.id = combo.slug;

    const checkWrap = document.createElement('div');
    checkWrap.classList.add('wrapper');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (isSelected) {
      checkbox.checked = true;
    }
    checkWrap.append(checkbox);
    loadoutItem.append(checkWrap);
    loadoutItem.append(nextCard);

    loadoutItem.addEventListener('click', (ev) => {
      toggleComboInLoadout(combo);
      ev.preventDefault();
    });

    loadoutList.append(loadoutItem);
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
  document.getElementById('config').addEventListener('click', drawLoadout);
  document.getElementById('skip').addEventListener('click', nextCombo);

  document.getElementById('start').addEventListener('click', () => {
    if (Object.keys(selectedCombos).length === 0) {
      alert('Click Loadout and select some strategems');
      return;
    }

    document.getElementById('skip').style.setProperty('display', 'inline');
    document.getElementById('config').style.setProperty('display', 'none');
    document.getElementById('start').style.setProperty('display', 'none');

    document.getElementById('current').style.setProperty('display', 'block');
    document.getElementById('log').style.setProperty('display', 'block');

    document.getElementById('log').innerHTML = '';
    document.getElementById('loadout').style.setProperty('display', 'none');
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

