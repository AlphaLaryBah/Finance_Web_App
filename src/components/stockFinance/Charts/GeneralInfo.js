/** @format */

import "./EPSchart.css";

import CurrencyFormat from "react-currency-format";
import PropTypes from "prop-types";
import React from "react";

export default function GeneralInfo(props) {
	return (
		<div>
			<div className="containsStockInfo">
				<p>{props.title}</p>
				<span
					className="amountChanges"
					style={{ backgroundColor: "#f0f", color: "white" }}
				>
					{isNaN(props.value) ? (
						props.value
					) : (
						<CurrencyFormat
							value={Math.round(props.value)}
							displayType={"text"}
							style={{
								color: "white",
								padding: "1px",
								width: "100%",
							}}
							thousandSeparator={true}
							prefix={""}
						/>
					)}
				</span>
			</div>
		</div>
	);
}
GeneralInfo.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string,
};
