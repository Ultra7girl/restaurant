import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/OrderStore'

export default WrappedComponent =>
  class WithLayout extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <WrappedComponent {...this.props} />
        </Provider>
      )
    }
  }
