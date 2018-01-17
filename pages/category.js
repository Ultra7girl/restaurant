import React from 'react'

import { connect } from 'react-redux'

import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function CategoryPage({ data, orderList, addOrder }) {
  const { loading, postMenus } = data
  // console.log(postMenus)

  if (loading === true) return 'Loading...'
  return (
    <div>
      <style jsx>{`
        header {
          text-align: center;
        }
        a {
          color: #666;
          text-decoration: none;
        }
        .main-left {
          width: 70%;
          float: left;
        }
        .main-right {
          width: 30%;
          float: left;
        }
        .box {
          width: 30%;
          float: left;
          cursor: pointer;
        }
        .clearFix {
          clear: both;
        }
      `}</style>
      <Head>
        <title>Restaurant </title>
      </Head>
      <div className="container">
        <div className="main-left">
          {postMenus.map(function(menus) {
            return (
              <div key={menus.id} className="box">
                <Link route="item" params={{ id: menus.id }}>
                  <div>
                    <br />
                    <img
                      width="180"
                      height="150"
                      src={`../static/images/menus/${menus.images}`}
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
      <CategoryPage
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
  query getMenus($first: Int, $catId: Int!) {
    postMenus(first: $first, id: $catId) {
      id
      categoryId
      name
      price
      images
    }
  }
`

export default compose(
  page,
  connect(stateSelecter),
  graphql(QUERY_POSTS, {
    options: ({ url: { query: { id } } }) => ({
      variables: {
        first: 20,
        catId: id
      }
    })
  })
)(OrderContrainer)
