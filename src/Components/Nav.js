import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props, {match}) => (
    <nav className="main-nav">
        <ul>
            <li><NavLink to="/search/fireworks" onClick={() =>props.getPhoto('fireworks')}>Fireworks</NavLink></li>
            <li><NavLink to='/search/presents' onClick={() =>props.getPhoto('presents')}>Presents</NavLink></li>
            <li><NavLink to='/search/feathers' onClick={() =>props.getPhoto('feathers')}>Feathers</NavLink></li>
        </ul>
    </nav> 
);

export default Nav;