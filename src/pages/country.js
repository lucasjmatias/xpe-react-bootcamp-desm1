import covidApi from '../modules/covidApi.js';
import {
  dateFormat,
  dateFormatISO,
  getElmValue,
  numberFormat,
  updateElmText,
  updateElmTextNumeric,
} from '../modules/utils.js';

const prepareCountryPage = () => {
  prepareCountryFilter();
  prepareSummary();
  prepareDailyCurveChart();
};

let currChart = null;

const dataTypeMap = {
  Deaths: {
    title: 'Número de mortes',
    meanTitle: 'Média de mortes',
    color: 'rgb(255, 99, 132)',
    meanColor: 'rgb(255, 205, 86)',
  },
  Confirmed: {
    title: 'Número de confirmados',
    meanTitle: 'Média de confirmados',
    color: 'rgb(255, 99, 132)',
    meanColor: 'rgb(255, 205, 86)',
  },
  Recovered: {
    title: 'Número de recuperados',
    meanTitle: 'Média de recuperados',
    color: 'rgb(50, 168, 82)',
    meanColor: 'rgb(48, 28, 199)',
  },
};

async function prepareCountryFilter() {
  const countriesElm = document.getElementById('country');

  countriesElm.innerHTML = '';
  const countriesResponse = await covidApi.get('countries');
  const countries = countriesResponse.data;

  for (const country of countries) {
    const optionElm = document.createElement('option');
    optionElm.value = country.Slug;
    optionElm.innerText = country.Country;
    countriesElm.appendChild(optionElm);
  }

  document.getElementById('send').addEventListener('click', () => {
    prepareDailyCurveChart();
    prepareSummary();
  });
}

async function prepareSummary() {
  const summaryResponse = await covidApi.get('/summary');
  const country = getElmValue('country', 'brazil');
  const summary = summaryResponse.data.Countries.find(
    (c) => c.Slug === country
  );
  updateElmTextNumeric('total-confirmed', summary.TotalConfirmed);
  updateElmTextNumeric('total-deaths', summary.TotalDeaths);
  updateElmTextNumeric('total-recovered', summary.TotalRecovered);
}

async function prepareDailyCurveChart() {
  currChart ? currChart.destroy() : '';
  const ctx = document.getElementById('daily-curve-chart');
  const dateInit = getElmValue('init-date', '2021-05-01');
  const dateEnd = getElmValue('end-date', '2021-05-24');
  const country = getElmValue('country', 'brazil');
  const dataType = getElmValue('data-type');

  const initDayParam = dateFormatISO(dayjs(dateInit).subtract(1, 'day'));
  const dateEndParam = dateFormatISO(dateEnd);

  const countryResponse = await covidApi.get(
    `/country/${country}?from=${initDayParam}&to=${dateEndParam}`
  );
  const countryData = countryResponse.data;
  const chartData = countryData;
  const chartDataValue = countryData.map((c, i) => {
    if (i === 0) {
      return null;
    }
    return c[dataType] - countryData[i - 1][dataType];
  });
  const [, ...diffValues] = chartDataValue;
  const [, ...datas] = R.pluck('Date')(chartData);

  const dailyMean = R.mean(diffValues);
  const meanData = datas.map((i) => dailyMean);

  const data = {
    labels: datas.map(dateFormat),
    datasets: [
      {
        label: dataTypeMap[dataType].title,
        data: diffValues,
        backgroundColor: [dataTypeMap[dataType].color],
        borderColor: [dataTypeMap[dataType].color],
      },
      {
        label: dataTypeMap[dataType].meanTitle,
        data: meanData,
        backgroundColor: [dataTypeMap[dataType].meanColor],
        borderColor: [dataTypeMap[dataType].meanColor],
      },
    ],
  };

  currChart = new Chart(ctx, {
    type: 'line',
    data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Curva diária de Covid-19',
        },
      },
    },
  });
}

export { prepareCountryPage };
