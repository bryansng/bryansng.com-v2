const pinnedReposQueryString = github_username => {
  return `
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
	`;
};

const reposQueryString = (repo_names, github_username) => {
  return repo_names.reduce(
    (accu, repo_name) => accu + repoQueryString(repo_name, github_username),
    ""
  );
};

const repoQueryString = (repo_name, github_username) => {
  return `
		${replaceDashAndDots(
      repo_name
    )}: repository(name: "${repo_name}", owner: "${github_username}") {
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
	`;
};

const replaceDashAndDots = text => {
  return text.replace(/-|\./g, "_");
};

export { pinnedReposQueryString, reposQueryString, replaceDashAndDots };
