import React from "react";
import Card from './Card';
import {api} from '../utils/Api';

export default function Main(props) {
    const [userName, setUserName] = React.useState("");

    const [userDescription, setUserDescription] = React.useState("");
  
    const [userAvatar, setUserAvatar] = React.useState("");
  
    const [cards, setCards] = React.useState([]);

    React.useEffect( () => {
        Promise.all([
            api.getInitalCards(),
            api.getProfileInfo()
        ])
           .then((result ) => {
               const [cardData, userData] = result;
            setUserName(userData.name);
            setUserDescription(userData.about);
            setUserAvatar(userData.avatar);
            setCards(cardData);
           })
            .catch((err) => {
                console.log(err)
            })
    })

    return (
        <main className="content">
                <section className="profile">
                    <button className="profile__change-btn" type="button" onClick={props.onEditAvatar}>
                    <img className="profile__pic" src={userAvatar} alt="Фото профиля" />
                    </button>
                    <div className="profile__info">
                        <div className="profile__name-edit">
                            <h1 className="profile__name">{userName}</h1>
                            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                        </div>
                        <h2 className="profile__description">{userDescription}</h2>
                    </div>
                    <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
                </section>
                <section className="elements">
                    
                        {cards.map((card) => (
                            <Card card={card} onCardClick={props.onCardClick} key={card._id} />
                        ))}
                    
                </section>
            </main>
    )
}