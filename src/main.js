import { getParams, loadHtmlTemplate } from './modules/utils.js';
import { prepareHomePage } from './pages/home.js';

const pages = {
  home: {
    fnLoad: prepareHomePage,
    template: 'pages/home.html',
  },
};

(async () => {
  try {
    const page = getParams().page || 'home';
    const loader = pages[page];
    loadHtmlTemplate(loader.template);
    await loader.fnLoad();
  } catch (error) {
    console.log(error);
  }
})();
