import React from 'react';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';

import '../styles/Header.scss';
import { useHistory } from 'react-router';

const Header = () => {
	const history = useHistory();
	return (
		<div className="header">
			<div className="header__main">
				<div className="header__left" onClick={() => history.push('/')}>
					BargainBuy
				</div>
				<div className="header__right">
					<SearchIcon className="header__svg" />
					<ShoppingCartIcon className="header__svg" />
					<AccountCircleIcon className="header__svg" />
				</div>
			</div>
		</div>
	);
};

export default Header;
