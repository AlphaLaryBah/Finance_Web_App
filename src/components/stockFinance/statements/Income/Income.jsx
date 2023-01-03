/** @format */
import "./income.css";

import CurrencyFormat from "react-currency-format";
import { Finance } from "financejs";
import PropTypes from "prop-types";
import React from "react";
import Table from "react-bootstrap/Table";

export default function Income({ incomeData }) {
	let data = {};
	if (!incomeData) {
		return;
	} else {
		data = {
			year1: incomeData.annualReports[0].fiscalDateEnding,
			year2: incomeData.annualReports[1].fiscalDateEnding,
			year3: incomeData.annualReports[2].fiscalDateEnding,
			year4: incomeData.annualReports[3].fiscalDateEnding,
			year5: incomeData.annualReports[4].fiscalDateEnding,
			//grossProfit
			year1GrossProfit: incomeData.annualReports[0].grossProfit,
			year2GrossProfit: incomeData.annualReports[1].grossProfit,
			year3GrossProfit: incomeData.annualReports[2].grossProfit,
			year4GrossProfit: incomeData.annualReports[3].grossProfit,
			year5GrossProfit: incomeData.annualReports[4].grossProfit,

			//totalRevenue
			year1TotalRevenue: incomeData.annualReports[0].totalRevenue,
			year2TotalRevenue: incomeData.annualReports[1].totalRevenue,
			year3TotalRevenue: incomeData.annualReports[2].totalRevenue,
			year4TotalRevenue: incomeData.annualReports[3].totalRevenue,
			year5TotalRevenue: incomeData.annualReports[4].totalRevenue,

			//netIncome
			year1NetIncome: incomeData.annualReports[0].netIncome,
			year2NetIncome: incomeData.annualReports[1].netIncome,
			year3NetIncome: incomeData.annualReports[2].netIncome,
			year4NetIncome: incomeData.annualReports[3].netIncome,
			year5NetIncome: incomeData.annualReports[4].netIncome,
		};
	}
	let finance = new Finance();

	// Compound Annual Growth Rate (CAGR)
	// finance.CAGR(beginning value, ending value, number of periods);

	//CAGR FOR GROSS PROFIT
	const year4GrowthRate = finance.CAGR(
		data.year5GrossProfit,
		data.year4GrossProfit,
		1
	);
	const year3GrowthRate = finance.CAGR(
		data.year4GrossProfit,
		data.year3GrossProfit,
		1
	);
	const year2GrowthRate = finance.CAGR(
		data.year3GrossProfit,
		data.year2GrossProfit,
		1
	);
	const year1GrowthRate = finance.CAGR(
		data.year2GrossProfit,
		data.year1GrossProfit,
		1
	);
	const fiveYearsGrowthRate = finance.CAGR(
		data.year5GrossProfit,
		data.year1GrossProfit,
		5
	);
	//CAGR FOR TOTAL REVENUE
	const year4GrowthRateTR = finance.CAGR(
		data.year5TotalRevenue,
		data.year4TotalRevenue,
		1
	);
	const year3GrowthRateTR = finance.CAGR(
		data.year4TotalRevenue,
		data.year3TotalRevenue,
		1
	);
	const year2GrowthRateTR = finance.CAGR(
		data.year3TotalRevenue,
		data.year2TotalRevenue,
		1
	);
	const year1GrowthRateTR = finance.CAGR(
		data.year2TotalRevenue,
		data.year1TotalRevenue,
		1
	);
	const fiveYearsGrowthRateTR = finance.CAGR(
		data.year5TotalRevenue,
		data.year1TotalRevenue,
		5
	);
	//CAGR FOR NET INCOME
	const year4GrowthRateNI = finance.CAGR(
		data.year5NetIncome,
		data.year4NetIncome,
		1
	);
	const year3GrowthRateNI = finance.CAGR(
		data.year4NetIncome,
		data.year3NetIncome,
		1
	);
	const year2GrowthRateNI = finance.CAGR(
		data.year3NetIncome,
		data.year2NetIncome,
		1
	);
	const year1GrowthRateNI = finance.CAGR(
		data.year2NetIncome,
		data.year1NetIncome,
		1
	);
	const fiveYearsGrowthRateNI = finance.CAGR(
		data.year5NetIncome,
		data.year1NetIncome,
		5
	);
	return (
		<div>
			{/* <hr></hr> */}
			<div className="textAboveTable">
				<span className="text-muted">
					{" "}
					(In billions except per share amount)
				</span>
				{/* <h5>Year End December 31</h5> */}
			</div>
			<Table responsive="md">
				<thead>
					<tr>
						<th></th>
						<th>5yrs(CAGR)</th>
						<th>(Current Year)</th>
						<th>(2 Years Ago)</th>
						<th>(3 Years Ago)</th>
						<th>(4 Years Ago)</th>
						<th>(5 Years Ago)</th>
					</tr>
					<tr>
						<th></th>
						<th></th>
						<th>{data.year1}</th>
						<th>{data.year2}</th>
						<th>{data.year3}</th>
						<th>{data.year4}</th>
						<th>{data.year5}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td> <td></td> <td></td> <td></td> <td></td> <td></td>
					</tr>
					<tr>
						<td className="text-white bg-info border-2">Gross Profit:</td>
						<td></td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year1GrossProfit}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year2GrossProfit}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year3GrossProfit}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year4GrossProfit}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>

						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year5GrossProfit}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
					</tr>
					<tr>
						<td>Growth Rate(CAGR)</td>
						<td
							className={fiveYearsGrowthRate < 0 ? "text-danger" : "text-dark"}
						>
							{`${fiveYearsGrowthRate} %`}
						</td>
						<td
							className={year1GrowthRate < 0 ? "text-danger" : "text-dark"}
						>{`${year1GrowthRate} %`}</td>
						<td
							className={year2GrowthRate < 0 ? "text-danger" : "text-dark"}
						>{`${year2GrowthRate} %`}</td>
						<td
							className={year3GrowthRate < 0 ? "text-danger" : "text-dark"}
						>{`${year3GrowthRate} %`}</td>
						<td
							className={year4GrowthRate < 0 ? "text-danger" : "text-dark"}
						>{`${year4GrowthRate} %`}</td>
						<td>{`0 %`}</td>
					</tr>
					<thead>
						<tr></tr>
					</thead>
					<tr>
						<td className="text-white bg-info border-2">Total Revenue</td>
						<td></td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year1TotalRevenue}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year2TotalRevenue}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year3TotalRevenue}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year4TotalRevenue}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year5TotalRevenue}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
					</tr>
					<tr>
						<td>Growth Rate(CAGR)</td>
						<td
							className={
								fiveYearsGrowthRateTR < 0 ? "text-danger" : "text-dark"
							}
						>
							{`${fiveYearsGrowthRateTR} %`}
						</td>{" "}
						<td
							className={year1GrowthRateTR < 0 ? "text-danger" : "text-dark"}
						>{`${year1GrowthRateTR} %`}</td>
						<td
							className={year2GrowthRateTR < 0 ? "text-danger" : "text-dark"}
						>{`${year2GrowthRateTR} %`}</td>
						<td
							className={year3GrowthRateTR < 0 ? "text-danger" : "text-dark"}
						>{`${year3GrowthRateTR} %`}</td>
						<td
							className={year4GrowthRateTR < 0 ? "text-danger" : "text-dark"}
						>{`${year4GrowthRateTR} %`}</td>
						<td>{`0 %`}</td>
					</tr>

					<thead>
						<tr></tr>
					</thead>
					<tr>
						<td className="text-white bg-info border-2">Net Income</td>
						<td> </td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year1NetIncome}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year2NetIncome}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year3NetIncome}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year4NetIncome}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
						<td className="text-muted">
							{
								<CurrencyFormat
									value={data.year5NetIncome}
									displayType={"text"}
									style={{
										// color: "white",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</td>
					</tr>
					<tr>
						<td>Growth Rate(CAGR)</td>
						<td
							className={
								fiveYearsGrowthRateNI < 0 ? "text-danger" : "text-dark"
							}
						>
							{`${fiveYearsGrowthRateNI} %`}
						</td>{" "}
						<td
							className={year1GrowthRateNI < 0 ? "text-danger" : "text-dark"}
						>{`${year1GrowthRateNI} %`}</td>
						<td
							className={year2GrowthRateNI < 0 ? "text-danger" : "text-dark"}
						>{`${year2GrowthRateNI} %`}</td>
						<td
							className={year3GrowthRateNI < 0 ? "text-danger" : "text-dark"}
						>{`${year3GrowthRateNI} %`}</td>
						<td
							className={year4GrowthRateNI < 0 ? "text-danger" : "text-dark"}
						>{`${year4GrowthRateNI} %`}</td>
						<td>{`0 %`}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}
Income.propTypes = {
	incomeData: PropTypes.object,
};
