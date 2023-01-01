/**
 *
 * @format
 */

/** @format */

import "./fetchStock.css";

import { useEffect, useRef, useState } from "react";

// import Alert from "react-bootstrap/Alert";
import { ArrowUpward } from "@material-ui/icons";
// import Button from "react-bootstrap/Button";
import EPSCharts from "../Charts/EpsCharts";
import React from "react";
import { STOCKS_NAMES_SYMBOLS } from "../../../TempData/FakeData";
import SearchIcon from "@material-ui/icons/Search";

export default function FetchStock() {
	// const DEFAULT_STOCK_SYMBOL = "AAPL";
	const [searchInput, setSearchInput] = useState("");
	const [inputIsClicked, setInputIsClicked] = useState();
	const [isOutSide, setIsOutSide] = useState(false);
	const [nameOfClickedBtn, setNameOfClickedBtn] = useState("");
	const [liveSearchTerm, setLiveSearchTerm] = useState("");
	const [earningsData, setEarningsData] = useState(null);
	const [overViewData, setOverViewData] = useState(null);
	const [dailyQuoteData, setDailyQuoteData] = useState(null);
	const [incomeData, setIncomeData] = useState();

	const searchOptionsRef = useRef(null);
	useEffect(() => {
		// call default stock name at each render
		//  getData();
		document.querySelector(".click-text");
		document.addEventListener("mousedown", (event) => {
			if (
				searchOptionsRef.current &&
				!searchOptionsRef.current.contains(event.target)
			) {
				setIsOutSide(false);
				setInputIsClicked(false);
				//reset search when click outside of this div

				setLiveSearchTerm("");
			}
		});
	}, []);

	let stockName = liveSearchTerm;

	const getData = async () => {
		// console.log("::::::CALLED::::");

		// eslint-disable-next-line no-undef
		const API_KEY = process.env.REACT_APP_API_KEY;
		const API_CALL_DAILY_QUOTE = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${
			liveSearchTerm !== searchInput ? (stockName = searchInput) : stockName
		}&apikey=${API_KEY}`;
		const API_CALL_OVERVIEW = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${
			liveSearchTerm !== searchInput ? (stockName = searchInput) : stockName
		}&apikey=${API_KEY}`;

		const API_CALL_EARNINGS = `https://www.alphavantage.co/query?function=EARNINGS&symbol=${
			liveSearchTerm !== searchInput ? (stockName = searchInput) : stockName
		}&apikey=${API_KEY}`;

		if (!searchInput) {
			return console.log("There's no ticker");
		} else {
			await fetch(API_CALL_EARNINGS)
				.then(function (response) {
					// console.log("ok");

					return response.json();
				})
				.then(function (data) {
					// console.log(data);
					setEarningsData(data);
				})
				.catch(function (err) {
					console.log(err);
				});

			///STOCKS OVERVIEW
			await fetch(API_CALL_OVERVIEW)
				.then(function (response) {
					// console.log("ok");

					return response.json();
				})
				.then(function (data) {
					// console.log(data);
					setOverViewData(data);
				})
				.catch(function (err) {
					console.log(err);
				});

			///STOCKS DAILY ADJUSTES TIME SERIES
			await fetch(API_CALL_DAILY_QUOTE)
				.then(function (response) {
					// console.log("ok");

					return response.json();
				})
				.then(function (data) {
					// console.log(data);
					setDailyQuoteData(data);
				})
				.catch(function (err) {
					console.log(err);
				});
			const API_CALL_INCOME = `//www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${
				liveSearchTerm !== searchInput ? (stockName = searchInput) : stockName
			}&apikey=${API_KEY}`;

			await fetch(API_CALL_INCOME)
				.then(function (response) {
					// console.log("ok");

					return response.json();
				})
				.then(function (data) {
					// console.log(data);
					setIncomeData(data);
				})
				.catch(function (err) {
					console.log(err);
				});
		}
	};
	const inPutSubmit = (e) => {
		e.preventDefault();
		getData();
		resetSearch();
	};
	const getClikdValueFromStockList = (stock) => {
		// console.log("Fetch Comp:", stock);
		return setSearchInput(stock);
	};
	const resetSearch = () => {
		setSearchInput("");
	};

	const callSubmit = () => {
		stockName = searchInput;
		getData();
	};

	return (
		<div className="container">
			<div className="row">
				<div className=" fetchStocks col-sm-12 m-2">
					<div className="containerOfSeacrhInput ">
						<div>
							<form onSubmit={inPutSubmit}>
								<input
									autoComplete="off"
									type="text"
									value={searchInput}
									placeholder={`Search for stocks by their symbols... `}
									name="search"
									className={
										!inputIsClicked
											? "stockNameInput"
											: "stockNameInputOnChange"
									}
									onChange={(e) => {
										setSearchInput(e.target.value.toUpperCase());
										// setLiveSearchTerm(e.target.value.toUpperCase());
									}}
									onClick={(e) => {
										setInputIsClicked(e ? true : false);
										setIsOutSide(true);
									}}
								/>
								{searchInput === "" ? null : (
									<button type="submit" className="searchIcon">
										{" "}
										<SearchIcon />
									</button>
								)}
							</form>
							{/* <div className="allSearchContainer col-sm-12"> */}
							{isOutSide ? (
								<div className="row click-text" ref={searchOptionsRef}>
									<div
										className={
											searchInput === ""
												? "searchOption"
												: "searchOptionInputChanged"
										}
									>
										<div className="searchMenu">
											<button
												className="active"
												// className={
												// 	nameOfClickedBtn === "all" ? "active" : "optionsOfSearh"
												// }
												name="all"
												onClick={(e) => {
													setNameOfClickedBtn(e.target.name);
												}}
											>
												All
											</button>
											<button
												className={
													nameOfClickedBtn === "stock/etf"
														? "active"
														: "optionsOfSearh"
												}
												name="stock/etf"
												onClick={(e) => {
													setNameOfClickedBtn(e.target.name);
												}}
												disabled={true}
											>
												Stock/ETF
											</button>
											<button
												className={
													nameOfClickedBtn === "index"
														? "active"
														: "optionsOfSearh"
												}
												name="index"
												onClick={(e) => {
													setNameOfClickedBtn(e.target.name);
												}}
												disabled={true}
											>
												Index
											</button>
											<button
												className={
													nameOfClickedBtn === "mutual"
														? "active"
														: "optionsOfSearh"
												}
												name="mutual"
												onClick={(e) => {
													setNameOfClickedBtn(e.target.name);
												}}
												disabled={true}
											>
												Mutual Fund
											</button>
											<button
												className={
													nameOfClickedBtn === "currency"
														? "active"
														: "optionsOfSearh"
												}
												name="currency"
												onClick={(e) => {
													setNameOfClickedBtn(e.target.name);
												}}
												disabled={true}
											>
												Currency
											</button>
										</div>
										{STOCKS_NAMES_SYMBOLS.filter((val) => {
											if (liveSearchTerm === "") {
												return val;
											} else if (val.ticker.includes(liveSearchTerm)) {
												return val;
											}
										})
											.splice(0, 5)
											.map((item, index) => {
												return (
													<form onSubmit={callSubmit} key={index}>
														<div
															className="containerOfSearchMenuOptions"
															key={index}
															role="button"
															onClick={(e) => {
																e.preventDefault();
																setSearchInput(item.ticker);
																setLiveSearchTerm(item.ticker);
																setInputIsClicked(e ? false : true);
																setIsOutSide(e ? false : true);

																// getData();
															}}
														>
															<>
																<div className="searchLeft">
																	<p
																		className=" text-center border rounded text-dark p-1"
																		style={{
																			background: " #99E6E6",
																			width: "max-content",
																		}}
																	>
																		{/* Ticker: */}
																		{item.ticker}
																	</p>
																	<p>
																		{/* Title: */}
																		{item.title.toLowerCase()}
																	</p>
																</div>
																<div className="searchRight">
																	<span className="currentPrice"> $163.43</span>
																	<span className="pricePercentChange">
																		{" "}
																		<ArrowUpward className="arrowIcon" /> 3.85%
																	</span>
																</div>
															</>
														</div>
													</form>
												);
											})}
									</div>
								</div>
							) : null}
						</div>
					</div>

					<div className="chartContainer mt-5 container">
						<EPSCharts
							getData={earningsData}
							getStockNameFromList={getClikdValueFromStockList}
							getOverViewData={overViewData}
							dailyQuoteData={dailyQuoteData}
							incomeData={incomeData}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
