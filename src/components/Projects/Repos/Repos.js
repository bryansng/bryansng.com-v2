import React from "react";
import Button from "./Button";
import SlideIn from "../../universal/SlideIn";
import content from "../../../config/content";
import RepoCard, { delayMultiplier } from "./RepoCard";
import {
  pinnedReposQueryString,
  reposQueryString,
  replaceDashAndDots
} from "./BuildQueryStrings";
import { gql } from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import styled from "styled-components";
const { projects } = content;

const RepoCardContainer = styled.div.attrs({
  className: `flex flex-row flex-wrap justify-center`
})``;

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = projects.token;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default class Repos extends React.Component {
  constructor() {
    super();

    this.state = {
      showMoreRepos: false
    };
  }

  showMoreReposMethod = () => {
    this.setState({ showMoreRepos: true });
  };

  render() {
    const { showMoreRepos } = this.state;
    const { github_username, other_notable_github_repos } = projects;

    return (
      <ApolloProvider client={client}>
        <Query
          query={gql`{
            ${pinnedReposQueryString(github_username)}
            ${reposQueryString(other_notable_github_repos, github_username)}
          }`}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            return (
              <div>
                <RepoCardContainer>
                  {GitHubPinnedRepos(data, github_username)}
                  {showMoreRepos ? GitHubOtherRepos(data, github_username) : ""}
                </RepoCardContainer>
                {!showMoreRepos ? (
                  <SlideIn
                    percentageInViewport={0.0}
                    animationDelayValue={delayMultiplier(
                      projects.delays.more_button.position,
                      projects.delays.pinned_repo_cards.start_delay
                    )}
                  >
                    <Button
                      text="More"
                      handleClick={this.showMoreReposMethod}
                    />
                  </SlideIn>
                ) : (
                  ""
                )}
              </div>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

const GitHubPinnedRepos = (apiData, githubUsername) => {
  return apiData.user.pinnedItems.edges.map((repo_edges, ind) => {
    const repo = repo_edges.node;
    const imgURL = `https://raw.githubusercontent.com/${githubUsername}/${repo.name}/master/readme-resources/img/overview.png`;

    return (
      <RepoCard
        key={ind}
        repo={repo}
        imgURL={imgURL}
        position={ind}
        startDelay={projects.delays.pinned_repo_cards.start_delay}
      />
    );
  });
};

const GitHubOtherRepos = (apiData, githubUsername) => {
  const { other_notable_github_repos } = projects;
  return other_notable_github_repos.map((repo_name, ind) => {
    const repo_variable = replaceDashAndDots(repo_name);
    const repo = apiData[repo_variable];
    const imgURL = `https://raw.githubusercontent.com/${githubUsername}/${repo_name}/master/readme-resources/img/overview.png`;

    return (
      <RepoCard
        key={ind}
        repo={repo}
        imgURL={imgURL}
        position={ind}
        startDelay={projects.delays.other_repo_cards.start_delay}
        showWithoutWaitForScroll={true}
      />
    );
  });
};

/* export default class GitHubPinnedRepos extends React.Component {
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
} */
