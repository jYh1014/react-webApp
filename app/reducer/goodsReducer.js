import Immutable from 'immutable';
const FETCH_GOODS = 'FETCH_GOODS';
const ADD_COUNT = 'ADD_COUNT';
const EMPTY = 'EMPTY';
const DECREASE_COUNT = 'DECREASE_COUNT';
const REFRESH = 'REFRESH';
export default function goodsReducer(state = {},action) {
  let newState = {};
  switch (action.type) {
    case FETCH_GOODS:
      newState = Immutable.fromJS(action.result);
      newState = newState.toJS();
      return { goods: newState }
    case ADD_COUNT:
      newState = Immutable.fromJS(action.goods);
      newState = newState.toJS();
      return { goods: newState }
    case DECREASE_COUNT:
      newState = Immutable.fromJS(action.goods);
      newState = newState.toJS();
      return { goods: newState }
    case EMPTY:
      newState = Immutable.fromJS(action.goods);
      newState = newState.toJS();
      return { goods: newState }
    case REFRESH:
      newState = Immutable.fromJS(action.goods);
      newState = newState.toJS();
      return { goods: newState }
    default:
      return state
   }
}
