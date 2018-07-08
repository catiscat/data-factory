

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/dataSource';
import { LineAge } from '../../../components/DataSource/Index';


function mapState2Props(state) {
  const currentState = state.store.dataSource || {};
  return {
    status: currentState.status,
    lineAge: currentState.lineAge
  };
}

function mapDispatch2Props(dispatch) {
  const actions = bindActionCreators(actionCreators, dispatch);
  return {
    onFetchLineAge: actions.fetchLineAge
  };
}

export default connect(mapState2Props, mapDispatch2Props)(LineAge);
