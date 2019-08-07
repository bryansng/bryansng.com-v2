import React from 'react';
import SocialMedia from './SocialMedia/SocialMedia';
import content from '../config/content';

const Footer = () => {
	// const currentYear = new Date().getFullYear();
	const { github_link_msg, github_link_url } = content.footer;
	return (
		<div className="footer-bg shadow-2">
			<SocialMedia />
			<div className="tc ma0 pt2 pb4 pv4-l">
				<a href={github_link_url} className="no-underline">
					<span className="ph2 font-ubuntu-mono footer transition-ease-in">
						{github_link_msg}
					</span>
				</a>
			</div>
		</div>
	)
}

export default Footer;