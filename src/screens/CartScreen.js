import React, { useEffect } from 'react';
import '../styles/CartScreen.scss';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import { addToCart, removeFromCart } from '../actions/cartActions';
import BuyCount from '../components/buyCount';

const CartScreen = () => {
	const { id } = useParams();
	const location = useLocation();
	const history = useHistory();

	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		if (id) {
			dispatch(addToCart(id, qty));
		}
	}, [dispatch, id, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
	};

	return (
		<div className="cartScreen">
			<div className="cartScreen__main">
				{cartItems.length === 0 ? (
					<div className="cartScreen__EmptyScreen">
						<p className="cartScreen__EmptyScreenTitle">
							Your cart is Empty!
						</p>
						<p className="cartScreen__EmptyScreenSubtitle">
							Before proceeding to checkout, you must add some
							products to your shopping cart. You will find a lot
							of interesting products on our home page.
						</p>
						<button onClick={() => history.push('/')}>
							START SHOPPING
						</button>
					</div>
				) : (
					<div className="cartScreen__mainScreen">
						<div className="cartScreen__left">
							{cartItems.map((item) => (
								<div
									key={item.product}
									className="cartScreen__card">
									<img src={item.image} alt={item.name} />
									<p
										onClick={() =>
											history.push(
												`/product/${item.product}`
											)
										}>
										Name: {item.name}
									</p>
									<BuyCount
										id={item.product}
										initialCount={item.qty}
										maxCount={item.countInStock}
									/>
									<button
										onClick={() =>
											removeFromCartHandler(item.product)
										}>
										<i className="fas fa-trash"></i>
									</button>
								</div>
							))}
						</div>
						<div className="cartScreen__right">
							<h1>
								{' '}
								SUBTOTAL (
								{cartItems.reduce(
									(acc, item) => acc + item.qty,
									0
								)}
								) ITEMS
							</h1>
							<p>
								<span>Total:</span> $
								{Math.round(
									(cartItems.reduce(
										(acc, item) =>
											acc + item.qty * item.price,
										0
									) *
										100) /
										100
								).toFixed(2)}
							</p>
							<button
								onClick={() =>
									history.push('/login?redirect=shipping')
								}>
								PROCEED TO CHECKOUT
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartScreen;
