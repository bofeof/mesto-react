import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React, {useEffect, useRef, useState} from 'react'

export default function EditAvatarPopup({isOpen, onClose, onSubmit}){

    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = useRef();

    useEffect(()=>{
        avatarRef.current.value = currentUser.avatar
    }, [isOpen, currentUser])

    function handleAvatarSubmit(evt){
        evt.preventDefault();
        onSubmit({avatar: avatarRef.current.value})
    }

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            buttonSubmitName="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAvatarSubmit}
        >
        <>
            <input
                className="popup__input popup__input_form_avatar"
                type="url"
                name="avatar"
                placeholder="Ссылка на аватар"
                id="url-input-avatar"
                required="required"
                ref = {avatarRef}
            />

            <span className="popup__input-error url-input-avatar-error"></span>
            
        </>

        </PopupWithForm>
    )
}