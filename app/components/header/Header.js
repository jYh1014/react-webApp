import React, {PropTypes as P} from 'react'; // React和ProTypes
import './header.styl';
import Star from '../star/Star'
import Animate from 'rc-animate'

/* 创建组件 */
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false
    }
  }

  showDetail() {
    this.setState({
      isShow: true
    });
  }

  hideDetail() {
    this.setState({
      isShow: false
    });
  }

  render() {
    let support = null,
        supportCount,sellerSupports;
    let classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    if (this.props.seller.supports) {
      support =
      (
        <div className = "support" >
          <span className = {'icon ' + classMap[this.props.seller.supports[0].type]}></span>
          <span className="text">{this.props.seller.supports[0].description}</span>
        </div>
      )
      supportCount =
      (
        <div className = "support-count" onClick={this.showDetail.bind(this)}>
          <span className = "count">{this.props.seller.supports.length}个</span>
          <i className = "icon-keyboard_arrow_right" onClick = {this.showDetail.bind(this)}></i>
        </div>
      )
      sellerSupports =
      (
        this.props.seller.supports.map(function(item,index){
          return (
            <li className="support-item" key = {index}>
              <span className={"icon " + classMap[item.type]}></span>
              <span className="text">{item.description}</span>
            </li>
          )
        })
      )

    }
    return (
      <div className="header">
        <div className="content-wrapper">
          <div className="avatar">
            <img src={this.props.seller.avatar} width="64" height="64" alt=""/>
          </div>
          <div className="content">
            <div className="title">
              <span className="brand"></span>
              <span className="name">{
                  this.props.seller.name
                }</span>
            </div>
            <div className="description">
              {
                this.props.seller.description
              }/{
                this.props.seller.deliveryTime
              }分钟送达
            </div>
            {support}
          </div>
          {supportCount}
        </div>
        <div className = "bulletin-wrapper">
          <span className = "bulletin-title"></span><span className = "bulletin-text">{this.props.seller.bulletin}</span>
          <i className = "icon-keyboard_arrow_right" onClick = {this.showDetail.bind(this)}></i>
        </div>
        <div className="background">
          <img src={this.props.seller.avatar} width="100" height="100" />
        </div>
        <Animate transitionName="fold" showProp='data-detail'>
        <div  className="detail" data-detail={this.state.isShow} style={{display:this.state.isShow?'block':'none'}}>
          <div className="detail-wrapper clearfix">
            <div className="detail-main">
              <h1 className="name">{this.props.seller.name}</h1>
              <div className="star-wrapper">
                <Star size="48" score={this.props.seller.score} />
              </div>
              <div className="title">
                <div className="line"></div>
                <div className="text">优惠信息</div>
                <div className="line"></div>
              </div>

              <ul className = "supports">
                {sellerSupports}
              </ul>

              <div className="title">
                <div className="line"></div>
                <div className="text">商家公告</div>
                <div className="line"></div>
              </div>
              <div className="bulletin">
                <p className="content">{this.props.seller.bulletin}</p>
              </div>
            </div>
          </div>
          <div className="detail-close" onClick = {this.hideDetail.bind(this)}>
            <i className="icon-close"></i>
          </div>
        </div>
        </Animate>
      </div>
    );
  }
}/* 代码类型检查 */
export default Header
