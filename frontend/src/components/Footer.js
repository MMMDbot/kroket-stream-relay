import React from 'react'

const Footer = () => (
    <footer className="page-footer blue pt-4 bg-dark text-white">
        <div className="container-fluid text-center text-md-left mb-1">
            <div className="row">
                <div className="col-md-6 mt-md-0 mt-1">
                    <h6 className="text-uppercase">Footer Content</h6>
                    <p>
                        Here you can use rows and columns to organize your
                        footer content.
                    </p>
                </div>

                <hr className="clearfix w-100 d-md-none pb-0" />

                <div className="col-md-3 mb-md-0 mb-2">
                    <h6 className="text-uppercase">Links</h6>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#!">Link 1</a>
                        </li>
                        <li>
                            <a href="#!">Link 2</a>
                        </li>
                    </ul>
                </div>

                <div className="col-md-3 mb-md-0 mb-2">
                    <h6 className="text-uppercase">Links</h6>
                    <ul className="list-unstyled">
                        <li>
                            <a href="#!">Link 1</a>
                        </li>
                        <li>
                            <a href="#!">Link 2</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="footer-copyright text-center py-1">
            © 2021 🚀 <a href="https://lolailo.com/">Entreventas Pro</a>
        </div>
    </footer>
)

export default Footer
