import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'react-validation';
import FormRenderer from 'react-validation/build/form-renderer/bootstrap';
import { required, email, password, confirmPassword } from './validators';

const EmployeeForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const handleSubmit = (event, errors) => {
    event.preventDefault();
    if (errors && errors.length > 0) return;

    setIsSubmitting(true);

    const employee = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      password: passwordValue,
      confirmPassword: confirmPasswordValue,
    };

    fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
      .then((response) => {
        setIsSubmitting(false);
        if (response.ok) {
          history.push('/confirmation');
        } else {
          response.json().then((data) => alert(`Error: ${data.errors[0].msg}`));
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        alert(`Error: ${error.message}`);
      });
  };

  const handleReset = () => {
    const hasData =
      firstName.trim() ||
      lastName.trim() ||
      emailAddress.trim() ||
      passwordValue.trim() ||
      confirmPasswordValue.trim();
    const resetConfirmed = window.confirm('Are you sure you want to reset the form?');
    if (resetConfirmed && hasData) {
      setFirstName('');
      setLastName('');
      setEmailAddress('');
      setPasswordValue('');
      setConfirmPasswordValue('');
    }
  };

  return (
    <div className="container mt-5">
      <Form
        onSubmit={handleSubmit}
        ref={(c) => (this.form = c)}
        render={(props) => <FormRenderer {...props} />}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <Input
                type="text"
                name="firstName"
                className="form-control"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                validations={[required]}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <Input
                type="text"
                name="lastName"
                className="form-control"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                validations={[required]}
              />
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="emailAddress">Email Address:</label>
          <Input
            type="email"
            name="emailAddress"
            className="form-control"
            value={emailAddress}
            onChange={(event) => setEmailAddress(event.target.value)}
            validations={[required, email]}
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="passwordValue">Password:</label>
          <Input
            type="password"
            name="passwordValue"
            className="form-control"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
            validations={[required, password]}
          />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="confirmPasswordValue">Confirm Password:</label>
          <Input
            type="password"
            name="confirmPasswordValue"
            className="form-control"
            value={confirmPasswordValue}
            onChange={(event) => setConfirmPasswordValue(event.target.value)}
            validations={[required, confirmPassword(passwordValue)]}
          />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12 text-right">
        <Button className="btn btn-primary mr-3" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button className="btn btn-secondary" onClick={handleReset} disabled={isSubmitting}>
          Reset
        </Button>
      </div>
    </div>
  </Form>
</div>
);
};

export default EmployeeForm




/*

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
*/