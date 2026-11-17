// Blood-Donor-Backend/testBackend.js
const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- Testing Donor Endpoints ---');

  // 1. CREATE (POST)
  const createDonorRes = await fetch(`${BASE_URL}/donors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Test Donor',
      bloodGroup: 'O+',
      city: 'Islamabad',
      phone: '03001234567',
    }),
  });
  const createdDonor = await createDonorRes.json();
  console.log('1. POST /donors:', createDonorRes.status, createdDonor.id ? 'OK' : createdDonor);

  // 2. READ (GET)
  const getDonorsRes = await fetch(`${BASE_URL}/donors?query=Test`);
  const donorsList = await getDonorsRes.json();
  console.log('2. GET /donors:', getDonorsRes.status, `Found ${donorsList.length} matching donor(s)`);

  // 3. UPDATE (PATCH)
  const patchDonorRes = await fetch(`${BASE_URL}/donors/${createdDonor.id}/availability`, {
    method: 'PATCH',
  });
  const updatedDonor = await patchDonorRes.json();
  console.log('3. PATCH /donors/:id/availability:', patchDonorRes.status, `available = ${updatedDonor.available}`);

  // 4. DELETE (Cleanup)
  const deleteDonorRes = await fetch(`${BASE_URL}/donors/${createdDonor.id}`, {
    method: 'DELETE',
  });
  console.log('4. DELETE /donors/:id:', deleteDonorRes.status, await deleteDonorRes.json());

  // 5. VALIDATION CHECK (Should reject with 400)
  const badDonorRes = await fetch(`${BASE_URL}/donors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Invalid123',
      bloodGroup: 'O+',
      city: 'Islamabad',
      phone: '123',
    }),
  });
  console.log('5. Validation Check (expect 400):', badDonorRes.status, await badDonorRes.json());

  console.log('\n--- Testing Blood Request Endpoints ---');

  // 6. CREATE REQUEST (POST)
  const createReqRes = await fetch(`${BASE_URL}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patientName: 'Test Patient',
      bloodGroup: 'A+',
      unitsNeeded: 2,
      hospital: 'Shifa Hospital',
      city: 'Islamabad',
      urgency: 'Urgent',
      contactPhone: '03007654321',
    }),
  });
  const createdReq = await createReqRes.json();
  console.log('6. POST /requests:', createReqRes.status, createdReq.id ? 'OK' : createdReq);

  // 7. UPDATE STATUS (PATCH)
  const patchReqRes = await fetch(`${BASE_URL}/requests/${createdReq.id}/status`, {
    method: 'PATCH',
  });
  const updatedReq = await patchReqRes.json();
  console.log('7. PATCH /requests/:id/status:', patchReqRes.status, `status = ${updatedReq.status}`);

  // 8. DELETE REQUEST (Cleanup)
  const deleteReqRes = await fetch(`${BASE_URL}/requests/${createdReq.id}`, {
    method: 'DELETE',
  });
  console.log('8. DELETE /requests/:id:', deleteReqRes.status, await deleteReqRes.json());
}

runTests().catch(console.error);