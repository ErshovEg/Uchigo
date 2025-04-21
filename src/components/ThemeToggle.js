import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { toggleTheme } from '../store/slices/themeSlice';

const ToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background-color: ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
  color: ${props => props.theme.isDarkMode ? '#333333' : '#ffffff'};
  transition: all 0.5s ease;
  z-index: 1000;

  &:hover {
    opacity: 0.8;
  }
`;

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <ToggleButton onClick={() => dispatch(toggleTheme())}>
      {isDarkMode ? 'Светлая тема' : 'Темная тема'}
    </ToggleButton>
  );
};

export default ThemeToggle; 