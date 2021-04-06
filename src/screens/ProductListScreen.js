import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import {
	createProduct,
	deleteProduct,
	listProducts,
} from '../actions/productActions';
import InlineSpinner from '../components/InlineSpinner';
import LoadingSpinner from '../components/LoadingSpinner';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { pageNumber } = useParams();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products, pages, page } = productList;

	const productDelete = useSelector((state) => state.productDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete;

	const productCreate = useSelector((state) => state.productCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET });
		if (!userInfo.isAdmin) {
			history.push('/login');
		}

		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`);
		} else {
			dispatch(listProducts('', pageNumber));
		}
	}, [
		dispatch,
		userInfo,
		history,
		successDelete,
		pageNumber,
		successCreate,
		createdProduct?._id,
	]);

	const deleteProductHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteProduct(id));
		}
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	return (
		<div className="orderListScreen">
			<div className="orderListScreen__main">
				<h1 className="orderListScreen__title">Products</h1>
				<div disabled={loading} onClick={createProductHandler}>
					{loading ? <InlineSpinner /> : 'CREATE PRODUCT'}
					<i className="fas fa-plus"></i>
				</div>
				{error ? <Message message={error} color="red" /> : null}
				{errorDelete ? (
					<Message message={errorDelete} color="red" />
				) : null}
				{successDelete ? (
					<Message message={successDelete} color="green" />
				) : null}
				{errorCreate ? (
					<Message message={errorCreate} color="red" />
				) : null}
				{successCreate ? (
					<Message message={successCreate} color="green" />
				) : null}
				{loading || loadingDelete || loadingCreate ? (
					<LoadingSpinner />
				) : products.length !== 0 ? (
					<>
						<table className="orderListScreen__table">
							<thead>
								<tr>
									<th>Id</th>
									<th>Name</th>
									<th>Price</th>
									<th>Category</th>
									<th>Brand</th>
									<th>Edit Product</th>
									<th>Delete Product</th>
								</tr>
							</thead>
							<tbody>
								{products?.map((product) => (
									<tr key={product?._id}>
										<td>{product?._id}</td>
										<td>{product?.name}</td>
										<td>${product?.price}</td>
										<td>{product?.category}</td>
										<td>{product?.brand}</td>
										<td
											className="orderListScreen__tableOrderLink"
											onClick={() =>
												history.push(
													`/admin/product/${product?._id}/edit`
												)
											}>
											Edit
										</td>
										<td
											className="orderListScreen__tableId"
											onClick={() =>
												deleteProductHandler(
													product?._id
												)
											}>
											<i className="fas fa-trash"></i>
										</td>
									</tr>
								))}
							</tbody>
						</table>
						<Paginate pages={pages} isAdmin={true} page={page} />
					</>
				) : (
					<div className="cartScreen__EmptyScreen">
						<p className="cartScreen__EmptyScreenTitle">
							You do not have any users yet!
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductListScreen;
