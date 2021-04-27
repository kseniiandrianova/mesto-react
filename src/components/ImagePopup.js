import React from "react";

export default function ImagePopup({card, onClose}) {
    function handleClickClose(evt) {
        if (evt.target === evt.currentTarget) {
          onClose();
        }
    }
    return( 
          <section className={`popup popup_pictures ${card && 'popup_opened'}`} onClick={handleClickClose}>
            <div className="popup__container popup__container_pictures">
                <button className="popup__button-close popup__close-picture" type="reset" onClick={onClose}></button>
                <figure className="popup__wrapper">
                    <img className="popup__image" src={`${card?.link}`} alt="Фотография" />
                    <figcaption className="popup__caption">{card?.name}</figcaption>
                </figure>
            </div>
        </section>
    )
}