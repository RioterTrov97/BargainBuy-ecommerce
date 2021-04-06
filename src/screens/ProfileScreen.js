import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import InlineSpinner from '../components/InlineSpinner';
import Message from '../components/Message';

const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');
	const [messageSuccess, setMessageSuccess] = useState('');

	const history = useHistory();

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, user, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(
				updateUserProfile({ id: user._id, name, email, password })
			);
			setMessageSuccess('Profile Updated!');
		}
	};

	const messageDelete = () => {
		setMessage('');
	};

	const messageSuccessDelete = () => {
		setMessageSuccess('');
	};

	return (
		<div className="loginScreen">
			<div className="loginScreen__main">
				<h1 className="loginScreen__title">User Profile</h1>
				{error ? <Message message={error} color="red" /> : null}
				{messageSuccess ? (
					<Message
						message={messageSuccess}
						color="green"
						handler={messageSuccessDelete}
					/>
				) : null}
				<label htmlFor="registerName">Name</label>
				<input
					id="registerName"
					placeholder="Enter name"
					type="text"
					value={name}
					disabled={loading}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="registerEmail">Email</label>
				<input
					id="registerEmail"
					type="email"
					value={email}
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
					{loading ? <InlineSpinner /> : 'UPDATE'}
				</button>
			</div>
		</div>
	);
};

export default RegisterScreen;
