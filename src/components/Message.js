import React, { useState } from 'react';
import '../styles/Message.scss';

const Message = ({ message, color, handler, hideClose }) => {
	const [hide, setHide] = useState(false);
	return (
		<div
			style={{
				backgroundColor: `${
					color === 'red'
						? 'rgb(255, 196, 188)'
						: 'rgb(190, 255, 206)'
				}`,
			}}
			className={hide ? 'message__hide' : 'message__open'}>
			<p
				style={{
					color: `${
						color === 'red' ? 'rgb(255, 0, 0)' : 'rgb(0, 156, 8)'
					}`,
				}}
				className="message__message">
				{message}
			</p>
			{hideClose ? null : (
				<i
					style={{
						color: `${
							color === 'red'
								? 'rgb(255, 20, 20)'
								: 'rgb(0, 187, 16)'
						}`,
					}}
					className="far fa-times-circle"
					onClick={() => {
						setHide(true);
						if (handler) handler();
					}}></i>
			)}
		</div>
	);
};

export default Message;
