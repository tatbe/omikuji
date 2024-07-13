import React, { useState } from 'react';
import styled from '@emotion/styled';
import './App.css';

const results = [
  'result_daikiti.png',
  'result_kyo.png',
  'result_syokiti.png',
  'result_tyukiti.png',
];

const AppContainer = styled.div`
  background: url('/images/bg.png') no-repeat center center fixed;
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
  width: 100%;
  max-width: 400px;
  height: auto;
  cursor: pointer;
`;

// オーバーレイを中央から広がるようにアニメーションさせる
const Overlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 1);
  z-index: 1000;
  border-radius: 50%; // 中央から円形に広がるようにする
  animation: expand 2.0s forwards; // 1秒かけて広がるアニメーション
  box-shadow: 0px 0px 40px 40px rgb(255 255 255);
`;

const ResultImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  position: absolute;
  z-index: 1001;
  animation: slidein 3.5s;
`;

function App() {
  const [result, setResult] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [shake, setShake] = useState(false);

  const handleButtonClick = () => {
    setShake(true);

    // 震えるアニメーションの後に実行
    setTimeout(() => {
      setShake(false);
      const randomIndex = Math.floor(Math.random() * results.length);
      setResult(results[randomIndex]);
      setShowOverlay(true);

      // おみくじ表示
      setTimeout(() => {
        setShowResult(true);
      }, 2300); 
    }, 1500); 
  };

  return (
    <AppContainer>
      <Box src="/images/box.png" shake={shake} />
      <Button src="/images/button.png" onClick={handleButtonClick} />
      {showOverlay && (
        <>
          <Overlay />
        </>
      )}
      {showResult && (
        <>
          <ResultImage src={`/images/${result}`} alt="おみくじの結果" />
        </>
      )}
    </AppContainer>
  );
}

export default App;
