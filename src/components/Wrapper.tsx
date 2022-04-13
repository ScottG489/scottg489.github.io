import React from 'react';
import styled from '@emotion/styled';

interface WrapperProps {
  children: any;
  className?: string;
}

export function Wrapper({ children, className }: WrapperProps) {
  return <StyledWrapper className={className}>{children}</StyledWrapper>;
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
