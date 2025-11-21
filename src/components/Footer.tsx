export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-solar-red mb-4">Ultron Power Systems</h3>
            <p className="text-gray-300 text-sm">
              Your one-stop solution for solar power and solar system installation. 
              Dedicated to providing high-quality and sustainable energy solutions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#home" className="hover:text-energy-green transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-energy-green transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-energy-green transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-energy-green transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-energy-green transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Expert Installations</li>
              <li>Complete Solar Solutions (EPC)</li>
              <li>Flexible Payment Options</li>
              <li>Warranty & Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="mailto:ultronvij@gmail.com" className="hover:text-primary-blue transition-colors">
                  ultronvij@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919422787438" className="hover:text-primary-blue transition-colors">
                  +91 9422787438
                </a>
              </li>
              <li className="pt-2">
                Kanishka Apartment, Kshire Colony<br />
                Deopur, Dhule, Maharashtra 424002
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Ultron Power Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

