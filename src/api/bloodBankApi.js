// Blood-Donor-Frontend/src/api/bloodBankApi.js
const API_BASE_URL = 'http://localhost:5000/api';

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Server request failed.');
  }
  return data;
}

// --- DONOR ENDPOINTS ---
export async function fetchDonors({ query = '', bloodGroup = 'ALL', onlyAvailable = false } = {}) {
  const params = new URLSearchParams({
    query,
    bloodGroup,
    onlyAvailable: String(onlyAvailable),
  });
  const res = await fetch(`${API_BASE_URL}/donors?${params.toString()}`);
  return handleResponse(res);
}

export async function createDonor(donorPayload) {
  const res = await fetch(`${API_BASE_URL}/donors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donorPayload),
  });
  return handleResponse(res);
}

export async function toggleDonorAvailability(donorId) {
  const res = await fetch(`${API_BASE_URL}/donors/${donorId}/availability`, {
    method: 'PATCH',
  });
  return handleResponse(res);
}

export async function deleteDonor(donorId) {
  const res = await fetch(`${API_BASE_URL}/donors/${donorId}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}

// --- BLOOD REQUEST ENDPOINTS ---
export async function fetchBloodRequests({ bloodGroup = 'ALL', urgency = 'ALL' } = {}) {
  const params = new URLSearchParams({
    bloodGroup,
    urgency,
  });
  const res = await fetch(`${API_BASE_URL}/requests?${params.toString()}`);
  return handleResponse(res);
}

export async function createBloodRequest(requestPayload) {
  const res = await fetch(`${API_BASE_URL}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestPayload),
  });
  return handleResponse(res);
}

export async function toggleRequestStatus(requestId) {
  const res = await fetch(`${API_BASE_URL}/requests/${requestId}/status`, {
    method: 'PATCH',
  });
  return handleResponse(res);
}

export async function deleteBloodRequest(requestId) {
  const res = await fetch(`${API_BASE_URL}/requests/${requestId}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
