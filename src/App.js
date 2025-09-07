import './App.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './components/header';

import { BrowserRouter as Roouter, Routes, Route } from 'react-router';
import Home from './pages/home';
import About from './pages/about-us';
import Contact from './pages/contact-us';
import EditableTable from './pages/editable-table';

function App(props) {
  return (
    <React.Fragment>
      <Roouter>
        <CssBaseline />
        <Header />
        <Toolbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/editable-table" element={<EditableTable />} />
          </Routes>
        </Container>
      </Roouter>
    </React.Fragment>
  );
}

export default App;
