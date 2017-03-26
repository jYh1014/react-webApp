import React, {PropTypes as P} from 'react'; // React和ProTypes
import {connect} from 'react-redux'; // connect方法用于创建控制器组件，即数据和行为交由redux管理
import './ratingselect.styl'
/* 创建组件 */
class Ratingselect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 2,
      negatives: 0,
      positives: 0
    }
  }
  componentWillReceiveProps(nextProps){
    let negatives = 0;
    let positives = 0;
    if (nextProps.food.ratings) {
      nextProps.food.ratings.map((rating,index) => {
        if (rating.rateType == 1) {
          ++negatives;
          this.setState({negatives: negatives});
        }else{
          ++positives;
          this.setState({positives: positives});
        }
      });
    }else{
      nextProps.food.map((rating,index) => {
        if (rating.rateType == 1) {
          ++negatives;
          this.setState({negatives: negatives});
        }else{
          ++positives;
          this.setState({positives: positives});
        }
      });
    }

  }

  selectRatings(type){
    this.props.select(type);
    let ratingList = this.refs["rating-type"].getElementsByClassName("block");
    let childNodes = this.refs["block"+type];
    for (var i = 0; i < ratingList.length; i++) {
      if (type==1) {
        ratingList[i].className = "block positive";
        childNodes.className = "block negative active";
      }else{
        ratingList[i].className = "block positive";
        ratingList[2].className = "block negative";
        childNodes.className = "block positive active";
      }
    }
  }

  onlyContent(){
    this.props.toggleContent();
    if (this.refs["switch"].className == "switch on") {
      this.refs["switch"].className = "switch";
    }else{
      this.refs["switch"].className = "switch on";
    }
  }

  render(){
    return (
      <div className="ratingselect">
        <div className="rating-type border-1px" ref="rating-type">
          <span  className="block positive active" onClick={this.selectRatings.bind(this,2)} ref="block2">全部<span className="count">{this.state.positives+this.state.negatives}</span></span>
          <span className="block positive" onClick={this.selectRatings.bind(this,0)} ref="block0">满意<span className="count">{this.state.positives}</span></span>
          <span  className="block negative" onClick={this.selectRatings.bind(this,1)} ref="block1">不满意<span className="count">{this.state.negatives}</span></span>
        </div>
        <div  className="switch" onClick={this.onlyContent.bind(this)} ref="switch">
          <span className="icon-check_circle"></span>
          <span className="text">只看有内容的评价</span>
        </div>
      </div>
    );
  }
}/* 代码类型检查 */
export default Ratingselect
