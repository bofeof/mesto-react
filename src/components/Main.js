import userEditInfoIcon from '../images/edit/edit-avatar.png';
import Card from './Card';

export default function Main(props) {
  return (
    <>
      <main className="content">
        <section className="user">
          <div className="user__avatar-container user__avatar-editor" onClick={props.onEditAvatar}>
            <img className="user__avatar" src={props.user.avatar} alt={`Фото пользователя: ${props.user.name}`} />
            <div className="user__avatar-overlay">
              <img className="user__avatar-icon" src={userEditInfoIcon} alt="Иконка редактирования аватара" />
            </div>
          </div>

          <div className="user__info">
            <div className="user__header">
              <h1 className="user__name">{props.user.name}</h1>
              <button type="button" className="user__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="user__job">{props.user.about}</p>
          </div>
          <button className="user__add-button" type="button" onClick={props.onAddPlace}></button>
        </section>

        {/* gallery */}
        <section aria-label="Галлерея мест">
          <ul className="gallery">
            {props.cards.map((card) => {
              return (
                <li className="gallery__item" key={card._id}>
                  <Card card={card} onCardClick={props.onCardClick} />
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
