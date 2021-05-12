import React, { useState } from 'react';
import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { Axis, Orient } from 'd3-axis-for-react';
import { useFetch } from '../hooks/useFetch';
import { Writeup } from './Writeup'
const countryFinder = require("country-finder"); // for getting latitude given country name

export const Visualization = () => {
  const dimensions = { width: 600, height: 500, margin: 50 }
  const [data, loading] = useFetch("https://raw.githubusercontent.com/rishikavikondala/internet-analysis/main/internet.csv");
  const [showTooltip, setShowTooltip] = useState(false); // define state for our tooltip display status
  const [tooltipPos, setTooltipPos] = useState({x: 0, y: 0}); // define state for tooltip position
  const [tooltipContent, setTooltipContent] = useState(""); // define state for our tooltip content
  const [colorScheme, setColorScheme] = useState("Color");
  const [displayContinents, setDisplayContinents] = useState([])

  const determineColorMap = () => {
    if(colorScheme == "Color") {
      return {
        "North America": "red", "South America": "blue", "Asia": "green",
        "Africa": "orange", "Australia": "yellow", "Europe": "purple"
      }
    }
    return {
      "North America": "black", "South America": "gray", "Asia": "darkgray",
      "Africa": "silver", "Australia": "lightgray", "Europe": "gainsboro"
    }
  }

  const getLatitude = (country) => {
    try {
      const nameMap = {
        "Bosnia and Herzegovina": "Bosnia", "Cape Verde": "Cabo Verde",
        "Democratic Republic of the Congo": "DRC", "Republic of the Congo": "Congo",
        "Ivory Coast": "Côte d\"Ivoire", "South Korea": "S. Korea",
        "Laos": "Lao People\"s Democratic Republic", "Libya": "Libyan Arab Jamahiriya",
        "Federated States of Micronesia": "Micronesia", "Slovak Republic": "Slovakia",
        "Syria": "Syrian Arab Republic", "United Arab Emirates": "UAE",
        "United Kingdom": "UK", "United States": "USA", "Czech Republic": "Czechia"
      }
      if(country in nameMap) {
        let newCountry = nameMap[country];
        return countryFinder.byName(newCountry)['lat']
      }
      return countryFinder.byName(country)['lat'];
    } catch {
      console.log(country);
    }
  }

  if (loading) {
    return <h2>Loading ...</h2>
  } else {
    const urbanRateExtent = extent(data, point => +point.urbanrate);
    const xScale = scaleLinear().domain(urbanRateExtent).range([dimensions.margin, dimensions.width - dimensions.margin]);
    
    const internetUseRateExtent = extent(data, point => +point.internetuserate);
    const yScale = scaleLinear().domain(internetUseRateExtent).range([dimensions.height - dimensions.margin, dimensions.margin]);

    const circles = data.map((point) => {
      const radius = 4;
      const x = xScale(+point.urbanrate);
      const y = yScale(+point.internetuserate);
      return <circle
        style={{fill: determineColorMap()[point.continent]}}
        onMouseEnter={(event) => onPointHover(event)}
        onMouseLeave={() => onPointLeave()} 
        cx={x} cy={y} r={radius} // determine circle center's position
        urbanrate={point.urbanrate} internetuserate={point.internetuserate} 
        country={point.country} continent={point.continent} latitude={parseFloat(getLatitude(point.country))}
      />
    });

    const tooltip = (
      <div style={{
        width: "18rem", height: "5rem", position: "absolute",
        display: `${showTooltip ? "inline" : "none"}`,
        border: '1px solid black', backgroundColor: "white",
        left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px`
      }}>
        <span><strong>Country:</strong> {tooltipContent.country}</span>
        <br />
        <span><strong>Urban Rate:</strong> {tooltipContent.x}</span>
        <br />
        <span><strong>Internet Use Rate:</strong> {tooltipContent.y}</span>
      </div>
    )

    const onPointHover = (circle) => {
      setTooltipPos({ x: circle.pageX + 30, y: circle.pageY });
      setShowTooltip(true);
      const target = circle.target
      setTooltipContent({
        x: target.getAttribute("urbanrate"), 
        y: target.getAttribute("internetuserate"), 
        country: target.getAttribute("country")
      });
    }

    const onPointLeave = () => { setShowTooltip(false); }

    const modifyContinentDisplay = (continent) => {
      let newDisplayContinents = displayContinents;
      if(newDisplayContinents.includes(continent)) { // remove continent if it exists
        newDisplayContinents = newDisplayContinents.filter((element) => { return element !== continent; });
      } else {
        newDisplayContinents.push(continent); // add continent if it doesn't exist
      }
    }

    return (
      <div style={{marginLeft: "auto", marginRight: "auto"}}> 
        <h1 style={{textAlign: "center"}}>Internet Use Rate vs. Urban Rate</h1>
        {/* TODO: center this selector */}
        <label for="scheme">Select color option:</label><br />
        <select id="scheme" onChange={() => setColorScheme(scheme.value)}> 
          <option value="Color">Color</option>
          <option value="Grayscale">Grayscale</option>
        </select>
        <br /><br />
        <h3>Select which continents to view:</h3>
        <input type="checkbox" id="northamerica" name="northamerica" onChange={modifyContinentDisplay("North America")} />
        <label for="northamerica">North America</label><br />
        <input type="checkbox" id="southamerica" name="southamerica" onChange={modifyContinentDisplay("South America")} />
        <label for="southamerica">South America</label><br />
        <input type="checkbox" id="asia" name="asia" onChange={modifyContinentDisplay("Asia")}/>
        <label for="asia">Asia</label><br />
        <input type="checkbox" id="africa" name="africa" onChange={modifyContinentDisplay("Africa")} />
        <label for="africa">Africa</label><br />
        <input type="checkbox" id="australia" name="australia" onChange={modifyContinentDisplay("Australia")} />
        <label for="australia">Australia</label><br />
        <input type="checkbox" id="europe" name="europe" onChange={modifyContinentDisplay("Europe")} />
        <label for="europe">Europe</label><br />
        {tooltip}
        <svg style={{display: "block", margin: "auto"}} width={dimensions.width} height={dimensions.height}>
          <text className="title" style={{textAnchor: "middle"}} x={dimensions.width/2} y={dimensions.margin - 20}>
            How does having a higher urban rate in a country affect the rate of internet use?
          </text>
          <text style={{textAnchor: "middle"}} className="x-label" x={dimensions.width/2} y={dimensions.height - dimensions.margin + 35}>
            Urban Rate
          </text>
          <text className="y-label" transform={`translate(${dimensions.margin - 30}, ${dimensions.height/2})rotate(-90)`} >
            Internet Use Rate
          </text>

          {circles}

          <g transform={`translate(${dimensions.margin}, 0)`} className="axisLeft">
            <Axis orient={Orient.left} scale={yScale} />
          </g>
          <g transform={`translate(0, ${dimensions.height - dimensions.margin})`} className="axisBottom">
            <Axis orient={Orient.bottom} scale={xScale} />
          </g>
        </svg>
        <Writeup />
      </div>
    )
  }
}