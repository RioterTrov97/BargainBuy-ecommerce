import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { listMyOrders } from '../actions/orderActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import '../styles/OrderListScreen.scss';

const OrderList = () => {
	const history = useHistory();

	const dispatch = useDispatch();
	const orderListMy = useSelector((state) => state.orderListMy);
	const { loading, error, orders } = orderListMy;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	console.log(orders);

	useEffect(() => {
		console.log('hello');
		if (!userInfo) {
			history.push('/login');
			console.log('hello again');
			return;
		}
		dispatch(listMyOrders());
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
											window.open(`/order/${order?._id}`)
										}>
										{order?._id}
									</td>
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
										{order?.isDelievered ? (
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
											window.open(`/order/${order?._id}`)
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
							You've not ordered anything yet!
						</p>
						<p className="cartScreen__EmptyScreenSubtitle">
							We have got good selection of products with us that
							you might like. You will find a lot of interesting
							products on our home page.
						</p>
						<button onClick={() => history.push('/')}>
							START SHOPPING
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderList;
