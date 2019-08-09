import React, { Component } from 'react';
import './LogoIntro.css';
import styled from 'styled-components';

import imgBS from "../../assets/logo/logo-bs.png";
// import imgYao from "../assets/logo/logo-yao.png";

const AnimationContainer = styled.div.attrs({
	className: `vh-100 flex justify-center items-center`
})``

const AnimationStage = styled.div`
	perspective: 200px;
`

class LogoIntro extends Component {
	constructor() {
		super();
		this.state = {
			isAnimationSlideIn: true
		}
	}

	handleAnimationEnd = () => {
		if (this.state.isAnimationSlideIn) {
			// change to slide out animation.
			this.setState({ isAnimationSlideIn: false })
		} else {
			// render the rest of the page (get callback function from parent).
			this.props.showContent();
		}
	}
	
	render() {
		const { isAnimationSlideIn } = this.state;
		return (
			<AnimationContainer>
				<AnimationStage>
					<img
						src={imgBS}
						className={`anim-object ${isAnimationSlideIn ? "blur-in-bck-center" : "slide-out-bck-center"}`}
						onAnimationEnd={this.handleAnimationEnd}
						alt="" />
				</AnimationStage>
			</AnimationContainer>
		)
	}
}

export default LogoIntro;