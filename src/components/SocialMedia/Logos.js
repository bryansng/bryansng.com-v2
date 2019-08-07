import React from 'react';

import content from '../../config/content';
const logos = content.logos;
const { github, linkedin, hackerrank, instagram, twitter, youtube, facebook, externallink } = logos;

const Logo = ({ logoObj, urlToUse = "" }) => {
	return (
		<a href={urlToUse ? urlToUse : logoObj.url} rel="noopener noreferrer" target="_blank" className="no-underline">
			<div className="logo" style={{width: "2.5rem"}}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox={logoObj
			.view_box}>
					<circle className="logo-circle transition-ease-in" cx="100" cy="100" r="80"></circle>
					{logoObj.paths.map((path, ind) => (
						<path key={ind} className="logo-path transition-ease-in" d={path}></path>
					))}
				</svg>
			</div>
		</a>
	)
}

const GitHub = ({ urlToUse }) => {
	return (
		<Logo logoObj={github} urlToUse={urlToUse} />
	)
}

const LinkedIn = () => {
	return (
		<Logo logoObj={linkedin} />
	)
}

const HackerRank = () => {
	return (
		<Logo logoObj={hackerrank} />
	)
}

const Instagram = () => {
	return (
		<Logo logoObj={instagram} />
	)
}

const Twitter = () => {
	return (
		<Logo logoObj={twitter} />
	)
}

const Youtube = () => {
	return (
		<Logo logoObj={youtube} />
	)
}

const Facebook = () => {
	return (
		<Logo logoObj={facebook} />
	)
}

const ExternalLinkSymbol = ({ urlToUse }) => {
	return (
		<Logo logoObj={externallink} urlToUse={urlToUse} />
	)
}

export {
	LinkedIn,
	Facebook,
	HackerRank,
	Instagram,
	Twitter,
	Youtube,
	GitHub,
	ExternalLinkSymbol
}