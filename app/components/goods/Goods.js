import React, { PropTypes as P } from 'react' // React和ProTypes
import { connect } from 'react-redux' // connect方法用于创建控制器组件，即数据和行为交由redux管理
import { bindActionCreators } from 'redux';
import { fetchGoods } from '../../action/fecthGoods'
import { refresh } from '../../action/handleCount'
import cFetch from '../../utils/cFetch'
import './goods.styl'
import BScroll from 'better-scroll'
import reactMixin  from 'react-mixin'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Cartcontrol from '../cartcontrol/Cartcontrol'
import ShopCart from '../shopcart/ShopCart'
import Food from '../food/Food'
import Immutable from 'immutable'
import { Map,fromJS} from 'immutable'

function mapStateToProps(state){
  return {
    goods: state.goodsReducer.goods
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchGoods, refresh }, dispatch)
}

class Goods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: [],
      index: 0,
      _index: 0,
      count: 0,
      isShow: false
    };
    this.listHeight = [];
    this.scrollY = 0;
  }

  initScroll() {
    if (!this.meunScroll) {
      this.meunScroll = new BScroll(this.refs["menu-wrapper"],{
        click: true
      });
    }else{
      this.meunScroll.refresh();
    }
    if (!this.foodsScroll) {
      this.foodsScroll = new BScroll(this.refs["foods-wrapper"], {
        click: true,
        probeType: 3
      });
    }else {
      this.foodsScroll.refresh();
    }

    this.foodsScroll.on('scroll', (pos) => {
      this.scrollY = Math.abs(Math.round(pos.y));
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        let menuList = this.refs["menu-wrapper"].getElementsByClassName('menu-item');
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          for (let j = 0; j < menuList.length; j++) {
            if (j==i) {
              menuList[j].className = "menu-item current";
            }else{
              menuList[j].className = "menu-item";
            }
          }
          return i;
        }
      }
    });
  }

  _calculateHeight() {
      let foodList = this.refs["foods-wrapper"].getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }

  selectMenu(index){
    let foodList = this.refs["foods-wrapper"].getElementsByClassName('food-list-hook');
    let el = foodList[index];
    this.foodsScroll.scrollToElement(el, 300);
  }

  empty(){
    this.state.goods.map((good,_index) => {
        good.foods.map((food,index) => {
          if (food.count>=0){
            let $$goods = Immutable.fromJS(this.state.goods[_index].foods[index]);
            let $$newGoods = $$goods.updateIn(['count'],v => 0);
            this.state.goods[_index].foods[index] = $$newGoods.toJS();
          }
        })
      })
    this.setState({goods:this.state.goods});
  }

  show(_index,index){
    this.setState({isShow:true});
    this.setState({_index:_index,index:index});
  }

  hide() {
    this.setState({isShow:false});
  }

  componentDidMount() {
    if (this.props.goods === undefined){
      this.props.fetchGoods();
    }else {
      this.props.refresh(this.props.goods)
    }
  }

  componentDidUpdate() {
    this.initScroll();
    this._calculateHeight();
  }

  render() {
    let classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    return (
      <div>
      <div className = "goods">
        <div className = "menu-wrapper" ref = "menu-wrapper">
          <ul>
          {
            this.props.goods?this.props.goods.map((item,index) => {
            return (
              <li  className={index==0?"menu-item current":"menu-item"} key = {index} onClick={this.selectMenu.bind(this,index)} >
                <span className="text border-1px">
                  <span className={item.type!=-1?"icon " + classMap[item.type]:"icon"}></span>{item.name}
                </span>
              </li>
              )
            }):null
          }
          </ul>
        </div>
        <div className="foods-wrapper" ref="foods-wrapper">
          <ul>
          {
            this.props.goods?this.props.goods.map((good,_index) => {
              return (
                <li className="food-list food-list-hook" key={_index} >
                  <h1 className="title">{good.name}</h1>
                  <ul>
                    {
                      good.foods.map((food,index) => {
                        return (
                          <li className="food-item border-1px" key={index} >
                            <div className="icon" onClick={this.show.bind(this,_index,index)}>
                              <img width="57" height="57" src={food.icon} onClick={this.show.bind(this,_index,index)}/>
                            </div>
                            <div className="content">
                              <h2 className="name">{food.name}</h2>
                              <p className="desc">{food.description}</p>
                              <div className="extra">
                                <span className="count">月售{food.sellCount}份</span><span>好评率{food.rating}%</span>
                              </div>
                              <div className="price">
                                <span className="now">￥{food.price}</span>
                                {food.oldPrice?<span className="old">￥{food.oldPrice}</span>:''}
                              </div>
                              <div className="cartcontrol-wrapper" ref = "cartcontrol-wrapper">
                                <Cartcontrol food = {food} _index = {_index} index={index}/>
                              </div>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            }):null
          }
          </ul>
        </div>
        <ShopCart empty={this.empty.bind(this)} />
      </div>
      <Food show={this.state.isShow}
      hide = {this.hide.bind(this)}
      goods = {this.props.goods}
      _index={this.state._index}
      index={this.state.index}/>
      </div>
    );
  }
}


// reactMixin.onClass(Goods, PureRenderMixin)
export default connect(mapStateToProps,mapDispatchToProps)(Goods);
