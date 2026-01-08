import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ListingsList from './pages/ListingsList';
import ListingDetail from './pages/ListingDetail';
import ListingTradeOffers from './pages/ListingTradeOffers';
import CreateListing from './pages/CreateListing';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import CreateTradeOffer from './pages/CreateTradeOffer';
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
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/listings" element={<ListingsList />} />
            <Route path="/listings/:id" element={<ListingDetail />} />

            <Route
              path="/listings/:id/trade-offers"
              element={<ListingTradeOffers />}
            />

            <Route path="/listings/new" element={<CreateListing />} />
            <Route
              path="/trade-offers/new/:requestedListingId"
              element={<CreateTradeOffer />}
            />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
