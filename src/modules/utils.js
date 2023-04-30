const numberFormat = (value) => Number(value || 0).toLocaleString();

const dateFormat = (value) => (value ? new Date(value).toLocaleString() : '');

const updateElmText = (fnPrepareValue) => (elementId, value) =>
  (document.getElementById(elementId).innerText = fnPrepareValue(value));

export { numberFormat, dateFormat, updateElmText };
