import { combineReducers } from 'redux';
import addReducer from './addReducer';
import goodsReducer from './goodsReducer';
import { routerReducer } from 'react-router-redux'

/* 利用官方提供的combineReducers将所有reducer组合成一个 */
const indexReducer = combineReducers({
  routing: routerReducer,
  addReducer: addReducer,
  goodsReducer: goodsReducer
  // 其他的reducers
  // 这里的命名，关系到container中取state对应的reducer的名字
});

export default indexReducer;
