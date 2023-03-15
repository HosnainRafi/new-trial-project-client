import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => (
  <div className="container mt-5">
    <div className="row">
      <div className="col-md-12 text-center">
        <h2>Thank you for submitting your information!</h2>
        <p>You will receive an email with further instructions shortly.</p>
        <Link to="/" className="btn btn-primary">
          Back to Form
        </Link>
      </div>
    </div>
  </div>
);

export default Confirmation;