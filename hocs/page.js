import { compose } from 'recompose'

import withApolloClient from './withApolloClient'
import withLayout from './withLayout'
import withRedux from './withRedux'

export default compose(withApolloClient, withRedux, withLayout)
