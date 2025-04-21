import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveFilter,
  setGender,
  setTechnologies,
  setPosition,
} from '../store/slices/filtersSlice';

const FilterContainer = styled.div`
  position: relative;
  margin: 10px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
  border-radius: 4px;
  background: transparent;
  color: ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
  cursor: pointer;
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${props => props.theme.isDarkMode ? '#333333' : '#ffffff'};
  border: 1px solid ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
  border-radius: 4px;
  padding: 10px;
  z-index: 1000;
  min-width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FilterOption = styled.div`
  padding: 8px;
  cursor: pointer;
  color: ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
  
  &:hover {
    background-color: ${props => props.theme.isDarkMode ? '#444444' : '#f0f0f0'};
  }
`;

const Filter = ({ title, options, type }) => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.filters.activeFilter);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        dispatch(setActiveFilter(null));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dispatch]);

  const handleFilterClick = () => {
    dispatch(setActiveFilter(activeFilter === type ? null : type));
  };

  const handleOptionClick = (option) => {
    switch (type) {
      case 'gender':
        dispatch(setGender(option));
        break;
      case 'technologies':
        dispatch(setTechnologies([option]));
        break;
      case 'position':
        dispatch(setPosition(option));
        break;
      default:
        break;
    }
    dispatch(setActiveFilter(null));
  };

  return (
    <FilterContainer ref={filterRef}>
      <FilterButton onClick={handleFilterClick}>
        {title}
      </FilterButton>
      {activeFilter === type && (
        <FilterDropdown>
          {options.map((option) => (
            <FilterOption
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </FilterOption>
          ))}
        </FilterDropdown>
      )}
    </FilterContainer>
  );
};

export default Filter; 