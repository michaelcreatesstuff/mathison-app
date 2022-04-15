import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import { NavBar, Layout } from '../components';
import { CategoriesLandingPage, CategoryPage } from '../pages';

const CategoryPageWrapper = () => {
  const { id } = useParams();
  return <CategoryPage id={id} />;
}

function App() {
  return (
    <Router>
      <NavBar />
      <Layout>
        <Routes>
          <Route path="/" element={<CategoriesLandingPage />} />
          <Route path="/knowledge-center/categories" element={<CategoriesLandingPage />} />
          <Route path="/knowledge-center/:id" element={<CategoryPageWrapper />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
