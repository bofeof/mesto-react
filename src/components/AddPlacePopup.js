import PopupWithForm from './PopupWithForm';
import React, {useEffect, useState} from 'react';

export default function AddPlacePopup({isOpen, onClose, onSubmit}){

    const [cardName, setCardName] = useState('');
    const [cardLink, setCardLink] = useState('');


    useEffect(()=>{
        setCardName('')
        setCardLink('')
    }, [isOpen])

    function handleCardChange(evt){
        const value = evt.target.value
        if (evt.target.name === 'name'){
            setCardName(value);
        } else {
            setCardLink(value);
        }
    }

    function handleCardSubmit(evt){
        evt.preventDefault();
        onSubmit({name: cardName, link: cardLink});
        onClose();
    }

    return (
        <PopupWithForm
        name="create-card"
        title="Новое место"
        buttonSubmitName="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCardSubmit}
    >
        <>
        <input
            className="popup__input popup__input_form_photoname"
            type="text"
            name="name"
            id="photoname-input"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required="required"
            value = {cardName}
            onChange = {handleCardChange}
        />
        <span className="popup__input-error photoname-input-error"></span>

        <input
            className="popup__input popup__input_form_photolink"
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            id="url-input"
            required="required"
            value = {cardLink}
            onChange = {handleCardChange}
        />
        <span className="popup__input-error url-input-error"></span>
        </>
    </PopupWithForm>

    )

}