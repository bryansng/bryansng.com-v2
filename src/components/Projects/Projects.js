import React from 'react';
import GitHubPinnedRepos from './GitHubPinnedRepos';
import { TabContent } from '../Navigation/Navigation';
import content from '../../config/content';
import SlideIn from '../universal/SlideIn';
import PaddingResizer from '../universal/PaddingResizer';

export default class Projects extends React.Component {
	render() {
		const { componentOrder } = this.props;
		const { section_name } = content.projects;
		return (
			<div id="projects">
				<SlideIn>
					<PaddingResizer>
						<div className="w-90-l w-90-m w-100 center tc">
							<div className="pv3">
								<TabContent index={componentOrder} content={section_name} isLink={false} />
							</div>
							<GitHubPinnedRepos />
						</div>
					</PaddingResizer>
				</SlideIn>
			</div>
		)
	}
}