import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store } from './store';
import EmployeeList from './components/EmployeeList';
import EmployeeProfile from './components/EmployeeProfile';
import ThemeToggle from './components/ThemeToggle';
import GlobalStyle from './styles/GlobalStyle';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={{ isDarkMode: store.getState().theme.isDarkMode }}>
        <GlobalStyle />
        <Router>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/employee/:id" element={<EmployeeProfile />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
