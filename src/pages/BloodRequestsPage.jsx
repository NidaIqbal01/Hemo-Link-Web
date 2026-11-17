// src/pages/BloodRequestsPage.jsx
import React, { useState } from 'react';
import { useLoaderData, useSearchParams, useRevalidator } from 'react-router-dom';
import {
  Plus,
  Building2,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  AlertTriangle,
  X,
  Trash2,
} from 'lucide-react';
import {
  fetchBloodRequests,
  createBloodRequest,
  toggleRequestStatus,
  deleteBloodRequest,
} from '../api/bloodBankApi';

const BLOOD_GROUPS = ['ALL', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const URGENCY_LEVELS = ['ALL', 'Critical', 'Urgent', 'Standard'];

export async function bloodRequestsLoader({ request }) {
  const url = new URL(request.url);
  const bloodGroup = url.searchParams.get('blood') || 'ALL';
  const urgency = url.searchParams.get('urgency') || 'ALL';

  const requests = await fetchBloodRequests({ bloodGroup, urgency });
  return { requests, filters: { bloodGroup, urgency } };
}

export function BloodRequestsPage() {
  const { requests, filters } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const revalidator = useRevalidator();
  const [showNewForm, setShowNewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [errors, setErrors] = useState({});

  const [formState, setFormState] = useState({
    patientName: '',
    bloodGroup: 'O+',
    unitsNeeded: 1,
    hospital: '',
    city: '',
    urgency: 'Urgent',
    contactPhone: '',
    notes: '',
  });

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'ALL') {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  const handleDeleteRequest = async (requestId, patientName) => {
    if (!window.confirm(`Delete blood request for ${patientName}?`)) return;
    await deleteBloodRequest(requestId);
    revalidator.revalidate();
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const rawDigits = formState.contactPhone.replace(/\D/g, '');

    if (!formState.patientName.trim()) {
      newErrors.patientName = 'Patient name is required.';
    } else if (!nameRegex.test(formState.patientName.trim())) {
      newErrors.patientName = 'Patient name cannot contain numbers or symbols.';
    }

    if (!formState.hospital.trim()) {
      newErrors.hospital = 'Hospital name is required.';
    } else if (!nameRegex.test(formState.hospital.trim())) {
      newErrors.hospital = 'Hospital name cannot contain numbers or symbols.';
    }

    if (!formState.city.trim()) {
      newErrors.city = 'City is required.';
    } else if (!nameRegex.test(formState.city.trim())) {
      newErrors.city = 'City name cannot contain numbers or symbols.';
    }

    if (rawDigits.length !== 11) {
      newErrors.contactPhone = 'Contact phone must consist of exactly 11 digits (e.g., 03001234567).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await createBloodRequest(formState);
      setSubmitting(false);
      setShowNewForm(false);
      setFormState({
        patientName: '',
        bloodGroup: 'O+',
        unitsNeeded: 1,
        hospital: '',
        city: '',
        urgency: 'Urgent',
        contactPhone: '',
        notes: '',
      });
      setErrors({});
      revalidator.revalidate();
    } catch (err) {
      setSubmitting(false);
      setErrors({ form: err.message });
    }
  };

  const handleToggleFulfilled = async (requestId) => {
    await toggleRequestStatus(requestId);
    revalidator.revalidate();
  };

  const urgencyBadge = (level) => {
    switch (level) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Urgent':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-sky-100 text-sky-800 border-sky-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">Live Blood Requests</h1>
          <p className="text-sm text-stone-600 mt-1">
            Active patient and hospital appeals requiring immediate donor matching.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowNewForm((prev) => !prev)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors shadow-sm"
        >
          {showNewForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{showNewForm ? 'Close Form' : 'Post Blood Request'}</span>
        </button>
      </div>

      {/* Collapsible New Request Form */}
      {showNewForm && (
        <form
          onSubmit={handleCreateRequest}
          className="bg-white rounded-2xl border border-rose-200 p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="font-semibold text-stone-900">Create Urgent Blood Appeal</h2>
            <span className="text-xs text-stone-500">Publishes immediately to feed</span>
          </div>

          {errors.form && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
              {errors.form}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Patient Name *</label>
              <input
                type="text"
                value={formState.patientName}
                onChange={(e) => setFormState({ ...formState, patientName: e.target.value })}
                placeholder="Patient full name"
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
              {errors.patientName && (
                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.patientName}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Blood Group *</label>
              <select
                value={formState.bloodGroup}
                onChange={(e) => setFormState({ ...formState, bloodGroup: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white"
              >
                {BLOOD_GROUPS.filter((g) => g !== 'ALL').map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Units Needed *</label>
              <input
                type="number"
                min="1"
                max="10"
                value={formState.unitsNeeded}
                onChange={(e) => setFormState({ ...formState, unitsNeeded: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Hospital Name *</label>
              <input
                type="text"
                value={formState.hospital}
                onChange={(e) => setFormState({ ...formState, hospital: e.target.value })}
                placeholder="e.g., Shifa International"
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
              {errors.hospital && (
                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.hospital}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">City *</label>
              <input
                type="text"
                value={formState.city}
                onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                placeholder="e.g., Islamabad"
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
              {errors.city && (
                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Urgency Level</label>
              <select
                value={formState.urgency}
                onChange={(e) => setFormState({ ...formState, urgency: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white"
              >
                <option value="Critical">Critical (Within 2 hrs)</option>
                <option value="Urgent">Urgent (Today)</option>
                <option value="Standard">Standard (Scheduled)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">
                Attendant Contact Phone *
              </label>
              <input
                type="tel"
                value={formState.contactPhone}
                onChange={(e) => setFormState({ ...formState, contactPhone: e.target.value })}
                placeholder="0300 0000000"
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              />
              {errors.contactPhone && (
                <p className="text-xs text-rose-600 mt-1 font-medium">{errors.contactPhone}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Clinical Notes</label>
              <input
                type="text"
                value={formState.notes}
                onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                placeholder="Ward number, surgery timing, etc."
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowNewForm(false)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 disabled:opacity-60"
            >
              {submitting ? 'Publishing...' : 'Publish Request'}
            </button>
          </div>
        </form>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-stone-500 mr-1">Blood Type:</span>
          {BLOOD_GROUPS.map((group) => (
            <button
              key={group}
              type="button"
              onClick={() => updateFilter('blood', group)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filters.bloodGroup === group
                  ? 'bg-rose-600 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-stone-500 mr-1">Urgency:</span>
          {URGENCY_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => updateFilter('urgency', level)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filters.urgency === level
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {requests.map((req) => {
          const isFulfilled = req.status === 'Fulfilled';
          return (
            <article
              key={req.id}
              className={`bg-white rounded-2xl border p-5 transition-all ${
                isFulfilled ? 'border-stone-200 opacity-75' : 'border-stone-200 shadow-sm'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col items-center justify-center shrink-0">
                    <span className="text-base font-extrabold text-rose-700 leading-none">
                      {req.bloodGroup}
                    </span>
                    <span className="text-[11px] font-medium text-rose-600 mt-1">
                      {req.unitsNeeded} {req.unitsNeeded === 1 ? 'Unit' : 'Units'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold text-base text-stone-900">{req.patientName}</h2>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${urgencyBadge(
                          req.urgency
                        )}`}
                      >
                        {req.urgency}
                      </span>
                      {isFulfilled && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600">
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-stone-400" /> {req.hospital}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" /> {req.city}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-stone-400" />{' '}
                        {new Date(req.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {req.notes && <p className="text-xs text-stone-500 pt-1">{req.notes}</p>}
                  </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <a
                    href={`tel:${req.contactPhone}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 hover:bg-stone-50"
                  >
                    <Phone className="w-3.5 h-3.5 text-rose-600" />
                    <span>{req.contactPhone}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleToggleFulfilled(req.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isFulfilled
                        ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {isFulfilled ? (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5" /> Reopen
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Fulfilled
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteRequest(req.id, req.patientName)}
                    aria-label={`Delete request for ${req.patientName}`}
                    className="p-2 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
