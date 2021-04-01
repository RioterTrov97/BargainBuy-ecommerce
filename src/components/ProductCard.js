import React from 'react';
import '../styles/ProductCard.scss';

const ProductCard = ({ name, image, price }) => {
	return (
		<div className="productCard">
			<img src={image} alt="" className="productCard__img" />
			<p className="productCard__name">{name}</p>
			<p className="productCard__price">${price}</p>
		</div>
	);
};

export default ProductCard;
