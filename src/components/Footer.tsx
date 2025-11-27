import { Globe, Facebook, Twitter, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-20 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Support Column */}
          <div>
            <h3 className="text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <FooterLink label="Help Centre" onClick={() => onNavigate('contact')} />
              <FooterLink label="Get help with a safety issue" />
              <FooterLink label="AirCover" />
              <FooterLink label="Anti-discrimination" />
              <FooterLink label="Disability support" />
              <FooterLink label="Cancellation options" />
              <FooterLink label="Report neighbourhood concern" />
            </ul>
          </div>

          {/* Hosting Column */}
          <div>
            <h3 className="text-gray-900 mb-4">Hosting</h3>
            <ul className="space-y-3">
              <FooterLink label="List your property" onClick={() => onNavigate('host')} />
              <FooterLink label="Host an experience" />
              <FooterLink label="Property management" />
              <FooterLink label="AirCover for Hosts" />
              <FooterLink label="Hosting resources" />
              <FooterLink label="Community forum" />
              <FooterLink label="Hosting responsibly" />
              <FooterLink label="Join a free Hosting class" />
              <FooterLink label="Find a co-host" />
              <FooterLink label="Refer a host" />
            </ul>
          </div>

          {/* Eazypg Column */}
          <div>
            <h3 className="text-gray-900 mb-4">Eazypg</h3>
            <ul className="space-y-3">
              <FooterLink label="2025 Summer Release" />
              <FooterLink label="Newsroom" />
              <FooterLink label="Careers" onClick={() => onNavigate('about')} />
              <FooterLink label="Investors" />
              <FooterLink label="Emergency accommodations" />
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left Side */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span>© 2025 Eazypg, Inc.</span>
              <span>·</span>
              <button className="hover:underline">Privacy</button>
              <span>·</span>
              <button className="hover:underline">Terms</button>
              <span>·</span>
              <button className="hover:underline">Sitemap</button>
              <span>·</span>
              <button className="hover:underline">Company details</button>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm">English (US)</span>
              </button>
              <button className="px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                $ USD
              </button>
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Instagram className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-sm text-gray-700 hover:underline transition-all"
      >
        {label}
      </button>
    </li>
  );
}
