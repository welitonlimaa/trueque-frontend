import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ListingsList from './pages/ListingsList';
import ListingDetail from './pages/ListingDetail';
// import CreateListing from './pages/CreateListing';
// import TradeOffers from './pages/TradeOffers';

// import Header from './components/Header';
// import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      <div className="pt-16">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/listings" element={<ListingsList />} />
          <Route path="/listings/:id" element={<ListingDetail />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
