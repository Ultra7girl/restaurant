import React from 'react'
import { Link } from '../routes'
import NavStyles from './NavStyles'

import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'

function Nav({ data }) {
  const { postCats } = data
  return (

    <nav>
      <style jsx>{`
      a {
          color: #666;
          text-decoration: none;
          font-size: 100%;
        }
        .box-nav {
          width: 100%;
          height: 100;
        }
        .box-nav-list {
          width: 16%;
          height: 100%;
          float: left;
          border-top: 1px solid grey;
          border-bottom: 1px solid grey;
          cursor: pointer;
        }
        .clearFix {
          clear: both;
        }
      `}</style>
      <div className="box-nav">
        {postCats.map(function (cats) {

          return (
            <div key={cats.id} className="box-nav-list">
              <Link route="category" params={{ id: cats.id }}>
                <h3><a>{cats.name}</a></h3>
              </Link>
            </div>
          )
        })}
      </div>
    </nav>
  )
}

const QUERY_POSTS = gql`
query {
  postCats(first: 20) {
    id
    name
  }
}
`

export default compose(graphql(QUERY_POSTS))(Nav)