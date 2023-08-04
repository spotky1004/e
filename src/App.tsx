import React from "react";
import store, { RootState } from "store"; 
import { connect } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import { resetResource, setResource } from "reducers/resource";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    white-space: nowrap;

    user-select: none;
  }

  body {
    width: 100vw;
    height: 100vh;
  }
`;

const TestDisplay = styled.div`
  font-size: 2em;
`;

const TestButton = styled.button`
  color: #222;
`;

interface Props {
  rawPoint: string;
}

function App({ rawPoint }: Props) {
  const point = D(rawPoint);

  return (
    <div className="App">
      <GlobalStyle />
      <TestDisplay>
        You have {point.toString()} points
      </TestDisplay>
      <TestButton onClick={() => {
        store.dispatch(setResource("Point", point.pow(Math.E).add(Math.E).toString()));
      }}>
        Power your point by e and add by e
      </TestButton>
      <TestButton onClick={() => {
        store.dispatch(resetResource("Point", 0));
      }}>
        Reset your point
      </TestButton>
    </div>
  );
}

export default connect(
  (state: RootState): Props => ({
    rawPoint: state.resource.point.amount
  }),
  {}
)(App);
