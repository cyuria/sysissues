document.onload = (event) => {
  _ = event;
}

async function loadIndex() {
  const response = await fetch('index.json')
  if (!response.ok) {
    throw new Error(`Reponse status: ${response.status}`);
  }

  return await response.json();
}

function matchword(word, target) {
  for (const char of target) {
    if (char == word[0]) {
      word = word.slice(1);
    }
  }
  return word === ''
}

function matches(search, target) {
  return search.split(' ').all(word => matchword(word, target));
}

async function getParams() {
  const params = new URLSearchParams(document.location.search);

  const pages = Object.keys(index).filter(page => {
    for (const [element, search] of params) {
      if (!(element in index[page])) continue;

      if ()
    }
  })
}

const index = await loadIndex();

