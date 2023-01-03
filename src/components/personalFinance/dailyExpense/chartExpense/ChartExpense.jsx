/** @format */

import "./chartExpense.css";

import {
	Area,
	AreaChart,
	Brush,
	CartesianGrid,
	Label,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

import PropTypes from "prop-types";
import React from "react";
import ResizeObserver from "resize-observer-polyfill";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

if (!window.ResizeObserver) {
	window.ResizeObserver = ResizeObserver;
}

export default function ChartExpense({ title, data }) {
	let setSize = false;

	if (window.innerWidth <= 700) {
		setSize = true;
	} else {
		setSize = false;
	}
	const MONTTHLY_DATA = [
		{
			monthly: 2000,
			monthlyTimeLine: new Date("5/22/2022, 12:13:54 PM").toLocaleString(
				"en-us",
				{
					month: "short",
				}
			),
		},
		{
			monthly: 3000,
			monthlyTimeLine: new Date("6/22/2022, 12:13:54 PM").toLocaleString(
				"en-us",
				{
					month: "short",
				}
			),
		},
		{
			monthly: 8000,
			monthlyTimeLine: new Date("7/23/2022, 12:13:54 PM").toLocaleString(
				"en-us",
				{
					month: "short",
				}
			),
		},
		{
			monthly: 700,
			monthlyTimeLine: new Date("8/24/2022, 12:13:54 PM").toLocaleString(
				"en-us",
				{
					month: "short",
				}
			),
		},
		{
			monthly: 1800,
			monthlyTimeLine: new Date("9/24/2022, 12:13:54 PM").toLocaleString(
				"en-us",
				{
					month: "short",
				}
			),
		},
	];

	return (
		<div className="chartExpenses container-fluid  ">
			<h3 className="chartExpensesTitle m-3">{title}</h3>
			<hr />
			<div className="row chartContainer">
				<h3 className="text-success mb-3 text-center">
					<TrendingUpRoundedIcon sx={{ color: "black", margin: "3px" }} />
					Daily Expense Chart
				</h3>
				<div className="row containerOfFirstChart">
					<ResponsiveContainer
						width="100%"
						height={setSize ? 320 : 315}
						className="theChart  mb-5"
					>
						<AreaChart
							// width={500}
							// height={200}
							data={data}
							margin={{
								top: 10,
								right: 30,
								left: 10,
								bottom: 20,
							}}
						>
							<defs>
								<linearGradient id="colorUv1" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
								</linearGradient>
								<filter id="shadow" height="200%">
									<feDropShadow dx="0" dy="15" stdDeviation="7" />
								</filter>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								horizontal
							/>
							<Brush y={279} />
							<XAxis dataKey="weeklyTimeLine">
								<Label
									style={{
										textAnchor: "middle",
										fontSize: "100%",
										fill: "black",
									}}
									angle={0}
									value={"Days (Week)"}
									// dx={-26}
									dy={23}
								/>
							</XAxis>
							<YAxis axisLine={false}>
								<Label
									style={{
										textAnchor: "middle",
										fontSize: "100%",
										fill: "black",
									}}
									angle={270}
									value={"Amount Spent ($)"}
									dx={-26}
								/>
							</YAxis>{" "}
							<ReferenceLine x="amount" stroke="red" label="Max " />
							<ReferenceLine y={1000} label="Max" stroke="red" />
							<Tooltip />
							<Area
								type="monotone"
								dataKey="daily"
								stroke="#82ca9d"
								fillOpacity={1}
								fill="url(#colorUv1)"
								filter="url(#shadow)"
							/>
						</AreaChart>
					</ResponsiveContainer>
					<hr></hr>
				</div>
				<h3 className="text-success mb-3 text-center">
					{" "}
					<TrendingUpRoundedIcon sx={{ color: "black", margin: "3px" }} />
					Monthly Expense Chart
				</h3>
				<div className="row containerOfSecondChart">
					<ResponsiveContainer
						width="100%"
						height={setSize ? 320 : 315}
						className="theChart mb-5 bg-white"
					>
						<AreaChart
							data={MONTTHLY_DATA}
							margin={{
								top: 10,
								right: 30,
								left: 10,
								bottom: 20,
							}}
						>
							<defs>
								<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
								</linearGradient>
								<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								horizontal
							/>
							<Brush y={279} />
							<XAxis dataKey="monthlyTimeLine">
								<Label
									style={{
										textAnchor: "middle",
										fontSize: "100%",
										fill: "black",
									}}
									angle={0}
									value={"Months (Year)"}
									// dx={-26}
									dy={23}
								/>
							</XAxis>
							<YAxis axisLine={false}>
								<Label
									style={{
										textAnchor: "middle",
										fontSize: "100%",
										fill: "black",
									}}
									angle={270}
									value={"Amount Spent ($)"}
									dx={-26}
								/>
							</YAxis>{" "}
							<Tooltip cursor={{ stroke: "#ff0000", strokeWidth: 1 }} />
							<ReferenceLine x="amount" stroke="red" label="Max" />
							<ReferenceLine y={1000} label="Max" stroke="red" />
							<Tooltip />
							<Area
								type="monotone"
								// unit="K"
								dataKey="monthly"
								stroke="#82ca"
								fillOpacity={1}
								fill="url(#colorUv)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
ChartExpense.propTypes = {
	title: PropTypes.string,
	data: PropTypes.array.isRequired,
	dataKeyName: PropTypes.string.isRequired,
	dataKey: PropTypes.string.isRequired,
	grid: PropTypes.bool.isRequired,
};
