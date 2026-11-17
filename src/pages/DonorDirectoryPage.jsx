// src/pages/DonorDirectoryPage.jsx
import React from 'react';
import { useLoaderData, useSearchParams, useRevalidator, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  Trash2,
  UserPlus,
  Droplet,
} from 'lucide-react';
import { fetchDonors, toggleDonorAvailability, deleteDonor } from '../api/bloodBankApi';

const BLOOD_GROUPS = ['ALL', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export async function donorDirectoryLoader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') || '';
  const bloodGroup = url.searchParams.get('blood') || 'ALL';
  const onlyAvailable = url.searchParams.get('available') === 'true';

  const donors = await fetchDonors({ query, bloodGroup, onlyAvailable });
  return { donors, filters: { query, bloodGroup, onlyAvailable } };
}

export function DonorDirectoryPage() {
  const { donors, filters } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const revalidator = useRevalidator();

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'ALL' || value === 'false') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  const handleToggleStatus = async (donorId) => {
    await toggleDonorAvailability(donorId);
    revalidator.revalidate();
  };

  const handleDelete = async (donorId, name) => {
    if (!window.confirm(`Remove ${name} from the donor registry?`)) return;
    await deleteDonor(donorId);
    revalidator.revalidate();
  };

  const availableCount = donors.filter((d) => d.available).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">Donor Directory</h1>
          <p className="text-sm text-stone-600 mt-1">
            Showing <span className="font-semibold text-stone-900">{donors.length}</span> registered
            donors ({availableCount} currently available to donate)
          </p>
        </div>
        <Link
          to="/register"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register as Donor</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              aria-label="Search donors by name or city"
              placeholder="Search by donor name or city (e.g., Islamabad, Rawalpindi)..."
              defaultValue={filters.query}
              onChange={(e) => updateFilter('q', e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          {/* Available Only Toggle */}
          <label className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border border-stone-200 bg-stone-50 cursor-pointer select-none text-sm font-medium text-stone-700 hover:bg-stone-100">
            <input
              type="checkbox"
              checked={filters.onlyAvailable}
              onChange={(e) => updateFilter('available', String(e.target.checked))}
              className="rounded text-rose-600 focus:ring-rose-500"
            />
            <span>Available Now Only</span>
          </label>
        </div>

        {/* Blood Group Pills */}
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by blood group">
          <span className="text-xs font-medium text-stone-500 mr-1.5">Blood Group:</span>
          {BLOOD_GROUPS.map((group) => {
            const active = filters.bloodGroup === group;
            return (
              <button
                key={group}
                type="button"
                onClick={() => updateFilter('blood', group)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-rose-600 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>
      </div>

      {/* Donor Cards Grid */}
      {donors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center">
          <Droplet className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-stone-900">No matching donors found</h3>
          <p className="text-sm text-stone-500 mt-1">
            Try clearing your city search or switching the blood group filter to ALL.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donors.map((donor) => (
            <article
              key={donor.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:border-stone-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-base text-stone-900">{donor.fullName}</h2>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{donor.city}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold text-sm shrink-0">
                    {donor.bloodGroup}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-stone-500">
                      <Phone className="w-3.5 h-3.5" /> Contact
                    </span>
                    <a
                      href={`tel:${donor.phone}`}
                      className="font-medium text-stone-900 hover:text-rose-600"
                    >
                      {donor.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-stone-500">
                      <Calendar className="w-3.5 h-3.5" /> Last Donation
                    </span>
                    <span className="font-medium text-stone-800">
                      {donor.lastDonationDate || 'First-time donor'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Actions (Update & Delete) */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(donor.id)}
                  title="Click to toggle donor availability"
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    donor.available
                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {donor.available ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Available
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" /> Unavailable
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(donor.id, donor.fullName)}
                  aria-label={`Delete ${donor.fullName}`}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}