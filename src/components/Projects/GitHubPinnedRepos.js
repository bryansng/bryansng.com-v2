import React from 'react';
import SlideIn from '../universal/SlideIn';
import { GitHub, ExternalLinkSymbol } from '../SocialMedia/Logos';
// import { gql } from "apollo-boost";
// import { Query, ApolloProvider } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';
// import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import content from '../../config/content';
const { projects } = content;

/* const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
	const token = projects.token;
	
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

export default class GitHubPinnedRepos extends React.Component {
	render() {
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
						<ApolloProvider client={client}>
							<div className="w-90-l w-100 center flex flex-row flex-wrap justify-center">
								{data.user.pinnedItems.edges.map((repo_edges, ind) => {
									const repo = repo_edges.node;
									const imgURL = `https://raw.githubusercontent.com/${github_username}/${repo.name}/master/readme-resources/img/overview.png`;

									return <RepoCard key={ind} repo={repo} imgURL={imgURL} />
								})}
							</div>
						</ApolloProvider>
					)
				}}
			</Query>
		)
	}
} */

export default class GitHubPinnedRepos extends React.Component {
	render() {
		const { github_username } = projects;
		const { data } = projects.graph_ql_data;
		return (
			<div className="w-90-l w-100 center flex flex-row flex-wrap justify-center">
				{data.user.pinnedItems.edges.map((repo_edges, ind) => {
					const repo = repo_edges.node;
					const imgURL = `https://raw.githubusercontent.com/${github_username}/${repo.name}/master/readme-resources/img/overview.png`;

					return <RepoCard key={ind} repo={repo} imgURL={imgURL} />
				})}
			</div>
		)
	}
}

const RepoCard = ({ repo, imgURL }) => (
	<SlideIn percentageInViewport={0.1}>
		<div className="ma1 br2 dt hide-child-l hide-child-m contain bg-center repo-card-img-bg transition-hide-partial transition-ease-in" style={{backgroundImage: `url(${imgURL})`}}>
			<span className="dtc v-mid white w-100 h-100 child-l child-m o-100-ns bg-black-40 transition-ease-in">
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
			</span>
		</div>
	</SlideIn>
)

const ExternalLinks = ({ url, homepageURL }) => (
	<div className="pb2 flex flex-row flex-nowrap justify-end">
		{url ? <GitHub urlToUse={url} /> : ""}
		{homepageURL ? <ExternalLinkSymbol urlToUse={homepageURL} /> : ""}
	</div>
)

const Topic = ({ topic_name}) => (
	<span className="f6 pr3 pv1 topic font-ubuntu-mono">
		{handleTextQuirks(topic_name)}
	</span>
)

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