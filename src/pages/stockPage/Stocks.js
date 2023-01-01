/** @format */

import "./stock.css";

import React, { useState } from "react";

// import {ScreenSizeChangeContext} from "../../Context/ScreenSizeChangeContext"
import Alert from "react-bootstrap/Alert";
// import Button from "react-bootstrap/Button";
import FetchStock from "../../components/stockFinance/ApiCalls/FetchStock";

// {
// 	useContext;
// }

export default function Stocks() {
	// const { size, setSize } = useContext(ScreenSizeChangeContext);
	// console.log("Size",size)
	const [show, setShow] = useState(true);

	return (
		<div className="stocks container-fluid">
			<FetchStock />
			{show ? (
				<div className="alert">
					<Alert variant="success" onClose={() => setShow(false)} dismissible>
						<Alert.Heading>Hello!</Alert.Heading>
						<p>
							I am using the Alpha Vantage API. Currently we can only make{" "}
							<span className="text-danger"> ONE</span> to{" "}
							<span className="text-danger"> TWO</span> calls per minute.
						</p>
					</Alert>
				</div>
			) : null}
		</div>
	);
}
