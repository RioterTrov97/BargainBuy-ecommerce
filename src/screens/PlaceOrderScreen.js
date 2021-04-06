import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { createOrder } from '../actions/orderActions';
import Message from '../components/Message';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const PlaceOrderScreen = () => {
	const cart = useSelector((state) => state.cart);
	const history = useHistory();

	const dispatch = useDispatch();

	if (!cart.shippingAddress.address) {
		history.push('/shipping');
	} else if (!cart.paymentMethod) {
		history.push('/payment');
	}
	//   Calculate prices
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	const itemsPrice = addDecimals(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
	const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
	const totalPrice = addDecimals(
		Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
	);

	const orderCreate = useSelector((state) => state.orderCreate);

	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
			dispatch({ type: USER_DETAILS_RESET });
			dispatch({ type: ORDER_CREATE_RESET });
		}

		// eslint-disable-next-line
	}, [history, success]);

	const submitOrderHandler = (e) => {
		e.preventDefault();
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod.paymentMethod,
				itemsPrice: itemsPrice,
				shippingPrice: shippingPrice,
				taxPrice: taxPrice,
				totalPrice: totalPrice,
			})
		);
	};

	return (
		<div className="cartScreen">
			<div className="cartScreen__main">
				<div className="cartScreen__mainScreen">
					<div className="cartScreen__left">
						<h1 className="loginScreen__title">Place Order?</h1>
						<p style={{ fontWeight: 'bold' }}>
							Shipping Address:{' '}
							<span style={{ fontWeight: '400' }}>
								{cart.shippingAddress.address +
									', ' +
									cart.shippingAddress.city +
									', ' +
									cart.shippingAddress.postalCode +
									', ' +
									cart.shippingAddress.country}
							</span>
						</p>
						<p style={{ fontWeight: 'bold' }}>
							Payment Method:{' '}
							<span style={{ fontWeight: '400' }}>
								{cart.paymentMethod?.paymentMethod}
							</span>
						</p>
						<div id="cartItems">
							<h4>Items</h4>
							{cart.cartItems.map((item) => (
								<div
									key={item.product}
									className="cartScreen__card">
									<img
										className="cartScreen__smallImg"
										src={item.image}
										alt={item.name}
									/>
									<p
										onClick={() =>
											history.push(
												`/product/${item.product}`
											)
										}>
										{item.name}
									</p>
									<p style={{ fontWeight: '400' }}>
										{' '}
										{item.qty} * {item.price} = $
										<span>
											{addDecimals(
												(item.qty * item.price * 100) /
													100
											)}
										</span>
									</p>
								</div>
							))}
						</div>
					</div>
					<div className="cartScreen__right">
						<p>
							Items: <span>${itemsPrice}</span>
						</p>
						<p>
							Shipping: <span>${shippingPrice}</span>
						</p>
						<p>
							Tax: <span>${taxPrice}</span>
						</p>
						<p>
							Total: <span>${totalPrice}</span>
						</p>
						{error && <Message text={error} color="red" />}
						<button onClick={submitOrderHandler}>
							SUBMIT ORDER
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlaceOrderScreen;
