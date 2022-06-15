// Top pic
import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingContainer>
      <Title>LOADING...</Title>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    height: fit-content;
  }
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export default Loading;
