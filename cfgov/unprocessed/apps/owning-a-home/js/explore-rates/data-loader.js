import config from '../../config.json';

const axios = require( 'axios' );
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

/**
 * Get data from the API.
 * @param {Object} fieldToFetch - Hash of fields to add to the query.
 * @returns {Promise} A promise for the XMLHttpRequest request.
 */
function getData( fieldToFetch ) {
  const today = new Date();
  const decache = String( today.getDate() ) + today.getMonth();

  let cancelFunc;
  const cancelToken = new CancelToken(function executor( newCancelFunc ) {
    // An executor function receives a cancel function as a parameter
    cancelFunc = newCancelFunc;
  } );
  const params = Object.assign(
    { decache: decache, cancelToken: cancelToken }, fieldToFetch
  );

  return {
    promise: axios.get(
      config.rateCheckerAPI,
      { params: params }
    ),
    cancel: cancelFunc
  }
}

/**
 * Get a list of counties from the API for the selected state.
 * @param {string} forState - The state to get counties for.
 * @returns {Promise} A promise for the XMLHttpRequest request.
 */
function getCounties( forState ) {
  return {
    promise: axios.get(
      config.countyAPI,
      { params: { state: forState } }
    )
  }
}

module.exports = {
  getData,
  getCounties
};
