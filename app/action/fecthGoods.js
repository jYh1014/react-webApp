import cFetch from '../utils/cFetch';
const FETCH_GOODS = 'FETCH_GOODS';
export function fetchGoods(result) {
  return dispatch => {
    return cFetch('goods', { method: "GET"}).then((response) => {
      if (response.jsonResult.error_code === 4001) {
        message.error(response.jsonResult.error_message);
      } else {
        dispatch({
          type: FETCH_GOODS,
          result: response.jsonResult
        });
      }
    });
  };
}
