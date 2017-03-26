import React, {PropTypes as P} from 'react'; // React和ProTypes
import {connect} from 'react-redux'; // connect方法用于创建控制器组件，即数据和行为交由redux管理
import Header from './header/Header';
import {Link} from 'react-router';
import './app.styl';
import cFetch from '../utils/cFetch';

/* 需要挂载到redux上的参数 */
const mapStoreStateToProps = (state) => ({dispatch: state.dispatch});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: ''
    }
  }

  setProps(value) {
    this.setState({
      seller: value
    });
  }

  componentWillMount() {
    cFetch('seller').then((data) => {
      this.setState({'seller': data.jsonResult});
    });
  }

  render() {
    return (
      <div className="app">
        <Header seller={this.state.seller} setProps={this.setProps.bind(this)}/>
        <div className="tag border-1px">
          <div className="tabItem">
            <Link to="/goods" activeStyle={{
              color: 'rgb(240,20,20)'
            }}>商品</Link>
          </div>
          <div className="tabItem">
            <Link to="/ratings" activeStyle={{
              color: 'rgb(240,20,20)'
            }}>评价</Link>
          </div>
          <div className="tabItem">
            <Link to="/seller" activeStyle={{
              color: 'rgb(240,20,20)'
            }}>商家</Link>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

/* 代码类型检查 */
App.propTypes = {
  dispatch: P.func,
  children: P.any
};

export default connect(mapStoreStateToProps)(App);
