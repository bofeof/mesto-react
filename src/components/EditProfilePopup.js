import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, {useState, useEffect} from 'react';

export default function EditProfilePopup({isOpen, onClose, onSubmit}){

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    // update inputs
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [isOpen, currentUser]); 

    function handleUserChange(evt){
        const value = evt.target.value;
        if (evt.target.name === 'name'){
            setName(value)
        } else {
            setDescription(value)
        }
    }

    function handleUserSubmit(evt){
        evt.preventDefault();
        onSubmit({name: name, about: description});
        onClose();
    }

    return (
        <PopupWithForm
            name="edit-user"
            title="Редактировать профиль"
            buttonSubmitName="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleUserSubmit}
            >
            <>
                <input
                className="popup__input popup__input_form_name"
                type="text"
                name="name"
                id="username-input"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required="required"
                onChange={handleUserChange}
                value = {name || 'Name'}
                />
                <span className="popup__input-error username-input-error"></span>

                <input
                className="popup__input popup__input_form_job"
                type="text"
                name="about"
                id="jobinfo-input"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required="required"
                onChange={handleUserChange}
                value = {description || 'Bio'}
                />
                <span className="popup__input-error jobinfo-input-error"></span>
            </>
        </PopupWithForm>
    )

    
}

