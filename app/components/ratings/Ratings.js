import React, { PropTypes as P } from 'react'; // React和ProTypes
import './ratings.styl'
import Star from '../star/Star'
import Split from '../split/Split'
import Ratingselect from '../ratingselect/Ratingselect'
import { connect } from 'react-redux'
import cFetch from '../../utils/cFetch'
import BScroll from 'better-scroll'
import {formatDate,padLeftZero} from '../../common/js/unit.js'

function mapStateToProps(state){
  return {
    goods: state.goodsReducer.goods
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchGoods, addCount, decreaseCount}, dispatch)
}
/* 创建组件 */
class Ratings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: {},
      ratings: [],
      type: 2,
      onlyContent: false
    }
  }
  initScroll(){
    if (!this.ratings) {
      this.ratings = new BScroll(this.refs["ratings"],{
        click: true
      });
    }else {
      this.ratings.refresh();
    }
    this.ratings.on('scroll', (pos) => {

    });
  }
  componentDidMount(){
    cFetch('seller').then((data) => {
      this.setState({'seller':data.jsonResult});
    });
    cFetch('ratings').then((data) => {
      this.setState({'ratings':data.jsonResult});
    });
  }

  componentDidUpdate() {
    this.initScroll();
  }
  select(type){
    this.setState({type: type});
  }
  toggleContent(){
    this.setState({onlyContent:!this.state.onlyContent});
  }

  render() {
    return (
      <div className="ratings" ref="ratings">
        <div className="ratings-content">
          <div className="overview">
            <div className="overview-left">
              <h1 className="score">{this.state.seller.score}</h1>
              <div className="title">综合评分</div>
              <div className="rank">高于周边商家{this.state.seller.rankRate}%</div>
            </div>
            <div className="overview-right">
              <div className="score-wrapper">
                <span className="title">服务态度</span>
                <Star size="36" score={this.state.seller.serviceScore} />
                <span className="score">{this.state.seller.serviceScore}</span>
              </div>
              <div className="score-wrapper">
                <span className="title" >商品评分</span>
                <Star size="36" score={this.state.seller.foodScore} />
                <span className="score">{this.state.seller.foodScore}</span>
              </div>
              <div className="delivery-wrapper">
                <span className="title">送达时间</span>
                <span className="delivery">{this.state.seller.deliveryTime}分钟</span>
              </div>
            </div>
          </div>
          <Split />
          <Ratingselect select={this.select.bind(this)} food = {this.state.ratings} toggleContent={this.toggleContent.bind(this)}/>
          <div className="rating-wrapper">
            <ul>
            {this.state.ratings.map((rating,index) => {

                if (rating.rateType==this.state.type){

                  return (
                    <li className="rating-item" style={{display:this.state.onlyContent&&rating.text==''?"none":'block'}} key={index}>
                      <div className="avatar">
                        <img width="28" height="28" src={rating.avatar}/>
                      </div>
                      <div className="content">
                        <h1 className="name">{rating.username}</h1>
                        <div className="star-wrapper">
                          <Star size="24" score={rating.score} />
                          {rating.deliveryTime?<span className="delivery">{rating.deliveryTime}分钟送达</span>:''}
                        </div>
                        <p className="text">{rating.text}</p>
                        <div className="recommend">
                          <span className={rating.rateType == 0?'icon-thumb_up':'icon-thumb_down'}></span>
                          {rating.recommend.map((item,index) => {
                            return (
                              <span className="item">{item}</span>
                            )
                          })

                        }
                        </div>
                        <div className="time">
                          {formatDate(new Date(rating.rateTime),'yyyy-MM-dd hh:mm')}
                        </div>
                      </div>
                    </li>
                  )
                }else if(this.state.type==2){
                  return (
                    <li className="rating-item" style={{display:this.state.onlyContent&&rating.text==''?"none":'block'}} key={index}>
                      <div className="avatar">
                        <img width="28" height="28" src={rating.avatar}/>
                      </div>
                      <div className="content">
                        <h1 className="name">{rating.username}</h1>
                        <div className="star-wrapper">
                          <Star size="24" score={rating.score} />
                          {rating.deliveryTime?<span className="delivery">{rating.deliveryTime}分钟送达</span>:''}
                        </div>
                        <p className="text">{rating.text}</p>
                        <div className="recommend">
                          <span className={rating.rateType == 0?'icon-thumb_up':'icon-thumb_down'}></span>
                          {rating.recommend.map((item,index) => {
                            return (
                              <span className="item" key={index}>{item}</span>
                            )
                          })
                        }
                        </div>
                        <div className="time">
                          {formatDate(new Date(rating.rateTime),'yyyy-MM-dd hh:mm')}
                        </div>
                      </div>
                    </li>
                  )
                }

            })

            }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

/* 代码类型检查 */
Ratings.propTypes = {
  dispatch: P.func,
  children: P.any,
};

// export default Ratings
export default connect(mapStateToProps)(Ratings);
