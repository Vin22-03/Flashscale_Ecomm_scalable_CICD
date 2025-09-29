export default function Health() {
  return (
    <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-green-100 via-white to-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md border border-gray-200">
        <h1 className="text-4xl font-bold text-green-600 mb-4 drop-shadow-lg">
          ✅ Application is Healthy
        </h1>
        <p className="text-gray-700 text-lg">
          All systems are up and running smoothly 🚀
        </p>
      </div>
    </main>
  );
}
