const BASE_JS_PATH = '../../../../../../cfgov/unprocessed/apps/owning-a-home/';
const domLoader = require( BASE_JS_PATH + 'js/explore-rates/data-loader' );

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe( 'explore-rates/data-loader', () => {
  xdescribe( 'getData()', () => {
    it( 'should call data API with correct query', () => {
      domLoader.getData();

      expect( mockAxios.get )
        .toHaveBeenCalledWith( 'GET', '/oah-api/rates/rate-checker?decache=243', true );
      expect( mockAxios.send ).toBeCalled();
    } );
  } );

  describe( 'getCounties()', () => {
    it( 'should call county API with correct state query', done => {

      const mock = new MockAdapter(axios);
      const data = { response: true };
      mock.onGet(
        '/oah-api/county/',
        { params: { state: 'AL' } }
      ).reply( 200, data );

      domLoader.getCounties( 'AL' ).promise.then( response => {
          expect( response ).toEqual( data );
          done();
      } );
    } );
  } );
} );
