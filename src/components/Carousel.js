import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts } from '../actions/productActions';
import '../styles/Carousel.scss';
import LoadingSpinner from './LoadingSpinner';
import Message from './Message';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CarouselContainer = () => {
	const dispatch = useDispatch();

	const productTopRated = useSelector((state) => state.productTopRated);
	const { loading, error, products } = productTopRated;

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	return loading ? (
		<LoadingSpinner />
	) : error ? (
		<Message error="error" color="red" />
	) : (
		<Carousel autoFocus autoPlay emulateTouch className="carouselComp">
			{products.map((product) => (
				<div className="carouselComp__item" key={product._id}>
					<img src={product.image} alt={product.name} />
					<div className="carouselComp__nameButton">
						<p>{product.name}</p>
						<p>${product.price}</p>
						<button className="carouselComp__button">
							Buy Now
						</button>
					</div>
				</div>
			))}
		</Carousel>
	);
};

export default CarouselContainer;
