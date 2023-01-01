/** @format */

import "./sidebar.css";

import {
	ChatBubbleOutline,
	DynamicFeed,
	HomeWork,
	LineStyle,
	MailOutline,
	Report,
	Timeline,
	TrendingUp,
	WorkOutline,
} from "@material-ui/icons";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";

export default function Sidebar({ collapsed }) {

	return (
		<div className="">
			<div className={` ${!collapsed ? "hideBar" : " "}`}>
				<div className="sidebar pb-4 ">
					<div className="sidebarWrapper">
						<div className="sidebarMenu ">
							<p className="sidebarTitle">DASHBOARD</p>
							<hr />
							<ul className="sidebarList">
								<Link to="/" className="link">
									<li className="sidebarListItem text-dark">
										<LineStyle
											className="sidebarIcon"
											sx={{ color: "black" }}
										/>{" "}
										Home
									</li>
								</Link>

								{/* <li className="sidebarListItem">
									<Timeline className="sidebarIcon" /> Personal Analytics
								</li>
								<li className="sidebarListItem">
									<TrendingUp className="sidebarIcon" /> Stocks Analytics
								</li> */}
							</ul>
						</div>
						<div className="sidebarMenu">
							{/* <p className="sidebarTitle">PERSONAL</p>
							<hr /> */}
							<ul className="sidebarList">
								<Link to="/asset" className="link">
									<li className="sidebarListItem  text-dark">
										<HomeWork className="sidebarIcon" sx={{ color: "black" }} />{" "}
										Asset
									</li>
								</Link>
								{/* <Link to="#" className="link">
									<li className="sidebarListItem">
										<AccountBalanceWallet className="sidebarIcon" /> Liabilities
									</li>
								</Link>

								<li className="sidebarListItem">
									<AttachMoney className="sidebarIcon" /> Net Income
								</li>
								<li className="sidebarListItem">
									<BarChart className="sidebarIcon" />
									Reports
								</li> */}
							</ul>
						</div>

						<div className="sidebarMenu">
							{/* <p className="sidebarTitle">STOCKS</p>
							<hr /> */}
							<ul className="sidebarList">
								<Link to="/stocks" className="link">
									<li className="sidebarListItem text-dark">
										<TrendingUp
											className="sidebarIcon"
											sx={{ color: "black" }}
										/>{" "}
										Stocks
									</li>
								</Link>
								{/* <Link to="/products" className="link">
								<li className="sidebarListItem">
									<Storefront className="sidebarIcon" /> Products
								</li>
							</Link>

							<li className="sidebarListItem">
								<AttachMoney className="sidebarIcon" /> Transactions
							</li>
							<li className="sidebarListItem">
								<BarChart className="sidebarIcon" />
								Reports
							</li> */}
							</ul>
						</div>
						<div className="sidebarMenu">
							<p className="sidebarTitle">NOTIFICATIONS</p>
							<hr />
							<ul className="sidebarListDisabled">
								<li className="sidebarListItemDisabled text-secondary">
									<MailOutline className="sidebarIcon" /> Mail
								</li>
								<li className="sidebarListItemDisabled text-secondary">
									<DynamicFeed className="sidebarIcon" /> Feedback
								</li>
								<li className="sidebarListItemDisabled text-secondary">
									<ChatBubbleOutline className="sidebarIcon" /> Messages
								</li>
							</ul>
						</div>
						<div className="sidebarMenu">
							<p className="sidebarTitle">ACCOUNT</p>
							<hr />
							<ul className="sidebarList">
								<li className="sidebarListItemDisabled text-secondary">
									<WorkOutline className="sidebarIcon" />
									Manage
								</li>
								<li className="sidebarListItemDisabled text-secondary">
									<Timeline className="sidebarIcon" /> Analytics
								</li>
								<li className="sidebarListItemDisabled text-secondary">
									<Report className="sidebarIcon" /> Reports
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
Sidebar.propTypes = {
	collapsed: PropTypes.bool,
};
