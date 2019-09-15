import React, { Component } from 'react'
import './Navigation.css';
import content from '../../config/content';

import imgBS from "../../assets/logo/logo-bs.png";
import SlideIn from '../universal/SlideIn';
// import imgYao from "../assets/logo/logo-yao.png";

class Navigation extends Component {
	constructor() {
		super();
		this.burger = React.createRef();
		this.linksContainer = React.createRef();
    this.state = {
      scrollDirection: 'still'
    };
	}

  updateScrollDirection = () => {
    if (this.prevScrollY > window.scrollY) {
      this.setState({ scrollDirection: 'up' });
    } else if (this.prevScrollY < window.scrollY) {
      this.setState({ scrollDirection: 'down' });
    }
    this.prevScrollY = window.scrollY;
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
    this.prevScrollY = window.scrollY;
    window.addEventListener("scroll", this.updateScrollDirection);
		window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateScrollDirection);
		window.removeEventListener("resize", this.handleResize);
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

	render() {
		const { scrollDirection } = this.state;
		const { logo, tabs } = content.navigation;
		return (
			<div
				className={`z-1 fixed nav-transition-top ${this.handleScroll(scrollDirection)}`} style={{width: "100vw"}}>
				<div className="relative">
					<div className="w-100 pv2 ph4 absolute shadow-3 nav-bg top-0 left-0">
						<div className="w-100 flex flex-row flex-nowrap justify-between items-center">
							<div className="z-9999">
								<SlideIn isSegmentInViewport={true} isAnimationSlideIn={false} animationDelay="delay-125">
									<a href={logo.url} className="link dib no-underline dim-090 transition-ease-in">
										<img src={imgBS} className="v-btm" style={{width: "3rem"}} alt="Logo" />
									</a>
								</SlideIn>
							</div>

							<div className="z-9999">
								<SlideIn isSegmentInViewport={true} isAnimationSlideIn={false} animationDelay="delay-075">
									<div ref={this.burger} className="dn-l db pointer text-shadow-pop-parent" onClick={this.toggleNav}>
										<div className="bar1 nav-text transition-ease-in"></div>
										<div className="bar2 nav-text transition-ease-in"></div>
										<div className="bar3 nav-text transition-ease-in"></div>
									</div>
								</SlideIn>
							</div>

							<div ref={this.linksContainer} className="flex flex-row-l flex-column flex-nowrap transition-ease-in-05 static-l absolute hide-sidebar h-auto-l vh-100 w-auto-l w-50 z-5">
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
			<SlideIn isSegmentInViewport={true} isAnimationSlideIn={false} animationDelay="delay-075">
				<a
					href={tabObj.url}
					className="pv3 ph3 no-underline"
					onClick={closeNav}>
						<TabContent index={index+1} content={tabObj.name} />
				</a>
			</SlideIn>
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