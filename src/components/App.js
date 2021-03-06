import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';



function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect( () => {
      Promise.all([
          api.getInitalCards(),
          api.getProfileInfo()
      ])
         .then((result ) => {
          const [cardData, userData] = result;
          setCurrentUser(userData);
          setCards(cardData);
         })
          .catch((err) => {
              console.log(err)
          })
  }, [])

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

      function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        if (!isLiked) {
          api.addLike(card._id).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
            console.log(err)
        });
        } else {
          api.deleteLike(card._id).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
          })
          .catch((err) => {
            console.log(err)
        });
        }
        
        }

      function handleCardDelete(card) {
      api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards
        .filter(item => item._id !== card._id))
        })
        .catch((err) => {
          console.log(err)
      })
      }
      
      function handleUpdateUser(e) {
        api.saveProfileInfo(e)
        .then((userData) => {
          setCurrentUser(userData)
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err)
        })
      }
      
      function handleUpdateAvatar(userData) {
        api.saveAvatar(userData)
        .then((result) => {
          setCurrentUser(result);
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err)
        })
      }
      function handleAddPlace(cardData) {
        api.addCard(cardData)
        .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
    }
    return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
            <Header />
            <Main 
            cards = {cards}
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick}  
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick}
            onCardLike = {handleCardLike}
            onCardDelete = {handleCardDelete}
            />
            <EditProfilePopup 
            isOpen={isEditProfilePopupOpen && 'popup_opened'} 
            onClose={closeAllPopups}  
            onUpdateUser = {handleUpdateUser}
            />
            <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen && 'popup_opened'} 
            onClose={closeAllPopups} 
            onUpdateAvatar = {handleUpdateAvatar} 
            />
            <AddPlacePopup 
                isOpen={isAddPlacePopupOpen && 'popup_opened'} 
                onClose={closeAllPopups} 
                onAddPlace = {handleAddPlace} 
            />
            <ImagePopup 
            onClose={closeAllPopups} 
            card={selectedCard}
            />
            <PopupWithForm className="remove-card" title="???? ???????????????">
              <section className="popup popup_question">
                <div className="popup__container popup__form_question popup__form" name="form-container">
                </div>
              </section>
            </PopupWithForm> 
            <Footer />
            
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
