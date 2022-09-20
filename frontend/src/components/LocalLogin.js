import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function LocalLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authenticate, setAuthenticate] = useOutletContext();
    const navigate = useNavigate();

    function handleChange(e, stateSetter, value) {
        e.preventDefault();
        stateSetter(value);
    }

    function submitForm(e) {
        e.preventDefault();
        if (username === "") {
            console.log("User didn't type his or her name.");
            alert("No user name is typed.");
        }
        else if (password === "") {
            console.log("User didn't type his or her password.");
            alert("No password is typed.");
        }
        else {
            let formdata = new FormData();
            formdata.append("username", username);
            formdata.append("password", password);

            fetch(`${API_URL}/login/local`, {
                method: "POST",
                body: formdata
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    fetch(`${API_URL}/authenticate-checker`)
                        .then(response => response.json())
                        .then((data) => {
                            console.log(data);
                            setAuthenticate(data.authenticate);
                            navigate("/");
                        })
                })
                .catch((error) => {
                    console.log(error);
                    navigate("/"); // need to redirect to a path to a page for error handling
                })


        }
    }


    return (
        <div>
            <form encType="multipart/form-data" onSubmit={(e) => submitForm(e)}>
                <div className="form-container">
                    <div className="other-information">
                        <div className="information-detail">
                            <label htmlFor="username">{"USERNAME:"}</label>
                            <br />
                            <input type="text" name="username" onChange={(e) => { handleChange(e, setUsername, e.target.value) }}></input>
                        </div>
                        <div className="information-detail">
                            <label htmlFor="password">{"PASSWORD:"}</label>
                            <br />
                            <input type="text" name="password" onChange={(e) => { handleChange(e, setPassword, e.target.value) }}></input>
                        </div>
                        <div className="information-detail">
                            <button type="submit">Log in</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LocalLogin;