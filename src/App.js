import React, { useState } from 'react';
import styled from '@emotion/styled';
import './App.css';
import Cookies from "js-cookie";

const AppContainer = styled.div`
  background: url('${process.env.PUBLIC_URL}/images/bg.png') no-repeat center center fixed;
  background-size: contain;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Box = styled.img`
  width: 100%;
  max-width: 400px;
  animation: ${props => (props.shake ? 'shake 1.8s' : 'none')};
`;

const Button = styled.img`
  position: absolute;
  top: 0px;
  bottom: -60%;
  width: 80%;
  max-width: 300px;
  height: auto;
  cursor: pointer;
  margin: auto;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.97);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 1);
  z-index: 1000;
  border-radius: 50%;
  animation: expand 2.0s forwards;
  box-shadow: 0px 0px 70px 70px rgb(255 255 255);
`;

const ResultImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  position: absolute;
  z-index: -1;
  transform: translate(0, -100%);

  &.slidein {
    z-index: 1001;
    transition: transform 3.5s ease-in-out;
    transform: translate(0, 0%);
  }
`;

const results = [
  'daikiti',
  'kyo',
  'syokiti',
  'tyukiti',
];

function App() {
  const [result, setResult] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [shake, setShake] = useState(false);
  const [isSlidIn, setIsSlidIn] = useState(false);

  const getTodaysOmikuji = () => {
    const today = new Date().toISOString().split("T")[0];
    const savedOmikuji = Cookies.get("omikujiResult");
    const savedDate = Cookies.get("omikujiDate");

    if (savedOmikuji && savedDate === today) {
      return savedOmikuji;
    } else {
      const randomIndex = Math.floor(Math.random() * results.length);
      const newResult = results[randomIndex];
      Cookies.set("omikujiResult", newResult, { expires: 1 });
      Cookies.set("omikujiDate", today, { expires: 1 });
      return newResult;
    }
  };

  const handleButtonClick = () => {
    setShake(true);

    setTimeout(() => {
      setShake(false);
      const omikujiResult = getTodaysOmikuji();
      setResult(omikujiResult);
      setShowOverlay(true);
      setShowResult(true);

      setTimeout(() => {
        setIsSlidIn(true);
      }, 1000); 
    }, 1500); 
  };

  return (
    <AppContainer>
      <Box src={`${process.env.PUBLIC_URL}/images/box.png`} shake={shake} />
      <Button src={`${process.env.PUBLIC_URL}/images/button.png`} onClick={handleButtonClick} />
      {showOverlay && <Overlay />}
      {showResult && (
        <ResultImage
          src={`${process.env.PUBLIC_URL}/images/result_${result}.png`}
          alt="おみくじの結果"
          className={isSlidIn ? 'slidein' : ''}
        />
      )}
    </AppContainer>
  );
}

export default App;
