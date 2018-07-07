import gql from 'graphql-tag';
import * as actionTypes from '../constants/ActionTypes';
import * as APIs from '../constants/APIs';

export function fetchDataTree(params) {
  return {
    actionType: actionTypes.FETCH_DATA_TREE,
    options: {
      type: 'query',
      graphql: gql`${APIs.API_DATA_TREE}`,
      ...params
    }
  }
}


export function fetchSchema(params) {
  return {
    actionType: actionTypes.FETCH_SCHEMA,
    options: {
      type: 'query',
      graphql: gql`${APIs.API_SCHEMA}`,
      ...params
    }
  }
}

export function fetchLineAge(params) {
  return {
    actionType: actionTypes.FETCH_LINEAGE_LIST,
    options: {
      type: 'query',
      graphql: gql`${APIs.API_LINE_AGE_LIST}`,
      ...params
    }
  }
}
