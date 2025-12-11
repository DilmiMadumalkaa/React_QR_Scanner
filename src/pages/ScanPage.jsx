import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ScanPage.css';
import { useZxing } from 'react-zxing';
import { sendScanResult } from '../services/apiService';
export default function ScanPage() {
const navigate = useNavigate();
const [scanned, setScanned] = useState(null);
const [error, setError] = useState(null);
const onResult = useCallback(async (result) => {
if (!result) return;
const text = result.getText();
setScanned(text);
try {
// send to backend (example)
await sendScanResult({ qr: text });
} catch (err) {
console.error(err);
setError('Failed to send scan to server');
}
}, []);
const { ref, start } = useZxing({
onDecodeResult: onResult,
// optional: provide constraints to prefer environment facing camera
constraints: { facingMode: 'environment' },
});
return (
<div className="p-4">
<div className="flex items-center justify-between mb-4">
<h2 className="text-xl">Scan QR Code</h2>
<div className="flex gap-2">
<button onClick={() => navigate('/')} className="px-3 py-1 border
rounded">Back</button>
<button onClick={() => start()} className="px-3 py-1 border
rounded">Start Camera</button>
</div>
</div>
<div className="max-w-xl">
<video ref={ref} style={{ width: '100%', maxHeight: 480, background:'#000' }} />
</div>
{scanned && (
<div className="mt-4 p-3 border rounded bg-gray-50">
<strong>Scanned:</strong>
<div className="break-words">{scanned}</div>
</div>
)}
{error && <div className="text-red-600 mt-2">{error}</div>}
</div>
);
}
