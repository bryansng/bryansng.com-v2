import React from 'react';
import Segment from '../Segment';
import content from '../../config/content';
import { TabContent } from '../Navigation/Navigation';
import { TransitionComponent } from '../About';

class Works extends React.Component {
	constructor() {
		super();

		const { employments } = content.works;
		this.state = {
			employment_id_to_show: employments.length-1
		};
	}

	handleClick = (array_ind) => {
		this.setState({ employment_id_to_show: array_ind });
	}

	render() {
		const { componentOrder } = this.props;
		
		const { section_name, employments } = content.works;
		const { employment_id_to_show } = this.state;
		return (
			<div id="works">
				<Segment>
					<div className="w-70-l center">
						<div className="pa3">
							<TabContent index={componentOrder} content={section_name} isLink={false} />
						</div>
						<div className="flex flex-row-l flex-column flex-nowrap justify-between tl">
							<div className="w-25-l pv0-l pt3 pb4">
								<CompaniesName employments={employments} employmentIDToShow={employment_id_to_show} handleClick={this.handleClick} />
							</div>
							<div className="w-70-l">
								{employments.map((employment, ind) => 
									<TransitionComponent key={ind} index={ind} idToShow={employment_id_to_show}>
										<RoleCompany employment={employment} />
										<DateOfService employment={employment} />
										<EmploymentDesc employment={employment} />
									</TransitionComponent>
								)}
							</div>
						</div>
					</div>
				</Segment>
			</div>
		)
	}
}

class CompaniesName extends React.Component {
	render() {
		const { employments, employmentIDToShow, handleClick } = this.props;
		return (
			<div className="flex flex-column-reverse-l flex-row-reverse justify-end content-end">
				{employments.map((employment, ind) =>
					<div
						key={ind}
						onClick={() => handleClick(ind)}
						className={`pl3-l pv2-l pa3-m pa3-ns pa3 pointer bl-l bb-0-l bb bw2-l bw2 tc font-ubuntu-mono transition-ease-in ${ind === employmentIDToShow ? "active-employment" : "not-active-employment"}`}>
							{employment.company}
					</div>
				)}
			</div>
		)
	}
}

const RoleCompany = ({ employment }) => {
	const { role } = employment;

	let finalizedCompanyName = [];
	let count = 0;
	const companiesInfo = employment.companies_info;
	for (let shortName in companiesInfo) {
		const infos = companiesInfo[shortName];
		finalizedCompanyName.push(
			<span key={count}>
				{count === 1 || (count > 0 && count < Object.keys(companiesInfo).length-1) ? " and " : ""}
				<a
					href={infos.url}
					className="no-underline color-inherit transition-underline"
					alt={infos.url_desc}>
						{infos.name}
				</a>
			</span>
		)
		count++;
	}
	return (
		<div className="mb0 mt0 f4">
			<span className="title">
				{role}
			</span>
			&nbsp;
			<span className="employment-symbol">
				@
			</span>
			&nbsp;
			<span className="employment-company">
				{finalizedCompanyName}
			</span>
		</div>
	)
}

const DateOfService = ({ employment }) => {
	const start_date = createDate(employment.start_date);
	const end_date = createDate(employment.end_date);
	
	const date_options = {year: 'numeric', month: 'short'};
	return (
		<h4 className="mt2 desc font-ubuntu-mono">
			{`${start_date.toLocaleString('en-US', date_options)} - ${end_date === null ? "Present" : end_date.toLocaleString('en-US', date_options)}`}
		</h4>
	)
}
const createDate = (date_obj) => {
	return new Date(date_obj.year, date_obj.month);
}

const EmploymentDesc = ({ employment }) => {
	const { job_desc } = employment;
	return (
		<ul className="list pl0 tj">
			{job_desc.map((desc, ind) =>
				<li key={ind} className="pl4 pb2 better-list-style paragraph">
					{desc}
				</li>
			)}
		</ul>
	)
}

export default Works;