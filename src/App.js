import React, { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { extent } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale'; 


const App = () => {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/coei26/info474-assignment3/main/internet_data.csv"
    );

    // interactive
    const [selectedCountry, setSelectedCountry] = useState();

    // dimensions of svg
    const width = 900;
    const height = 600;
    const margin = 50;
     
    // display text when data is loading
    if (loading) {
        return <p>data is loading...</p>
    } else {

        const sample = (['United States', 'Australia', 'Canada', 'United Kingdom']).map(d => {
            const row = data.find(v => v['country'] === d);
            console.log(row);
            return {
                country: row.country,
                income: row.incomeperperson
            }
        });
        console.log(sample);
        
        // setting up scale
        const totalExtent = extent(sample, d => d.income)
        // ---- y axis
        const max = totalExtent[1];
        const min = totalExtent[0] - 30;
        const yScale = scaleLinear()
            .domain([min, max])
            .range([height - margin, margin]);
        // ---- x axis
        const countries = sample.map(d => d.country);
        const xScale = scaleBand()
            .domain(countries)
            .range([margin, width - margin])
            .paddingInner(0.1);
        // creating bars
        const bars = sample.map((d) => {
            const label = d.income === selectedCountry
            const x = xScale(d.country);
            const y = yScale(d.income);
            const height = yScale(min) - yScale(d.income);
            const width = xScale.bandwidth();
            return (
                <rect
                    x={x}
                    y={y}
                    height={height + 20}
                    width={width}
                    onMouseEnter={() => setSelectedCountry(d.income)}
                    style={{fill: label ? "red" : "black"}}
                />
            )
        });
        // adding labels
        const countryLabels = sample.map((d) => {
            const x = xScale(d.country);
            const y = height - margin + 45
            return <text x={x} y={y}>{d.country}</text>
        });
        return(
            <div>
                <div className="container">
                    <h3>Bar Chart - income per person vs. countries</h3>
                    <svg width={width} height={height}>
                        {bars}
                        {countryLabels}
                    </svg>         
                </div>
            </div>
        )
    }
}

const getColumn = (data, name) => {
    let values = [];
    for (let i = 0; i < data.length; i++) {
        values.push(data[i][name]);
    }
    return values
}

export default App;