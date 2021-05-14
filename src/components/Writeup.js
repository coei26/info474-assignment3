import React from 'react';

export const Writeup = () => {
  return (
    <div>
      <h2 className="pb-3">Write-up</h2>
      <h4>Design Decisions Rationale</h4>
      <ol>
        <li>Color</li>
        <li>Continents</li>
        <li>Hovering for Information</li>
        <li>Urban Rate Range</li>
        <li>Internet Use Rate Range</li>
      </ol>
      <p>
        In terms of <b>visual encodings</b>, we specifically chose to provide an option for color and grayscale viewing for
        accessibility reasons. While visually encoding for color is generally preferable for those without visual impairments,
        it makes the visualization useless to those with visual impairments, such as those who are colorblind. Therefore, offering
        grayscale encoding as an option makes this data exploration more accessible and inclusive. Additionally, we wanted to conduct
        a geographical investigation of the data (i.e., where countries are physically located on the globe), so we grouped countries
        by their respective continents, and colored/shaded them accordingly. Doing so made it easier to observe any disparities in
        internet use rates within a specific geographical area. In terms of <b>interaction techniques</b>, we chose to include a hover
        tooltip for each point on the scatterplot. This allowed us to present more detailed information in a clean and polished manner without
        overloading the user with too much information at once. We also included two range sliders--one for filtering the urban rates displayed
        on the plot, and the other for filtering the internet use rates displayed on the plot. These sliders would be helpful for users interested
        in specific urban rate/internet use rate thresholds and allow them to conduct a more efficient and thorough exploration of the dataset.
        Another interaction we included were checkboxes for the seven different continents. This made it very easy for the user to view
        relevant data points of interest, while also successfully providing a geographic exploration and comparison of internet use rates vs.
        urban rates around the world.
        An <b>alternative</b> we did consider was filtering points for specific latitudes and longitudes using text boxes. This seemed quite simple to implement,
        but after taking a step back and considering the likelihood of a user needing the information that specific interaction would provide, we chose to
        include the filter ranges instead. Additionally, since we already included checkboxes for continents, we believed that users could acquire
        the same information from the checkboxes that they would with latitude/longitude. 
      </p>
      <h4>Development Process Overview</h4>
      <p>
        Overall, our visualization underwent multiple iterations. We originally began with a bar graph as our primary visualization,
        but soon switched to a scatterplot because it was able to more representatively capture and display the diversity of
        our dataset as a whole. We mainly split up tasks by different means of interactions, but also by different aspects the assignment entailed.
        Since we worked as a pair, the <b>development process</b> was quite smooth, as there were less moving parts, and we did not encounter any merge
        conflicts due to our coordination of tasks and regular communication. We initially began with pre-processing the data (EDA), followed by
        the framing of our research question. Next, we experimented on our own and reconvened to decide on the type of plot we wanted to
        employ for our visualization, and discussed the types of interactions that would be most effective for exploring the plot and addressing our
        question. Finally, we went about our individual tasks of creating the plot and implementing the respective interactive pieces. In total,
        about 12 hours were spent developing the application, split evenly among our team. The most time consuming aspects of this assignment
        were implementing the different interactive elements. This was time consuming due to us being out of practice with React, our unfamiliarity
        with d3 and combining d3 with React, as well as the debugging process.
      </p>
      <br></br>
    </div>
  )
}