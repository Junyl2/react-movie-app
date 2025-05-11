function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-sm px-8 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Section */}
        <div>
          <p className="mb-2">
            Questions?{' '}
            <span className="font-bold text-white">Call 0850-380-6444</span>
          </p>
          <p>
            Format for custom post types that are not book or you can use else
            if to{' '}
            <a href="#" className="underline">
              specify a second
            </a>{' '}
            post type the same way as above.
          </p>
          <div className="mt-4 border border-gray-600 inline-flex items-center px-4 py-2 gap-2">
            <span>English</span>
            <span role="img" aria-label="globe">
              🌐
            </span>
          </div>
        </div>

        {/* Digiflex Section */}
        <div>
          <h3 className="text-white mb-2 font-semibold">JFLIX</h3>
          <ul className="space-y-1">
            <li>
              <a href="#">JFLIX</a>
            </li>
            <li>
              <a href="#">Devices</a>
            </li>
            <li>
              <a href="#">Tips</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-white mb-2 font-semibold">SUPPORT</h3>
          <ul className="space-y-1">
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Account</a>
            </li>
            <li>
              <a href="#">
                Support <span title="Info">❓</span>
              </a>
            </li>
            <li>
              <a href="#">Media Center</a>
            </li>
          </ul>
        </div>

        {/* Policies Section */}
        <div>
          <h3 className="text-white mb-2 font-semibold">POLICIES</h3>
          <ul className="space-y-1">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Agreement</a>
            </li>
            <li>
              <a href="#">Legal Notices</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
        © 2025 JFLIX | Online Movie Streaming <br />
        Site created by{' '}
        <a href="#" className="underline">
          Junyl Cabusas
        </a>
      </div>
    </footer>
  );
}

export default Footer;
