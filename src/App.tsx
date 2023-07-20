import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Contexto, Provider } from './contexts/Contexto';

const AppContainer = styled.div<{ backgroundColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 80vw;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin: 5vh auto;
`;

const GrayBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: gray;
  z-index: -1;
`;

const ColorBoxContainer = styled.div`
  display: flex;
`;

const ColorBox = styled.div<{ backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  padding: 10px;
  margin: 0 10px;
  font-size: 20px;
  color: white;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const InputBox = styled.input`
  width: 100%;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const ColorInputBox = () => {
  const theme = useContext(ThemeContext);
  const colorContext = useContext(Contexto);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (colorContext) {
      if (theme === 'red') {
        colorContext.setRed(value);
      } else if (theme === 'green') {
        colorContext.setGreen(value);
      } else if (theme === 'blue') {
        colorContext.setBlue(value);
      }
    }
  };

  let colorValue = '';
  if (colorContext) {
    if (theme === 'red') {
      colorValue = String(colorContext.red);
    } else if (theme === 'green') {
      colorValue = String(colorContext.green);
    } else if (theme === 'blue') {
      colorValue = String(colorContext.blue);
    }
  }

  return (
    <ColorBox backgroundColor={`rgb(${colorValue}, ${colorValue}, ${colorValue})`}>
      <Label>{theme}:</Label>
      <InputBox type="number" value={colorValue} onChange={handleInputChange} />
    </ColorBox>
  );
};

const App = () => {
  return (
    <Provider>
      <Contexto.Consumer>
        {(colorContext) => (
          <>
            <GrayBackground />
            <AppContainer
              backgroundColor={`rgb(${colorContext?.red}, ${colorContext?.green}, ${colorContext?.blue})`}
            >
              <ColorBoxContainer>
                <ThemeContext.Provider value="red">
                  <ColorInputBox />
                </ThemeContext.Provider>
                <ThemeContext.Provider value="green">
                  <ColorInputBox />
                </ThemeContext.Provider>
                <ThemeContext.Provider value="blue">
                  <ColorInputBox />
                </ThemeContext.Provider>
              </ColorBoxContainer>
            </AppContainer>
          </>
        )}
      </Contexto.Consumer>
    </Provider>
  );
};

export default App;
