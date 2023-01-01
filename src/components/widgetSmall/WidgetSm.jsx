/**
 * eslint-disable no-unused-vars
 *
 * @format
 */

/** @format */

import "./widgetSm.css";

import {
	Area,
	AreaChart,
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

import Badge from "react-bootstrap/Badge";
import CandlestickChartSharpIcon from "@mui/icons-material/CandlestickChartSharp";
import React from "react";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const data = [
	{
		name: "2016",
		value: 40,
		price: 24,
		amt: 24,
	},
	{
		name: "2017",
		value: 30,
		price: 13,
		amt: 22,
	},
	{
		name: "2018",
		value: 2000,
		price: 9800,
		amt: 29,
	},
	{
		name: "2019",
		value: 2780,
		price: 3908,
		amt: 20,
	},
	{
		name: "2020",
		value: 18,
		price: 4800,
		amt: 21,
	},
	{
		name: "2021",
		value: 2390,
		price: 3800,
		amt: 25,
	},
	{
		name: "2022",
		value: 3490,
		price: 4300,
		amt: 300,
	},
];
export default function WidgetSm() {
	return (
		<div className="widgetSm">
			<div className="ownedStocksList">
				<div className="">
					<span className="widgetSmTitle">
						<TrendingUpRoundedIcon sx={{ color: "black", margin: "3px" }} />
						Current Stocks
					</span>
				</div>
				<span className="text-muted">Best Performing Shares</span>
			</div>

			<hr />
			<ul className="widgetSmList">
				<div className="widgetSmStocKInfo shadow p-2 mb-3 bg-white rounded">
					<span className="widgetSmStockName">
						<CandlestickChartSharpIcon sx={{ color: "rgb(128, 4, 0)" }} /> AAPL
					</span>
					<span className="widgetStockTitle">
						<Badge bg="warning" text="dark">
							Apple Inc.
						</Badge>
					</span>
					<button className="widgetSmButton shadow p-1 mb-3 bg-white rounded ">
						<ArrowUpward
							className="widgetSmIcon fw-bolder"
							style={{ color: "green" }}
						/>
						<span className=" stockInfoNumber">18</span>
					</button>
				</div>
				<li className="widgetSmListItem shadow p-1 mb-3 bg-white rounded">
					<ResponsiveContainer
						width="100%"
						height={150}
						className=" chartContainer"
					>
						<LineChart
							// width={500}
							// height={200}
							data={data}
							margin={{
								top: 10,
								right: 30,
								left: 0,
								bottom: 0,
							}}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								vertical={false}
								horizontal
							/>
							<XAxis dataKey="name" />
							<YAxis tickLine={false} axisLine={false} />
							<Tooltip />
							<Line
								name="price ($)"
								type="monotone"
								dataKey="value"
								stroke="#82ca9d"
								fill="red"
							/>
						</LineChart>
					</ResponsiveContainer>
				</li>
				<div className="widgetSmStocKInfo shadow p-3 mb-3 bg-white rounded">
					<span className="widgetSmStockName">
						<CandlestickChartSharpIcon sx={{ color: "rgb(128, 4, 0)" }} />
						GOOGL
					</span>
					<span className="widgetStockTitle">
						<Badge bg="warning" text="dark">
							Alphabet Inc.
						</Badge>
					</span>
					<button className="widgetSmButton shadow p-1 mb-3 bg-white rounded ">
						<ArrowDownward
							className="widgetSmIcon fw-bolder"
							style={{ color: "red" }}
						/>
						<span className=" stockInfoNumber">10</span>
					</button>
				</div>
				<li className="widgetSmListItem shadow p-1 mb-3 bg-white rounded">
					<ResponsiveContainer
						width="100%"
						height={200}
						className="chartContainer"
					>
						<LineChart
							// width={500}
							// height={200}
							data={data}
							// syncId="anyId"
							margin={{
								top: 10,
								right: 30,
								left: 0,
								bottom: 0,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Line
								name="price ($)"
								type="monotone"
								dataKey="price"
								stroke="#82ca9d"
								fill="red"
							/>
							{/* <Brush /> */}
						</LineChart>
					</ResponsiveContainer>
				</li>
				<div className="widgetSmStocKInfo shadow p-3 mb-3 bg-white rounded">
					<span className="widgetSmStockName">
						<CandlestickChartSharpIcon sx={{ color: "rgb(128, 4, 0)" }} />
						MSFT
					</span>
					<span className="widgetStockTitle">
						<Badge bg="warning" text="dark">
							Microsoft Inc.
						</Badge>
					</span>
					<button className="widgetSmButton shadow p-1 mb-3 bg-white rounded">
						<ArrowUpward
							className="widgetSmIcon fw-bolder"
							style={{ color: "green" }}
						/>
						<span className=" stockInfoNumber">12</span>
					</button>
				</div>
				<li className="widgetSmListItem">
					<ResponsiveContainer
						width="100%"
						height={200}
						className=" chartContainer"
					>
						<AreaChart
							// width={500}
							// height={200}
							data={data}
							syncId="anyId"
							margin={{
								top: 10,
								right: 30,
								left: 0,
								bottom: 0,
							}}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Area
								name="price ($)"
								type="monotone"
								dataKey="price"
								stroke="black"
								fill="green"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</li>
			</ul>
		</div>
	);
}
