import React from "react";
import AddAssetForm from "../components/assests/AddAssetForm";

export default function AddAssetPage() {
  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Add New Asset
        </h1>
        <p className="text-md text-gray-500 text-center mb-8">
          Register a new asset to the system
        </p>
        
        <AddAssetForm />
      </div>
    </div>
  );
}
