import React, {PropTypes as P} from 'react'; // React和ProTypes
import {connect} from 'react-redux'; // connect方法用于创建控制器组件，即数据和行为交由redux管理
import './cartcontrol.styl'; // connect方法用于创建控制器组件，即数据和行为交由redux管理
import { bindActionCreators } from 'redux';
import { addCount, decreaseCount } from '../../action/handleCount'

function mapStateToProps(state){
  return {
    goods: state.goodsReducer.goods
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ addCount, decreaseCount}, dispatch)
}
/* 创建组件 */
class Cartcontrol extends React.Component {
  constructor(props) {
    super(props);
  }

  addCart(){
    this.props.addCount(this.props.goods,this.props._index,this.props.index);
  }

  decreaseCart(){
    this.props.decreaseCount(this.props.goods,this.props._index,this.props.index);
  }

  render(){
    return (
      <div className="cartcontrol">
        <div className="cart-decrease">
          {this.props.food&&this.props.food.count>0?<span className = "inner icon-remove_circle_outline" onClick = {this.decreaseCart.bind(this,this.props._index,this.props.index)}></span>:''}
        </div>
        <div className="cart-count">
          {this.props.food&&this.props.food.count>0?this.props.food.count:''}
        </div>
        <div className="cart-add icon-add_circle" onClick={this.addCart.bind(this,this.props._index,this.props.index)}></div>
      </div>
    );
  }
}/* 代码类型检查 */

export default connect(mapStateToProps,mapDispatchToProps)(Cartcontrol);
