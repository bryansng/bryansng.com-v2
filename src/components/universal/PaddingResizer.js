import React, { Component } from 'react'

export default class PaddingResizer extends Component {
	constructor(props) {
		super(props);
		this.padder = React.createRef();
	}
	
	handleResize = () => {
		const { noTopPadding=false, noBottomPadding=false, heightOffset=0.25 } = this.props;
		const HalfWindowHeight = window.innerHeight * heightOffset;
		if (!noTopPadding) {
			this.padder.current.style.paddingTop = `${HalfWindowHeight}px`;
		}
		if (!noBottomPadding) {
			this.padder.current.style.paddingBottom = `${HalfWindowHeight}px`;
		}
	}

  componentDidMount() {
		window.addEventListener("resize", this.handleResize);
		this.handleResize();
  }

  componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
  }

	render() {
		return (
			<div ref={this.padder}>
					{this.props.children}
			</div>
		)
	}
}
