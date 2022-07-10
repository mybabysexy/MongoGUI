import React from 'react';
import cs from './style.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {sidebarActions} from "../../reducers/sidebarSlice";

const Header = props => {
    const {active} = useSelector(state => state.sidebar);
    const dispatch = useDispatch();

    const toggleSidebar = () => {
        dispatch(sidebarActions.setSidebar(!active));
    }

    return (
        <button className={`${cs.header__button} ${cs.btn}`} onClick={() => toggleSidebar()}>Menu</button>
    );
}

export default Header;
