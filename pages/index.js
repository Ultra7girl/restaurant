import React from 'react'

import { connect } from 'react-redux'

import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function HomePage({ data, orderList, addOrder }) {
  const { loading, postMenuIndex } = data
  // console.log('postMenus =>', data)
  // console.log('postMenusIndex =>', postMenuIndex)

  if (loading === true) return 'Loading...'
  return (
    <div>
      <Head>
        <title>Restaurant </title>
      </Head>
      <style jsx>{`
        header {
          text-align: center;
        }
        a {
          color: #666;
          text-decoration: none;
        }
        .box {
          width: 30%;
          float: left;
          cursor: pointer;
        }
        .main-left {
          width: 70%;
          float: left;
        }
        .main-right {
          width: 30%;
          float: left;
        }
        .container {
          border-right: 1px solid grey;
        }
        .clearFix {
          clear: both;
        }
      `}</style>
      <div className="container">
        <div className="main-left">
          {postMenuIndex.map(function(menus) {
            return (
              <div key={menus.id} className="box">
                <Link route="item" params={{ id: menus.id }}>
                  <div>
                    <br />
                    <img
                      width="180"
                      height="150"
                      src={`/static/images/menus/${menus.images}`}
                    />
                    <br />
                    <a>{menus.name}</a>
                    <br />
                    {menus.price}.- <br />
                    <br />
                  </div>
                </Link>
                <button onClick={addOrder.bind(null, menus)}>Order</button>
              </div>
            )
          })}
          <div className="clearFix" />
        </div>
        <div className="main-right">
          <strong>My Orders</strong>
          {orderList.map(function(list) {
            {
              return (
                <div key={list.id}>
                  <span>{list.name}</span>
                  <span>{list.amount}</span>
                </div>
              )
            }
          })}
          <Link route="order">
            <button>Order Now</button>
          </Link>
          <Link route="checkbill">
            <button>Check Bill</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

class OrderContrainer extends React.Component {
  addOrder = item => {
    this.props.dispatch({
      type: 'ADD_ORDER',
      item
    })
  }

  render() {
    return (
      <HomePage
        data={this.props.data}
        orderList={this.props.orderList}
        addOrder={this.addOrder}
      />
    )
  }
}

function stateSelecter(state) {
  return { orderList: state.orderList }
}

const QUERY_POSTS = gql`
  query {
    postMenuIndex(first: 20) {
      id
      categoryId
      images
      name
      price
    }
  }
`

export default compose(page, connect(stateSelecter), graphql(QUERY_POSTS))(
  OrderContrainer
)
