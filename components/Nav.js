import React from 'react'
import { Link } from '../routes'
import NavStyles from './NavStyles'

import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'

function Nav({ data }) {
  const { loading, postCats } = data
  return (

    <nav>
      <style jsx>{`
      a {
          color: #666;
          text-decoration: none;
          font-size: 100%;
        }
        .box-nav {
          width: 10%;
          height: 100;
          float: left;
          border-top: 1px solid grey;
          border-bottom: 1px solid grey;
        }
        .clearFix {
          clear: both;
        }
      `}</style>
      {postCats.map(function (cats) {

        return (
          <div key={cats.id} className="box-nav">
            <Link route="category" params={{ id: cats.id }}>
              <a>{cats.name}</a>
            </Link>
          </div>
        )
      })}
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