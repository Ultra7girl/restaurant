import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'
import { Link } from '../routes'

function itemPage({ data }) {
	const { loading, postMenu } = data
	console.log(postMenu)

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
				{postMenu.map(function(item) {
					return (
						<div key={item.id}>
							<div className="main-left">
								<div className="box">
									<div>
										<img
											width="300"
											height="300"
											src={`../static/images/menus/${item.images}`}
										/>
									</div>
									<p>{item.name}</p>
									<p>ราคา {item.price}-</p>
								</div>
							</div>
							<div className="main-right">
								<p>Comment</p>
								{item.relateComments.map(function(comments) {
									{
										return <p key={comments.id}>{comments.body}</p>
									}
								})}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
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
				one
				two
				three
				four
				five
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
	graphql(QUERY_POSTS, {
		options: ({ url: { query: { id } } }) => ({
			variables: {
				first: 1,
				itemId: id
			}
		})
	})
)(itemPage)
