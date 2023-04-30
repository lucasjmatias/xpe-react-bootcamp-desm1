import covidApi from './modules/covidApi.js';
import { dateFormat, numberFormat } from './utils.js';

(async () => {
  try {
    const summaryResponse = await covidApi.get('summary');
    const globalSummary = summaryResponse.data.Global;
    console.log(globalSummary);
    populateSummary(
      globalSummary.TotalConfirmed,
      globalSummary.TotalDeaths,
      globalSummary.TotalRecovered,
      globalSummary.Date
    );

    newCasesChart(
      globalSummary.NewConfirmed,
      globalSummary.NewRecovered,
      globalSummary.NewDeaths
    );
  } catch (error) {
    console.log(error);
  }
})();

function populateSummary(
  totalConfirmados,
  totalMortes,
  totalRecuperados,
  dataAtualizacao
) {
  const totalConfirmadosElm = document.getElementById('total-confirmados');
  const totalMortesElm = document.getElementById('total-mortes');
  const totalRecuperadosElm = document.getElementById('total-recuperados');
  const dataAtualizacaoElm = document.getElementById('data-atualizacao');

  totalConfirmadosElm.innerText = numberFormat(totalConfirmados);
  totalMortesElm.innerText = numberFormat(totalMortes);
  totalRecuperadosElm.innerText = numberFormat(totalRecuperados);
  dataAtualizacaoElm.innerText = dateFormat(dataAtualizacao);
}

function newCasesChart(confirmados, recuperados, mortes) {
  const ctx = document.getElementById('new-cases-chart');
  const data = {
    labels: ['Confirmados', 'Recuperados', 'Mortes'],
    datasets: [
      {
        label: 'Distribuição de novos casos',
        data: [confirmados, recuperados, mortes],
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
