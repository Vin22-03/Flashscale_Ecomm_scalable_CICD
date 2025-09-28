import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Health() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            ✅ Application is Healthy
          </h1>
          <p className="text-gray-700">
            All systems are up and running smoothly 🚀
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
