/** @format */
import "./popOver.css";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Badge from "react-bootstrap/Badge";
import BalanceIcon from "@mui/icons-material/Balance";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyFormat from "react-currency-format";
import Paper from "@mui/material/Paper";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import PropTypes from "prop-types";
import React from "react";
import SavingsIcon from "@mui/icons-material/Savings";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function PopOverInfo(props) {
	return (
		<TableContainer component={Paper} className=" ">
			<Table sx={{ width: 300 }} aria-label="spanning table">
				<TableHead>
					<TableRow>
						<TableCell>
							<CalendarMonthIcon color="primary" />
						</TableCell>
						<TableCell align="right">
							<SavingsIcon color="secondary" />
						</TableCell>
						<TableCell align="right">
							<PriceChangeIcon sx={{ color: "#f44336" }} />{" "}
						</TableCell>
						<TableCell align="right" sx={{ color: "#00c853" }}>
							<BalanceIcon />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>Date </TableCell>
						<TableCell align="right">Opening Balance </TableCell>
						<TableCell align="right">Increase / Decrease</TableCell>
						<TableCell align="right" sx={{ color: "#00c853" }}>
							Net Balance
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell className="text-primary">Q1</TableCell>
						<TableCell align="right">
							<p className="badge">
								{
									<CurrencyFormat
										value={Math.round(props.CurrentBalance)}
										displayType={"text"}
										style={{
											color: "white",
											padding: "10px",
											width: "150px",
										}}
										thousandSeparator={true}
										prefix={"$"}
									/>
								}
							</p>
						</TableCell>
						<TableCell align="right">
							{
								<CurrencyFormat
									value={Math.round(props.OpeningBalance)}
									displayType={"text"}
									style={{
										color: "black",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</TableCell>
						<TableCell align="right">
							{
								<CurrencyFormat
									value={Math.round(props.sum)}
									displayType={"text"}
									style={{
										color: "black",
										padding: "10px",
										width: "150px",
									}}
									thousandSeparator={true}
									prefix={"$"}
								/>
							}
						</TableCell>
					</TableRow>
					{props.fedsTax ? (
						<TableRow>
							<TableCell rowSpan={3} />
							<TableCell colSpan={2}>Subtotal</TableCell>
							<TableCell align="right">
								{props.sum < 0 ? (
									<Badge bg="danger" text="white">
										{
											<CurrencyFormat
												value={Math.round(props.sum)}
												displayType={"text"}
												style={{
													// color: "black",
													padding: "10px",
													width: "150px",
												}}
												thousandSeparator={true}
												prefix={"$"}
											/>
										}
									</Badge>
								) : (
									<Badge bg="info">
										{
											<CurrencyFormat
												value={Math.round(props.sum)}
												displayType={"text"}
												style={{
													color: "black",
													padding: "10px",
													width: "150px",
												}}
												thousandSeparator={true}
												prefix={"$"}
											/>
										}
									</Badge>
								)}
							</TableCell>
						</TableRow>
					) : null}

					{props.fedsTax ? (
						<TableRow>
							<TableCell>Feds Tax</TableCell>
							<TableCell align="right" sx={{ color: "red" }}>{`${(24).toFixed(
								0
							)} %`}</TableCell>
							<TableCell align="right">
								{
									<CurrencyFormat
										value={Math.round(props.fedsTax)}
										displayType={"text"}
										style={{
											color: "black",
											padding: "10px",
											width: "150px",
										}}
										thousandSeparator={true}
										prefix={"$"}
									/>
								}
							</TableCell>
						</TableRow>
					) : null}
					{props.stateTax ? (
						<TableRow>
							<TableCell>State Tax</TableCell>
							<TableCell align="right" sx={{ color: "red" }}>{`${(4.4).toFixed(
								1
							)} %`}</TableCell>
							<TableCell align="right">
								{
									<CurrencyFormat
										value={Math.round(props.stateTax)}
										displayType={"text"}
										style={{
											color: "black",
											padding: "10px",
											width: "150px",
										}}
										thousandSeparator={true}
										prefix={"$"}
									/>
								}
							</TableCell>
						</TableRow>
					) : null}
					<TableRow className="total">
						<TableCell colSpan={3}>
							<AccountBalanceIcon color="success" /> Total
						</TableCell>
						<TableCell align="right" colSpan={3}>
							{props.netAfterTax < 0 ? (
								<Badge bg="danger" text="white">
									{
										<CurrencyFormat
											value={Math.round(props.netAfterTax)}
											displayType={"text"}
											style={{
												padding: "10px",
												width: "150px",
											}}
											thousandSeparator={true}
											prefix={"$"}
										/>
									}
								</Badge>
							) : (
								<Badge bg="warning" text="dark">
									{
										<CurrencyFormat
											value={Math.round(props.netAfterTax)}
											displayType={"text"}
											style={{
												padding: "10px",
												width: "150px",
											}}
											thousandSeparator={true}
											prefix={"$"}
										/>
									}{" "}
								</Badge>
							)}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}

PopOverInfo.propTypes = {
	activate: PropTypes.bool,
	moneyData: PropTypes.object,
	OpeningBalance: PropTypes.number,
	CurrentBalance: PropTypes.number,
	sum: PropTypes.number,
	fedsTax: PropTypes.number,
	stateTax: PropTypes.number,
	netAfterTax: PropTypes.number,
};
