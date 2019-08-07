import React from 'react';

const MailTo = ({ isCenter = false, text = "Say Hello" }) => {
	return (
		<a href="mailto:sngby98@gmail.com" className="no-underline">
			<button
				className={`pv2 ph4 pointer ttu
					${isCenter ? "center" : ""}
					btn-bg btn-border btn-text btn-transition nowrap font-montserrat-bold`}>
					{text}
			</button>
		</a>
	)
}

export default MailTo;
