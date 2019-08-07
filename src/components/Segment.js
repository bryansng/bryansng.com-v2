import React from 'react';

/* Way to be able to use getBoundingClientRect().
https://www.reddit.com/r/reactjs/comments/a2ifb9/getboundingclientrect_does_not_work_on_a_react/
*/

/* Way to be able to use addEventListener to component.
https://stackoverflow.com/questions/50530162/addeventlistener-in-a-react-app-isnt-working
*/

/* Example to addEventListener with scroll.
https://gist.github.com/koistya/934a4e452b61017ad611
*/
class Segment extends React.Component {
	constructor(props) {
		super(props);
		this.segment = React.createRef();
		const { isSegmentInViewport, isFullScreen=false, isForNavigation=false, isCard=false, imgURL="", isAnimationSlideIn=true, animationDelay="delay-020", noPadding=false } = props;
		this.state = {
			isSegmentInViewport,
			isFullScreen,
			isForNavigation,
			isCard,
			imgURL,
			isAnimationSlideIn,
			animationDelay,
			noPadding
		}
	}

  /*
   * Check if an element is in viewport
   *
   * @param {number} [offset]
   * @returns {boolean}
   */
	isScrolledIntoView = () => {
    var rect = this.segment.current.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
		//const isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
		
		// Partially visible elements by a certain percentage, return true:
		const percentage = this.props.isCard ? 0.1 : 0.4;
		const isVisible = (elemTop + (window.innerHeight * percentage)) < window.innerHeight && elemBottom >= 0;
    return isVisible;
	}

	// If segment in view, change animation-play-state to running.
	handleScroll = (e) => {
		e.preventDefault();
		if (this.isScrolledIntoView()) {
			this.setState({ isSegmentInViewport: true });
			window.removeEventListener("scroll", this.handleScroll);
		}
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}
	
	render() {
		const { isSegmentInViewport, isFullScreen, isForNavigation, isCard, imgURL, isAnimationSlideIn, animationDelay, noPadding } = this.state;

		let defaultClasses = "";

		defaultClasses += ` ${isAnimationSlideIn ? "slide-in-bottom" : "animation-ease-in"} ${animationDelay}`;

		if (isForNavigation) {
			defaultClasses += ' z-9999';
		}

		if (!isCard && !isForNavigation) {
			defaultClasses += ` v-mid w-90-l w-90-m w-100 center`;
			defaultClasses += ` ${isFullScreen ? "vh-100" : ""}`;
			defaultClasses += ` ${noPadding ? "" : "pv7 ph3 ph4-l"}`;
		}
		defaultClasses += ` ${isSegmentInViewport ? "animation-running" : "animation-paused"}`;
		
		return (
			<div
				ref={this.segment}
				onScroll={this.handleScroll}
				className={defaultClasses}>
					{imgURL
					?
					<div className="ma1 br2 dt hide-child-l hide-child-m contain bg-center repo-card-img-bg transition-hide-partial transition-ease-in" style={{backgroundImage: `url(${imgURL})`}}>
						<span className="dtc v-mid white w-100 h-100 child-l child-m o-100-ns bg-black-40">
							{this.props.children}
						</span>
					</div>
					:
					this.props.children}
			</div>
		)
	}
}

export default Segment;