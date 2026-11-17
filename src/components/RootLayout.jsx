// src/components/RootLayout.jsx
import React from 'react';
import { NavLink, Outlet, useNavigation, useRouteError, Link } from 'react-router-dom';
import { HeartPulse, Users, UserPlus, AlertCircle, Activity } from 'lucide-react';

export function RootLayout() {
  const navigation = useNavigation();
  const isTransitioning = navigation.state === 'loading' || navigation.state === 'submitting';

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-rose-600 text-white shadow-sm'
        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
    }`;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col">
      {/* Top Route Transition Progress Bar */}
      <div className="h-1 w-full bg-stone-200 overflow-hidden">
        {isTransitioning && (
          <div className="h-full bg-rose-600 animate-pulse w-full transition-all duration-300" />
        )}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/donors" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm group-hover:bg-rose-700 transition-colors">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-stone-900">HemoLink</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Community Blood Network
              </span>
            </div>
          </Link>

          <nav aria-label="Primary Navigation" className="flex items-center gap-1.5 sm:gap-2">
            <NavLink to="/donors" className={navLinkClass}>
              <Users className="w-4 h-4" />
              <span>Donor Directory</span>
            </NavLink>
            <NavLink to="/requests" className={navLinkClass}>
              <AlertCircle className="w-4 h-4" />
              <span>Blood Requests</span>
            </NavLink>
            <NavLink to="/register" className={navLinkClass}>
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Register Donor</span>
              <span className="sm:hidden">Register</span>
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-5 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-600" />
            <span>HemoLink Volunteer Donor Registry — Built for rapid community response.</span>
          </div>
          <span>Always verify screening criteria at the hospital blood bank.</span>
        </div>
      </footer>
    </div>
  );
}

export function RouteErrorBoundary() {
  const error = useRouteError();
  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white rounded-2xl border border-rose-200 shadow-sm text-center">
      <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h1 className="text-lg font-bold text-stone-900">Unable to load route data</h1>
      <p className="text-sm text-stone-600 mt-1">
        {error?.statusText || error?.message || 'An unexpected error occurred while fetching data.'}
      </p>
      <Link
        to="/donors"
        className="mt-5 inline-flex items-center px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium hover:bg-rose-700"
      >
        Return to Donor Directory
      </Link>
    </div>
  );
}
