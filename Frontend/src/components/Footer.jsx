import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-900 to-black text-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-4">Election Tracker</h3>
                        <p className="text-gray-300 text-sm">
                            Your trusted source for real-time election updates and comprehensive coverage.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center">
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <div className="text-gray-300 hover:text-white cursor-pointer">About Us</div>
                            <div className="text-gray-300 hover:text-white cursor-pointer">Contact</div>
                            <div className="text-gray-300 hover:text-white cursor-pointer">Privacy Policy</div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center md:text-right">
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <div className="text-gray-300 space-y-2">
                            <p>Email: info@electiontracker.com</p>
                            <p>Phone: +1 (123) 456-7890</p>
                            <p>Location: New Delhi, India</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Election Tracker. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
