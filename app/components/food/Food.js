import React, {PropTypes as P} from 'react' // React和ProTypes
import {connect} from 'react-redux' // connect方法用于创建控制器组件，即数据和行为交由redux管理
import { bindActionCreators } from 'redux';
import { addCount } from '../../action/handleCount'
import './food.styl'
import Split from '../split/Split'
import cFetch from '../../utils/cFetch'
import Cartcontrol from '../cartcontrol/Cartcontrol'
import Ratingselect from '../ratingselect/Ratingselect'
import BScroll from 'better-scroll'
import Immutable from 'immutable'
import { Map,fromJS} from 'immutable'
import Animate from 'rc-animate'

function mapStateToProps(state){
  return {
    goods: state.goodsReducer.goods
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ addCount }, dispatch)
}

/* 创建组件 */
class Food extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      ratings: [],
      goods: [],
      type: 2,
      onlyContent: false
    }
    this.count = 0;
  }
  initScroll(){
    if (this.food) {
      this.food = new BScroll(this.refs["food"],{
        click: true
      });
      this.food.on('scroll', (pos) => {

      });
    }

  }
  componentDidMount(){
    cFetch('ratings').then((data) => {
      this.setState({ratings: data.jsonResult});
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({isShow: nextProps.show});
    this.setState({goods: nextProps.goods});
  }

  componentDidUpdate() {
    this.initScroll();
  }

  hide(){
    this.props.hide();
  }

  foodAddFirst(_index,index){
    this.props.addCount(this.props.goods,this.props._index,this.props.index);
  }

  select(type){
    this.setState({type: type});
  }

  toggleContent(){
    this.setState({onlyContent:!this.state.onlyContent});
  }

  render() {
    const food = this.state.goods[this.props._index]?this.state.goods[this.props._index].foods[this.props.index]:'';
    return (
      <Animate transitionName="fold" showProp='data-food'>
      <div  className="food" data-food={this.state.isShow} key="1" style={{display:this.state.isShow?'':'none'}} ref="food">
      {this.state.goods[this.props._index]&&this.state.goods[this.props._index].foods[this.props.index]?
        <div className="food-content">
          <div className="image-header">
            <img src = {food.image}/>
            <div className="back" onClick={this.hide.bind(this)}>
              <i className="icon-arrow_lift"></i>
            </div>
          </div>
          <div className="content">
            <h1 className="title">{food.name}</h1>
            <div className="detail">
              <span className="sell-count">月售{food.sellCount}份</span>
              <span className="rating">好评率{food.rating}%</span>
            </div>
            <div className="price">
              <span className="now">￥{food.price}</span>{food.oldPrice?<span className="old">￥{food.oldPrice}</span>:''}
            </div>
            <div className="cartcontrol-wrapper">
              <Cartcontrol food = {food}  _index={this.props._index} index={this.props.index} />
            </div>
            <div className="buy" ref="buy" style={{display:food.count&&food.count!=0?'none':'block'}} onClick={this.foodAddFirst.bind(this,this.props._index,this.props.index)}>加入购物车
            </div>
          </div>
          <Split />
          <div className="info">
            <h1 className="title">商品信息</h1>
            <p className="text">{food.info}</p>
          </div>
          <split></split>
          <div className="rating">
            <h1 className="title">商品评价</h1>
            <Ratingselect select={this.select.bind(this)} food = {food} toggleContent={this.toggleContent.bind(this)}/>
            <div className="rating-wrapper">
              <ul ref="ratingItem">
              {food.ratings.map((rating,index) => {
                if (rating.rateType==this.state.type) {
                  return (
                    <li className="rating-item border-1px" key={index} style={{display:this.state.onlyContent&&rating.text==''?"none":'block'}}>
                      <div className="user">
                        <span className="name">{rating.username}</span>
                        <img className="avatar" width="12" height="12" src={rating.avatar}/>
                      </div>
                      <div className="time">{rating.rateTime}</div>
                      <p className="text">
                        <span className={rating.rateType == 0?'icon-thumb_up':'icon-thumb_down'}></span>{rating.text}
                      </p>
                    </li>
                  )
                }else if(this.state.type==2){
                  return (
                    <li className="rating-item border-1px" key={index} style={{display:this.state.onlyContent&&rating.text==''?"none":'block'}}>
                      <div className="user">
                        <span className="name">{rating.username}</span>
                        <img className="avatar" width="12" height="12" src={rating.avatar}/>
                      </div>
                      <div className="time">{rating.rateTime}</div>
                      <p className="text">
                        <span className={rating.rateType == 0?'icon-thumb_up':'icon-thumb_down'}></span>{rating.text}
                      </p>
                    </li>
                    )
                  }
                })
              }
              </ul>
              <div className="no-rating">暂无评价</div>
            </div>
          </div>
        </div>:''}
      </div>
      </Animate>
    );
  }
}/* 代码类型检查 */

export default connect(mapStateToProps,mapDispatchToProps)(Food);
