import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import '../styles/HomeScreen.scss';

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get('/api/products');
			console.log(data.products);
			setProducts(data.products);
		};

		fetchProducts();
	}, []);

	return (
		<div className="homeScreen">
			<div className="homeScreen__main">
				<h1>This is homescreen.</h1>
				<div className="homeScreen__productList">
					{products.map((product) => (
						<ProductCard
							key={product._id}
							name={product.name}
							image={product.image}
							price={product.price}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
