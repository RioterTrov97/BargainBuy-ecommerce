import React from 'react';
import '../styles/Footer.scss';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer__main">
				<div className="footer__col">
					<p className="footer__colTitle">
						<i className="fas fa-headset"></i> GOT QUESTIONS?
					</p>
					<p className="footer__col1Phone">
						<i className="fas fa-phone"></i> +61 0454656883
					</p>
					<p className="footer__col1Phone">
						<i className="fas fa-phone"></i> +61 0454626875
					</p>
					<p className="footer__colNormal">
						<i className="fas fa-map-marker-alt"></i> 128 Jogan
						Street, Lidcombe, NSW 2141, Australia
					</p>
					<p className="footer__colNormal">
						<i className="far fa-envelope"></i>{' '}
						basnet.trovtle@gmail.com
					</p>
				</div>
				<div className="footer__col">
					<p className="footer__colTitle">Categories</p>
					<p className="footer__colNormal">Electronics</p>
					<p className="footer__colNormal">Computing</p>
					<p className="footer__colNormal">Fashion</p>
					<p className="footer__colNormal">Health & Beauty</p>
					<p className="footer__colNormal">Home & Garden</p>
				</div>
				<div className="footer__col">
					<p className="footer__colTitle">Information</p>
					<p className="footer__colNormal">About Us</p>
					<p className="footer__colNormal">Terms and Conditions</p>
					<p className="footer__colNormal">Returns & Exchanges</p>
					<p className="footer__colNormal">Shipping & Delivery</p>
					<p className="footer__colNormal">Privacy Policy</p>
				</div>
				<div className="footer__col">
					<p className="footer__colTitle">Useful Links</p>
					<p className="footer__colNormal">Store Location</p>
					<p className="footer__colNormal">Latest News</p>
					<p className="footer__colNormal">Portfolio</p>
					<p className="footer__colNormal">Sizse Guide</p>
					<p className="footer__colNormal">FAQs</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
