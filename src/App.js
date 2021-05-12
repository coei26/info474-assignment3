import React, { useState } from "react";
import { Visualization } from './components/Visualization'
import { Writeup } from './components/Writeup'
// import { useFetch } from "./hooks/useFetch";
// import { extent, filter } from 'd3-array';
// import { scaleLinear, scaleBand } from 'd3-scale';

const App = () => {
  return (
    <div>
      <Visualization />
    </div>
  )
}

export default App;