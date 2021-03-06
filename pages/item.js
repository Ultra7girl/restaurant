import React from 'react'

import { connect } from 'react-redux'

import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function ItemPage({ data, orderList, addOrder }) {
  const { loading, postMenu } = data
  const hasOrder = orderList.length !== 0

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
        .container {
          width: 983px;
          height: 1600px;
          border-left: 1px solid grey;
          border-right: 1px solid grey;
        }
        .main-left {
          width: 68%;
          height: 1600px;
          float: left;
          border-right: 1px solid grey;
          text-align: center;
        }
        .main-right {
          width: 28%;
          height: 1600px;
          float: left;
        }
        .box {
          width: 100%;
          float: left;
          cursor: pointer;
          text-align: left;
        }
        .clearFix {
          clear: both;
        }

        .order-list {
          width: 90%;
          float: left;
          text-align: left;
        }
        .order-list span p {
          font-size: 15px;
        }

        .order-list-num {
          width: 7%;
          float: right;
          text-align: center;
        }
        .order-list-num span p {
          font-size: 15px;
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

        .star-ratings {
          unicode-bidi: bidi-override;
          color: #c5c5c5;
          font-size: 20px;
          height: 20px;
          width: 100px;
          // margin: 1em auto;
          position: relative;
          padding: 0;
        }
        .star-ratings .star-ratings-top {
          color: gold;
          padding: 0;
          position: absolute;
          z-index: 1;
          display: block;
          left: 0px;
          overflow: hidden;
        }
        .star-ratings .star-ratings-bottom {
          z-index: 0;
        }
        .main-right center h2 {
          text-decoration: underline;
        }
      `}</style>
      <Head>
        <title>Restaurant </title>
      </Head>
      <br />
      <div className="container">
        {postMenu.map(function(item) {
          return (
            <div key={item.id}>
              <div className="main-left">
                <div className="box">
                  <div>
                    <img
                      width="450"
                      height="300"
                      src={`../static/images/menus/${item.images}`}
                    />
                  </div>
                  <div>
                    <div className="star-ratings">
                      <div
                        className="star-ratings-top"
                        style={{ width: `${item.rating.percentRating}%` }}
                      >
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                        <span>★</span>
                      </div>
                      <div className="star-ratings-bottom">
                        <span>☆</span>
                        <span>☆</span>
                        <span>☆</span>
                        <span>☆</span>
                        <span>☆</span>
                      </div>
                    </div>
                    <p>({item.rating.totalRating} Ratings)</p>
                    <p>
                      <h2>{item.name}</h2>
                    </p>
                    <p>ราคา {item.price}.-</p>

                    <button onClick={addOrder.bind(null, item)} className="btn">
                      Order
                    </button>
                  </div>
                </div>
              </div>
              <div className="main-right">
                <center>
                  <h2>Reviews</h2>
                </center>
                <div>
                  {item.relateComments.map(function(comments) {
                    {
                      return (
                        <p key={comments.id}>&nbsp;&nbsp;{comments.body}</p>
                      )
                    }
                  })}
                </div>
                <center>
                  <h2>My Orders</h2>
                </center>
                <div>
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
        })}
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
      <ItemPage
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
  query getMenus($first: Int, $itemId: Int!) {
    postMenu(first: $first, id: $itemId) {
      id
      categoryId
      name
      images
      price
      rating {
        rawRating {
          one
          two
          three
          four
          five
        }
        totalRating
        avgRating
        percentRating
      }
      relateComments {
        id
        body
        menuId
      }
    }
  }
`

export default compose(
  page,
  connect(stateSelecter),
  graphql(QUERY_POSTS, {
    options: ({ url: { query: { id } } }) => ({
      variables: {
        first: 1,
        itemId: id
      }
    })
  })
)(OrderContrainer)
