const ADD_COUNT = 'ADD_COUNT';
const DECREASE_COUNT = 'DECREASE_COUNT';
const EMPTY = 'EMPTY';
const REFRESH = 'REFRESH';
export function addCount(goods,_index,index){
  if (!goods[_index].foods[index].count) {
    goods[_index].foods[index].count = 1
  }else {
    goods[_index].foods[index].count++
  }
  return {
    type: ADD_COUNT,
    goods: goods
  }
}

export function decreaseCount(goods,_index,index){
  if (goods[_index].foods[index].count) {
    goods[_index].foods[index].count--
  }else {
    return
  }
  return {
    type: DECREASE_COUNT,
    goods: goods
  }
}

export function empty(goods){
  goods.forEach((good) => {
    good.foods.forEach((food) => {
      if (food.count) {
        food.count = 0;
      }
    })

  })
  return {
    type: EMPTY,
    goods: goods
  }
}

export function refresh(goods){
  return {
    type: REFRESH,
    goods: goods
  }
}
