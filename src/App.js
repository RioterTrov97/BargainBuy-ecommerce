import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { verifyUser } from './actions/userActions';
import LoadingSpinner from './components/LoadingSpinner';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import AllOrderListScreen from './screens/AllOrderListScreen';
import AdminOrderScreen from './screens/AdminOrderScreen';

function App() {
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { loading, userInfo } = userLogin;

	useEffect(() => {
		if (localStorage.getItem('userInfo')) {
			dispatch(verifyUser());
		}
	}, [dispatch]);

	return (
		<Router>
			{!loading ? (
				<>
					<Header />
					{userInfo?.isAdmin ? (
						<>
							<Route
								exact
								path="/admin/users"
								component={UserListScreen}
							/>
							<Route
								exact
								path="/admin/user/:id/edit"
								component={UserEditScreen}
							/>
							<Route
								exact
								path="/admin/products"
								component={ProductListScreen}
							/>
							<Route
								path="/admin/products/:pageNumber"
								component={ProductListScreen}
								exact
							/>
							<Route
								exact
								path="/admin/product/:id/edit"
								component={ProductEditScreen}
							/>
							<Route
								exact
								path="/admin/order/:id/"
								component={AdminOrderScreen}
							/>
							<Route
								exact
								path="/admin/orders"
								component={AllOrderListScreen}
							/>
						</>
					) : null}
					<Route path="/login" component={LoginScreen} />
					<Route path="/shipping" component={ShippingScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/order/:id" component={OrderScreen} />
					<Route path="/myorders" component={OrderListScreen} />
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route
						path="/search/:keyword"
						component={HomeScreen}
						exact
					/>
					<Route
						path="/page/:pageNumber"
						component={HomeScreen}
						exact
					/>
					<Route
						path="/search/:keyword/page/:pageNumber"
						component={HomeScreen}
						exact
					/>
					<Route exact path="/" component={HomeScreen} />
					<Footer />
				</>
			) : (
				<LoadingSpinner />
			)}
		</Router>
	);
}

export default App;
