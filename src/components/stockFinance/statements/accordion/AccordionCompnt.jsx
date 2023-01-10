/** @format */

import "./accordionCompnt.css";

import Accordion from "react-bootstrap/Accordion";
import Income from "../Income/Income";
import PropTypes from "prop-types";
import Ratios from "../../ratios/Ratios";
import React from "react";

export default function AccordionCompnt({ incomeData, getOverViewData }) {
	return (
		<div className="accordionContainer overflow-scroll">
			<Accordion className="bg-light accordion" defaultActiveKey="0">
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						<span className="text-success">Income Statement</span>
					</Accordion.Header>
					<Accordion.Body className="overflow-scroll">
						<Income incomeData={incomeData} />
					</Accordion.Body>
				</Accordion.Item>
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						<span className="text-success">Rates and Ratios</span>
					</Accordion.Header>
					<Accordion.Body>
						<Ratios getOverViewData={getOverViewData} />
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</div>
	);
}
AccordionCompnt.propTypes = {
	incomeData: PropTypes.object,
	getOverViewData: PropTypes.object,
};
