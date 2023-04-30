import covidApi from './modules/covidApi.js';
import { dateFormat, numberFormat } from './utils.js';

(async () => {
  try {
    const summaryResponse = await covidApi.get('summary');
    const globalSummary = summaryResponse.data.Global;

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
  } catch (error) {
    console.log(error);
  }
})();

function populateSummary({
  totalConfirmed,
  totalDeaths,
  totalRecovered,
  updateDate,
}) {
  const totalConfirmedElm = document.getElementById('total-confirmed');
  const totalDeathsElm = document.getElementById('total-deaths');
  const totalRecoveredElm = document.getElementById('total-recovered');
  const updateDateElm = document.getElementById('update-date');

  totalConfirmedElm.innerText = numberFormat(totalConfirmed);
  totalDeathsElm.innerText = numberFormat(totalDeaths);
  totalRecoveredElm.innerText = numberFormat(totalRecovered);
  updateDateElm.innerText = dateFormat(updateDate);
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
