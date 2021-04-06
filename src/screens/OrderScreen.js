import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import Message from '../components/Message';
import { PayPalButton } from 'react-paypal-button-v2';
import InlineSpinner from '../components/InlineSpinner';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
	const history = useHistory();
	const { id } = useParams();

	const [sdkReady, setSdkReady] = useState(false);

	const dispatch = useDispatch();

	const orderDetails = useSelector((state) => state.orderDetails);
	const { order, loading, error } = orderDetails;

	const orderPay = useSelector((state) => state.orderPay);
	const { loading: loadingPay, success: successPay } = orderPay;

	useEffect(() => {
		const addPaypalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal');
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		if (!order || successPay) {
			dispatch({ type: ORDER_PAY_RESET });
			dispatch(getOrderDetails(id));
		} else if (!order?.isPaid) {
			if (!window.paypal) {
				addPaypalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [order, successPay, dispatch, id]);

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult);
		dispatch(payOrder(id, paymentResult));
	};

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	return (
		<div className="cartScreen">
			{loading ? <p>Loading..</p> : null}
			<div className="cartScreen__main">
				<div className="cartScreen__mainScreen">
					<div className="cartScreen__left">
						<h1 className="loginScreen__title">Order Details</h1>
						<p style={{ fontWeight: 'bold' }}>
							Order Id:{' '}
							<span style={{ fontWeight: '400' }}>
								{order?._id}
							</span>
						</p>
						<p style={{ fontWeight: 'bold' }}>
							Name:{' '}
							<span style={{ fontWeight: '400' }}>
								{order?.user.name}
							</span>
						</p>
						<p style={{ fontWeight: 'bold' }}>
							Email:{' '}
							<span style={{ fontWeight: '400' }}>
								<a href={`mailto:${order?.user.email}`}>
									{order?.user.email}
								</a>
							</span>
						</p>
						<p style={{ fontWeight: 'bold' }}>
							Shipping Address:{' '}
							<span style={{ fontWeight: '400' }}>
								{order?.shippingAddress.address +
									', ' +
									order?.shippingAddress.city +
									', ' +
									order?.shippingAddress.postalCode +
									', ' +
									order?.shippingAddress.country}
							</span>
						</p>
						{order?.isDelivered ? (
							<Message
								message={'Delivered on ' + order?.deliveredAt}
								color="green"
								hideClose
							/>
						) : (
							<Message
								message="Not Delivered"
								color="red"
								hideClose
							/>
						)}

						<p style={{ fontWeight: 'bold' }}>
							Payment Method:{' '}
							<span style={{ fontWeight: '400' }}>
								{order?.paymentMethod}
							</span>
						</p>
						{order?.isPaid ? (
							<Message
								message={'Paid on ' + order?.paidAt}
								color="green"
								hideClose
							/>
						) : (
							<Message message="Not Paid" color="red" hideClose />
						)}
						<div id="cartItems">
							<h4>Items</h4>
							{order?.orderItems.map((item) => (
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
							Items: <span>${order?.itemsPrice}</span>
						</p>
						<p>
							Shipping: <span>${order?.shippingPrice}</span>
						</p>
						<p>
							Tax: <span>${order?.taxPrice}</span>
						</p>
						<p>
							Total: <span>${order?.totalPrice}</span>
						</p>
						{error && <Message text={error} color="red" />}
						{!order?.isPaid && (
							<div>
								{' '}
								{loadingPay && <InlineSpinner />}{' '}
								{!sdkReady ? (
									<InlineSpinner />
								) : (
									<PayPalButton
										amount={order?.totalPrice}
										onSuccess={successPaymentHandler}
									/>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderScreen;
