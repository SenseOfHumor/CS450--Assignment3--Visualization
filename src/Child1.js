import React, { Component } from 'react';
import * as d3 from "d3";

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    console.log(this.props.data1);
    

    // For scatter plot
    const margin = { top: 60, right: 50, bottom: 50, left: 50 };
    const width = 600;
    const height = 400;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const data = this.props.data1;

    const svg = d3.select(".child1_svg").attr("width", width).attr("height", height);

    const innerChart = svg.select(".scatter_plot").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.total_bill)]).range([0, innerWidth]);
 
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.tip)]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    innerChart.selectAll(".x-axis").data([null]) // Just a placeholder for the axis, as we're not using dynamic data for it.
      .join("g").attr('class','x-axis') //we have to assign the class we use for selection
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    innerChart.selectAll(".y-axis").data([null]) // Similarly, just a placeholder for the axis.
      .join("g").attr('class','y-axis') //we have to assign the class we use for selection
      .call(yAxis);

    innerChart.selectAll("circle").data(data).join("circle").attr("r", 5).attr("fill", "teal")
      .attr("cx", d => xScale(d.total_bill)).attr("cy", d => yScale(d.tip))

    // d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
    // d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");

   // To append the x and y labels
    svg.append("text")
    .attr("x", innerWidth/2)
    .attr("y", height)
    .attr("font-weight", "bold")
    .text("Total Bill");

    svg.append("text")
    .attr("transform", "rotate(-90)")

    // X axis is now the Y axis due to rotating
    .attr("x", -height/2)
    .attr("y", 20)
    .attr("font-weight", "bold")    
    .text("Tip")

    // Main title
    svg.append("text")
    .attr("x", width / 2.8)  // Center it horizontally (visually at least)
    .attr("y", margin.top / 2)  // Position above the chart
    .attr("font-weight", "bold")  // Make it bold
    .text("Average Tip by Day");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate", this.props.data1);

        // We need this because if we refresh the page, everything goes away, but having the
        // same code inside componentdidupdate will make sure that the data is updated, since we 
        // are working with dynamic data from csv.
        // A good approach for me would have been converthing the scatter plot into a function and
        // calling it in both componentDidMount and componentDidUpdate.

        // Re-rendering the scatter plot
        const margin = { top: 60, right: 50, bottom: 50, left: 50 };
        const width = 600;
        const height = 400;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
    
        const data = this.props.data1;
    
        const svg = d3.select(".child1_svg").attr("width", width).attr("height", height);
    
        const innerChart = svg.select(".scatter_plot").attr("transform", `translate(${margin.left}, ${margin.top})`);
    
        const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.total_bill)]).range([0, innerWidth]);
     
        const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.tip)]).range([innerHeight, 0]);
    
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
    
        innerChart.selectAll(".x-axis").data([null]) // Just a placeholder for the axis, as we're not using dynamic data for it.
          .join("g").attr('class','x-axis') //we have to assign the class we use for selection
          .attr("transform", `translate(0, ${innerHeight})`)
          .call(xAxis);
    
        innerChart.selectAll(".y-axis").data([null]) // Similarly, just a placeholder for the axis.
          .join("g").attr('class','y-axis') //we have to assign the class we use for selection
          .call(yAxis);
    
        innerChart.selectAll("circle").data(data).join("circle").attr("r", 5).attr("fill", "teal")
          .attr("cx", d => xScale(d.total_bill)).attr("cy", d => yScale(d.tip))
    
        // d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
        // d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
    
       // To append the x and y labels
        svg.append("text")
        .attr("x", innerWidth/2)
        .attr("y", height)
        .attr("font-weight", "bold")
        .text("Total Bill");
    
        svg.append("text")
        .attr("transform", "rotate(-90)")
    
        // X axis is now the Y axis due to rotating
        .attr("x", -height/2)
        .attr("y", 20)
        .attr("font-weight", "bold")
        .text("Tip")

        // Main title
        svg.append("text")
        .attr("x", width / 2.8)  // Center it horizontally
        .attr("y", margin.top / 2)  // Position above the chart
        .attr("font-weight", "bold")  // Make it bold
        .text("Average Tip by Day");
    }

  render() {
    return (
      <svg className="child1_svg">
        <g className="scatter_plot"></g>
      </svg>
    );
  }
}

export default Child1;