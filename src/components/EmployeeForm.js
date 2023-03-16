import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const schema = yup.object().shape({
    name: yup.string().required("Name is required").min(5, "Name must be at least 5 characters"),
    familyName: yup.string().required("Family name is required").min(5, "Family name must be at least 5 characters"),
    address: yup.string().required("Address is required").min(10, "Address must be at least 10 characters"),
    emailAddress: yup.string().required("Email address is required").email("Email address must be valid"),
    age: yup.number().required("Age is required").min(20, "Age must be between 20 and 60").max(60, "Age must be between 20 and 60"),
});


const EmployeeForm = () => {

    
    const { register, handleSubmit, formState: { errors }, reset,watch } = useForm({ resolver: yupResolver(schema) });
    const navigate = useNavigate();
    const fields = watch();

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await fetch('https://new-trial-project-server.up.railway.app/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error(`Failed to create employee: ${response.status} ${await response.text()}`);
            }

            Swal.fire({
                title: 'Success!',
                text: 'Employee added successfully',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/confirmation');
            });

        } catch (err) {
            console.error(err);
            Swal.fire("Error", err.message, "error");
        }
    };


    const isDisabled = Object.values(fields).every((value) => !value);

    const handleReset = () => {
        if (Object.values(fields).every((value) => value)) {
            // All fields are blank, disable the reset button
            return;
        }

        Swal.fire({
            title: 'Are you sure you want to reset?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                reset();
            }
        });
    };

    return (
        <div className='container mt-5'>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Create Employee</h2>
                    <hr />


                    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Form.Group controlId="formName" className="mt-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Type your Name" {...register("name")} isInvalid={errors.name} />
                            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formFamilyName" className="mt-2">
                            <Form.Label>Family Name</Form.Label>
                            <Form.Control type="text" placeholder="Type your Family Name" {...register("familyName")} isInvalid={errors.familyName} />
                            <Form.Control.Feedback type="invalid">{errors.familyName?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formAddress" className="mt-2">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Type your Address" {...register("address")} isInvalid={errors.address} />
                            <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formEmailAddress" className="mt-2">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Type your email" {...register("emailAddress")} isInvalid={errors.emailAddress} />
                            <Form.Control.Feedback type="invalid">{errors.emailAddress?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formAge" className="mt-2">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder="Enter your Age" {...register("age")} isInvalid={errors.age} />
                            <Form.Control.Feedback type="invalid">{errors.age?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formHired" className="mt-2">
                            <input
                                id="hired"
                                type="checkbox"
                                {...register("hired", { required: true })}
                            /> Hired?
                        </Form.Group>

                        <div className="mt-3">
                            <Button variant="primary" type="submit" disabled={!Object.values(errors).every((value) => value === undefined)}>

                                Submit
                            </Button>{" "}
                            <Button variant="danger" type="button" onClick={handleReset} disabled={isDisabled}>
                                Reset
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;