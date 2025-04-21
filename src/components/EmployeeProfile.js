import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployeeById, clearSelectedEmployee } from '../store/slices/employeesSlice';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  color: ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
`;

const BackButton = styled.button`
  padding: 8px 16px;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
  border-radius: 4px;
  background: transparent;
  color: ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ProfileCard = styled.div`
  border: 1px solid ${props => props.theme.isDarkMode ? '#ffffff' : '#333333'};
  border-radius: 8px;
  padding: 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${props => props.theme.isDarkMode ? '#444444' : '#f0f0f0'};
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Value = styled.div`
  color: ${props => props.theme.isDarkMode ? '#cccccc' : '#666666'};
`;

const TechnologiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TechnologyTag = styled.span`
  background-color: ${props => props.theme.isDarkMode ? '#444444' : '#f0f0f0'};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
`;

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedEmployee, loading, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
    return () => dispatch(clearSelectedEmployee());
  }, [dispatch, id]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return <LoadingMessage>Загрузка...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>Ошибка загрузки данных: {error}</ErrorMessage>;
  }

  if (!selectedEmployee) {
    return <ErrorMessage>Сотрудник не найден</ErrorMessage>;
  }

  return (
    <Container>
      <BackButton onClick={handleBack}>← Назад к списку</BackButton>
      <ProfileCard>
        <ProfileHeader>
          <Avatar>
            {selectedEmployee.name.charAt(0)}
          </Avatar>
          <div>
            <h2>{selectedEmployee.name}</h2>
            <p>{selectedEmployee.position}</p>
          </div>
        </ProfileHeader>

        <InfoSection>
          <Label>Пол</Label>
          <Value>{selectedEmployee.gender}</Value>
        </InfoSection>

        <InfoSection>
          <Label>Технологии</Label>
          <TechnologiesList>
            {selectedEmployee.technologies.map((tech) => (
              <TechnologyTag key={tech}>{tech}</TechnologyTag>
            ))}
          </TechnologiesList>
        </InfoSection>

        <InfoSection>
          <Label>Email</Label>
          <Value>{selectedEmployee.email}</Value>
        </InfoSection>

        <InfoSection>
          <Label>Телефон</Label>
          <Value>{selectedEmployee.phone}</Value>
        </InfoSection>

        <InfoSection>
          <Label>Адрес</Label>
          <Value>{selectedEmployee.address}</Value>
        </InfoSection>
      </ProfileCard>
    </Container>
  );
};

export default EmployeeProfile; 