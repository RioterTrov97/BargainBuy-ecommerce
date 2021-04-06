import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { listOrders } from '../actions/orderActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import '../styles/OrderListScreen.scss';

const OrderList = () => {
	const history = useHistory();

	const dispatch = useDispatch();
	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	console.log(orders);

	useEffect(() => {
		console.log('hello');
		if (!userInfo && userInfo.isAdmin) {
			history.push('/login');
			return;
		}
		dispatch(listOrders());
	}, [dispatch, history, userInfo]);

	return (
		<div className="orderListScreen">
			<div className="orderListScreen__main">
				<h1 className="orderListScreen__title">My Orders</h1>
				{error ? <Message message={error} color="red" /> : null}
				{loading ? (
					<LoadingSpinner />
				) : orders.length !== 0 ? (
					<table className="orderListScreen__table">
						<thead>
							<tr>
								<th>Id</th>
								<th>User</th>
								<th>Date</th>
								<th>Total</th>
								<th>Paid</th>
								<th>Delivered</th>
								<th>Details</th>
							</tr>
						</thead>
						<tbody>
							{orders?.map((order) => (
								<tr key={order?._id}>
									<td
										className="orderListScreen__tableId"
										onClick={() =>
											window.open(
												`/admin/order/${order?._id}`
											)
										}>
										{order?._id}
									</td>
									<td>{order?.user && order.user.name}</td>
									<td>{order?.createdAt.substring(0, 10)}</td>
									<td>${order?.totalPrice}</td>
									<td>
										{order?.isPaid ? (
											order?.paidAt.substring(0, 10)
										) : (
											<i
												className="fas fa-times"
												style={{ color: 'red' }}></i>
										)}
									</td>
									<td>
										{order?.isDelivered ? (
											order?.deliveredAt.substring(0, 10)
										) : (
											<i
												className="fas fa-times"
												style={{ color: 'red' }}></i>
										)}
									</td>
									<td
										className="orderListScreen__tableOrderLink"
										onClick={() =>
											window.open(
												`/admin/order/${order?._id}`
											)
										}>
										View
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="cartScreen__EmptyScreen">
						<p className="cartScreen__EmptyScreenTitle">
							You've got no orders yet!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderList;
