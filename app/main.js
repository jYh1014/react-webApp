import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'; // react和redux连接的桥梁，就是这个Provider
import { Router, browserHistory } from 'react-router'; // 路由组件
import ReduxThunk from 'redux-thunk';   // 中间件，有了这个就可以支持异步action
import createLogger from 'redux-logger';
import { createStore, applyMiddleware,compose } from 'redux';
import indexReducer from './reducer/indexReducer'; // 所有的reducer
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
// babel本身只能转换ES6语法，但ES6新增的Map、Set、Generator等新功能不会转换，所以需要此插件
import 'babel-polyfill';
import App from './components/App';
import AppRoutes from './route/route';
import './common/stylus/index.styl';
import { syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import promise from 'redux-promise';

const DevTools = createDevTools(
    <DockMonitor
        defaultIsVisible={false}
        toggleVisibilityKey= 'ctrl-q'
        changePositionKey= 'ctrl-m'>
    <LogMonitor theme='solarized'/>
    </DockMonitor>
);

const logger = createLogger();
const router = routerMiddleware(browserHistory);

// 创建store
const enhancer = compose(
  //你要使用的中间件，放在前面
  applyMiddleware(ReduxThunk,promise,logger,router),
  //必须的！启用带有monitors（监视显示）的DevTools
  DevTools.instrument()
);

const store = createStore(indexReducer, enhancer);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router routes={AppRoutes} history={history} queryKey={false} />
      <DevTools />
    </div>
  </Provider>,
  document.body.appendChild(document.getElementById('app'))
);
