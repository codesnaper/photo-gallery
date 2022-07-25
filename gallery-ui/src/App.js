import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Loader} from './component/loading/loading';
import { ErrorBoundary } from './component/error/error';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
const Login = React.lazy(() => import('./component/login/login'));
const Home = React.lazy(() => import('./component/home/home'));
const Group = React.lazy(() => import('./component/group/home/viewGroup'));
const Gallery = React.lazy(() => import('./component/gallery/gallery'));
function App() {
  return (
    
    <ErrorBoundary>
      <Router>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/group" element={<Group />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Suspense>
    </Router>
  </ErrorBoundary>
  );
}

export default App;
