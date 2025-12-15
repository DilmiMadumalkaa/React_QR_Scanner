import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/authService';
import Navbar from '../components/navbar';
import Sidebar from '../components/Sidebar';

const History = () => {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        <div className="min-h-screen bg-white overflow-hidden relative text-gray-800">
            <div className="absolute inset-0 bg-gray-50/50"></div>
            
            {/* Navbar */}
            <Navbar logout={logout} user={user} />

            {/* Sidebar */}
            <Sidebar
                user={user}
                logout={logout}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />

            {/* Main Content */}
            <main className="lg:ml-64 p-10 pt-24 relative z-10">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Scan History</h1>
                    <p className="text-gray-600 mt-2">
                        Your scanned QR code entries
                    </p>
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

                <div className="max-w-4xl mx-auto">
                    {scanHistory.length === 0 ? (
                        <div className="py-16 px-6 bg-white border border-gray-200 rounded-xl text-center shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-500 text-lg">No scans yet…</p>
                            <p className="text-gray-400 text-sm mt-2">Start scanning QR codes to see them here</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {scanHistory.map((scan) => (
                                <div key={scan.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#050E3C]" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                                                    <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
                                                </svg>
                                                <span className="text-sm font-semibold text-gray-700">QR Code Data</span>
                                            </div>
                                            <p className="text-gray-800 break-words bg-gray-50 p-3 rounded-lg border border-gray-200 font-mono text-sm">
                                                {scan.qrCode}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-3">
                                            <div className="text-right text-sm text-gray-500">
                                                <div className="flex items-center gap-1 mb-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{scan.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{scan.time}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteItem(scan.id)}
                                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all group"
                                                title="Delete scan"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

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
        </div>
    );
}

export default History;