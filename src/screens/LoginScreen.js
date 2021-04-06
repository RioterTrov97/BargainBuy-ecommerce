import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import Message from '../components/Message';
import '../styles/LoginScreen.scss';
import { login } from '../actions/userActions';
import InlineSpinner from '../components/InlineSpinner';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const location = useLocation();
	const history = useHistory();

	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<div className="loginScreen">
			<div className="loginScreen__main">
				<h1 className="loginScreen__title">Login</h1>
				{error ? <Message message={error} color="red" /> : null}
				{loading ? <p>Loading</p> : null}
				<label htmlFor="loginEmail">Email</label>
				<input
					id="loginEmail"
					type="email"
					disabled={loading}
					placeholder="Enter email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor="loginPassword">Password</label>
				<input
					id="loginPassword"
					type="text"
					disabled={loading}
					placeholder="Enter strong password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="submit"
					onClick={submitHandler}
					disabled={loading}>
					{loading ? <InlineSpinner /> : 'SIGN IN'}
				</button>
				<p>
					New Customer?{' '}
					<span
						onClick={() =>
							history.push(
								`${
									redirect
										? `/register?redirect=${redirect}`
										: '/register'
								}`
							)
						}>
						Register
					</span>
				</p>
			</div>
		</div>
	);
};

export default LoginScreen;
