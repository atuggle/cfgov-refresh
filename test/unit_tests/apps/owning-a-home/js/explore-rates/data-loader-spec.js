const BASE_JS_PATH = '../../../../../../cfgov/unprocessed/apps/owning-a-home/';
const domLoader = require( BASE_JS_PATH + 'js/explore-rates/data-loader' );
const axios = require( BASE_JS_PATH + 'node_modules/axios' );

const today = new Date();
const decache = String( today.getDate() ) + today.getMonth();
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const cancelToken = new CancelToken( function(){} );

describe( 'explore-rates/data-loader', () => {
  describe( 'getData()', () => {
    it( 'should call data API with correct query', () => {
      jest.spyOn( axios, 'get' );
      domLoader.getData();

      return expect( axios.get )
        .toHaveBeenCalledWith(
          '/oah-api/rates/rate-checker',
          { params: { decache: decache, cancelToken: cancelToken } }
        );
    } );
  } );

  describe( 'getCounties()', () => {
    it( 'should call county API with correct state query', async () => {
      jest.mock( BASE_JS_PATH + 'node_modules/axios' );

      const data = { state:          'AL',
                     loan_type:      'CONF',
                     minfico:        700,
                     maxfico:        719,
                     rate_structure: 'FIXED'
                  };
      axios.get.mockResolvedValue( data );

      const response = await domLoader.getCounties( 'AL' ).promise;
      return expect( response ).toEqual( data );
    } );
  } );
} );
