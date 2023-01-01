import "./topbar.css";

import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import logo from "../../img/cashRuleLogo.png";

export default function Topbar({ toggleSidebar }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => {
		setIsOpen(!isOpen);
		toggleSidebar(!isOpen);
	};

	return (
		<div className="topbar">
			<div className="topbarWrapper">
				<div className="topLeft">
					<Link to="#" className="menu-bars">
						<MenuIcon
							onClick={toggle}
							style={{ fontSize: "2.5em", color: "#0b2444" }}
							className=" hamburgerIcon"
						/>
					</Link>
					<img src={logo} alt="" className="logoCash" />
					Cash Rule
				</div>
				<div className="topRight">
					<div className="topbarIconContainer d-none d-sm-none d-md-none d-lg-block">
						<NotificationsNone />
						<span className="topIconBadge">2</span>
					</div>
					<div className="topbarIconContainer d-none d-sm-none d-md-none d-lg-block">
						<Language />
						<span className="topIconBadge">2</span>
					</div>
					<div className="topbarIconContainer d-none d-sm-none d-md-none d-lg-block">
						<Settings />
					</div>
					<img
						src="https://images.unsplash.com/photo-1587668814117-8a24bcfbb15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
						alt="topAvatar"
						className="topAvatar shadow p-1 mb-2 bg-white "
					/>
				</div>
			</div>
		</div>
	);
}
Topbar.propTypes = {
	toggleSidebar:PropTypes.func.isRequired, 
}