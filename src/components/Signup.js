import { useState } from "react";
import { object, string } from 'yup';
import "./index.css"
import axios from 'axios';

const signupSchema = object({
    name: string().min(1).max(20, 'Too long!').required('Required'),
    email: string().email().required('Required'),
    password: string().min(4).max(10).required('Required'),
    confirmPassword: string().min(4).max(10).required('Required').test(
        'validate-confirm-password',
        'Not matching password',
        function(confirmPass){
            return this.parent.password == confirmPass;
        }
    ),
})


export const Signup = () => {

    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    })


    const [errors, setErrors] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    })


    const handleChangeEvent = (key, value) => {
        //value update
        setValues({
            ...values,
            [key]: value
        })


        if(errors[key]){
            setErrors({
                ...errors,
                [key]: ''
            })
        }

    }


    const signupUser = () => {
        axios({
            method: "POST",
            url: "https://api.backendless.com/5297FB31-631D-42CA-FFA5-0DB47479DB00/D254504B-C041-4C9F-BAE9-958367DEA67A/users/register",
            data: {
                name: values.name,
                email: values.email,
                password: values.password
            }
        }).then((res) => {
            window.location.href = "/login"
        }).catch((error) => {
            alert("Failed")
        })
    }

    const handleSubmit = () => {
        signupSchema.validate(values, {abortEarly: false})
        .then((res) => {
            setErrors({})
            signupUser()
        }).catch((validErr) => {
            let errorObj = {};
            validErr.inner.forEach(validErrror => {
                errorObj[validErrror.path] = validErrror.message;
            });
            setErrors(errorObj)
        })
    }

    return(
        <>
            <h1>Signup Here</h1>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <div style={{width: 500, }}>
                    <div class="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            class="form-control"
                            value={values.email}
                            placeholder="name@example.com"
                            onChange={(event) => {
                                handleChangeEvent('email', event.target.value)
                            }}
                        />
                        <p className="text-danger">{errors["email"]}</p>
                    </div>

                    <div class="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Your Name"
                            value={values.name}
                            onChange={(event) => {
                                handleChangeEvent('name', event.target.value)
                            }}
                        />
                        <p className="text-danger">{errors["name"]}</p>
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input
                            type="text"
                            class="form-control"
                            value={values.password}
                            onChange={(event) => {
                                handleChangeEvent('password', event.target.value)
                            }}
                        />
                        <p className="text-danger">{errors["password"]}</p>
                    </div>

                    <div class="form-group">
                        <label>Password Confirm</label>
                        <input
                            type="text"
                            class="form-control"
                            value={values.confirmPassword}
                            onChange={(event) => {
                                handleChangeEvent('confirmPassword', event.target.value)
                            }}
                        />
                        <p className="text-danger">{errors["confirmPassword"]}</p>
                    </div>
                </div>

            </div>
            <button
                style={{marginTop: 20}}
                className="btn btn-primary"
                onClick={handleSubmit}
                >Signup</button><br />
            <a href="/login">Already have an account? Login here</a>
        </>
    )
}

