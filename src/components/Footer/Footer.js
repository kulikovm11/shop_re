import css from './FooterStyle.module.css'
import instagram from './img/instagram.png'
import telegram from './img/telegram.png'
import viber from './img/viber.png'

const Footer = () => {
    return (
        <div className={css.Footer}>
            <div>
                <p>©MarketPlace 2023 by MK</p>
            </div>
            <div>
                <p>Privacy politic</p>
            </div>

            <div>
                <p>Found a bug? Tell us.</p>
            </div>

            <div className={css.Social}>
                <img src={instagram} alt="instagram"/>
                <img src={telegram} alt="telegram"/>
                <img src={viber} alt="viber"/>
            </div>
        </div>
    );
};

export {Footer};