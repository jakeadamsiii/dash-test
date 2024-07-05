import React from "react";
import styled from "styled-components";

const StyledContainer = styled.section`
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  position: relative;
  padding: 0 1.5rem;
  max-width: 67.5rem; /*1080px*/
`;

const Container = ({ children }) => {

    return (
      <StyledContainer>
        {children}
      </StyledContainer>
    );
};

export default Container;