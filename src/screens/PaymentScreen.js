import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
	const history = useHistory();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [paymentMethod, setPaymentMethod] = useState('PayPal');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod({ paymentMethod }));
		history.push('/placeorder');
	};

	return (
		<div className="loginScreen">
			<div className="loginScreen__main">
				<h1 className="loginScreen__title">Payment Method</h1>
				<label htmlFor="shippingAddress"></label>
				<input
					id="shippingAddress"
					placeholder="Enter address"
					type="text"
					disabled
					value={paymentMethod}
					onChange={(e) => setPaymentMethod(e.target.value)}
				/>
				<button type="submit" onClick={submitHandler}>
					CONTINUE
				</button>
			</div>
		</div>
	);
};

export default PaymentScreen;
