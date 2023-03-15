import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        familyName: '',
        address: '',
        countryOfOrigin: '',
        emailAddress: '',
        age: '',
        hired: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (formIsValid()) {
            try {
                const response = await fetch('http://localhost:5000/api/employees', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                console.log(data);

                setIsSubmitting(false);
                Swal.fire({
                    title: 'Success!',
                    text: 'Employee added successfully',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    history.push('/confirmation');
                });

            } catch (error) {
                console.log(error);
                setIsSubmitting(false);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        } else {
            setIsSubmitting(false);
        }
    };

    const formIsValid = () => {
        let isValid = true;

        // Check for required fields
        for (let property in formData) {
            if (!formData[property]) {
                isValid = false;
                break;
            }
        }

        // Validate email format
        if (formData.emailAddress) {
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!emailRegex.test(formData.emailAddress)) {
                isValid = false;
            }
        }

        // Validate age is between 20 and 60
        if (formData.age) {
            const age = parseInt(formData.age);
            if (isNaN(age) || age < 20 || age > 60) {
                isValid = false;
            }
        }

        return isValid;
    };

    const checkBtn = useRef(null);
    const form = useRef(null);

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <h2>Create Employee</h2>
                    <hr />
                    <form onSubmit={handleSubmit} ref={form} className='mt-4'>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                className='form-control'
                                name='name'
                                value={formData.name}
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='familyName'>Family Name</label>
                            <input
                                type='text'
                                className='form-control'
                                name='familyName'
                                value={formData.familyName}
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='address'>Address</label>
                            <input
                                type='text'
                                className='form-control'
                                name='address'
                                value={formData.address}
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='countryOfOrigin'>Country of Origin</label>
                            <input
                                type='text'
                                className='form-control'
                                name='countryOfOrigin'
                                value={formData.countryOfOrigin}
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='emailAddress'>Email Address</label>
                            <input
                                type='email'
                                className='form-control'
                                name='emailAddress'
                                value={formData.emailAddress}
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='age'>Age</label>
                            <input
                                type='number'
                                className='form-control'
                                name='age'
                                value={formData.age}
                                onChange={onChange}
                            />
                        </div>
                        <div className='form-group form-check'>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                id='hired'
                                name='hired'
                                checked={formData.hired}
                                onChange={(e) => setFormData({ ...formData, hired: e.target.checked })}
                            />
                            <label className='form-check-label' htmlFor='hired'>
                                Hired
                            </label>
                        </div>
                        <div className='form-group'>
                            <button
                                className='btn btn-primary btn-block'
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className='spinner-border spinner-border-sm'></span>
                                ) : (
                                    <span>Create Employee</span>
                                )}
                            </button>
                        </div>
                    </form>
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;