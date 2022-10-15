import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";


function LocalSignup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [userImage, setUserImage] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const [authenticate, setAuthenticate] = useOutletContext();
    const navigate = useNavigate();

    function handleChange(e, stateSetter, value) {
        e.preventDefault();
        stateSetter(value);
    }

    function onChangeImage(e) {
        let reader = new FileReader();
        e.preventDefault();
        console.log(e.target)
        var url = reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = function (e) {
            setPreviewImageUrl(reader.result)

        };
        setUserImage(e.target.files[0]);
        console.log(url)
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
        else if (lastName === "") {
            console.log("User didn't type his or her last name.");
            alert("No last name is typed.");
        }
        else if (firstName === "") {
            console.log("User didn't type his or her first name.");
            alert("No first name is typed.");
        }
        else if (displayName === "") {
            console.log("User didn't type his or her display name.");
            alert("No display name is typed.");
        }
        else if (userImage === null) {
            console.log("User image is empty!!")
            alert("No user image is selected.");
        }
        else {
            let formdata = new FormData();
            formdata.append("username", username);
            formdata.append("password", password);
            formdata.append("lastName", lastName);
            formdata.append("firstName", firstName);
            formdata.append("displayName", displayName);
            formdata.append("userImage", userImage);

            let authFormData = new FormData();
            authFormData.append("username", username);
            authFormData.append("password", password);

            fetch(`${API_URL}/local-sign-up`, {
                method: "POST",
                body: formdata
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);

                    fetch(`${API_URL}/login/local`, {
                        method: "POST",
                        body: authFormData
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
                            <label htmlFor="lastName">{"LAST NAME:"}</label>
                            <br />
                            <input type="text" name="lastName" onChange={(e) => { handleChange(e, setLastName, e.target.value) }}></input>
                        </div>
                        <div className="information-detail">
                            <label htmlFor="firstName">{"FIRST NAME:"}</label>
                            <br />
                            <input type="text" name="firstName" onChange={(e) => { handleChange(e, setFirstName, e.target.value) }}></input>
                        </div>
                        <div className="information-detail">
                            <label htmlFor="displayName">{"DISPLAY NAME:"}</label>
                            <br />
                            <input type="text" name="displayName" onChange={(e) => { handleChange(e, setDisplayName, e.target.value) }}></input>
                        </div>
                        <div className="information-detail">
                            <input type="file" accept="image/*" onChange={(e) => onChangeImage(e)} />
                            {previewImageUrl ? <img src={previewImageUrl} /> : ""}
                        </div>
                        <div className="information-detail">
                            <button type="submit">Submit!</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LocalSignup;