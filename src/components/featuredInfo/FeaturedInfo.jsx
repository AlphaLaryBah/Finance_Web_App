/** @format */

import "./featuredInfo.css";

import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import PopOverInfo from "./PopOverInfo";
import Popover from "react-bootstrap/Popover";
import PropTypes from "prop-types";
import React from "react";

export default function FeaturedInfo(props) {
	let isPrcntNegative = false;
	if (props.popOverNew < 0 || props.popOverNetAfterTax < 0)
		isPrcntNegative = true;
	if (props.popOverNetAfterTax < props.popOverOld) isPrcntNegative = true;

	// const whenClick = (e) => {
	// 	if (e && active === false) {
	// 		setActive(true);
	// 	} else if (e && active === true) {
	// 		setActive(false);
	// 	}
	// };

	const popover = (
		<Popover
			id="popover"
			className="border border-info shadow  bg-white rounded"
		>
			<Popover.Header
				as="h3"
				className="text-success text-center text-uppercase bg-white "
			>
				<CalculateOutlinedIcon sx={{ color: "black", margin: "3px" }} />
				{props.popOverTitle} Details
			</Popover.Header>
			<Popover.Body className="p-0">
				<PopOverInfo
					OpeningBalance={props.popOverNew}
					CurrentBalance={props.popOverOld}
					sum={props.popOverSubTotal}
					fedsTax={props.popOverFedsTax}
					stateTax={props.popOverStateTax}
					netAfterTax={props.popOverNetAfterTax}
				/>
			</Popover.Body>
		</Popover>
	);
	return (
		<>
			<OverlayTrigger
				trigger={["focus", "click", "hover"]}
				placement="bottom"
				overlay={popover}
			>
				<div>
					<div className="featured container-fluid">
						<div className="row w-100">
							<div className=" ">
								<div className="featuredItem  ">
									<h1 className="featuredTitle">{props.title}</h1>

									<div className="featuredMoneyContainer">
										<span className="featuredMoney">{props.amount}</span>
										<span
											className={
												isPrcntNegative
													? "featuredMoneyRateNegative"
													: "featuredMoneyRate"
											}
										>
											{props.popOverNetAfterTax < 0 ||
											props.popOverNetAfterTax < props.popOverOld
												? `- ${props.percent}`
												: `${props.percent}`}{" "}
											{isPrcntNegative ? (
												<ArrowDownward className="featuredIconNegative" />
											) : (
												<ArrowUpward className="featuredIcon" />
											)}
										</span>
										<span className="featuredSub">{props.compare}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</OverlayTrigger>
		</>
	);
}
FeaturedInfo.propTypes = {
	title: PropTypes.string.isRequired,
	amount: PropTypes.object.isRequired,
	percent: PropTypes.string.isRequired,
	compare: PropTypes.string.isRequired,
	popOverTitle: PropTypes.string.isRequired,
	popOverSubTotal: PropTypes.number,
	moneyData: PropTypes.object,
	popOverNew: PropTypes.number,
	popOverOld: PropTypes.number,
	popOverFedsTax: PropTypes.number,
	popOverStateTax: PropTypes.number,
	popOverNetAfterTax: PropTypes.number,
};
