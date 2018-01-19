import { createStore, combineReducers as combineStateUpdater } from 'redux'

import orderUpdater from './orderUpdater'

const rootStateUpdater = combineStateUpdater({
  orderList: orderUpdater
})

const store = createStore(rootStateUpdater)

export default store
