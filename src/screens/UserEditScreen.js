import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { getUserDetails, updateUser } from '../actions/userActions';
import InlineSpinner from '../components/InlineSpinner';
import Message from '../components/Message';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);
	const [message, setMessage] = useState('');
	const [messageSuccess, setMessageSuccess] = useState('');

	const history = useHistory();
	const { id } = useParams();

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdate = useSelector((state) => state.userUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			history.push('/admin/users');
		} else {
			if (!userInfo) {
				history.push('/login');
			} else {
				if (!user.name || user._id !== id) {
					dispatch(getUserDetails(id));
				} else {
					setName(user.name);
					setEmail(user.email);
					setIsAdmin(user.isAdmin);
				}
			}
		}
	}, [dispatch, history, user, successUpdate, id, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser({ _id: id, name, email, isAdmin }));
		setMessageSuccess('Profile Updated!');
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
				<h1 className="loginScreen__title">Edit User</h1>
				{errorUpdate ? (
					<Message message={errorUpdate} color="red" />
				) : null}
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
					disabled={loading || loadingUpdate}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="registerEmail">Email</label>
				<input
					id="registerEmail"
					type="email"
					value={email}
					disabled={loading || loadingUpdate}
					placeholder="Enter email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div className="loginScreen__isAdmin">
					<label>Admin: </label>
					<input
						id="registerPassword"
						type="checkbox"
						disabled={loading || loadingUpdate}
						checked={isAdmin}
						onChange={(e) => setIsAdmin(e.target.checked)}
					/>
				</div>

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
					{loading || loadingUpdate ? <InlineSpinner /> : 'UPDATE'}
				</button>
			</div>
		</div>
	);
};

export default UserEditScreen;
