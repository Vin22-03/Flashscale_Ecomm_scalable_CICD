export default function Version() {
  const version = process.env.REACT_APP_VERSION || "unknown";
  const color = process.env.REACT_APP_COLOR || "unknown";
  const buildTime = process.env.REACT_APP_BUILD_TIME || "unknown";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md border border-gray-200">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-6 drop-shadow-lg">
            🚀 Application Version
          </h1>

          <p className="text-lg mb-4">
            <span className="font-semibold text-gray-700">Version:</span>{" "}
            <span className="text-green-600">{version}</span>
          </p>

          <p className="text-lg mb-4">
            <span className="font-semibold text-gray-700">Deployment Color:</span>{" "}
            <span
              className={
                color === "blue"
                  ? "text-blue-600 font-bold"
                  : "text-green-600 font-bold"
              }
            >
              {color}
            </span>
          </p>

          <div className="mt-6 bg-gray-50 shadow-inner rounded-xl p-4">
            <p className="text-md text-gray-800">
              <span className="font-semibold">🕒 Build Time:</span>
              <br />
              {buildTime}
            </p>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-gradient-to-r from-green-200 to-blue-200 shadow">
            ✅ This is the currently deployed build!
          </div>
        </div>
      </main>
    </div>
  );
}
