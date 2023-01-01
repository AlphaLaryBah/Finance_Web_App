/** @format */

import "./app.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import Asset from "./pages/assetPage/Asset";
import Home from "./pages/home/Home";
import React from "react";
import { ScreenSizeChangeContext } from "./Context/ScreenSizeChangeContext";
import Sidebar from "./components/sidebar/Sidebar";
import Stocks from "./pages/stockPage/Stocks";
import Topbar from "./components/topbar/Topbar";

function App() {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [size, setSize] = useState([0, 0]);
	const searchOptionsRef = useRef();

	const toggleSidebar = useCallback((isOpen) => {
		if (!isOpen) {
			setSidebarCollapsed(false);
		} else {
			setSidebarCollapsed(true);
		} 
	}, []);
	const updateSize = () => {
		if (size >= 800) {
			// console.log("over");
			setSidebarCollapsed(true);
		} else {
			// console.log("under");

			setSidebarCollapsed(null);
		}
	};
	useEffect(() => (window.onresize = updateSize), []);
	useEffect(() => {
		setSize(window.innerWidth < 800);
	}, []);

	useEffect(() => {
		document.querySelector(".clickToHideSideBar");
		document.addEventListener("mousedown", async (event) => {
			const isRefActive = searchOptionsRef.current;
			const clickedOutside = searchOptionsRef.current.contains(event.target);

			if (isRefActive && clickedOutside) {
				setSidebarCollapsed(false);
				// console.log("clicked outside ");
			} else if (!isRefActive && !clickedOutside) {
				setSidebarCollapsed(true);
			}
		});
		setSidebarCollapsed(false);
	}, []);

	return (
		<Router>
			<ScreenSizeChangeContext.Provider value={{ size, setSize }}>
				<div className="containerForHome">
					<Sidebar collapsed={sidebarCollapsed} />
					<div className={sidebarCollapsed ? "main" : "main2"}>
						<Topbar toggleSidebar={toggleSidebar} />
						<div className="clickToHideSideBar" ref={searchOptionsRef}>
							<Routes>
								<Route exact path="/" element={<Home />} />
								<Route path="/stocks" element={<Stocks />} />
								<Route path="/asset" element={<Asset />} />
							</Routes>
						</div>
					</div>
				</div>
			</ScreenSizeChangeContext.Provider>
		</Router>
	);
}

export default App;
