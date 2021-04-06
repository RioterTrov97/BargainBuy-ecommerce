import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const BuyCount = ({ id, initialCount, maxCount }) => {
	const [buyCount, setBuyCount] = useState(initialCount);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(addToCart(id, buyCount));
	}, [dispatch, id, buyCount]);

	return (
		<div key={id} className="productScreen__buyCount cartScreen__buyCount">
			<button
				onClick={() =>
					setBuyCount((count) => (count > 1 ? count - 1 : count))
				}
				className="productScreen__buyCountButton">
				<i className="fas fa-minus"></i>
			</button>
			<p>{buyCount}</p>
			<button
				onClick={() =>
					setBuyCount((count) =>
						count >= 1 && count < maxCount ? count + 1 : count
					)
				}
				className="productScreen__buyCountButton">
				<i className="fas fa-plus"></i>
			</button>
		</div>
	);
};

export default BuyCount;
