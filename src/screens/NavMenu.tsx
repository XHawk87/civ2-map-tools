import React from "react";
import {Link} from 'react-router-dom';

export default function NavMenu() {
    return (
        <div className="App-header">
            <h2>Civ 2 Map Tools</h2>
            <div className="NavMenu-grid">
                <div>
                    <Link to="/waterways">Convert Map to Waterways</Link>
                </div>
            </div>
        </div>
    );
}
