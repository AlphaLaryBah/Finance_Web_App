/** @format */
import "./chart.css";

import * as d3 from "d3";

import React, { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";

export default function HomeChart({ data }) {
	let size = false;
	if (window.innerWidth < 700) {
		size = true;
	} else {
		size = false;
	}

	const areaChart = useRef();

	const [dimensions, setDemensions] = useState({
		width: size ? 340 : window.innerWidth,
		height: window.innerHeight,
	});
	// Ref for resize event update
	const update = useRef(false);
	useEffect(() => {
		// Listen for any resize event update
		window.addEventListener("resize", () => {
			setDemensions({
				width: size ? 340 : window.innerWidth,
				height: window.innerHeight,
			});

			// If resize, remove the previous chart
			if (update.current) {
				const svg = d3.select(areaChart.current);
				svg.selectAll("*").remove(); // Clear svg content before adding new elements
			} else update.current = true;
		});

		// Draw chart using the data and updated dimensions
		DrawChart(dimensions);
	}, [dimensions]);

	function DrawChart() {
		const margin = {
			top: 50,
			right: size ? 0 : 30,
			bottom: 30,
			left: size ? 50 : 65,
		};
		const tooldiv = d3.select("#chartArea").append("div").style("opacity", 0);
		const chartwidth =
			parseInt(d3.select("#chartArea").style("width")) -
			margin.left -
			margin.right +
			(size ? 190 : 0);
		const chartheight =
			parseInt(d3.select("#chartArea").style("height")) +
			margin.top +
			margin.bottom;
		const svg = d3
			.select(areaChart.current)
			.attr("width", chartwidth + margin.left + margin.right)
			.attr("height", chartheight + margin.top + margin.bottom);

		function mouseMove() {
			d3.event.preventDefault();
			tooldiv.transition().duration(200).style("opacity", 0.9);
			const mouse = d3.mouse(d3.event.target);
			const [xCoord, yCoord] = mouse;
			const date = x.invert(xCoord);
			const dateSnap = d3.timeYear.floor(date);
			if (
				x(dateSnap) < margin.left ||
				x(dateSnap) > chartwidth - margin.right
			) {
				return;
			}
			const bisectDate = d3.bisector((d) => new Date(d.year)).right; // create a bisector

			const xIndex = bisectDate(data, dateSnap);
			const stockPrice = data[xIndex].count;

			svg
				.selectAll(".hoverLine")
				.attr("x1", x(dateSnap))
				.attr("y1", margin.top)
				.attr("x2", x(dateSnap))
				.attr("y2", chartheight - margin.bottom)
				.attr("stroke", "black")
				.attr("fill", "black")
				.style("stroke-dasharray", "3, 3")
				.transition()
				.duration(200)
				.style("opacity", 0.9);

			svg
				.selectAll(".hoverPoint")
				.attr("cx", x(dateSnap))
				.attr("cy", y(stockPrice))
				.attr("r", "7")
				.attr("fill", "#a50e0e")
				.transition()
				.duration(200)
				.style("opacity", 0.9);

			const dateForTooltTip = dateSnap.getFullYear();
			//placement of tooltip inside the svg
			let p = 0;
			if (yCoord < 400) {
				p = chartheight / 2;
			} else {
				p = chartheight * 2;
			}
			let xCor = 0;
			if (xCoord < 400) xCor = chartwidth / 2;

			if (xCoord < 200) xCor = xCor = chartwidth / (2 + 100);

			tooldiv
				.attr("x", x(dateSnap))
				.attr("y", y(stockPrice))
				.html(
					"Year: " +
						dateForTooltTip +
						"<br/>" +
						"Value: " +
						"" +
						d3.format("$")(stockPrice) +
						" B"
				)
				.attr("id", "tooltip")
				.style("left", `${size ? xCoord - xCor : xCoord}px`)
				.style("top", `${size ? yCoord - 50 : yCoord + p}px`);
		}
		function mouseOut() {
			tooldiv.transition().duration(500).style("opacity", 0);
			svg.selectAll(".hoverPoint").style("opacity", 0);
			svg.selectAll(".hoverLine").style("opacity", 0);
		}
		//    x scale
		const x = d3
			.scaleTime()
			.domain(d3.extent(data, (d) => d3.timeParse("%Y")(d.year)))
			.range([margin.left, chartwidth + margin.right]);

		svg
			.append("g")
			.call(d3.axisBottom(x))
			.attr("transform", "translate(0," + chartheight + ")");

		// y scale
		const y = d3
			.scaleLinear()
			.domain([d3.min(data, (d) => d.count), d3.max(data, (d) => d.count)])
			.range([chartheight, margin.top]);

		svg
			.append("g")
			.attr("transform", "translate(" + margin.left + ",0)")
			.call(d3.axisLeft(y).tickSize(0).tickFormat(d3.format("$")))
			// removes axis path line
			.call((g) => g.select(".domain").remove());

		// area: first define x value which is the same as x-axis
		const area = d3
			.area()
			.x((d) => x(d3.timeParse("%Y")(d.year)))
			// bottom of the area
			.y0(y(0))
			// y1= count value
			.y1((d) => y(d.count))
			// .curve(d3.curveCardinal);
			.curve(d3.curveMonotoneX);

		// ADD GRADIENT
		svg
			.append("linearGradient")
			.attr("id", "svgGradient")
			.attr("gradientUnits", "userSpaceOnUse")
			.attr("x1", "0%")
			.attr("y1", "0%")
			.attr("x2", "0%")
			.attr("y2", "100%")
			// x1 = 100% (red will be on right horz) / y1 = 100% (red will be on bottom vert)
			// x2 = 100% (red will be on left horz) / y2 = 100% (red will be on top vert)
			// mixed values will change the angle of the linear gradient. Adjust as needed.
			.selectAll("stop")
			.data([
				{ offset: "0%", color: "#a50e0e" },
				// add additional steps as needed for gradient.
				{ offset: "60%", color: "white" },
			])
			.enter()
			.append("stop")
			.attr("offset", function (d) {
				return d.offset;
			})
			.attr("stop-color", function (d) {
				return d.color;
			});
		size
			? null
			: svg
					.append("text")
					.text("-- Years --")
					.attr("x", 350)
					.attr("y", 510)
					.attr("transform", "translate(-50, -50)");
		size
			? null
			: svg
					.append("text")
					.text("-- Amounts --")
					.attr("x", -100)
					.attr("y", 20)
					.attr("transform", "rotate(-90 100 100)");

		// Add the area
		svg
			.append("path")
			.datum(data)
			.attr("d", area)
			.attr("fill", "url(#svgGradient)");

		// Add the line
		svg
			.append("path")
			.datum(data)
			.attr("fill", "transparent")
			.attr("stroke", "#a50e0e")
			.attr("stroke-width", 3)
			.attr(
				"d",
				d3
					.line()
					.x((d) => x(d3.timeParse("%Y")(d.year)))

					.y(function (d) {
						return y(d.count);
					})
					// this smooths out the curves of the line
					.curve(d3.curveCardinal)
			);

		// Interactivity

		svg.append("line").classed("hoverLine", true).style("opacity", 0);
		svg.append("circle").classed("hoverPoint", true).style("opacity", 0);

		svg.on("mousemove", mouseMove);
		svg.on("mouseout", mouseOut);
	}

	return (
		<div
			id={"chartArea"}
			style={{ width: `${size ? 50 : 60}vw`, height: `${size ? 60 : 50}vh` }}
		>
			<svg ref={areaChart}></svg>
		</div>
	);
}
HomeChart.propTypes = {
	data: PropTypes.array.isRequired,
};
