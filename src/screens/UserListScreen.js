import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteUser, listUsers, logout } from '../actions/userActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';

const UserListScreen = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userDelete = useSelector((state) => state.userDelete);
	const { success: successDelete } = userDelete;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			dispatch(logout());
		}
	}, [dispatch, userInfo, history, successDelete]);

	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
	};

	return (
		<div className="orderListScreen">
			<div className="orderListScreen__main">
				<h1 className="orderListScreen__title">My Orders</h1>
				{error ? <Message message={error} color="red" /> : null}
				{loading ? (
					<LoadingSpinner />
				) : users.length !== 0 ? (
					<table className="orderListScreen__table">
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Email</th>
								<th>Admin</th>
								<th>Edit User</th>
								<th>Delete User</th>
							</tr>
						</thead>
						<tbody>
							{users?.map((user) => (
								<tr key={user?._id}>
									<td>{user?._id}</td>
									<td>{user?.name}</td>
									<td>
										<a href={`mailto:${user?.email}`}>
											{user?.email}
										</a>
									</td>
									<td>
										{user?.isAdmin ? (
											<i
												className="fas fa-check"
												style={{ color: 'green' }}></i>
										) : (
											<i
												className="fas fa-times"
												style={{ color: 'red' }}></i>
										)}
									</td>
									<td
										className="orderListScreen__tableOrderLink"
										onClick={() =>
											history.push(
												`/admin/user/${user?._id}/edit`
											)
										}>
										Edit
									</td>
									<td
										className="orderListScreen__tableId"
										onClick={() =>
											deleteUserHandler(user?._id)
										}>
										<i className="fas fa-trash"></i>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="cartScreen__EmptyScreen">
						<p className="cartScreen__EmptyScreenTitle">
							You do not have any users yet!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserListScreen;
