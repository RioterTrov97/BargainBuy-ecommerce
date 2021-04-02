import React from 'react';
import { useHistory } from 'react-router';
import '../styles/ProductCard.scss';
import Rating from './Rating';

const ProductCard = ({ id, name, image, price, rating, reviews }) => {
	const history = useHistory();
	return (
		<div
			className="productCard"
			onClick={() => history.push(`/product/${id}`)}>
			<img src={image} alt="" className="productCard__img" />
			<p className="productCard__name">{name}</p>
			<div className="productCard__rating">
				<Rating
					value={rating}
					text={`${reviews} ${reviews > 1 ? 'reviews' : 'review'}`}
				/>
			</div>

			<p className="productCard__price">${price}</p>
		</div>
	);
};

export default ProductCard;
