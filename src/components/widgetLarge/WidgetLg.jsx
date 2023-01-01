/** @format */

import "./widgetLg.css";

import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PropTypes from "prop-types";
import React from "react";

export default function WidgetLg() {
	let today = new Date();
	// const [date, setDate] = useState(today);
	let options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	let day = today.toLocaleDateString("en-US", options);
 
	const Button = ({ type }) => {
		return <button className={"widgetLgButton " + type}>{type}</button>;
	};
	
	return (
		<div className="widgetLg">
			<div>
				<h3 className="widgetLgTitle">
					<GroupsRoundedIcon sx={{ color: "black", margin: "3px" }} /> Team
				</h3>
				<p className="subtitle">Stocks Purchase History</p>
			</div>

			<hr />
			<table className="widgetLgTable">
				<tbody>
					<tr className="widgetLgTr">
						<th className="widgetLgTh">Purchased By:</th>
						<th className="widgetLgTh">Date</th>
						<th className="widgetLgTh">Amount</th>
						<th className="widgetLgTh">Status</th>
					</tr>
					<tr className="widgetLgTr">
						<td className="widgetLgUser">
							<img
								src="https://images.unsplash.com/photo-1522512115668-c09775d6f424?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
								alt=""
								className="widgetLgImg p-0 mb-2 bg-white"
							/>
							<span className="widgetLgName">Aissata Mina</span>
						</td>
						<td className="widgetLgDate">{day}</td>
						<td className="widgetLgAmount">$60,278</td>
						<td className="widgetLgStatus">
							<Button type="Approved" />
						</td>
					</tr>
					<tr className="widgetLgTr">
						<td className="widgetLgUser">
							<img
								src="https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
								alt="advisors"
								className="widgetLgImg p-0 mb-2 bg-white"
							/>
							<span className="widgetLgName">Menefer Bah</span>
						</td>
						<td className="widgetLgDate">{day}</td>
						<td className="widgetLgAmount">$12,222</td>
						<td className="widgetLgStatus">
							<Button type="Declined" />
						</td>
					</tr>
					<tr className="widgetLgTr">
						<td className="widgetLgUser">
							<img
								src="https://images.unsplash.com/photo-1613876215075-276fd62c89a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
								alt=""
								className="widgetLgImg shadow p-0 mb-2 bg-white"
							/>

							{/* <img
								src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
								alt=""
								className="widgetLgImg"
							/> */}
							<span className="widgetLgName">Nefi Kare</span>
						</td>
						<td className="widgetLgDate">{day}</td>
						<td className="widgetLgAmount">$32,334</td>
						<td className="widgetLgStatus ">
							<Button type="Pending" />
						</td>
					</tr>
					<tr className="widgetLgTr">
						<td className="widgetLgUser">
							<img
								src="https://images.unsplash.com/photo-1531475925016-6d33cb7c8344?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
								alt=""
								className="widgetLgImg p-0 mb-2 bg-white "
							/>
							<span className="widgetLgName">Jahudi Ka</span>
						</td>
						<td className="widgetLgDate">{day}</td>
						<td className="widgetLgAmount">$15,102</td>
						<td className="widgetLgStatus">
							<Button type="Approved" />
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
WidgetLg.propTypes = {
	type: PropTypes.string,
};
