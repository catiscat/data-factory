module.exports = {
  path: 'lineage',
  getComponent(nextState, cb) {
    cb(null, require('../../containers/DataSource/LineAgePage').default);
  }
};
