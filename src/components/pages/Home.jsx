import React from "react";
import { DataContextProvider } from "../../context/DataContext";
import { styled } from "styled-components";
import Slider from "../sliders/Slider";

function Home() {
  return (
    <DataContextProvider>
      <Background>
        <Wrap>
          <Slider />
        </Wrap>
      </Background>
    </DataContextProvider>
  );
}

const Background = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 60px;
  display: grid;
  place-items: center;
  background: #202020;

  @media (max-width: 1440px) {
    padding: 45px;
  }
  @media (max-width: 480px) {
    height: 100vh;
  }
`;

const Wrap = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1440px;
  display: grid;
  place-items: center;
  margin: auto;
`;

export default Home;
