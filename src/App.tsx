import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ListingsList from './pages/ListingsList';
import ListingDetail from './pages/ListingDetail';
import ListingTradeOffers from './pages/ListingTradeOffers';
import CreateListing from './pages/CreateListing';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import CreateTradeOffer from './pages/CreateTradeOffer';
import MyListings from './pages/MyListings';
import UserProfile from './pages/UserProfile';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/listings" element={<ListingsList />} />
        <Route path="/listings/my" element={<MyListings />} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/listings/:id/trade-offers" element={<ListingTradeOffers />} />
        <Route path="/listings/new" element={<CreateListing />} />
        <Route
          path="/trade-offers/new/:requestedListingId"
          element={<CreateTradeOffer />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

