import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import { useAuth } from '../services/authService';
export default function DashboardPage() {
const navigate = useNavigate();
const { user, logout } = useAuth();
return (
<div className="p-6">
<div className="flex justify-between items-center mb-6">
<div>
<h2 className="text-xl">Welcome</h2>
<p>{user?.displayName}</p>
<p className="text-sm text-gray-500">{user?.email}</p>
</div>
<div className="flex gap-2">
<button
onClick={() => navigate('/scan')}
className="px-3 py-2 bg-green-600 text-white rounded"
>
Scan QR
</button>
<button
onClick={logout}
className="px-3 py-2 bg-red-600 text-white rounded"
>
Sign out
</button>
</div>
</div>
<div>
<h3 className="text-lg">Scan History (example)</h3>
<p className="text-sm text-gray-500">Scans will be saved to your
backend.</p>
</div>
</div>
);
}
