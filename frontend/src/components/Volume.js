import React from "react";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";

import styled from "styled-components";

const Volume = ({ audioRef }) => {
  return (
    <Container>
      <VolumeDownIcon fontSize="large" />
      <BarProgress ref={audioRef}>
        <BarProgressKnob></BarProgressKnob>
      </BarProgress>
    </Container>
  );
};

export const Container = styled.div`
  text-align: right;
  user-select: none;
  width: 50%;
  justify-self: end;
  margin-right: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 769px) {
    display: none;
  }
`;
export const BarProgress = styled.div`
  flex: 1;
  border-radius: 5px;
  margin: 0 20px;
  height: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  border: 1px solid rgb(245, 245, 245);
`;
export const BarProgressKnob = styled.span`
  position: relative;
  height: 15px;
  width: 15px;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 50%;
  background-color: rgb(240, 240, 240);
`;

export default Volume;
