import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { listProductDetails, updateProduct } from '../actions/productActions';
import InlineSpinner from '../components/InlineSpinner';
import Message from '../components/Message';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState('');
	const [description, setDescription] = useState('');

	const [uploading, setUploading] = useState(false);

	const [message, setMessage] = useState('');
	const [messageSuccess, setMessageSuccess] = useState('');

	const history = useHistory();
	const { id } = useParams();

	const dispatch = useDispatch();
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
			history.push('/admin/products');
		} else {
			if (!userInfo) {
				history.push('/login');
			} else {
				if (!product.name || product._id !== id) {
					dispatch(listProductDetails(id));
				} else {
					setName(product.name);
					setPrice(product.price);
					setImage(product.image);
					setBrand(product.brand);
					setCategory(product.category);
					setCountInStock(product.countInStock);
					setDescription(product.description);
				}
			}
		}
	}, [dispatch, history, product, successUpdate, id, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateProduct({
				_id: id,
				name,
				price,
				image,
				category,
				brand,
				countInStock,
				description,
			})
		);
		setMessageSuccess('Product Updated!');
	};

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post('/api/upload', formData, config);
			setImage(data);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploading(false);
		}
	};

	const messageDelete = () => {
		setMessage('');
	};

	const messageSuccessDelete = () => {
		setMessageSuccess('');
	};

	return (
		<div className="loginScreen">
			<div className="loginScreen__main">
				<h1 className="loginScreen__title">Edit Product</h1>
				{errorUpdate ? (
					<Message message={errorUpdate} color="red" />
				) : null}
				{error ? <Message message={error} color="red" /> : null}
				{messageSuccess ? (
					<Message
						message={messageSuccess}
						color="green"
						handler={messageSuccessDelete}
					/>
				) : null}
				<label htmlFor="registerName">Name</label>
				<input
					id="registerName"
					placeholder="Enter product name"
					type="text"
					value={name}
					disabled={loading || loadingUpdate}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="registerPrice">Price</label>
				<input
					id="registerPrice"
					placeholder="Enter product price"
					type="number"
					value={price}
					disabled={loading || loadingUpdate}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<label htmlFor="registerImage">Image</label>
				<input
					id="registerImage"
					placeholder="Enter product image URL"
					type="text"
					value={image}
					disabled={loading || loadingUpdate}
					onChange={(e) => setImage(e.target.value)}
				/>
				<input
					style={{ background: 'none', marginTop: '-20px' }}
					id="registerImage2"
					placeholder="Enter product image URL"
					type="file"
					disabled={loading || loadingUpdate}
					onChange={uploadFileHandler}
				/>
				{uploading ? <InlineSpinner /> : null}
				<label htmlFor="registerBrand">Brand</label>
				<input
					id="registerBrand"
					placeholder="Enter product brand"
					type="text"
					value={brand}
					disabled={loading || loadingUpdate}
					onChange={(e) => setBrand(e.target.value)}
				/>
				<label htmlFor="registerCategory">Category</label>
				<input
					id="registerCategory"
					placeholder="Enter product category"
					type="text"
					value={category}
					disabled={loading || loadingUpdate}
					onChange={(e) => setCategory(e.target.value)}
				/>
				<label htmlFor="registerPrice">Count In Stock</label>
				<input
					id="registerPrice"
					placeholder="Enter product count in stock"
					type="number"
					value={countInStock}
					disabled={loading || loadingUpdate}
					onChange={(e) => setCountInStock(e.target.value)}
				/>
				<label htmlFor="registerDescription">Description</label>
				<textarea
					style={{
						minHeight: '100px',
						padding: '0.75em 1em',
						fontSize: '16px',
						borderRadius: '5px',
						marginBottom: '20px',
						outline: 'none',
						border: 'none',
						background: 'rgb(236, 236, 236)',
					}}
					id="registerDescription"
					placeholder="Enter product description"
					type="text"
					value={description}
					disabled={loading || loadingUpdate}
					onChange={(e) => setDescription(e.target.value)}
				/>

				{message ? (
					<Message
						message={message}
						color="red"
						handler={messageDelete}
					/>
				) : null}
				<button
					type="submit"
					onClick={submitHandler}
					disabled={loading}>
					{loading || loadingUpdate ? <InlineSpinner /> : 'UPDATE'}
				</button>
			</div>
		</div>
	);
};

export default ProductEditScreen;
