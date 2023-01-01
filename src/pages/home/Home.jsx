/** @format */

import "./home.css";

import CurrencyFormat from "react-currency-format";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import HomeChart from "../../components/chart/HomeChart";
import React from "react";
import WidgetLg from "../../components/widgetLarge/WidgetLg";
import WidgetSm from "../../components/widgetSmall/WidgetSm";
import { userData } from "../../TempData/data.js";

export default function Home() {
	const STATE_TAX_RATE = 4.4;
	const FEDS_TAX_RATE = 24;

	const createRandomMoney = () => {
		return (
			Math.ceil(Math.random() * 100000) * (Math.round(Math.random()) ? 1 : -1)
		);
	};
	const calcSubTotal = (original, current) => {
		if (current < 0) {
			current = current * -1;
			return original - current;
		}
		return original + current;
	};
	
	const calcStateTax = (subTotal) => {
		if (subTotal < 0) {
			subTotal = subTotal * -1;
		}
		return (STATE_TAX_RATE / 100) * subTotal;
	};
	const calcFedsTax = (subTotal) => {
		if (subTotal < 0) {
			subTotal = subTotal * -1;
		}
		return (FEDS_TAX_RATE / 100) * subTotal;
	};

	const assets = createRandomMoney();
	const liabilities = createRandomMoney();
	const netIncome = createRandomMoney();
	const emergencyFund = createRandomMoney();
	const mortgage = createRandomMoney();
	const stockMarket = createRandomMoney();

	const dataForMoney = {
		oldAssets: 20000,
		newAssets: assets,
		oldLiabilities: 20000,
		newLiabilities: liabilities,
		oldNetIncome: 80000,
		newNetIncome: netIncome,
		oldEmergencyFund: 50000,
		newEmergencyFund: emergencyFund,
		oldMortgage: 200000,
		newMortgage: mortgage,
		oldStockMarket: 25000,
		newStockMarket: stockMarket,
	};
	const totalAfterTax = (sumOfTax, subTotal, originalNumber, newNumber) => {
		let makeNewNumbPositive = 0;
		if (newNumber < 0) makeNewNumbPositive = newNumber * -1;
		if (newNumber < 0 && makeNewNumbPositive > originalNumber) {
			let net = 0;
			if (subTotal < sumOfTax) {
				net = sumOfTax - subTotal;
			} else {
				net = subTotal - sumOfTax;
			}
			return net * -1;
		} else {
			let net = 0;
			if (subTotal < sumOfTax) {
				net = sumOfTax - subTotal;
			} else {
				net = subTotal - sumOfTax;
			}
			return net;
		}
	};
	//ASSETS
	const assetsSubTotal = calcSubTotal(dataForMoney.oldAssets, assets);
	const assetStateTax = calcStateTax(assetsSubTotal);
	const assetFedsTax = calcFedsTax(assetsSubTotal);
	const assetNetAfterTax = assetStateTax + assetFedsTax - assetsSubTotal;
	const sumOfAllTax = assetStateTax + assetFedsTax;
	const net = totalAfterTax(
		sumOfAllTax,
		assetsSubTotal,
		dataForMoney.oldAssets,
		assets
	);
	//LIABILITIES
	const liabSubTotal = calcSubTotal(dataForMoney.oldLiabilities, liabilities);

	//EMERGENCY Fund
	const emrFundTotal = calcSubTotal(
		dataForMoney.oldEmergencyFund,
		emergencyFund
	);
	//NET Income
	const calcNetIncomeCurrent = (
		original,
		stocks,
		newIncm,
		liabilities
	) => {
		const totalIncome = original + stocks + newIncm;
		return totalIncome - liabilities;
	};
	const netIncomeCurrent = calcNetIncomeCurrent(
		dataForMoney.oldNetIncome,
		dataForMoney.oldStockMarket,
		dataForMoney.newNetIncome,
		liabSubTotal
	);
	const netIncomeSubTotal = dataForMoney.oldNetIncome - netIncomeCurrent;
	const netIncomStateTax = calcStateTax(netIncomeSubTotal);
	const netIncmFedsTax = calcFedsTax(netIncomeSubTotal);
	const netIncSumTax = netIncomStateTax + netIncmFedsTax;
		
	const netIcmAfterTax = totalAfterTax(
		netIncSumTax,
		netIncomeSubTotal,
		dataForMoney.oldNetIncome,
		netIncomeCurrent
	); 
	
	// MORGAGE
	const morgageSubTotal = calcSubTotal(dataForMoney.oldMortgage, mortgage)
	
	//STOCKS
		const stocksSubTotal = calcSubTotal(
			dataForMoney.oldStockMarket,
			stockMarket
		);
	const stockStateTax = calcStateTax(stocksSubTotal);
	const stockFedsTax = calcFedsTax(stocksSubTotal);
	const stockSumTax = stockStateTax + stockFedsTax;
	const stockAfterTax = totalAfterTax(
		stockSumTax,
		stocksSubTotal,
		dataForMoney.oldStockMarket,
		stockMarket
	); 

	// PERCENT CHANGE
	const calcPercentChange = (originalNumber, newNumber) => {
		if (newNumber < 0) newNumber = newNumber * -1;
		let percentChangevalue = 0;
		const increase = newNumber - originalNumber;
		const decrease = originalNumber - newNumber; 
		//percent Increase: if originalNumber is less than newNumber
		if (originalNumber < newNumber)
			percentChangevalue = Math.round((increase / originalNumber) * 100);
		//percent decrease: if originalNumber is more than newNumber
		if (originalNumber > newNumber)
			percentChangevalue = `${Math.round((decrease / originalNumber) * 100)}`;

		return percentChangevalue;
	};
	const assetPrcntChange = calcPercentChange(
		dataForMoney.oldAssets,
		assetNetAfterTax
	);
	const liabPercentChange = calcPercentChange(
		dataForMoney.oldLiabilities,
		liabSubTotal
	);
	const emrgncFundPercntChange = calcPercentChange(
		dataForMoney.oldEmergencyFund,
		emrFundTotal
	);
	const morgagePercntChange = calcPercentChange(
		dataForMoney.oldMortgage,
		morgageSubTotal
	);
	const stockPercntChange = calcPercentChange(
		dataForMoney.oldStockMarket,
		stocksSubTotal
	);
	
	//LOGout all html elements and their class
	// var docWidth = document.documentElement.offsetWidth;

	// [].forEach.call(document.querySelectorAll("*"), function (el) {
	// 	if (el.offsetWidth > docWidth) {
	// 		console.log(el);
	// 	}
	// });
	return (
		<div className="containerHome ">
			<div className="home ">
				<div className="row">
					<div
						className=" col-lg-2 col-md-6
					col-sm-12 mb-2"
					>
						<FeaturedInfo
							title="Assets"
							amount={
								<CurrencyFormat
									value={Math.round(net)}
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
							percent={`${assetPrcntChange}%`}
							compare="Compared to last quarter"
							popOverTitle="Assets"
							popOverNew={assets}
							popOverOld={dataForMoney.oldAssets}
							popOverSubTotal={assetsSubTotal}
							popOverFedsTax={assetFedsTax}
							popOverStateTax={assetStateTax}
							popOverNetAfterTax={net}
						/>
					</div>
					<div
						className="col-lg-2 col-md-6
					col-sm-12 mb-2"
					>
						<FeaturedInfo
							title="Liabilities"
							amount={
								<CurrencyFormat
									value={Math.round(liabSubTotal)}
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
							percent={`${liabPercentChange}%`}
							compare="Compared to last quarter"
							popOverTitle="Liabilities"
							popOverNew={liabilities}
							popOverOld={dataForMoney.oldLiabilities}
							popOverSubTotal={liabSubTotal}
							popOverNetAfterTax={liabSubTotal}
						/>
					</div>
					<div
						className="col-lg-2 col-md-6
					col-sm-12 mb-2"
					>
						<FeaturedInfo
							title="Net Income"
							amount={
								<CurrencyFormat
									value={Math.round(netIcmAfterTax)}
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
							percent={`${assetPrcntChange}%`}
							compare="Compared to last quarter"
							popOverTitle="Net Income"
							popOverNew={netIncomeCurrent}
							popOverOld={dataForMoney.oldNetIncome}
							popOverSubTotal={netIncomeSubTotal}
							popOverFedsTax={netIncmFedsTax}
							popOverStateTax={netIncomStateTax}
							popOverNetAfterTax={netIcmAfterTax}
						/>
					</div>
					<div
						className=" col-lg-2 col-md-6
					col-sm-12 mb-2"
					>
						<FeaturedInfo
							title="Emergency Fund"
							amount={
								<CurrencyFormat
									value={Math.round(emrFundTotal)}
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
							percent={`${emrgncFundPercntChange}%`}
							compare="Compared to last quarter"
							popOverTitle="Emergency Fund"
							popOverNew={emergencyFund}
							popOverOld={dataForMoney.oldEmergencyFund}
							popOverSubTotal={emrFundTotal}
							popOverNetAfterTax={emrFundTotal}
						/>
					</div>
					<div
						className=" col-lg-2 col-md-6
					col-sm-12 mb-2"
					>
						<FeaturedInfo
							title="Mortgage"
							amount={
								<CurrencyFormat
									value={Math.round(morgageSubTotal)}
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
							percent={`${morgagePercntChange}%`}
							compare="Compared to last quarter"
							popOverTitle="Mortgage"
							popOverNew={mortgage}
							popOverOld={dataForMoney.oldMortgage}
							popOverSubTotal={morgageSubTotal}
							popOverNetAfterTax={morgageSubTotal}
						/>
					</div>
					<div
						className=" col-lg-2 col-md-6
					col-sm-12 mb-2"
					>
						<FeaturedInfo
							title="Stock Market"
							amount={
								<CurrencyFormat
									value={Math.round(stockAfterTax)}
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
							percent={`${stockPercntChange}%`}
							compare="Compared to last quarter"
							popOverTitle="Stock market"
							popOverNew={stockMarket}
							popOverOld={dataForMoney.oldStockMarket}
							popOverSubTotal={stocksSubTotal}
							popOverFedsTax={stockFedsTax}
							popOverStateTax={stockStateTax}
							popOverNetAfterTax={stockAfterTax}
						/>
					</div>
				</div>
				<div className="chartAndCardContainer">
					<div
						className="leftChart  col-md-12
					col-sm-12"
					>
						<HomeChart data={userData} />
					</div>
					<div className="rightCard">
						<WidgetSm />
					</div>
				</div>
			</div>
			<div className="homeWidgetsLG row mb-2 d-flex justify-content-center ">
				<WidgetLg />
			</div>
		</div>
	);
}
