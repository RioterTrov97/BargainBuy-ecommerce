import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/ProductScreen.scss';
import Rating from '../components/Rating';

const ProductScreen = () => {
	const { id } = useParams();
	const [product, setProduct] = useState([]);

	useEffect(() => {
		const fetchProduct = async () => {
			const { data } = await axios.get(`/api/products/${id}`);
			console.log(data);
			setProduct(data);
		};

		fetchProduct();
	}, [id]);
	return (
		<div className="productScreen">
			<div className="productScreen__main">
				<div className="productScreen__backButton">
					<Link to="/">Go Back</Link>
				</div>

				<div className="productScreen__info">
					<img
						className="productScreen__image"
						src={product.image}
						alt={product.name}
					/>
					<div className="productScreen__desc">
						<p className="productScreen__name">{product.name}</p>
						<p className="productScreen__price">${product.price}</p>
						<Rating
							value={product.rating}
							text={`${product.numReviews} ${
								product.numReviews > 1 ? 'reviews' : 'review'
							}`}
						/>
						<p className="productScreen__description">
							{product.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductScreen;
