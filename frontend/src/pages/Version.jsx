import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Version() {
  const [versionInfo, setVersionInfo] = useState(null);

  useEffect(() => {
    fetch("/version")
      .then((res) => res.json())
      .then((data) => setVersionInfo(data))
      .catch(() => setVersionInfo({ error: "Failed to fetch version info" }));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            📌 Application Version
          </h1>
          {versionInfo ? (
            versionInfo.error ? (
              <p className="text-red-600">{versionInfo.error}</p>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6 inline-block">
                <p className="text-lg font-semibold">
                  App: <span className="text-gray-800">{versionInfo.app}</span>
                </p>
                <p className="text-lg font-semibold">
                  Version:{" "}
                  <span className="text-green-600">{versionInfo.version}</span>
                </p>
                <p className="text-lg font-semibold">
                  Environment:{" "}
                  <span className="text-purple-600">{versionInfo.env}</span>
                </p>
              </div>
            )
          ) : (
            <p className="text-gray-500">Loading version info...</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
