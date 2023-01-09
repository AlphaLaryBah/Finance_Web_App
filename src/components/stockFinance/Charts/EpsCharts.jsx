/** @format */

import "./EPSchart.css";

import AccordionCompnt from "../statements/accordion/AccordionCompnt";
import { ArrowDownward } from "@material-ui/icons";
import Chart from "react-apexcharts";
import CurrencyFormat from "react-currency-format";
import GeneralInfo from "./GeneralInfo";
import PropTypes from "prop-types";
import React from "react";

export default function EpsCharts({
	getData,
	getOverViewData,
	dailyQuoteData,
	incomeData,
}) {

	let estimatedEPS = [];
	let surprisePercentage = [];
	let reportedEPS = [];
	let surprise = [];
	let reportedDate = [];
	if (!getData) {
		return;
		// return console.log("There's NO data fetched ");
	} else {
		[getData].map((item) => {
			item.quarterlyEarnings.map((el) => {
				estimatedEPS.push(el.estimatedEPS);
				surprisePercentage.push(el.surprisePercentage);
				reportedEPS.push(el.reportedEPS);
				surprise.push(el.surprise);
				reportedDate.push(el.reportedDate);
			});
		});
	}
	let overView = {};
	if (!getOverViewData) {
		return;
	} else {
		overView = {
			symbol: getOverViewData.Symbol,
			assetType: getOverViewData.AssetType,
			name: getOverViewData.Name,
			about: getOverViewData.Description,
			marketCap: getOverViewData.MarketCapitalization,
			exchange: getOverViewData.Exchange,
			sector: getOverViewData.Sector,
			industry: getOverViewData.Industry,
			latestQuarter: getOverViewData.LatestQuarter,
			currency: getOverViewData.Currency,
		};
	}
	let dailyQuote = {};
	if (!dailyQuoteData) {
		return;
	} else {
		
		
		dailyQuote = {
			price: dailyQuoteData["Global Quote"]["05. price"],
			open: dailyQuoteData["Global Quote"]["02. open"],
			changePercent: parseInt(
				dailyQuoteData["Global Quote"]["10. change percent"]
			),
			change: parseInt(dailyQuoteData["Global Quote"]["09. change"]),
			date: new Date(dailyQuoteData["Global Quote"]["07. latest trading day"]),
		};
	}
	const options = {
		hour: "numeric",
		minute: "numeric",
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	const date = dailyQuote.date.toLocaleDateString(undefined, options);
	let setWindowSize = false;

	if (window.innerWidth <= 700) {
		setWindowSize = true;
	} else {
		setWindowSize = false;
	}
	
	

	
	return (
		<div className="chartsContainer container ">
			<div className="" style={{ gap: "10px", marginBottom: "0px" }}>
				<h5 className="text-success">{overView.symbol}</h5>
				<h3 className="text-dark "> {overView.name}</h3>
				<hr />
			</div>
			<div className="chartAndInfoContainer">
				<div className="chartOnLeft">
					<div className="priceInfoContainer pl-3">
						<div className="topRow">
							
							<h1>
								{
									<CurrencyFormat
										value={Number.parseFloat(dailyQuote.price).toFixed(2)}
										displayType={"text"}
										style={{
											padding: "10px",
											width: "150px",
										}}
										thousandSeparator={true}
										prefix={"$"}
									/>
								}
							</h1>
							<span className="percentChange">
								<ArrowDownward
									className="percentArrow"
									style={{ fontSize: "15px" }}
								/>
								{`${Number.parseFloat(dailyQuote.changePercent).toFixed(2)}`}
							</span>
							<span className="percentToday">-2.05 Today</span>
						</div>
						<div className="rowMiddle">
							<p className="text-muted">Open:</p>
							<span className="fw-bold">
								{" "}
								{
									<CurrencyFormat
										value={Number.parseFloat(dailyQuote.open).toFixed(2)}
										displayType={"text"}
										style={{
											padding: "0px",
											width: "150px",
										}}
										thousandSeparator={true}
										prefix={"$"}
									/>
								}
							</span>
							<span>
								(
								<ArrowDownward
									className="percentArrow"
									style={{ fontSize: "15px" }}
								/>{" "}
								<span className="text-danger">
									{" "}
									{`${Number.parseFloat(dailyQuote.change).toFixed(2)}`}
								</span>{" "}
								) <span className="text-danger">-0.69</span>
							</span>
						</div>
						<div className="bottomRow ">
							<span className="text-muted ">Closed:</span>
							<span className="text-muted p-2">{date}</span>
							<span className="p-2 text-muted "> {overView.currency}</span>
							<span className="">{overView.exchange}</span>
						</div>
					</div>
					<hr />

					<Chart
						className="p-3"
						type="area"
						width={setWindowSize ? 300 : 700}
						height={500}
						series={[
							{
								name: "Reported EPS ",
								data: reportedEPS,
							},
							{
								name: "Surprise Percentage",
								data: surprisePercentage,
							},
							{
								name: "Estimated EPS",
								data: estimatedEPS,
							},
						]}
						options={{
							colors: ["#00FF00", "#f0f", "#ff0"],

							tooltip: {
								followCursor: true,
							},
							dataLabels: {
								enabled: false,
								formatter: (value) => {
									return `${value} %`;
								},
							},

							xaxis: {
								show: false,
								labels: {
									show: false,
								},
								axisBorder: {
									show: false,
								},
								axisTicks: {
									show: false,
								},
							},
							yaxis: {
								labels: {
									formatter: (value) => {
										return `${value} %`;
									},
								},
								title: {
									text: "Percent Change",
									style: {
										color: "#000",
										fontSize: 16,
									},
								},
							},
							title: {
								text: "Annual EPS",
								style: {
									color: "#000",
									fontSize: 16,
								},
							},
							subtitle: {
								text: "Shows data form AlphaVantage API",
								style: {
									color: "#001",
									fontSize: 12,
								},
							},
							// grid: {
							// 	borderColor: "#533620",
							// },
						}}
					/>
				</div>
				<div className="stockInfoOnRight">
					<div className="aboutCard mt-4">
						<h5 className=" cardTitle fw-bold text-success">
							About: <span className="text-info m-2 ">{overView.name} </span>
						</h5>
						<hr />
						<p className="p-2">{overView.about}</p>
					</div>
					<div className="generalInfoCard">
						<h5 className="text-center  fw-bold text-success">
							General Information
						</h5>
						<hr />

						<GeneralInfo title="Market Cap:" value={overView.marketCap} />
						<GeneralInfo title="Exchange:" value={overView.exchange} />
						<GeneralInfo title="Sector:" value={overView.sector} />
						<GeneralInfo title="Industry:" value={overView.industry} />
						<GeneralInfo title="Quarter:" value={overView.latestQuarter} />
					</div>
				</div>
			</div>

			<div className="stockList">
				<div className="stockListLeft">
					<AccordionCompnt
						incomeData={incomeData}
						getOverViewData={getOverViewData}
					/>
				</div>
			</div>
		</div>
	);
}
EpsCharts.propTypes = {
	getData: PropTypes.object,
	getOverViewData: PropTypes.object,
	dailyQuoteData: PropTypes.object,
	incomeData: PropTypes.object,
};
