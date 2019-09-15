import React from 'react';
import content from '../config/content';
import { TabContent } from './Navigation/Navigation';
import imgMe from "../assets/me/me-500x500.png";
import SlideIn from './universal/SlideIn';
import PaddingResizer from './universal/PaddingResizer';
// import imgYao from "../assets/me/yao-mulan.jpg";

class About extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			category_id_to_show: 0
		};
	}

	handleClick = (index) => {
		this.setState({ category_id_to_show: index });
	}
	
	render() {
		const { componentOrder } = this.props;

		const { github } = content.logos;

		const about = content.about;
		const { section_name, descs, tech_desc, categories } = about;

		const { category_id_to_show } = this.state;
		return (
			<div id="about">
				<SlideIn>
					<PaddingResizer>
						<div className="w-80-l w-75 center tl">
							<div className="pv3">
								<TabContent index={componentOrder} content={section_name} isLink={false} />
							</div>
							<div className="flex-l flex-row-l justify-between-l">
								<div className="w-70-l">
									{descs.map((desc, ind) =>
										<p key={ind} className="mt0 lh-title paragraph">
											{desc}
										</p>
									)}

									<p className="paragraph">{tech_desc}</p>

									<div className="flex flex-row flex-nowrap justify-between">
										{categories.map((category, ind) => 
											<div
												key={ind}
												className={`pa3 pointer bb bw2 tc paragraph font-ubuntu-mono transition-ease-in ${ind === category_id_to_show ? "active-about" : "not-active-about"}`}
												style={{width: 100/categories.length + "%"}}
												onClick={() => this.handleClick(ind)}>
													{category.short_name}
											</div>
										)}
									</div>

									{categories.map((category, ind) => 
										<TransitionComponent key={ind} index={ind} idToShow={category_id_to_show}>
											<ul className="list pl0 flex flex-row-l flex-row-m flex-column flex-wrap-l flex-wrap-m flex-nowrap">
												{category.technologies.map((tech, ind) => 
													<li
														key={ind}
														className="w-50-l w-50-m w-100 pb2 pl4 pr2 better-list-style paragraph font-ubuntu-mono">
															{tech}
													</li>
												)}
											</ul>
										</TransitionComponent>
									)}
								</div>
								
								<div className="mh4-l mv0-l mv4 flex justify-center items-start">
									<div className="picture">
										<div className="picture-frame transition-ease-in-05 br1">
											<a href={github.url} className="dib no-underline" alt="">
												<img
													className="w5 v-btm me-picture br1"
													src={imgMe}
													alt="" />
											</a>
										</div>
										<div className="picture-shadow transition-ease-in br1"></div>
									</div>
								</div>
							</div>
						</div>
					</PaddingResizer>
				</SlideIn>
			</div>
		)
	}
}

const TransitionComponent = (props) => {
	const { index, idToShow } = props;
	return (
		<div
			className={`${index === idToShow ? "left-0 top-0 relative o-100 transition-ease-in-05" : "absolute hide o-0"}`}>
				{props.children}
		</div>
	)
}

export default About;

export {
	TransitionComponent
}