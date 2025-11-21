export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-solar-gold mb-4">Ultron Solar</h3>
            <p className="text-gray-300 text-sm">
              Leading the way in clean, renewable solar energy solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#home" className="hover:text-solar-gold transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-solar-gold transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-solar-gold transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-solar-gold transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Residential Solar</li>
              <li>Commercial Solar</li>
              <li>Solar Maintenance</li>
              <li>Energy Consulting</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="mailto:info@ultronsolar.in" className="hover:text-solar-gold transition-colors">
                  info@ultronsolar.in
                </a>
              </li>
              <li>India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Ultron Solar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

