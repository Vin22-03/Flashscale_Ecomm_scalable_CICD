export default function Footer({ version }) {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p>FlashScale – {version}</p>
      <p className="text-sm">by VinCloudOps</p>
    </footer>
  );
}
