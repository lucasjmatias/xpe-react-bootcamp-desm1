const numberFormat = (value) => Number(value || 0).toLocaleString();

const dateFormat = (value) => (value ? new Date(value).toLocaleString() : '');

export { numberFormat, dateFormat };
