import React from 'react'

import { connect } from 'react-redux'

import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function OrderPage({ data, orderList }) {
  //   const { loading } = data
  //   console.log('order list =>', orderList)

  //   if (loading === true) return 'Loading...'
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
        <div>
          <span>No.</span>
          <span>Title</span>
          <span>Quantity</span>
          <span>Price</span>
        </div>
        {orderList.map(function(list) {
          {
            return (
              <div key={list.id}>
                <span>{list.name}</span>
                <span>{list.amount}</span>
                <span>{list.price}</span>
              </div>
            )
          }
        })}
        <div>
          <Link route="home">
            <button>Back</button>
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
  render() {
    return <OrderPage data={this.props.data} orderList={this.props.orderList} />
  }
}

function stateSelecter(state) {
  return { orderList: state.orderList }
}

export default compose(page, connect(stateSelecter))(OrderContrainer)
