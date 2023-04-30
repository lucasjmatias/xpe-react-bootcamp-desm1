const numberFormat = (value) => Number(value || 0).toLocaleString();

const datetimeFormat = (value) =>
  value ? new Date(value).toLocaleString() : '';

const dateFormat = (value) =>
  value
    ? new Date(value).toLocaleString([], {
        timeZone: 'UTC',
        dateStyle: 'short',
      })
    : '';

const dateFormatISO = (value) =>
  value ? dayjs(value).format('YYYY-MM-DD') : '';

const updateElmText = (fnPrepareValue) => (elementId, value) =>
  (document.getElementById(elementId).innerText = fnPrepareValue(value));

const updateElmTextNumeric = updateElmText(numberFormat);

const getElmValue = (elementId, defaultValue = undefined) =>
  document.getElementById(elementId).value || defaultValue;

const getParams = () =>
  new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

const loadHtmlTemplate = (path) => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById('main').innerHTML = xhr.responseText;
        resolve('ok');
      }
    };
    xhr.open('GET', path);
    xhr.send();
  });
};

export {
  numberFormat,
  datetimeFormat,
  dateFormat,
  dateFormatISO,
  updateElmText,
  updateElmTextNumeric,
  getElmValue,
  getParams,
  loadHtmlTemplate,
};
