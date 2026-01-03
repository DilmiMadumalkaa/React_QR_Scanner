import React, { useState, useEffect } from 'react';

const History = () => {
    const [scanHistory, setScanHistory] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmMessage, setConfirmMessage] = useState('');

    useEffect(() => {
        // Load scan history from localStorage
        const history = JSON.parse(localStorage.getItem('scanHistory') || '[]');
        setScanHistory(history);
    }, []);

    const showConfirmation = (message, action) => {
        setConfirmMessage(message);
        setConfirmAction(() => action);
        setShowConfirmModal(true);
    };

    const handleConfirm = () => {
        if (confirmAction) {
            confirmAction();
        }
        setShowConfirmModal(false);
        setConfirmAction(null);
    };

    const handleCancel = () => {
        setShowConfirmModal(false);
        setConfirmAction(null);
    };

    const clearHistory = () => {
        showConfirmation('Are you sure you want to clear all scan history?', () => {
            localStorage.removeItem('scanHistory');
            setScanHistory([]);
        });
    };

    const deleteItem = (id) => {
        showConfirmation('Are you sure you want to delete this scan?', () => {
            const updatedHistory = scanHistory.filter(scan => scan.id !== id);
            localStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
            setScanHistory(updatedHistory);
        });
    };

    return (
        <>
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Scan History</h1>
            </header>

                {scanHistory.length > 0 && (
                    <div className="flex justify-end mb-4 max-w-4xl mx-auto">
                        <button
                            onClick={clearHistory}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all text-sm font-medium"
                        >
                            Clear History
                        </button>
                    </div>
                )}

                <div className="max-w-6xl mx-auto">
                    {scanHistory.length === 0 ? (
                        <div className="py-16 mx-5 px-6 bg-white border border-gray-200 rounded-xl text-center shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-500 text-lg">No scans yet…</p>
                            <p className="text-gray-400 text-sm mt-2">Start scanning QR codes to see them here</p>
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"></th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                QR Code Data
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Time
                                            </th>
                                            <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {scanHistory.map((scan, index) => (
                                            <tr key={scan.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    <div className="max-w-md break-words font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">
                                                        {scan.qrCode}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        {scan.date}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        {scan.time}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <button
                                                        onClick={() => deleteItem(scan.id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all text-sm font-medium"
                                                        title="Delete scan"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Confirm Action</h3>
                        </div>
                        <p className="text-gray-600 mb-6 text-base">
                            {confirmMessage}
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default History;