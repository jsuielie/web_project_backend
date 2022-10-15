import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';;
import Dialog from '@mui/material/Dialog';
import PopoutSignupList from './PopoutSignUpList';
import PopoutSinginList from './PopoutSignInList';
import PopoutSignUpLocal from './PopoutSignUpLocal';
import PopoutSignInLocal from './PopoutSignInLocal';

export default function PopoutSignInSignUpContainer(props) {
    const [toggle, setToggle] = useState("signUpList");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [userImage, setUserImage] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const navigate = useNavigate();


    function handleChange(e, stateSetter, value) {
        e.preventDefault();
        stateSetter(value);
    }

    function onChangeImage(e) {
        let reader = new FileReader();
        e.preventDefault();
        console.log(e.target)
        reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = function () {
            setPreviewImageUrl(reader.result);
            if (reader.readyState == 2) {
                console.log(e.target.files[0]);
                setUserImage(e.target.files[0]);
            }
        };
    }

    function cleanUp() {
        setUsername("");
        setPassword("");
        setLastName("");
        setFirstName("");
        setDisplayName("");
        setUserImage(null);
        setPreviewImageUrl(null);
    }

    function submitSignUpForm(e) {
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
                                    cleanUp();
                                    props.setAuthenticate(data.authenticate);
                                    props.handleCloseDialog();
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

    function submitSignInForm(e) {
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
                            props.setAuthenticate(data.authenticate);
                            if (data.authenticate) {
                                cleanUp();
                                props.handleCloseDialog();
                            }
                            else {
                                alert("invalid user name or password");
                            }
                        })
                })
                .catch((error) => {
                    console.log(error);
                    cleanUp();
                    props.handleCloseDialog();
                })



        }
    }

    return (
        <Dialog
            open={props.open}
            onClose={() => {
                cleanUp();
                props.handleCloseDialog();
                setToggle("signUpList");
            }}
        >
            <PopoutSignupList toggle={toggle} setToggle={setToggle} />
            <PopoutSinginList toggle={toggle} setToggle={setToggle} />
            <PopoutSignUpLocal
                toggle={toggle}
                setToggle={setToggle}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                lastName={lastName}
                setLastName={setLastName}
                firstName={firstName}
                setFirstName={setFirstName}
                displayName={displayName}
                setDisplayName={setDisplayName}
                userImage={userImage}
                setUserImage={setUserImage}
                previewImageUrl={previewImageUrl}
                setPreviewImageUrl={setPreviewImageUrl}
                handleChange={handleChange}
                onChangeImage={onChangeImage}
                cleanUp={cleanUp}
                submitForm={submitSignUpForm} />
            <PopoutSignInLocal
                toggle={toggle}
                setToggle={setToggle}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleChange={handleChange}
                cleanUp={cleanUp}
                submitForm={submitSignInForm} />
        </Dialog>
    );
}
