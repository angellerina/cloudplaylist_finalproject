import React, { useState } from "react";

import styled from "styled-components";

// Material UI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const Categories = ({
  setCurrentTracks,
  defaultTracks,
  happyMood,
  mellowMood,
  intenseMood,
  sleepyMood,
  emoMood,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Mood Handlers
  const handleHappy = (e) => {
    e.preventDefault();
    setCurrentTracks(happyMood());
  };

  const handleMellow = (e) => {
    e.preventDefault();
    setCurrentTracks(mellowMood());
  };

  const handleIntense = (e) => {
    e.preventDefault();
    setCurrentTracks(intenseMood());
  };

  const handleSleepy = (e) => {
    e.preventDefault();
    setCurrentTracks(sleepyMood());
  };

  const handleEmo = (e) => {
    e.preventDefault();
    setCurrentTracks(emoMood());
  };

  return (
    <>
      <Container>
        <h3>Pick a Mood: </h3>
        <Box
          sx={{ maxWidth: { xs: 220, sm: 275 }, bgcolor: "background.paper" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab onClick={defaultTracks} label="Default" />
            <Tab onClick={handleHappy} label="Happy" />
            <Tab onClick={handleMellow} label="Mellow" />
            <Tab onClick={handleIntense} label="Intense" />
            <Tab onClick={handleSleepy} label="Sleepy" />
            <Tab onClick={handleEmo} label="Emo" />
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

// happy - exited/lively => liveness + high danceability + high energy
// sad - gloomy /
// angry - rap / intensse => high speechiness
// romantic - shyness / relaxed  => acousticness + middle liveness + tempo mid

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    padding: 1rem;
    font-size: 1rem;
  }
`;

export default Categories;
