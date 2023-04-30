const first10 = R.take(10);

const sortDescByTotalDeaths = R.sortWith([R.descend(R.prop('TotalDeaths'))]);
const rankTop10Deaths = R.pipe(sortDescByTotalDeaths, first10);

export { rankTop10Deaths };
