export default function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    return(
            <article className="element" id={props.id}>
                <button type="button" className="element__button-delete"></button>
                <img className="element__image" alt={props.card.name} src={`${props.card.link}`} onClick={handleClick} />
                <div className="element__box">
                    <h2 className="element__title">{props.card.name}</h2>
                    <div className="element__like_box">
                        <button type="button" className="element__like"></button>
                        <span className="element__counter">{props.card.likes.length}</span>
                    </div>
                    
                </div>
            </article>
            
    )
}