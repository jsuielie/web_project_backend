import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function EditCard() {
    const location = useLocation();
    const {props} = location.state;
    const [boardId, setBoardId] = useState(props.boardId);
    const [cardId, setCardId] = useState(props.cardId);
    const [message, setMessage] = useState(props.message);
    const [cardImage, setCardImage] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(props.imageUrl);
    const navigate = useNavigate();


    function updateInput(e, stateSetter, value) {
        e.preventDefault();
        console.log(value);
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
        setCardImage(e.target.files[0]);
        console.log(url)
    }

    function submitCard(e) {
        e.preventDefault();
        if (message === "") {
            console.log("Message is empty!!")
            alert("No message is typed.");
        }
        else {
            console.log('before fetch');
            console.log("boardId", boardId, "cardId", cardId);
            let formData = new FormData();
            formData.append("message", message);
            formData.append("cardImage", cardImage);

            console.log(formData);

            fetch(`${API_URL}/edit-card/?cardId=${cardId}`, {
                method: 'POST', // or 'PUT'
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data.cardId);
                    navigate(`/board/${boardId}`);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Error: fail to edit card!!!');
                    navigate(`/board/${boardId}`);
                });
        }
    }

    return (
        <div>
            <form encType="multipart/form-data" onSubmit={(e) => submitCard(e)}>
                <div className="form-container">
                    <div className="text-part">
                        <textarea className="text-area" value={message} onChange={(e) => updateInput(e, setMessage, e.target.value)} rows="10"></textarea>
                    </div>
                    <div className="other-information">
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


export default EditCard;