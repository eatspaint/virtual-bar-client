import React from 'react';
import styled from 'styled-components';
import { flexCentered } from './styles';

const SettingsContainer = styled.div`
  grid-row: focus-top / focus-bottom;
  grid-column: left / focus-left;
  ${flexCentered};
`;

const Settings = () => {
  return (
    <SettingsContainer>
      <p>Settings</p>
    </SettingsContainer>
  );
};

export default Settings;