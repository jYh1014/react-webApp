import React from 'react'; // react核心
import {Route, Redirect, IndexRedirect} from 'react-router'; // 创建route所需
import App from '../components/App'
/* 下面是引入一些我们自己定义的container,作为路由的页面 */
// root这个container很重要 我们稍后配置
import Goods from '../components/goods/Goods';
import GoodsRight from '../components/goods/GoodsRight';
import Header from '../components/header/Header';
import Seller from '../components/seller/Seller';
import Ratings from '../components/ratings/Ratings';

export default(
  <Route path="/" component={App}>
    // 所有的访问，都跳转到rootContainer
    <IndexRedirect to="/goods"/>
    // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
    <Route path="/goods" component={Goods}/>
    <Route path="/goods/:goodsName" component={GoodsRight}/>
    // 一个路由地址，访问www.test.com/home,就会跳转到此
    <Route path="/seller" component={Seller}/>
    <Route path="/ratings" component={Ratings}/>
  </Route>
);
