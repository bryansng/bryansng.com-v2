import React from 'react';
import { GitHub, LinkedIn, HackerRank } from './Logos';

export default class SocialMedia extends React.Component {
	render() {
		return (
			<div className="pa4-l pa3 fixed-l left-0-l bottom-0-l flex flex-column-l flex-row flex-nowrap justify-center align-center">
				<GitHub />
				<LinkedIn />
				<HackerRank />
			</div>
		)
	}
}