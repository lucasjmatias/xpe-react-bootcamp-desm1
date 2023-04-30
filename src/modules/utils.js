const numberFormat = (value) => Number(value || 0).toLocaleString();

const dateFormat = (value) => (value ? new Date(value).toLocaleString() : '');

const updateElmText = (fnPrepareValue) => (elementId, value) =>
  (document.getElementById(elementId).innerText = fnPrepareValue(value));

const getParams = () =>
  new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

const loadHtmlTemplate = (path) => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById('main').innerHTML = xhr.responseText;
    }
  };
  xhr.open('GET', path);
  xhr.send();
};

export { numberFormat, dateFormat, updateElmText, getParams, loadHtmlTemplate };
