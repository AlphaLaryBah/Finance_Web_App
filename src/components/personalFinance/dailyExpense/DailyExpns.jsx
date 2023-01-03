/** @format */

import "./dailyExpns.css";

import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

import Button from "@material-ui/core/Button";
import ChartExpense from "./chartExpense/ChartExpense";
import CurrencyFormat from "react-currency-format";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { MoneyOff } from "@material-ui/icons";
import { format } from "timeago.js";

export default function DailyExpns() {
	const [expenseAddedAt] = useState(new Date().toLocaleString("en-us"));
	const [titleInput, setTitleInput] = useState("");
	const [amountInput, setAmountInput] = useState("");
	const [key, setKey] = useState("Expense");
	const [isTitleNew, setIsTitleNew] = useState(false);
	const [isAmountNew, setIsAmountNew] = useState(false);

	const newTitleInput = (e) => {
		e.preventDefault();

		setIsTitleNew(true);
		setTitleInput(e.target.value);
	};
	const newAmountInput = (e) => {
		e.preventDefault();

		setIsAmountNew(true);
		setAmountInput(e.target.value);
	};
	const [expenses, setExpenses] = useState([
		{
			title: "coffee",
			daily: 5,
			createdAt: "6/22/2022, 12:13:54 PM",
			monthly: 2000,

			weeklyTimeLine: new Date("6/22/2022, 12:13:54 PM").toLocaleString(
				"en-us",
				{
					weekday: "short",
				}
			),
		},
		{
			title: "New Phone",
			daily: 500,
			createdAt: "6/21/2022, 12:13:54 PM",
			weeklyTimeLine: new Date("6/22/2022, 12:13:54 PM").toLocaleString(
				"en-us",
				{
					weekday: "short",
				}
			),
		},
		{
			title: "Shoes",
			daily: 100,
			createdAt: "7/23/2022, 12:13:54 PM",
			weeklyTimeLine: new Date("7/23/2022, 12:13:54 PM").toLocaleString(
				"en-us",
				{
					weekday: "short",
				}
			),
		},
		{
			title: "Lunch",
			daily: 25,

			createdAt: "8/24/2022, 12:13:54 PM",
			weeklyTimeLine: new Date("8/24/2022, 12:13:54 PM").toLocaleString(
				"en-us",
				{
					weekday: "short",
				}
			),
		},
		{
			title: "Fixed Car",
			daily: 1000,
			createdAt: "8/24/2022, 12:13:54 PM",
			weeklyTimeLine: new Date("8/24/2022, 12:13:54 PM").toLocaleString(
				"en-us",
				{
					weekday: "short",
				}
			),
		},
	]);
	useEffect(
		(k) => {
			setKey(k);
		},
		[key]
	);
	const getInputValue = (e) => {
		e.preventDefault();
		const value = [
			{
				title: titleInput,
				daily: amountInput,
				createdAt: expenseAddedAt,
				weeklyTimeLine: new Date().toLocaleString("en-us", {
					weekday: "short",
				}),
				monthlyTimeLine: new Date().toLocaleString("en-us", {
					month: "short",
				}),
			},
		];

		setExpenses((prev) => {
			return [...prev, ...value];
		});

		//disable button after each submit and reset inputs
		setIsTitleNew(false);
		setIsAmountNew(false);
		setTitleInput("");
		setAmountInput("");
	};
	return (
		<div className="container-fluid " data-testid="expenses-component">
			<div className="row">
				<div className=" mb-5 row bg-white ">
					<Tabs
						// className="tabs btn "
						// id="controlled-tab-example"
						// activeKey={key}
						// onSelect={(k) => setKey(k)}
						defaultActiveKey={2}
						id="uncontrolled-tab-example"
					>
						<Tab
							eventKey={1}
							title="Expense Charts"
							className="tabsContainer "
							data-testid="chart-Daily"
						>
							<ChartExpense
								data={expenses}
								grid
								dataKey="amount"
								dataKeyName="weeklyTimeLine"
							/>
						</Tab>
						<Tab
							eventKey={2}
							title="Edit Expenses"
							className="tabsContainer"
							data-testid="chart-Monthly"
						>
							<div className="row">
								<div className="dailyExpns">
									<div className="dailyExpnsContainer row ">
										<div className="dailyExpnsShow col-sm-12 col-md-12 col-lg-6 ">
											<div className="containerExpnsUpdate">
												<div className="dailyExpnsShowTop">
													<img
														src="https://images.unsplash.com/photo-1563132337-f159f484226c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80"
														alt=""
														className="dailyExpnsShowImg p-0 mb-2 bg-white"
													/>
													<div className="dailyExpnsShowTopTitle">
														<span className="dailyExpnsShowUserName">
															Anaphia Uja
														</span>

														<span className="dailyExpnsShowUserTitle">
															<span className="dailyExpnsShowUserName text-muted">
																Occupation:
															</span>{" "}
															Software Engineer
														</span>
													</div>
												</div>
												<div className="">
													<span className="dailyExpnsShowTitle">
														Daily expenses Details
													</span>
													{expenses === undefined
														? null
														: expenses.map((item, index) => {
																console.log();
																return (
																	<div
																		className="dailyExpnsShowInfo"
																		key={index}
																	>
																		<MoneyOff className="dailyExpnsShowIcon" />
																		<span
																			className="dailyExpnsShowInfoTitle"
																			role="displayInputChange"
																		>
																			{item.title}
																		</span>
																		<span className="dailyExpnsShowInfoTitle text-danger">
																			<CurrencyFormat
																				value={item.daily}
																				displayType={"text"}
																				thousandSeparator={true}
																				prefix={"- $"}
																				renderText={(value) => (
																					<div>{value}</div>
																				)}
																			/>
																		</span>
																		<span className="dailyExpnsShowInfoTitle text-success ">
																			{format(item.createdAt)}
																		</span>
																	</div>
																);
																// eslint-disable-next-line no-mixed-spaces-and-tabs
														  })}
												</div>
											</div>
										</div>
										<div className="dailyExpnsUpdate2 col-sm-12 col-md-12 col-lg-6 bg-white">
											<span className="dailyExpnsUpdateTitle">
												{" "}
												<EditRoundedIcon
													sx={{ color: "black", margin: "3px" }}
												/>
												Edit Expenses{" "}
											</span>
											<form
												className="dailyExpnsUpdateForm"
												onSubmit={getInputValue}
											>
												<div className="dailyExpnsUpdateLeft">
													<div className="dailyExpnsUpdateItem">
														<label>Title</label>
														<input
															aria-label="title of expense"
															name="title"
															type="text"
															placeholder="What is your expense?"
															className="dailyExpnsUpdateInput"
															value={titleInput}
															onChange={newTitleInput}
														/>
													</div>
													<div className="dailyExpnsUpdateItem">
														<label htmlFor="amountInput">Amount</label>
														<input
															name="amount"
															type="number"
															placeholder="Amount"
															className="dailyExpnsUpdateInput"
															id="amountInput"
															value={amountInput}
															onChange={newAmountInput}
														/>
													</div>
												</div>
												<div className="dailyExpnsUpdateRight ">
													<Button
														disabled={isAmountNew && isTitleNew ? false : true}
														variant="contained"
														color="secondary"
														type="submit"
														name="submitExpenseUpdate"
														role="button"
														className="dailyExpnsUpdateButton p-2 mt-2  "
													>
														Add Expense
													</Button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</Tab>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
