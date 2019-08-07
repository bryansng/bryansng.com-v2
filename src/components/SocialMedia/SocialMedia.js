import React from 'react';
import Segment from '../Segment';
import { GitHub, LinkedIn, HackerRank } from './Logos';

export default class SocialMedia extends React.Component {
	render() {
		return (
			<Segment isSegmentInViewport={true} isAnimationSlideIn={false} animationDelay="delay-150" noPadding={true}>
				<div className="pa4-l pa3 fixed-l left-0-l bottom-0-l flex flex-column-l flex-row flex-nowrap justify-center align-center">
					<GitHub />
					<LinkedIn />
					<HackerRank />
				</div>
			</Segment>
		)
	}
}