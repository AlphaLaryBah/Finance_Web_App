/** @format */

import "./ratios.css";

import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";

export default function Ratios({ getOverViewData }) {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	let ratio = {};
	if (!getOverViewData) {
		return;
	} else {
		ratio = {
			date: new Date(getOverViewData.LatestQuarter),
			pEratio: getOverViewData.PERatio,
			pEGratio: getOverViewData.PEGRatio,
			trailingPERatio: getOverViewData.TrailingPE,
			forwardPERatio: getOverViewData.ForwardPE,

			ePS: getOverViewData.EPS,
			dilutedEps: getOverViewData.DilutedEPSTTM,
			bV: getOverViewData.BookValue,
		};
	}
	const date = ratio.date.toLocaleDateString(undefined, options);

	return (
		<div>
			<div className="title">
				<span>Latest Quarter</span>
				<span className="date">{date}</span>
			</div>
			<Table responsive="sm" className="">
				<thead className=""></thead>
				<tbody>
					<tr>
						<td className="text-muted">P/E Ratio</td>
						<td className="text-muted">{ratio.pEratio}</td>
					</tr>
					<tr>
						<td className="text-muted">PEG Ratio</td>
						<td className="text-muted">{ratio.pEGratio}</td>
					</tr>
					<tr>
						<td className="text-muted"> Trailing P/E Ratio</td>
						<td className="text-muted">{ratio.trailingPERatio}</td>
					</tr>
					<tr>
						<td className="text-muted">Forward P/E Ratio</td>
						<td className="text-muted">{ratio.forwardPERatio}</td>
					</tr>
					<tr>
						<td className="text-muted">EPS</td>
						<td className="text-muted">{ratio.ePS}</td>
					</tr>
					<tr>
						<td className="text-muted">Dilute EPS(TTM)</td>
						<td className="text-muted">{ratio.dilutedEps}</td>
					</tr>

					<tr>
						<td className="text-muted">Book Value</td>
						<td className="text-muted">{ratio.bV}</td>
					</tr>
				</tbody>
			</Table>
		</div> 
	);
}
Ratios.propTypes = {
	getOverViewData: PropTypes.object,
};
