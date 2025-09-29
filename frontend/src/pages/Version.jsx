import { useEffect, useState } from "react";

export default function Version() {
  const [info, setInfo] = useState({
    version: "loading...",
    color: "loading...",
    build_time: "loading..."
  });

  useEffect(() => {
    fetch("/api/build-info")
      .then(res => res.json())
      .then(data => setInfo(data))
      .catch(() =>
        setInfo({ version: "error", color: "error", build_time: "error" })
      );
  }, []);

  const colorClass =
    info.color === "blue"
      ? "bg-blue-100 text-blue-700 border-blue-300"
      : info.color === "green"
      ? "bg-green-100 text-green-700 border-green-300"
      : "bg-gray-100 text-gray-600 border-gray-300";

  return (
    <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md border border-gray-200">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow-lg">
          🚀 Application Version
        </h1>

        {/* Version */}
        <p className="text-lg mb-4">
          <span className="font-semibold text-gray-700">Version:</span>{" "}
          <span className="px-3 py-1 rounded-full border bg-purple-100 text-purple-700 border-purple-300">
            {info.version}
          </span>
        </p>

        {/* Deployment Color */}
        <p className="text-lg mb-4">
          <span className="font-semibold text-gray-700">Deployment Color:</span>{" "}
          <span className={`px-3 py-1 rounded-full border ${colorClass}`}>
            {info.color}
          </span>
        </p>

        {/* Build Time */}
        <div className="mt-6 bg-gray-50 shadow-inner rounded-xl p-4">
          <p className="text-md text-gray-800">
            <span className="font-semibold">🕒 Build Time:</span>
            <br />
            {info.build_time}
          </p>
        </div>

        {/* Banner */}
        <div className="mt-6 p-3 rounded-xl bg-gradient-to-r from-green-200 to-blue-200 shadow font-semibold text-gray-800">
          ✅ This is the currently deployed build!
        </div>
      </div>
    </main>
  );
}
