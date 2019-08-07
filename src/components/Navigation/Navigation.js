import React, { Component } from 'react'
import './Navigation.css';
import Segment from '../Segment';
import content from '../../config/content';

import imgBS from "../../assets/logo/logo-bs.png";
// import imgYao from "../assets/logo/logo-yao.png";

class Navigation extends Component {
	constructor() {
		super();
		this.burger = React.createRef();
		this.linksContainer = React.createRef();
	}

	handleResize = () => {
		const em = parseFloat(getComputedStyle(document.body).fontSize);
		const windowWidth = window.innerWidth;
		if (windowWidth >= 64*em) {
			this.closeNav();
		}
		// if ((windowWidth ) || (windowWidth >= 48*em && windowWidth < 64*em)) {
	}

	componentDidMount() {
		window.addEventListener("resize", this.handleResize)
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize)
	}

	handleScroll = (scrollDirection) => {
		if (scrollDirection === "down") {
			return "top--20p";
		} else {
			return "top-0";
		}
	}

	toggleNav = () => {
		this.burger.current.classList.toggle("show-x");

		/* Components affected:
			1. When show-sidebar is added, div with 'nav-toggle-bg' class is activated. This is just a placeholder so that onClick, this function is activated.
		*/
		this.linksContainer.current.classList.toggle("hide-sidebar");
		this.linksContainer.current.classList.toggle("show-sidebar");
		this.linksContainer.current.classList.toggle("shadow-3");

		// prevent scrolling, blur background.
		/* Components affected:
			1. body element is given blur tag.
			2. With that tag, div with 'page-root' in App.js is activated. This gives the blurry effect.
		*/
		document.body.classList.toggle("blur");
		document.documentElement.classList.toggle("blur");
	}

	closeNav = () => {
		if (this.linksContainer.current.classList.contains("show-sidebar")) {
			this.toggleNav();
		}
	}

	/* To maintain smooth transition of the sidebar from show to hide. After hiding, we change the height back to auto */
	handleTransitionEnd = () => {
		if (this.linksContainer.current.classList.contains("hide-sidebar")) {
			this.linksContainer.current.classList.toggle("vh-100");
			this.linksContainer.current.classList.toggle("w-50");
		}
	}

	render() {
		const { scrollDirection } = this.props;
		const { tabs } = content.navigation;
		return (
			<div
				className={`w-100 z-1 fixed nav-transition-top ${this.handleScroll(scrollDirection)}`}>
				<div className="relative">
					<div className="w-100 pv2 ph4 absolute shadow-3 nav-bg top-0 left-0">
						<div className="flex flex-row flex-nowrap justify-between items-center">
							<Segment isSegmentInViewport={true} isForNavigation={true} isAnimationSlideIn={false} animationDelay="delay-125">
								<a href="#intro" className="link dib no-underline dim-090 transition-ease-in">
									<img src={imgBS} className="v-btm" style={{width: "3rem"}} alt="Logo" />
								</a>
							</Segment>

							<Segment isSegmentInViewport={true} isForNavigation={true} isAnimationSlideIn={false} animationDelay="delay-075">
								<div ref={this.burger} className="dn-l db pointer text-shadow-pop-parent" onClick={this.toggleNav}>
									<div className="bar1 nav-text transition-ease-in"></div>
									<div className="bar2 nav-text transition-ease-in"></div>
									<div className="bar3 nav-text transition-ease-in"></div>
								</div>
							</Segment>

							<div ref={this.linksContainer} className="flex flex-row-l flex-column flex-nowrap transition-ease-in-05 static-l absolute hide-sidebar h-auto-l vh-100 w-auto-l w-50 z-5" onTransitionEnd={this.handleTransitionEnd}>
								{tabs.map((tabObj, ind) =>
									<NavigationTab
										key={ind}
										tabObj={tabObj}
										index={ind}
										closeNav={this.closeNav} />
								)}
							</div>

							<div className="nav-toggle-bg dn" onClick={this.toggleNav}></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class NavigationTab extends Component {
	render() {
		const { tabObj, index, closeNav } = this.props;
		return (
			<Segment isSegmentInViewport={true} isForNavigation={true} isAnimationSlideIn={false} animationDelay="delay-075">
				<a
					href={tabObj.url}
					className="pv3 ph3 no-underline"
					onClick={closeNav}>
						<TabContent index={index+1} content={tabObj.name} />
				</a>
			</Segment>
		)
	}
}

const TabContent = ({ fontSize="f5", isLink=true, index, content }) => {
	return (
		<span className={`dib font-ubuntu-mono text-shadow-pop-parent ${fontSize}`} style={isLink ? {cursor: "pointer"} : {cursor: "default"}}>
			<span className="dib nav-text-number text-shadow-pop text-shadow-pop-number">
				0{index}
			</span>
			<span className="dib nav-text-dot text-shadow-pop text-shadow-pop-dot">
				.&nbsp;
			</span>
			<span className="dib nav-text text-shadow-pop text-shadow-pop-text">
				{content}
			</span>
		</span>
	)
}

export default Navigation;
export {
	TabContent
}