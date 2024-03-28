import styled from "styled-components";
import React from "react";

const StyledParent = styled.div`
  display: flex;
  width: 100%;
  .left {
    max-width: 30%;
    flex: 1;
  }
  .right {
    flex: 1;
  }
`;

export const HomeLayout = ({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) => {
  return (
    <StyledParent>
      <div className="left">{left}</div>
      <div className="right">{right}</div>
    </StyledParent>
  );
};
