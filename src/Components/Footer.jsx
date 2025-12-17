import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">

                {/* Brand */}
                <aside>
                    <h2 className="text-2xl font-bold">ClubSphere</h2>
                    <p className="max-w-xs">
                        Connecting students and communities through clubs, events, and shared interests.
                    </p>
                    <p className="text-sm mt-2">© {new Date().getFullYear()} ClubSphere. All rights reserved.</p>
                </aside>

                {/* Platform */}
                <nav>
                    <h6 className="footer-title">Platform</h6>
                    <a className="link link-hover">Browse Clubs</a>
                    <a className="link link-hover">Create a Club</a>
                    <a className="link link-hover">Upcoming Events</a>
                    <a className="link link-hover">Membership Plans</a>
                </nav>

                {/* Company */}
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About ClubSphere</a>
                    <a className="link link-hover">Contact Us</a>
                    <a className="link link-hover">Careers</a>
                    <a className="link link-hover">Privacy Policy</a>
                </nav>

                {/* Social */}
                <nav>
                    <h6 className="footer-title">Connect With Us</h6>
                    <div className="grid grid-flow-col gap-4">

                        {/* Twitter/X */}
                        <a aria-label="Twitter">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775
                            1.017-.609 1.798-1.574 2.165-2.724
                            -.951.564-2.005.974-3.127 1.195
                            -.897-.957-2.178-1.555-3.594-1.555
                            -3.179 0-5.515 2.966-4.797 6.045
                            -4.091-.205-7.719-2.165-10.148-5.144
                            -1.29 2.213-.669 5.108 1.523 6.574
                            -.806-.026-1.566-.247-2.229-.616
                            -.054 2.281 1.581 4.415 3.949 4.89
                            -.693.188-1.452.232-2.224.084
                            .626 1.956 2.444 3.379 4.6 3.419
                            -2.07 1.623-4.678 2.348-7.29 2.04
                            2.179 1.397 4.768 2.212 7.548 2.212
                            9.142 0 14.307-7.721 13.995-14.646
                            .962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                        </a>

                        {/* YouTube */}
                        <a aria-label="YouTube">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0
                            -3.897.266-4.356 2.62-4.385 8.816
                            .029 6.185.484 8.549 4.385 8.816
                            3.6.245 11.626.246 15.23 0
                            3.897-.266 4.356-2.62 4.385-8.816
                            -.029-6.185-.484-8.549-4.385-8.816z
                            M9 16v-8l8 3.993-8 4.007z"/>
                            </svg>
                        </a>

                        {/* Facebook */}
                        <a aria-label="Facebook">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                className="fill-current">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4
                            v-1.667c0-.955.192-1.333 1.115-1.333
                            h2.885v-5h-3.808c-3.596 0-5.192 1.583
                            -5.192 4.615v3.385z"/>
                            </svg>
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;