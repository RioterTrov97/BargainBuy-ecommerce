import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { saveShippingAddress } from '../actions/cartActions';
import Message from '../components/Message';

const ShippingScreen = () => {
	const history = useHistory();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [address, setAddress] = useState(
		shippingAddress?.address ? shippingAddress?.address : ''
	);
	const [city, setCity] = useState(
		shippingAddress?.city ? shippingAddress?.city : ''
	);
	const [postalCode, setPostalCode] = useState(
		shippingAddress?.postalCode ? shippingAddress?.postalCode : ''
	);
	const [country, setCountry] = useState(
		shippingAddress?.country ? shippingAddress?.country : ''
	);
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		if (address && city && postalCode && country) {
			dispatch(
				saveShippingAddress({ address, city, postalCode, country })
			);
			history.push('/payment');
		} else {
			setMessage('Please fill up all the fields');
		}
	};

	const deleteMessageHandler = () => {
		setMessage('');
	};

	return (
		<div className="loginScreen">
			<div className="loginScreen__main">
				<h1 className="loginScreen__title">Shipping</h1>
				{message ? (
					<Message
						message={message}
						color="red"
						handler={deleteMessageHandler}
					/>
				) : null}
				<label htmlFor="shippingAddress">Address</label>
				<input
					id="shippingAddress"
					placeholder="Enter address"
					type="text"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<label htmlFor="shippingCity">City</label>
				<input
					id="shippingCity"
					type="text"
					value={city}
					placeholder="Enter city"
					onChange={(e) => setCity(e.target.value)}
				/>
				<label htmlFor="shippingPostalCode">Postal Code</label>
				<input
					id="shippingPostalCode"
					type="number"
					value={postalCode}
					placeholder="Enter Postal Code"
					onChange={(e) => setPostalCode(e.target.value)}
				/>
				<label htmlFor="shippingCountry">Country</label>
				<input
					id="shippingCountry"
					type="text"
					value={country}
					placeholder="Enter Country"
					onChange={(e) => setCountry(e.target.value)}
				/>
				<button type="submit" onClick={submitHandler}>
					CONTINUE
				</button>
			</div>
		</div>
	);
};

export default ShippingScreen;
