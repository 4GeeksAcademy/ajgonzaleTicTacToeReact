import React from "react";

function Board({checkGame,game}) {

    function sendData(x,y) {
        let data = {x : x, y: y}
        checkGame(data);
    }

    return (
        <div>
            <div className="row align-items-start">
                <div className="col weapon border-end border-bottom" onClick={e => {sendData(0,0)}}>
                    {game[0][0]}
                </div>
                <div className="col weapon border-top-0 border" onClick={e => {sendData(0,1)}}>
                    {game[0][1]}
                </div>
                <div className="col weapon border-start border-bottom" onClick={e => {sendData(0,2)}}>
                    {game[0][2]}
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col weapon border border-start-0" onClick={e => {sendData(1,0)}}>
                    {game[1][0]}
                </div>
                <div className="col weapon border" onClick={e => {sendData(1,1)}}>
                    {game[1][1]}    
                </div>
                <div className="col weapon border border-end-0" onClick={e => {sendData(1,2)}}>
                    {game[1][2]}
                </div>
            </div>
            <div className="row align-items-start">
                <div className="col weapon border-top border-end" onClick={e => {sendData(2,0)}}>
                    {game[2][0]}
                </div>
                <div className="col weapon border border-bottom-0" onClick={e => {sendData(2,1)}}>
                    {game[2][1]}
                </div>
                <div className="col weapon border-top border-start" onClick={e => {sendData(2,2)}}>
                    {game[2][2]}
                </div>
            </div>
        </div>
    )
};
export default Board;