import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees } from '../store/slices/employeesSlice';
import { 
  setSearchQuery, 
  setGender, 
  setTechnologies, 
  setPosition 
} from '../store/slices/filtersSlice';
import Filter from './Filter';

const Container = styled.div`
  padding: 0;
  max-width: 100%;
  margin: 0;
  background-color: #F5F5F5;
  min-height: 100vh;
`;

const Header = styled.div`
  background-color: #FFFFFF;
  padding: 20px 32px;
  border-bottom: 1px solid #E0E0E0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  img {
    height: 32px;
  }

  .contact-info {
    display: flex;
    align-items: center;
    gap: 24px;
    color: #333333;
    font-size: 14px;
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #999999;
  font-size: 14px;
  margin-bottom: 24px;

  a {
    color: #999999;
    text-decoration: none;
    
    &:hover {
      color: #333333;
    }
  }
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333333;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Content = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  padding: 8px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  width: 100%;
  font-size: 14px;
  margin-bottom: 16px;

  &::placeholder {
    color: #999999;
  }
`;

const SelectedFilters = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const FilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background-color: #F0F0F0;
  border-radius: 4px;
  font-size: 14px;
  color: #333333;
  cursor: pointer;

  &:hover {
    background-color: #E0E0E0;
  }

  span {
    color: #999999;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #FFFFFF;
  border-radius: 4px;
  overflow: hidden;
`;

const Th = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  color: #333333;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E0E0E0;
`;

const Td = styled.td`
  padding: 16px;
  font-size: 14px;
  color: #333333;
  border-bottom: 1px solid #E0E0E0;
`;

const Tr = styled.tr`
  cursor: pointer;
  
  &:hover {
    background-color: #F5F5F5;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 32px;
  color: #333333;
`;

const ErrorMessage = styled.div`
  color: #FF4444;
  text-align: center;
  padding: 32px;
`;

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, loading, error, hasMore, page } = useSelector((state) => state.employees);
  const { searchQuery, gender, technologies, position } = useSelector((state) => state.filters);
  const observer = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        dispatch(fetchEmployees({
          page,
          searchQuery,
          gender,
          technologies: technologies.join(','),
          position,
        }));
      }
    }, options);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [dispatch, hasMore, loading, page, searchQuery, gender, technologies, position]);

  const handleRowClick = (id) => {
    navigate(`/employee/${id}`);
  };

  if (error) {
    return <ErrorMessage>Ошибка загрузки данных: {error}</ErrorMessage>;
  }

  return (
    <Container>
      <Header>
        <Logo>
          <img src="/logo.svg" alt="66bit" />
          <div className="contact-info">
            <span>+7 343 290 84 76</span>
            <span>info@66bit.ru</span>
          </div>
        </Logo>
        <Breadcrumbs>
          <a href="/">Главная</a>
          <span>/</span>
          <span>Список сотрудников</span>
        </Breadcrumbs>
      </Header>

      <Content>
        <ContentHeader>
          <Title>Список сотрудников</Title>
          <FiltersRow>
            <Filter
              title="Должность"
              options={['Frontend Developer', 'Backend Developer', 'Full Stack Developer']}
              type="position"
            />
            <Filter
              title="Пол"
              options={['Мужской', 'Женский']}
              type="gender"
            />
            <Filter
              title="Стек технологий"
              options={['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python']}
              type="technologies"
            />
          </FiltersRow>
        </ContentHeader>

        <SearchInput
          type="text"
          placeholder="Поиск"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />

        {(gender || technologies.length > 0 || position) && (
          <SelectedFilters>
            {gender && (
              <FilterTag onClick={() => dispatch(setGender(''))}>
                {gender} <span>×</span>
              </FilterTag>
            )}
            {technologies.map(tech => (
              <FilterTag key={tech} onClick={() => dispatch(setTechnologies(technologies.filter(t => t !== tech)))}>
                {tech} <span>×</span>
              </FilterTag>
            ))}
            {position && (
              <FilterTag onClick={() => dispatch(setPosition(''))}>
                {position} <span>×</span>
              </FilterTag>
            )}
          </SelectedFilters>
        )}

        <Table>
          <thead>
            <tr>
              <Th>ФИО</Th>
              <Th>Должность</Th>
              <Th>Телефон</Th>
              <Th>Дата рождения</Th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <Tr
                key={employee.id}
                onClick={() => handleRowClick(employee.id)}
              >
                <Td>{employee.name}</Td>
                <Td>{employee.position}</Td>
                <Td>{employee.phone}</Td>
                <Td>{employee.birthDate}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>

        {loading && <LoadingMessage>Загрузка...</LoadingMessage>}
      </Content>
    </Container>
  );
};

export default EmployeeList; 