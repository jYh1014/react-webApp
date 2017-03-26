import React, {PropTypes as P} from 'react'; // React和ProTypes
import './star.styl';

/* 创建组件 */
class Star extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';
    let result = [];
    let score = Math.floor(this.props.score * 2) / 2;
    let hasDecimal = score % 1 !== 0;
    let integer = Math.floor(score);
    for (let i = 0; i < integer; i++) {
      result.push(CLS_ON);
    }
    if (hasDecimal) {
      result.push(CLS_HALF);
    }
    while (result.length < LENGTH) {
      result.push(CLS_OFF);
    }
    return (
      <div className={"star "+"star-" + this.props.size}>
      {
        result.map((itemClass,index) => {
        return (
          <span className={"star-item " + itemClass} key = {index}></span>
          )
        })
      }
      </div>
    );
  }
}

export default Star
