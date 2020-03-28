import React, { Component } from "react";

export default class SlideIn extends Component {
  constructor(props) {
    super(props);
    const {
      percentageInViewport = 0.2,
      isSegmentInViewport = false,
      isAnimationSlideIn = true,
      animationDelayClass = "delay-020",
      animationDelayValue = 0.0
    } = props;
    this.state = {
      percentageInViewport,
      isSegmentInViewport,
      isAnimationSlideIn,
      animationDelayClass,
      animationDelayValue
    };
    this.segment = React.createRef();
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
    const percentage = this.state.percentageInViewport;
    const isVisible =
      elemTop + window.innerHeight * percentage < window.innerHeight &&
      elemBottom >= 0;
    return isVisible;
  };

  // If segment in view, change animation-play-state to running.
  handleScroll = e => {
    e.preventDefault();
    if (this.isScrolledIntoView()) {
      this.setState({ isSegmentInViewport: true });
      window.removeEventListener("scroll", this.handleScroll);
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const {
      isSegmentInViewport,
      isAnimationSlideIn,
      animationDelayClass,
      animationDelayValue
    } = this.state;

    let defaultClasses = `${
      isAnimationSlideIn ? "slide-in-bottom" : "animation-ease-in"
    } ${animationDelayClass} ${
      isSegmentInViewport ? "animation-running" : "animation-paused"
    }`;

    let defaultStyles =
      animationDelayValue !== 0.0
        ? { animationDelay: `${animationDelayValue}s` }
        : {};

    return (
      <div
        ref={this.segment}
        onScroll={this.handleScroll}
        className={defaultClasses}
        style={defaultStyles}
      >
        {this.props.children}
      </div>
    );
  }
}
