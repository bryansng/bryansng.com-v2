import React from 'react';
import Segment from './Segment';
import { GitHub, ExternalLinkSymbol } from './SocialMedia/Logos';
import { gql } from "apollo-boost";
import { Query, ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { TabContent } from './Navigation/Navigation';
import content from '../config/content';
const projects = content.projects;

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
	const token = "b71cd193bef9c9dacc02013abf504713a0283cd4";
	
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const GitHubPinnedRepos = () => {
	const { github_username } = projects;
	return (
		<Query
			query={gql`
				{
					user(login: "${github_username}") {
						pinnedItems(first: 6, types: [REPOSITORY]) {
							totalCount
							edges {
								node {
									... on Repository {
										name
										createdAt
										updatedAt
										description
										shortDescriptionHTML(limit: 10)
										homepageUrl
										url
										repositoryTopics(first: 10) {
											edges {
												node {
													topic {
														name
													}
												}
											}
										}
										languages(first: 10) {
											totalCount
											edges {
												node {
													name
													color
												}
											}
										}
									}
								}
							}
						}
					}
				}
			`}
		>
			{({ loading, error, data }) => {
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error :(</p>;
				
				return (
					<div className="w-90-l w-100 center flex flex-row flex-wrap justify-center">
						{data.user.pinnedItems.edges.map((repo_edges, ind) => {
							const repo = repo_edges.node;
							const imgURL = `https://raw.githubusercontent.com/${github_username}/${repo.name}/master/readme-resources/img/overview.png`;

							return <RepoCard key={ind} repo={repo} imgURL={imgURL} />
						})}
					</div>
				)
			}}
		</Query>
	)
}

const RepoCard = ({ repo, imgURL }) => {
	return (
		<Segment isCard={true} imgURL={imgURL}>
			<div className="pa3 tl shadow-3 cursor-default repo-card-l repo-card-m repo-card-080">
				<div className="w5 h5 relative">
					<ExternalLinks url={repo.url} homepageURL={repo.homepageUrl} />
					<h2 className="mv0 title">{handleTextQuirks(repo.name)}</h2>
					<p className="desc lh-title">{repo.description}</p>
					<div className="flex flex-row flex-wrap items-start justify-start content-start absolute left-0 bottom-0 topics">
						{repo.repositoryTopics.edges.map((topic_edges, ind) => (
							<Topic
								key={ind}
								topic_name={topic_edges.node.topic.name} />
						))}
					</div>
				</div>
			</div>
		</Segment>
	)
}

const ExternalLinks = ({ url, homepageURL }) => {
	return (
		<div className="pb3 flex flex-row flex-nowrap justify-end">
			{url ? <GitHub urlToUse={url} /> : ""}
			{homepageURL ? <ExternalLinkSymbol urlToUse={homepageURL} /> : ""}
		</div>
	)
}

const Topic = ({ topic_name}) => {
	return (
		<span className="f6 pr3 pv1 topic font-ubuntu-mono">
			{handleTextQuirks(topic_name)}
		</span>
	)
}

const handleTextQuirks = (text) => {
	let result = text;

	// some unique texts need to be fully capitalize.
	projects.capitalizables.map(uniqueText => {
		if (result.includes(uniqueText)) {
			result = result.replace(uniqueText, uniqueText.toUpperCase())
		}
		return uniqueText;
	});

	// capitalize first letter.
	result = result.charAt(0).toUpperCase() + result.substr(1);
	
	// if ends with some domain, dont capitalize first letter (i.e. use original text).
	for (let domain of projects.domains) {
		if (text.endsWith(domain)) {
			result = text;
			break;
		}
	}

	// remove dashes and replace them with spaces, capitalize the word after that.
	while (result.includes("-")) {
		const ind = result.search("-");
		result = result.substr(0, ind) + " " + result.charAt(ind+1).toUpperCase() + result.substr(ind+2);
	}

	return result;
}

class Projects extends React.Component {
	render() {
		const { componentOrder } = this.props;

		const { section_name } = content.projects;
		return (
			<ApolloProvider client={client}>
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
			</ApolloProvider>
		)
	}
}

export default Projects;