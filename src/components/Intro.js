import React from 'react';
import Segment from './Segment';
import MailTo from './MailTo';
import content from '../config/content';

class Intro extends React.Component {
	render() {
		const intro = content.intro;
		const { hi, name, short_desc, desc, button_msg } = intro;
		return (
			<div id="intro">
				<Segment isSegmentInViewport={true}>
					<div className="w-75 center tl">
						<p className="mv0 pv0 slide-in-bottom delay-025 greet font-ubuntu-mono">{hi}</p>
						<h1 className="mv0 pv1 f1 slide-in-bottom delay-050 title">{name}</h1>
						<h2 className="mv0 pv1 f2 slide-in-bottom delay-075 desc">{short_desc}</h2>
						<p className="pv3 lh-copy slide-in-bottom delay-100 paragraph">{desc}</p>
						<div className="slide-in-bottom delay-125">
							<MailTo text={button_msg} />
						</div>
					</div>
				</Segment>
			</div>
		)
	}
}

export default Intro;