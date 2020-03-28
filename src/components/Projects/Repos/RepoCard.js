import React from "react";
import SlideIn from "../../universal/SlideIn";
import { GitHub, ExternalLinkSymbol } from "../../SocialMedia/Logos";
import content from "../../../config/content";
const { projects } = content;

const RepoCard = ({
  repo,
  imgURL,
  position,
  startDelay,
  showWithoutWaitForScroll = false
}) => (
  <SlideIn
    percentageInViewport={0.05}
    isSegmentInViewport={showWithoutWaitForScroll}
    animationDelayValue={delayMultiplier(position, startDelay)}
  >
    <div
      className="ma1 br2 dt hide-child-l hide-child-m contain bg-center repo-card-img-bg transition-hide-partial transition-ease-in"
      style={{
        backgroundImage: `url(${imgURL})`
      }}
    >
      <span className="dtc v-mid white w-100 h-100 child-l child-m o-100-ns bg-black-40 transition-ease-in">
        <div className="pa3 tl shadow-3 cursor-default repo-card-l repo-card-m repo-card-080">
          <div className="w5 h5 relative">
            <ExternalLinks url={repo.url} homepageURL={repo.homepageUrl} />
            <h2 className="mv0 title">{handleTextQuirks(repo.name)}</h2>
            <p className="desc lh-title">{repo.description}</p>
            <div className="flex flex-row flex-wrap items-start justify-start content-start absolute left-0 bottom-0 topics">
              {repo.repositoryTopics.edges.map((topic_edges, ind) => (
                <Topic key={ind} topic_name={topic_edges.node.topic.name} />
              ))}
            </div>
          </div>
        </div>
      </span>
    </div>
  </SlideIn>
);

const delayMultiplier = (position, startDelay) => {
  return 0.1 * position + startDelay;
};

const ExternalLinks = ({ url, homepageURL }) => (
  <div className="pb1 flex flex-row flex-nowrap justify-end">
    {url ? <GitHub urlToUse={url} /> : ""}
    {homepageURL ? <ExternalLinkSymbol urlToUse={homepageURL} /> : ""}
  </div>
);

const Topic = ({ topic_name }) => (
  <span className="f6 pr3 pb1 topic font-ubuntu-mono">
    {handleTextQuirks(topic_name)}
  </span>
);

const handleTextQuirks = text => {
  let result = text;

  // some unique texts need to be fully capitalize.
  projects.capitalizables.map(uniqueText => {
    if (result.includes(uniqueText)) {
      result = result.replace(uniqueText, uniqueText.toUpperCase());
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
    result =
      result.substr(0, ind) +
      " " +
      result.charAt(ind + 1).toUpperCase() +
      result.substr(ind + 2);
  }

  return result;
};

export default RepoCard;

export { delayMultiplier };
