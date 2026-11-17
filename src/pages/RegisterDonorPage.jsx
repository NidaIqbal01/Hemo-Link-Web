// src/pages/RegisterDonorPage.jsx
import React from 'react';
import { Form, redirect, useActionData, useNavigation, Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, ArrowLeft } from 'lucide-react';
import { createDonor } from '../api/bloodBankApi';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export async function registerDonorAction({ request }) {
  const formData = await request.formData();
  const fullName = String(formData.get('fullName') || '').trim();
  const bloodGroup = String(formData.get('bloodGroup') || '');
  const city = String(formData.get('city') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const lastDonationDate = String(formData.get('lastDonationDate') || '');
  const consent = formData.get('consent');

  const nameRegex = /^[A-Za-z\s]+$/; 
  const rawDigits = phone.replace(/\D/g, '');

  const errors = {};
  
  if (fullName.length < 3) {
    errors.fullName = 'Please enter your full name (at least 3 characters).';
  } else if (!nameRegex.test(fullName)) {
    errors.fullName = 'Name fields cannot contain numbers or special characters.';
  }

  if (!BLOOD_TYPES.includes(bloodGroup)) {
    errors.bloodGroup = 'Please select a valid blood group.';
  }

  if (!city) {
    errors.city = 'City is required so local hospitals can reach you.';
  } else if (!nameRegex.test(city)) {
    errors.city = 'City name cannot contain numbers or special characters.';
  }

  if (rawDigits.length !== 11) {
    errors.phone = 'Phone number must consist of exactly 11 digits (e.g., 03001234567).';
  }

  if (!consent) {
    errors.consent = 'Please confirm that you meet basic donor health eligibility.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  await createDonor({ fullName, bloodGroup, city, phone, lastDonationDate });
  return redirect('/donors');
}

export function RegisterDonorPage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const errors = actionData?.errors || {};

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/donors"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-stone-900"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Donor Directory
      </Link>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-stone-100 bg-rose-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-900">Register as a Blood Donor</h1>
              <p className="text-sm text-stone-600">
                Join the verified community directory to respond to nearby hospital requests.
              </p>
            </div>
          </div>
        </div>

        <Form method="post" className="p-6 sm:p-8 space-y-5" noValidate>
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-stone-800 mb-1">
              Full Name <span className="text-rose-600">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="e.g., Usama Bin Tariq"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
            {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
          </div>

          {/* Blood Group & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bloodGroup" className="block text-sm font-medium text-stone-800 mb-1">
                Blood Group <span className="text-rose-600">*</span>
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                defaultValue=""
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              >
                <option value="" disabled>
                  Select blood type...
                </option>
                {BLOOD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-xs text-rose-600 mt-1">{errors.bloodGroup}</p>
              )}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-stone-800 mb-1">
                City <span className="text-rose-600">*</span>
              </label>
              <input
                id="city"
                name="city"
                type="text"
                placeholder="e.g., Rawalpindi"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
              {errors.city && <p className="text-xs text-rose-600 mt-1">{errors.city}</p>}
            </div>
          </div>

          {/* Phone & Last Donation Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-stone-800 mb-1">
                Phone / WhatsApp <span className="text-rose-600">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="0300 1234567"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
              {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label
                htmlFor="lastDonationDate"
                className="block text-sm font-medium text-stone-800 mb-1"
              >
                Last Donation Date <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <input
                id="lastDonationDate"
                name="lastDonationDate"
                type="date"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>
          </div>

          {/* Eligibility Checkbox */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                className="mt-1 rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="text-xs text-stone-600 leading-relaxed">
                I confirm that I am at least 18 years old, weigh over 50 kg, and consent to sharing
                my contact details with verified patients and hospital coordinators.
              </span>
            </label>
            {errors.consent && <p className="text-xs text-rose-600 mt-1.5">{errors.consent}</p>}
          </div>

          <div className="pt-2 flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Instant directory listing
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 disabled:opacity-60 transition-colors shadow-sm"
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}