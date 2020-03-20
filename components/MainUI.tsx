import React from 'react';
import { Layout } from "./styles";
import { Focus, Bar, Performer } from './';

const { LayoutContainer } = Layout;

const MainUI = () => {
  return (
    <LayoutContainer>
      <Focus />
      <Bar />
      <Performer />
    </LayoutContainer>
  );
};

export default MainUI;
