import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function HomePage({ data }) {
  // console.log('data', data)
  const { loading, postMenuIndex } = data

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
          cursor:pointer;
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
          {postMenuIndex.map(function (menus) {
            return (
              <div key={menus.id} className="box">
                <Link route="item" params={{ id: menus.id }}>
                  <div>
                    <img width="150" height="150" src={`/static/images/menus/${menus.images}`} /><br />
                    <a>{menus.name}</a>
                    <br />{menus.price}.- <br /><br />
                  </div>
                </Link>

              </div>
            )
          })}
          <div className="clearFix"></div>
        </div>
        <div className="main-right">order list</div>
      </div>
    </div>
  )
}

const QUERY_POSTS = gql`
  query {
    postMenuIndex(first: 20) {
      id
      categoryId
      images
      name
      price
      rating {
        one
        two
        three
        four
        five
      }
    }
  }
`

export default compose(page, graphql(QUERY_POSTS))(HomePage)
