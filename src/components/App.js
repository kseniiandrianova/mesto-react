import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
      }
      function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
      }
      function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
      }
      function handleCardClick(card) {
        setSelectedCard(card);
      }

      function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
      }

  return (
    <body class="page">
    <div className="page__container">
            <Header />
            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick}  onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick}/>
            <PopupWithForm name="edit-avatar" title="Обновить аватар" submitText="Сохранить" isOpen={isEditAvatarPopupOpen && 'popup_opened'} onClose={closeAllPopups}>
    

                <input id="card-link" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_photo" name="card-link" required />
                <span className="error" id="card-link-error"></span>
            
       
    </PopupWithForm>
    <PopupWithForm name="edit-profile" title="Редактировать профиль" submitText="Сохранить" isOpen={isEditProfilePopupOpen && 'popup_opened'} onClose={closeAllPopups} >
    
            
                <input id="profile-name" type="text" value="Жак-Ив Кусто" className="popup__input popup__input_name" name="profile-name" minlength="2"
                maxlength="40" required />
                <span className="error" id="profile-name-error"></span>
                <input id="profile-description" type="text" value="Исследователь океана" className="popup__input popup__input_description" name="profile-description" minlength="2"
                maxlength="200" required />
                <span className="error" id="profile-description-error"></span>
           
       
    </PopupWithForm>

    <PopupWithForm name="add-cards" title="Новое место" submitText="Создать" isOpen={isAddPlacePopupOpen && 'popup_opened'} onClose={closeAllPopups}>
    
                <input id="card-name" type="text" placeholder="Название" className="popup__input popup__input_name-card" name="card-name" minlength="2"
                maxlength="30" required />
                <span className="error" id="card-name-error"></span>
                <input id="card-picture" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_link" name="card-link" required />
                <span className="error" id="card-error"></span>
        
    </PopupWithForm>
        
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        
    <PopupWithForm name="remove-card" title="Вы уверены?">
    <section className="popup popup_question">
            <div className="popup__container popup__form_question popup__form" name="form-container">
                <button className="popup__button-close popup__close-question" type="reset"></button>
                <button className="popup__button-save popup__button" type="submit">Да</button>
            </div>
        </section>
    </PopupWithForm> 
        
            <Footer />
            
    </div>
    </body>
    
  );
}

export default App;
