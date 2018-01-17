const emtpyOrder = []
export default function orderUpdater(state = emtpyOrder, action) {
  const { type, item } = action
  const completedItem = state.filter(function(basket) {
    return basket.id === item.id
  }).length

  switch (type) {
    case 'ADD_ORDER':
      if (completedItem === 0) {
        return state.concat({
          id: item.id,
          name: item.name,
          price: item.price,
          amount: 1
        })
      } else {
        return state.map(function(basket) {
          if (basket.id === item.id) {
            return {
              ...basket,
              amount: basket.amount + 1
            }
          }

          return basket
        })
      }
    default:
      return state
  }
}
