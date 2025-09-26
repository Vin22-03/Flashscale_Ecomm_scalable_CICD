export default function ProductCard({ name, price, image }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <img src={image} alt={name} className="h-40 w-full object-cover mb-2" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-700">₹{price}</p>
      <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
        Add to Cart
      </button>
    </div>
  );
}
