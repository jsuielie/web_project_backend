import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UnauthorizedAction from "./UnauthorizedAction";


function AddCardForm() {
    const [message, setMessage] = useState("");
    const [cardImage, setCardImage] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const navigate = useNavigate();
    let { boardId } = useParams();


    function updateInput(e, stateSetter, value) {
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
        else if (cardImage === null)
        {
            console.log("Card image is empty!!")
            alert("No image is selected.");
        }
        else {
            console.log('before fetch');

            let formData = new FormData();
            formData.append("message", message);
            formData.append("cardImage", cardImage);
            formData.append("boardId", boardId)

            console.log(formData);

            //const data = { "cardContent": cardContent, "BoardID": BoardID, "senderLastName": senderLastName, "senderFirstName": senderFirstName };

            fetch(`${API_URL}/create-card/?boardId=${boardId}`, {
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
                    alert('Error: fail to write card!!!');
                    navigate(`/board/${boardId}`);
                });



            /*
            console.log("~~This is sender's data and form's children~~");
            console.log(e.target.children);


            e.target.children[2].value = "";
            e.target.children[6].value = "";
            e.target.children[7].value = "";
            setMessage("");
            */
        }
    }
    return (
        <div>
            <form encType="multipart/form-data" onSubmit={(e) => submitCard(e)}>
                <div className="form-container">
                    <div className="text-part">
                        <textarea className="text-area" placeholder="type some CARD MESSAGE here" onChange={(e) => updateInput(e, setMessage, e.target.value)} rows="10"></textarea>
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
    )
}

export default AddCardForm;