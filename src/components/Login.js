import { useState } from "react"
import axios from 'axios';
import {toast} from 'react-toastify'

export const Login = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    

    const handleChangeEvent = (key, value) => {
        setValues({
            ...values,
            [key]: value
        })
    }


    const handleSubmit = () => {
        axios({
            method: "POST",
            url: "https://api.backendless.com/5297FB31-631D-42CA-FFA5-0DB47479DB00/D254504B-C041-4C9F-BAE9-958367DEA67A/users/login",
            data: {
                "login": values.email,
                "password": values.password
            }
        }).then((res) => {
            if(res.data["user-token"]){
                // save
                localStorage.setItem("AUTH_TOKEN", res.data["user-token"])
                //redirect
                window.location.href = "/feed"
            }


        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }

    return(
        <>
            <h1>Login Here</h1>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <div style={{width: 500, }}>
                    <div class="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            class="form-control"
                            placeholder="name@example.com"
                            value={values.email}
                            onChange={(event) => { handleChangeEvent("email", event.target.value) }}
                        />
                    </div>

                    <div class="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            class="form-control"
                            value={values.password}
                            onChange={(event) => { handleChangeEvent("password", event.target.value) }}
                        />
                    </div>
                </div>

            </div>
            <button style={{marginTop: 20}} className="btn btn-primary" onClick={handleSubmit}>Login</button><br />
            <a href="/signup">Don't have an account? Sigup here</a>
        </>
    )
}
