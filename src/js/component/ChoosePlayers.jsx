import React, { useState } from "react";

function ChoosePlayers({setPlayerData}) {

    const [player1, setPlayer1] = useState();
    const [player2, setPlayer2] = useState();
    
    function sendDataX() {
        let data = {player1 : player1, player2 : player2, weapon : 'X'}
        setPlayerData(data)
    }

    function sendDataO() {
        let data = {player1 : player1, player2 : player2, weapon : 'O'}
        setPlayerData(data)
    }

    return (
        <div className="contentCP text-center my-3">
            <h1>Choose Your Weapon</h1>
            <div className="d-flex justify-content-center">            
                <input type="text" className="form-control mx-3"  placeholder="Player 1 username" onChange={e => setPlayer1(e.target.value)}/>
                <input type="text" className="form-control mx-3"  placeholder="Player 2 username" onChange={e => setPlayer2(e.target.value)}/>
            </div>
            <div className="d-flex justify-content-center">            
                <div className="x mx-5 btn" onClick={sendDataX}>X</div>
                <div className="o mx-5 btn" onClick={sendDataO}>O</div>
            </div>            
        </div>
    )
};
export default ChoosePlayers;