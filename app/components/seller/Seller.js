import React, { PropTypes as P } from 'react'; // React和ProTypes
import './seller.styl'
import Star from '../star/Star'
import Split from '../split/Split'
import BScroll from 'better-scroll'
import cFetch from '../../utils/cFetch'
import {saveToLocal,loadFromLocal} from '../../common/js/unit.js'

/* 创建组件 */
class Seller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: {},
      favorite: true
    }
  }
  initScroll(){
    if (!this.seller) {
      this.seller = new BScroll(this.refs["seller"],{
        click: true
      });
    }else {
      this.seller.refresh();
    }
    this.seller.on('scroll', (pos) => {

    });

  }
  componentDidMount(){
    cFetch('seller').then((data) => {
      this.setState({'seller':data.jsonResult});
    });
  }
  componentDidUpdate() {
    this.initScroll();
  }

  toggleFavorite(){
    this.setState({favorite: !this.state.favorite});
    saveToLocal(this.state.seller.id, 'favorite', this.state.favorite);
  }
  render() {
    const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    return (
      <div className="seller" ref="seller">
        <div className="seller-content">
          <div className="overview">
            <h1 className="title">{this.state.seller.name}</h1>
            <div className="desc border-1px">
              <Star size="36" score={this.state.seller.score}/>
              <span className="text">({this.state.seller.ratingCount})</span>
              <span className="text">月售{this.state.seller.sellCount}单</span>
            </div>
            <ul className="remark">
              <li className="block">
                <h2>起送价</h2>
                <div className="content">
                  <span className="stress">{this.state.seller.minPrice}</span>元
                </div>
              </li>
              <li className="block">
                <h2>商家配送</h2>
                <div className="content">
                  <span className="stress">{this.state.seller.deliveryPrice}</span>元
                </div>
              </li>
              <li className="block">
                <h2>平均配送时间</h2>
                <div className="content">
                  <span className="stress">{this.state.seller.deliveryTime}</span>分钟
                </div>
              </li>
            </ul>
            <div className="favorite" onClick={this.toggleFavorite.bind(this)}>
              <span className={this.state.favorite?"icon-favorite":"icon-favorite active"}></span>
              <span className="text">{this.state.favorite?"收藏":"已收藏"}</span>
            </div>
          </div>
          <Split />
          <div className="bulletin">
            <h1 className="title">公告与活动</h1>
            <div className="content-wrapper border-1px">
              <p className="content">{this.state.seller.bulletin}</p>
            </div>
            <ul className="supports">
            {this.state.seller.supports?
              this.state.seller.supports.map((support,index) => {
              return (
                <li className="support-item border-1px" key={index}>
                  <span className={"icon " + classMap[support.type]}></span>
                  <span className="text">{support.description}</span>
                </li>
                )
              }):''
            }
            </ul>
          </div>
          <Split />
          <div className="pics">
            <h1 className="title">商家实景</h1>
            <div className="pic-wrapper" >
              <ul className="pic-list" >
              {this.state.seller.pics?
                this.state.seller.pics.map((pic,index) => {
                return (
                  <li className="pic-item" key={index}>
                    <img width="120" height="90" src={pic}/>
                  </li>
                  )
                }):''
              }
              </ul>
            </div>
          </div>
          <split></split>
          <div className="info">
            <h1 className="title border-1px">商家信息</h1>
            <ul>
            {this.state.seller.infos?
              this.state.seller.infos.map((info,index) => {
                return (
                  <li className="info-item" key={index}>{info}</li>
                )
              }):''
            }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

/* 代码类型检查 */
Seller.propTypes = {
  dispatch: P.func,
  children: P.any,
};

export default Seller
