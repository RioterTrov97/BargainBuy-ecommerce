import React, { useState } from 'react';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import '../styles/Header.scss';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [keyword, setKeyword] = useState('');
	const [showMobileNav, setShowMobileNav] = useState(false);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logOutHandler = () => {
		dispatch(logout());
	};

	const capitalizeFirstChar = (str) =>
		str.charAt(0).toUpperCase() + str.substring(1);

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			history.push(`/search/${keyword}`);
			setKeyword('');
		} else {
			history.push('/');
		}
	};

	const searchBox = (
		<div className="header__searchMain">
			<input
				className="header__searchBox"
				placeholder="Search products"
				type="text"
				value={keyword}
				onChange={(e) => setKeyword(e.target.value)}
			/>
			<div className="header__searchIcon" onClick={submitHandler}>
				<i className="fas fa-search"></i>
			</div>
		</div>
	);

	const headerBoxItems = (
		<>
			{searchBox}
			<ShoppingCartIcon
				className="header__svg"
				onClick={() => history.push('/cart')}
			/>
			{userInfo ? (
				<div className="header__userInfo">
					<p>
						Hi {capitalizeFirstChar(userInfo?.name.split(' ')[0])}
					</p>
					<div className="header__userInfoDropdown">
						<i className="fas fa-caret-down"></i>
					</div>
					<div className="header__userInfoDropdownList header__show">
						{userInfo?.isAdmin ? (
							<>
								<p onClick={() => history.push('/admin/users')}>
									Users
								</p>
								<p
									onClick={() =>
										history.push('/admin/products')
									}>
									Products
								</p>
								<p
									onClick={() =>
										history.push('/admin/orders')
									}>
									Orders
								</p>
							</>
						) : (
							<>
								<p onClick={() => history.push('/profile')}>
									Profile
								</p>
								<p onClick={() => history.push('/myorders')}>
									Orders
								</p>
							</>
						)}
						<p onClick={logOutHandler}>Logout</p>
					</div>
				</div>
			) : (
				<div className="header__login">
					<div
						className="header__loginText"
						onClick={() => history.push('/login')}>
						<span>
							<AccountCircleIcon
								className="header__loginSvg"
								onClick={() => history.push('/login')}
							/>
						</span>
						<p>Login</p>
					</div>
				</div>
			)}
		</>
	);

	return (
		<header className="header">
			{showMobileNav ? (
				<div
					className="header__mobileNavContainer"
					onClick={() => setShowMobileNav(!showMobileNav)}>
					<div className="header__mobileNav">
						<i
							className={
								showMobileNav ? 'fas fa-times' : 'fas fa-bars'
							}
							onClick={() =>
								setShowMobileNav(!showMobileNav)
							}></i>
						{headerBoxItems}
					</div>
				</div>
			) : null}
			<div className="header__main">
				<div className="header__left" onClick={() => history.push('/')}>
					BargainBuy
				</div>
				<div className="header__right">
					<div className="header__mobile">
						<i
							className={
								showMobileNav ? 'fas fa-times' : 'fas fa-bars'
							}
							onClick={() =>
								setShowMobileNav(!showMobileNav)
							}></i>
					</div>
					<div className="header__desktop">
						{searchBox}
						<ShoppingCartIcon
							className="header__svg"
							onClick={() => history.push('/cart')}
						/>
						{userInfo ? (
							<div className="header__userInfo">
								<p>
									Hi{' '}
									{capitalizeFirstChar(
										userInfo?.name.split(' ')[0]
									)}
								</p>
								<div className="header__userInfoDropdown">
									<i className="fas fa-caret-down"></i>
								</div>
								<div className="header__userInfoDropdownList header__show">
									{userInfo?.isAdmin ? (
										<>
											<p
												onClick={() =>
													history.push('/admin/users')
												}>
												Users
											</p>
											<p
												onClick={() =>
													history.push(
														'/admin/products'
													)
												}>
												Products
											</p>
											<p
												onClick={() =>
													history.push(
														'/admin/orders'
													)
												}>
												Orders
											</p>
										</>
									) : (
										<>
											<p
												onClick={() =>
													history.push('/profile')
												}>
												Profile
											</p>
											<p
												onClick={() =>
													history.push('/myorders')
												}>
												Orders
											</p>
										</>
									)}
									<p onClick={logOutHandler}>Logout</p>
								</div>
							</div>
						) : (
							<div className="header__login">
								<div
									className="header__loginText"
									onClick={() => history.push('/login')}>
									<span>
										<AccountCircleIcon
											className="header__loginSvg"
											onClick={() =>
												history.push('/login')
											}
										/>
									</span>
									<p>Login</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
