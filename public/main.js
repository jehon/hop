// file:///C:/Users/jho/Downloads/index.html?http://localhost:5454
// file:///C:/Users/jho/Downloads/index.html?http://www.google.com

const URL = location.search.substr(1);

const logs = document.querySelector('#logs');
function log(txt) {
  logs.insertAdjacentHTML('beforeend', `<div>${(new Date()).toTimeString().split(' ')[0]} ${txt}</div>`);
  logs.scrollTop = logs.scrollHeight;
}

const statusEl = document.querySelector('#status');
function setStatus(txt) {
  statusEl.innerHTML = txt;
}

setStatus('loading...');

async function sleep(secs) {
  return new Promise(resolve => {
    setTimeout(resolve, secs * 1000);
  });
}

async function getURL(url) {
  return fetch(url)
    .then(response => response.text);
}

(async function () {
  let i = 0;
  while (i < 5) {
    log('testing ' + URL);
    try {
      setStatus('Trying');
      await getURL(URL);
      log('fetching is success');
      setStatus('Loaded');
      document.location = URL;
    } catch (e) {
      console.warn(e);
      log('fetching failed');
    }
    setStatus('Sleeping');
    await sleep(1);
    i++;
  }
})();
