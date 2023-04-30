import { getParams, loadHtmlTemplate } from './modules/utils.js';
import { prepareHomePage } from './pages/home.js';
import { prepareCountryPage } from './pages/country.js';

const pages = {
  home: {
    fnLoad: prepareHomePage,
    template: 'pages/home.html',
  },
  country: {
    fnLoad: prepareCountryPage,
    template: 'pages/country.html',
  },
};

(async () => {
  try {
    const page = getParams().page || 'home';
    const loader = pages[page];
    if (!loader) return;
    await loadHtmlTemplate(loader.template);
    await loader.fnLoad();
  } catch (error) {
    console.log(error);
  }
})();
