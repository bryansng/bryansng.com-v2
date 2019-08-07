import React from 'react';
import Segment from './Segment';
import GitHubPinnedRepos from './GitHubPinnedRepos';
import { TabContent } from './Navigation/Navigation';
import content from '../config/content';

class Projects extends React.Component {
	render() {
		const { componentOrder } = this.props;

		const { section_name } = content.projects;
		return (
			<div id="projects">
				<Segment>
					<div className="tc">
						<div className="pa3">
							<TabContent index={componentOrder} content={section_name} isLink={false} />
						</div>
						<GitHubPinnedRepos />
					</div>
				</Segment>
			</div>
		)
	}
}

export default Projects;