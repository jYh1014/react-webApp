import React, {PropTypes as P} from 'react'; // React和ProTypes
import {connect} from 'react-redux'; // connect方法用于创建控制器组件，即数据和行为交由redux管理
import { bindActionCreators } from 'redux';
import { empty } from '../../action/handleCount'
import './shopcart.styl';
import Cartcontrol from '../cartcontrol/Cartcontrol'
import cFetch from '../../utils/cFetch'
import Animate from 'rc-animate'
import BScroll from 'better-scroll'

function mapStateToProps(state){
  return {
    goods: state.goodsReducer.goods
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ empty }, dispatch)
}

/* 创建组件 */
class ShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: {},
      isShow: false,
      goods:[]
    };
    this.totalNum = 0;
    this.totalPrice = 0;
  }

  initScroll(){
    if (!this.shopScroll) {
      this.shopScroll = new BScroll(this.refs["list-content"],{
        click: true
      });
    }else{
      this.shopScroll.refresh();
    }
    this.shopScroll.on('scroll', (pos) => {
    });
  }

  componentDidUpdate() {
    this.initScroll();
  }

  componentWillReceiveProps(nextProps){
    this.totalPrice = 0;
    this.totalNum = 0;
    nextProps.goods.map((good,_index) => {
      good.foods.map((food,index) => {
        if (food.count>=0){
          this.setState({_index:_index});
          this.setState({index:index});
          this.totalNum += food.count;
          this.totalPrice += food.count*food.price;
        }
      })
    })
  }

  componentDidMount(){
    cFetch('seller').then((data) => {
      this.setState({'seller': data.jsonResult});
    });
  }

  showShopList(){
    this.setState({isShow: !this.state.isShow});
  }

  payDesc() {
    if (this.totalPrice === 0) {
      return `￥${this.state.seller.minPrice}元起送`;
    } else if (this.totalPrice < this.state.seller.minPrice) {
      let diff = this.state.seller.minPrice - this.totalPrice;
      return `还差￥${diff}元起送`;
    } else {
      return '去结算';
    }
  }
  emptyList(){
    this.props.empty(this.props.goods);
    this.setState({
      isShow: false
    });
  }
  render() {
    return (
      <div className="shopcart">
        <div className="content" >
          <div className="content-left" onClick = {this.showShopList.bind(this)}>
            <div className="logo-wrapper">
              <div className="logo">
                <i className="icon-shopping_cart"></i>
              </div>
              <div className="num">{this.totalNum}</div>
            </div>
            <div className="price">￥{this.totalPrice}</div>
            <div className="desc">另需配送费￥{this.state.seller.deliveryPrice}元</div>
          </div>
          <div className="content-right">
            <div className={this.totalPrice-this.state.seller.minPrice>=0?"pay enough":'pay not-enough'}>
              {this.payDesc()}
            </div>
          </div>
        </div>
        <div className="ball-container">
          <div className="ball">
            <div className="inner inner-hook"></div>
          </div>
        </div>
        <Animate transitionName="fold" showProp='data-shopcartList'>
        {
          <div className="shopcart-list" data-shopcartList={this.state.isShow} key="1" style = {{display:this.state.isShow&&this.totalNum?'':'none'}} ref = "shopcart-list">
            <div className="list-header">
              <h1 className="title">购物车</h1>
              <span className="empty" onClick={this.emptyList.bind(this)}>清空</span>
            </div>
            <div className="list-content" ref="list-content">
              <ul>
              {
                this.props.goods?this.props.goods.map((good,_index) => {
                  return (
                    good.foods.map((food,index) => {
                      if (food.count&&food.count!=0) {
                        return (
                          <li className="food" key = {index}>
                            <span className="name">{food.name}</span>
                            <div className="price">
                              <span>￥{food.price}</span>
                            </div>
                            <div className="cartcontrol-wrapper" ref = "cartcontrol-wrapper">
                              <Cartcontrol food = {food} _index={_index} index = {index}/>
                            </div>
                          </li>
                        )
                      }

                    })

                  )
                }):''
              }
              </ul>
            </div>
          </div>
        }
        </Animate>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopCart);
