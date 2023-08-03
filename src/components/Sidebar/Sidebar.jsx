import { CloseButton, OverlayTrigger, Tooltip } from "react-bootstrap";
import css from './Sidebar.module.css';
import { useState } from "react";

const Sidebar = ({ arrayOfCategories, filter, clear, filteredByCat }) => {
    const [active, setActive] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleClickColorChange = (cat) => {
        setActive(cat);
        setShowDropdown(false);
    };

    const handleClear = () => {
        clear();
        setActive('');
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const tooltipTxt = "Remove selected category";

    const renderTooltip = (props) => (
        <Tooltip id="close-tooltip" {...props}>
            {tooltipTxt}
        </Tooltip>
    );

    return (
        <div className={css.Wrap}>
            <nav className={showDropdown ? css.MobileDropdown : ''}>
                <div className={css.MobileHeader} onClick={toggleDropdown}>
                    {active || "Select a Category"}
                </div>
                {showDropdown && (
                    <ul className={css.MobileMenu}>
                        {arrayOfCategories.map((cat) => (
                            <li
                                key={Math.random()}
                                className={active === cat ? css.Active : ''}
                                onClick={() => { filter(cat); handleClickColorChange(cat); }}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                )}
                {filteredByCat.length > 0 ? (
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <CloseButton onClick={handleClear} />
                    </OverlayTrigger>
                ) : null}
            </nav>
        </div>
    );
};

export { Sidebar };
