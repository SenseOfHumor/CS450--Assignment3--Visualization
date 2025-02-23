import React, { Component } from "react";
import * as d3 from "d3";

class App extends Component {
  componentDidMount() {
    const data = this.props.data2;
    console.log(data);

    const margin = { top: 60, right: 50, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;


    // Groupping the average data

    // rollup(data, reduce, key) returns a new map from the data , the mean is the
    // reduce function and the key is what we wnat to group by
    var avg_tip_map = d3.rollup(data, v=> d3.mean(v, d=>d.tip), d=>d.day); // returns data grouped by day and the average tip for each day

    // Array.form(data, mapFunction) returns a new array
    // The map function is just taking the key, value pair and returning a json obj
    var avg_tip_array = Array.from(avg_tip_map, ([day, avg_tip]) => ({day, avg_tip}));
    console.log(avg_tip_array);

    // Creating scales, bandscale for x as it is categorical
    // linear scale for y as it is continous

    var X_scale = d3.scaleBand()
    .domain(data.map(d=>d.day)) // Setting the days of the week
    .range([margin.left, width])  // Use the full width
    .padding(0.2);  // Space between the bars

    var Y_scale = d3.scaleLinear()
    .domain([0, d3.max(avg_tip_array, d=>d.avg_tip)]) // Tips range from 0 to max tip
    .range([height, 0]); // Inverted y axis, height maps to 0 and 0 maps to height

    console.log(X_scale.domain());
    console.log(X_scale.bandwidth());
    console.log(Y_scale.domain());
    console.log(Y_scale.range());

    const svg = d3.select(".mysvg")

    const chartGroup = svg.append("g")
    .attr("transform", `translate(0, ${margin.top})`);

    // X-Axis inside chartGroup
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)  // Move x axis to the bottom
    .call(d3.axisBottom(X_scale));  // Call the x axis with days of the week

    // Y-Axis inside chartGroup
    chartGroup.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)  // Move y axis to the left
    .call(d3.axisLeft(Y_scale));  // Call the y axis with average tips

    // Actual bars
    
    const bars = chartGroup.selectAll("rect")
    .data(avg_tip_array)    // Bind data
    .join("rect")   // Join data to elements
    .attr("x", d=>X_scale(d.day))  // x position of the bar
    .attr("y", d=>Y_scale(d.avg_tip))  // y position of the bar
    .attr("width", X_scale.bandwidth())  // width of the bar
    .attr("height", d=> height - Y_scale(d.avg_tip)) // Learned in class
    .attr("fill", "teal");

    // To append the x and y labels
    svg.append("text")
    .attr("x", width/2)
    .attr("y", height+90)
    .attr("font-weight", "bold")
    .text("Day");

    svg.append("text")
    .attr("transform", "rotate(-90)")

    // X axis is now the Y axis due to rotating
    .attr("x", -height/1.1)
    .attr("y", 15)
    .text("Average Tip")
    .attr("font-weight", "bold");

    // Main title
    svg.append("text")
    .attr("x", width / 2.5)  // Center it horizontally
    .attr("y", margin.top / 2)  // Position above the chart
    .attr("font-weight", "bold")  // Make it bold
    .text("Average Tip by Day");

}

componentDidUpdate(){
    const data = this.props.data2;
    console.log(data);

    const margin = { top: 60, right: 50, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;


    // Groupping the average data

    // rollup(data, reduce, key) returns a new map from the data , the mean is the
    // reduce function and the key is what we wnat to group by
    var avg_tip_map = d3.rollup(data, v=> d3.mean(v, d=>d.tip), d=>d.day); // returns data grouped by day and the average tip for each day

    // Array.form(data, mapFunction) returns a new array
    // The map function is just taking the key, value pair and returning a json obj
    var avg_tip_array = Array.from(avg_tip_map, ([day, avg_tip]) => ({day, avg_tip}));
    console.log(avg_tip_array);

    // Creating scales, bandscale for x as it is categorical
    // linear scale for y as it is continous

    var X_scale = d3.scaleBand()
    .domain(data.map(d=>d.day)) // Setting the days of the week
    .range([margin.left, width])  // Use the full width
    .padding(0.2);  // Space between the bars

    var Y_scale = d3.scaleLinear()
    .domain([0, d3.max(avg_tip_array, d=>d.avg_tip)]) // Tips range from 0 to max tip
    .range([height, 0]); // Inverted y axis, height maps to 0 and 0 maps to height

    console.log(X_scale.domain());
    console.log(X_scale.bandwidth());
    console.log(Y_scale.domain());
    console.log(Y_scale.range());

    const svg = d3.select(".mysvg")

    const chartGroup = svg.append("g")
    .attr("transform", `translate(0, ${margin.top})`);

    // X-Axis inside chartGroup
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)  // Move x axis to the bottom
    .call(d3.axisBottom(X_scale));  // Call the x axis with days of the week

    // Y-Axis inside chartGroup
    chartGroup.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)  // Move y axis to the left
    .call(d3.axisLeft(Y_scale));  // Call the y axis with average tips

    // Actual bars
    
    const bars = chartGroup.selectAll("rect")
    .data(avg_tip_array)    // Bind data
    .join("rect")   // Join data to elements
    .attr("x", d=>X_scale(d.day))  // x position of the bar
    .attr("y", d=>Y_scale(d.avg_tip))  // y position of the bar
    .attr("width", X_scale.bandwidth())  // width of the bar
    .attr("height", d=> height - Y_scale(d.avg_tip)) // Learned in class
    .attr("fill", "teal");

    // To append the x and y labels
    svg.append("text")
    .attr("x", width/2)
    .attr("y", height+90)
    .attr("font-weight", "bold")
    .text("Day");

    svg.append("text")
    .attr("transform", "rotate(-90)")

    // X axis is now the Y axis due to rotating
    .attr("x", -height/1.1)
    .attr("y", 15)
    .text("Average Tip")
    .attr("font-weight", "bold")  // Make it bold

    // Main title
    svg.append("text")
    .attr("x", width / 2.5)  // Center it horizontally
    .attr("y", margin.top / 2)  // Position above the chart
    .attr("font-weight", "bold")  // Make it bold
    .text("Average Tip by Day");
}

  render() {
    return (
        <svg className="mysvg" width="600" height="400">
          
        </svg>
    );
  }
}

export default App;