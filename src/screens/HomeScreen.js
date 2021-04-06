import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import ProductCard from '../components/ProductCard';
import '../styles/HomeScreen.scss';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import { useParams } from 'react-router';
import Paginate from '../components/Paginate';
import Carousel from '../components/Carousel';

const HomeScreen = () => {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { keyword, pageNumber } = useParams();

	const { loading, error, products, page, pages } = productList;

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	return (
		<div className="homeScreen">
			<div className="homeScreen__main">
				{!keyword ? (
					<>
						{' '}
						<p className="homeScreen__listTitle">
							Top Products
						</p>{' '}
						<Carousel />
					</>
				) : null}
				<p className="homeScreen__listTitle">Latest Products</p>
				{loading ? (
					<LoadingSpinner />
				) : error ? (
					<Message message={error} color={'red'} />
				) : (
					<>
						<div className="homeScreen__productList">
							{products?.map((product) => (
								<ProductCard
									key={product._id}
									id={product._id}
									name={product.name}
									image={product.image}
									price={product.price}
									rating={product.rating}
									reviews={product.numReviews}
								/>
							))}
						</div>
						<Paginate pages={pages} page={page} />
					</>
				)}
			</div>
		</div>
	);
};

export default HomeScreen;
