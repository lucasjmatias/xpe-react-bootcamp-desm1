import { rankTop10Deaths } from '../modules/countries.js';
import covidApi from '../modules/covidApi.js';
import { dateFormat, numberFormat, updateElmText } from '../modules/utils.js';

async function prepareHomePage() {
  const summaryResponse = await covidApi.get('summary');
  const globalSummary = summaryResponse.data.Global;
  const countries = summaryResponse.data.Countries;

  const {
    TotalConfirmed: totalConfirmed,
    TotalDeaths: totalDeaths,
    TotalRecovered: totalRecovered,
    Date: updateDate,
    NewConfirmed: newConfirmed,
    NewRecovered: newRecovered,
    NewDeaths: newDeaths,
  } = globalSummary;

  populateSummary({
    totalConfirmed,
    totalDeaths,
    totalRecovered,
    updateDate,
  });

  newCasesChart({
    newConfirmed,
    newRecovered,
    newDeaths,
  });

  totalDeathsChart(countries);
}

function populateSummary({
  totalConfirmed,
  totalDeaths,
  totalRecovered,
  updateDate,
}) {
  const updateElmTextNumeric = updateElmText(numberFormat);

  updateElmTextNumeric('total-confirmed', totalConfirmed);
  updateElmTextNumeric('total-deaths', totalDeaths);
  updateElmTextNumeric('total-recovered', totalRecovered);
  updateElmText(dateFormat)('update-date', updateDate);
}

function newCasesChart({ newConfirmed, newRecovered, newDeaths }) {
  const ctx = document.getElementById('new-cases-chart');
  const data = {
    labels: ['Confirmados', 'Recuperados', 'Mortes'],
    datasets: [
      {
        label: 'Distribuição de novos casos',
        data: [newConfirmed, newRecovered, newDeaths],
        backgroundColor: [
          'rgb(255, 205, 86)',
          'rgb(54, 162, 235)',
          'rgb(255, 99, 132)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  new Chart(ctx, {
    type: 'pie',
    data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Distribuição de novos casos',
        },
      },
    },
  });
}

function totalDeathsChart(countries) {
  const chartData = rankTop10Deaths(countries);
  const ctx = document.getElementById('total-deaths-chart');
  const data = {
    labels: R.pluck('Country')(chartData),
    datasets: [
      {
        label: 'Total mortes por país',
        data: R.pluck('TotalDeaths')(chartData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  };

  new Chart(ctx, {
    type: 'bar',
    data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Total de Mortes por país - Top 10',
        },
      },
    },
  });
}

export { prepareHomePage };
