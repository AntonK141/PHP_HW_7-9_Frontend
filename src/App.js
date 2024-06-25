import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateCategory from './components/CreateCategory';
import CategoryList from './components/CategoryList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/" element={<CategoryList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
