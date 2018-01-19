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
  const hasOrder = orderList.length !== 0
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
        .container {
          width: 983px;
          height: 1700px;
          border-left: 1px solid grey;
          border-right: 1px solid grey;
        }
        .main-left {
          width: 68%;
          height: 1700px;
          float: left;
          border-right: 1px solid grey;
          text-align: center;
        }
        .main-right {
          width: 28%;
          height: 1700px;
          float: left;
        }

        .order-list {
          width: 90%;
          float: left;
        }
        .order-list span p {
          font-size: 15px;
        }

        .order-list-num {
          width: 7%;
          float: right;
        }
        .order-list-num span p {
          font-size: 15px;
        }

        .box {
          width: 30%;
          float: left;
          cursor: pointer;
        }
        .clearFix {
          clear: both;
        }

        .btn {
          -webkit-border-radius: 3;
          -moz-border-radius: 3;
          border-radius: 3px;
          font-family: Arial;
          color: #11111;
          font-size: 15px;
          padding: 5px 10px 5px 11px;
          text-decoration: none;
        }

        .btn:hover {
          background: #11111;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
      <br />
      <div className="container">
        <div className="main-left">
          {postMenuIndex.map(function(menus) {
            return (
              <div key={menus.id} className="box">
                <br />
                <Link route="item" params={{ id: menus.id }}>
                  <div>
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
                <button onClick={addOrder.bind(null, menus)} className="btn">
                  Order
                </button>
              </div>
            )
          })}
          <div className="clearFix" />
        </div>
        <div className="main-right">
          <center>
            <h2>My Orders</h2>
          </center>
          {orderList.map(function(list) {
            {
              return (
                <div key={list.id}>
                  <div className="order-list">
                    <span>
                      <p> &nbsp;{list.name}</p>
                    </span>
                  </div>
                  <div className="order-list-num">
                    <span>
                      <p>{list.amount}</p>
                    </span>
                  </div>
                </div>
              )
            }
          })}
          <br />
          {hasOrder && (
            <center>
              <Link route="order">
                <button className="btn">Order Now</button>
              </Link>
              <Link route="checkbill">
                <button className="btn">Check Bill</button>
              </Link>
            </center>
          )}
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
