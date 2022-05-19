import React, {useContext} from 'react';
import cs from './style.module.scss';
import DataContext from "../../contexts/DataContext";

const Header = props => {
    const {data, setData} = useContext(DataContext);

    const toggleSidebar = () => {
        setData(prev => {
            return {
                ...prev,
                activeSidebar: !data.activeSidebar
            }
        });
    }

    return (
        <button className={`${cs.header__button} ${cs.btn}`} onClick={() => toggleSidebar()}>Menu</button>
    );
}

export default Header;