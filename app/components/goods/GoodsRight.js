import React, { PropTypes as P } from 'react'; // React和ProTypes
import { connect } from 'react-redux'; // connect方法用于创建控制器组件，即数据和行为交由redux管理

/* 需要挂载到redux上的参数 */
const mapStoreStateToProps = (state) => ({
  dispatch: state.dispatch,
});

/* 创建组件 */
class GoodsRight extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="goodsRight">
        {this.props.params.goodsName}
      </div>
    );
  }
}

/* 代码类型检查 */
GoodsRight.propTypes = {
  dispatch: P.func,
  children: P.any,
};

export default GoodsRight
