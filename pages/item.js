import React from 'react'
import Head from 'next/head'
import { compose } from 'recompose'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import page from '../hocs/page'

function itemPage({ data }) {
	const { loading, postMenu } = data

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


				.rating {
						float:left;
				}

				/* :not(:checked) is a filter, so that browsers that don’t support :checked don’t 
					follow these rules. Every browser that supports :checked also supports :not(), so
					it doesn’t make the test unnecessarily selective */
				.rating:not(:checked) > input {
						position:absolute;
						top:-9999px;
						clip:rect(0,0,0,0);
				}

				.rating:not(:checked) > label {
						float:right;
						width:1em;
						padding:0 .1em;
						overflow:hidden;
						white-space:nowrap;
						cursor:pointer;
						font-size:200%;
						line-height:1.2;
						color:#ddd;
						text-shadow:1px 1px #bbb, 2px 2px #666, .1em .1em .2em rgba(0,0,0,.5);
				}

				.rating:not(:checked) > label:before {
						content: '★ ';
				}

				.rating > input:checked ~ label {
						color: #f70;
						text-shadow:1px 1px #c60, 2px 2px #940, .1em .1em .2em rgba(0,0,0,.5);
				}

				.rating:not(:checked) > label:hover,
				.rating:not(:checked) > label:hover ~ label {
						color: gold;
						text-shadow:1px 1px goldenrod, 2px 2px #B57340, .1em .1em .2em rgba(0,0,0,.5);
				}

				.rating > input:checked + label:hover,
				.rating > input:checked + label:hover ~ label,
				.rating > input:checked ~ label:hover,
				.rating > input:checked ~ label:hover ~ label,
				.rating > label:hover ~ input:checked ~ label {
						color: #ea0;
						text-shadow:1px 1px goldenrod, 2px 2px #B57340, .1em .1em .2em rgba(0,0,0,.5);
				}

				.rating > label:active {
						position:relative;
						top:2px;
						left:2px;
				}
			`}</style>
			<Head>
				<title>Restaurant </title>
			</Head>
			<div className="container">
				{postMenu.map(function (item) {
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
									<p>

										<div className="rating">
											<input type="radio" id="star5" checked={(item.rating.avgRating <= 5)} name="rating" value="5" /><label htmlFor="star5" title="Rocks!">5 stars</label>
											<input type="radio" id="star4" checked={(item.rating.avgRating <= 4)} name="rating" value="4" /><label htmlFor="star4" title="Pretty good">4 stars</label>
											<input type="radio" id="star3" checked={(item.rating.avgRating <= 3)} name="rating" value="3" /><label htmlFor="star3" title="Meh">3 stars</label>
											<input type="radio" id="star2" checked={(item.rating.avgRating <= 2)} name="rating" value="2" /><label htmlFor="star2" title="Kinda bad">2 stars</label>
											<input type="radio" id="star1" checked={(item.rating.avgRating <= 1)} name="rating" value="1" /><label htmlFor="star1" title="Sucks big time">1 star</label>
										</div>
										({item.rating.totalRating} Ratings)
									</p>
									<p><h2>{item.name}</h2></p>
									<p>ราคา {item.price}.-</p>
									<input type="button" value="Order" />
								</div>
							</div>
							<div className="main-right">
								<p>
									<strong>Reviews</strong>
								</p>
								{item.relateComments.map(function (comments) {
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
				rawRating {
					one
					two
					three
					four
					five
				}
				totalRating
				avgRating
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
