/** @format */

import "./asset.css";

import DailyExpns from "../../components/personalFinance/dailyExpense/DailyExpns";
import React from "react";

export default function Asset() {
	return (
		<div
			className="assetContainer container"
			style={{ background: "rgb(255, 255, 255)" }}
		>
			<div className="row dailyExpenseCard">
				<DailyExpns />
			</div>
		</div>
	);
}
