import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { register } from '../actions/userActions';
import InlineSpinner from '../components/InlineSpinner';
import Message from '../components/Message';

const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const location = useLocation();
	const history = useHistory();

	const dispatch = useDispatch();
	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
			return;
		}
		dispatch(register(name, email, password));
	};

	const messageDelete = () => {
		setMessage('');
	};
	return (
		<div className="loginScreen">
			<div className="loginScreen__main">
				<h1 className="loginScreen__title">Register</h1>
				{error ? <Message message={error} color="red" /> : null}
				<label htmlFor="registerName">Name</label>
				<input
					id="registerName"
					placeholder="Enter name"
					type="text"
					disabled={loading}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="registerEmail">Email</label>
				<input
					id="registerEmail"
					type="email"
					disabled={loading}
					placeholder="Enter email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="registerPassword">Password</label>
				<input
					id="registerPassword"
					type="text"
					disabled={loading}
					placeholder="Enter strong password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor="registerConfirmPassword">
					Confirm Password
				</label>
				<input
					id="registerConfirmPassword"
					type="text"
					disabled={loading}
					placeholder="Enter strong password"
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				{message ? (
					<Message
						message={message}
						color="red"
						handler={messageDelete}
					/>
				) : null}
				<button
					type="submit"
					onClick={submitHandler}
					disabled={loading}>
					{loading ? <InlineSpinner /> : 'SIGN UP'}
				</button>
				<p>
					Already an user?{' '}
					<span
						onClick={() =>
							history.push(
								`${
									redirect
										? `/login?redirect=${redirect}`
										: '/login'
								}`
							)
						}>
						Login
					</span>
				</p>
			</div>
		</div>
	);
};

export default RegisterScreen;
