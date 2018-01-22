const emtpyOrder = []
export default function orderUpdater(state = emtpyOrder, action) {
  const { type, item } = action

  if (type === 'CHECK_BILL') {
    return emtpyOrder
  } else if (type === 'ADD_ORDER') {
    const completedItem = state.filter(function (basket) {
      return basket.id === item.id
    }).length

    if (completedItem === 0) {
      return state.concat({
        id: item.id,
        name: item.name,
        price: item.price,
        amount: 1
      })
    } else {
      return state.map(function (basket) {
        if (basket.id === item.id) {
          return {
            ...basket,
            amount: basket.amount + 1
          }
        }

        return basket
      })
    }
  } else if (type === 'ADD_AMOUNT') {

    return state.map(function (basket) {

      if (basket.id == item.id) {
        return {
          ...basket,
          amount: basket.amount + 1
        }
      }

      return basket
    })
  } else if (type === 'MINUS_AMOUNT') {

    return state.map(function (basket) {

      if (basket.id === item.id) {
        return {
          ...basket,
          amount: basket.amount - 1
        }
      }
      return basket
    }).filter(function (basket) {
      return basket.amount > 0
    })
  } else if (type === 'REMOVE_ORDER') {

    return state.filter(function (basket) {
      return basket.id !== item.id
    })

  } else {
    return state
  }
}
