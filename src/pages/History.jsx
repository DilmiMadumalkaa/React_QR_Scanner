const History = () => {
    return (
        <div>
            <div className="mt-10 text-center opacity-0 animate-[fadeIn_1.5s_ease_forwards]">
                <h3 className="text-[22px] mb-[5px]">📄 Scan History</h3>
                <p className="opacity-85 text-sm mb-5">
                    Your scanned QR entries will appear here once saved in the backend.
                </p>

                <div className="py-[25px] px-[25px] bg-white border border-gray-200 rounded-[14px] max-w-[500px] mx-auto text-[15px] shadow-sm">
                    <p>No scans yet…</p>
                </div>
            </div>
        </div>
    );
}

export default History;