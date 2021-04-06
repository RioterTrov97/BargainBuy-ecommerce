import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import '../styles/ProductScreen.scss';
import Rating from '../components/Rating';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import InlineSpinner from '../components/InlineSpinner';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = () => {
	const { id } = useParams();
	const [buyCount, setBuyCount] = useState(1);
	const [rating, setRating] = useState('');
	const [comment, setComment] = useState('');

	const [message, setMessage] = useState('');

	const history = useHistory();

	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productReviewCreate = useSelector(
		(state) => state.productReviewCreate
	);
	const {
		error: errorProductReview,
		success: successProductReview,
	} = productReviewCreate;

	useEffect(() => {
		if (successProductReview) {
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
			setRating('');
			setComment('');
		} else {
			dispatch(listProductDetails(id));
		}
	}, [dispatch, id, successProductReview]);

	const onCartHandler = (e) => {
		e.preventDefault();
		if (buyCount > 0) {
			history.push(`/cart/${id}?qty=${buyCount}`);
		}
	};

	const submitReviewHandler = (e) => {
		e.preventDefault();
		if (rating && comment) {
			dispatch(
				createProductReview(id, {
					rating,
					comment,
				})
			);
		} else {
			setMessage('Please add all the details');
		}
	};

	const resetMessage = () => {
		setMessage('');
	};

	return (
		<div className="productScreen">
			<div className="productScreen__main">
				<div className="productScreen__backButton">
					<Link to="/">Go Back</Link>
				</div>

				{loading ? (
					<LoadingSpinner />
				) : error ? (
					<Message message={error} color="red" />
				) : (
					<>
						<div className="productScreen__info">
							<img
								className="productScreen__image"
								src={product.image}
								alt={product.name}
							/>
							<div className="productScreen__desc">
								<p className="productScreen__name">
									{product.name}
								</p>
								<p className="productScreen__price">
									${product.price}
								</p>
								<Rating
									value={product.rating}
									text={`${product.numReviews} ${
										product.numReviews > 1
											? 'reviews'
											: 'review'
									}`}
								/>
								<p className="productScreen__description">
									{product.description}
								</p>
								<p>
									Status:{' '}
									<span>
										{product.countInStock
											? 'In Stock'
											: 'Out of Stock'}
									</span>
								</p>
								<div className="productScreen__cart">
									{product.countInStock > 0 ? (
										<div className="productScreen__buyCount">
											<button
												onClick={() =>
													setBuyCount((count) =>
														count > 1
															? count - 1
															: count
													)
												}
												className="productScreen__buyCountButton">
												<i className="fas fa-minus"></i>
											</button>
											<p>{buyCount}</p>
											<button
												onClick={() =>
													setBuyCount((count) =>
														count >= 1 &&
														count <
															product.countInStock
															? count + 1
															: count
													)
												}
												className="productScreen__buyCountButton">
												<i className="fas fa-plus"></i>
											</button>
										</div>
									) : null}

									<button
										disabled={product.countInStock <= 0}
										onClick={onCartHandler}
										className={
											product.countInStock <= 0
												? 'productScreen__cartButton productScreen__cartButtonDisabled'
												: 'productScreen__cartButton productScreen__cartButtonEnabled'
										}>
										{product.countInStock <= 0
											? 'Out of Stock'
											: 'Add to Cart'}
									</button>
								</div>
							</div>
						</div>
						<div className="productScreen__reviewsMain">
							<div className="productScreen__reviewList">
								<h2>
									Reviews
									{product?.reviews?.length > 0
										? ` (${product.numReviews})`
										: null}
								</h2>
								{product?.reviews?.length === 0 && (
									<div className="productScreen__reviewEmpty">
										<p className="productScreen__NoReview">
											No Reviews yet
										</p>
									</div>
								)}
								{product?.reviews?.map((review) => (
									<div
										className="productScreen__review"
										key={review._id}>
										<div className="productScreen__reviewTop">
											<p className="productScreen__reviewName">
												{review.name.split(' ')[0]}
											</p>
											<Rating value={review.rating} />
											<p className="productScreen__reviewDate">
												{review.createdAt.substring(
													0,
													10
												)}
											</p>
										</div>
										<p className="productScreen__comment">
											{review.comment}
										</p>
									</div>
								))}
							</div>
							{userInfo ? (
								<div className="loginScreen__main">
									<h2 className="loginScreen__title">
										Write a review
									</h2>
									{errorProductReview ? (
										<Message
											message={errorProductReview}
											color="red"
										/>
									) : null}
									{message ? (
										<Message
											message={message}
											color="red"
											handler={resetMessage}
										/>
									) : null}
									<label htmlFor="reviewRating">
										Rating (1-5)
									</label>
									<input
										id="reviewRating"
										placeholder="Enter rating"
										type="number"
										value={rating}
										disabled={loading}
										onChange={(e) => {
											setRating(
												e.target.value > 5
													? 5
													: e.target.value < 0
													? 0
													: e.target.value
											);
										}}
									/>
									<label htmlFor="registerDescription">
										Description
									</label>
									<textarea
										style={{
											minHeight: '100px',
											maxWidth: '400px',
											padding: '0.75em 1em',
											fontSize: '16px',
											borderRadius: '5px',
											marginBottom: '20px',
											outline: 'none',
											border: 'none',
											background: 'rgb(236, 236, 236)',
										}}
										id="registerDescription"
										placeholder="Enter product description"
										type="text"
										value={comment}
										disabled={loading}
										onChange={(e) =>
											setComment(e.target.value)
										}
									/>
									<button
										style={{
											maxWidth: '430px',
										}}
										type="submit"
										onClick={submitReviewHandler}
										disabled={loading}>
										{loading ? <InlineSpinner /> : 'UPDATE'}
									</button>
								</div>
							) : (
								<Message
									message="Please login to write a review"
									onClick={() => history.push('/login')}
								/>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProductScreen;
