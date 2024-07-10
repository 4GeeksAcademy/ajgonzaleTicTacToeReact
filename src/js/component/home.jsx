import React, { useState, useEffect } from "react";

import ChoosePlayers from "./ChoosePlayers";
import Instruction from "./Instruction";
import Board from "./Board";
import Parent from "./Parent";
import { func } from "prop-types";

const Home = () => {

	const [message, setMessage] = useState('');
	const [player1username, setPlayer1username] = useState('');
	const [player2username, setPlayer2username] = useState('');
	const [gameTime, setGameTime] = useState('');
	const [currentPlayer, setCurrentPlayer] = useState('');
	const [currentWeapon, setCurrentWeapon] = useState('');
	const [game, setGame] = useState([['','',''],['','',''],['','','']]);
	const [winner, setWinner] = useState('false');
	
	useEffect(() => {
			resetGame();		
		}, []);

	useEffect(() => {
		winner == 'true' ? setMessage(currentWeapon+' Wins!, '+currentPlayer+' congrats!') : tooglePlayer();
	}, [game]);

	function getPlayerData(data) {
		setPlayer1username(data.player1);
		setPlayer2username(data.player2);
		setCurrentPlayer(data.player1);
		setCurrentWeapon(data.weapon);
		setMessage('It is '+data.weapon+' turn, '+data.player1 + ' go ahead!');
		setGameTime(true);
	}

	function resetGame() {
		setPlayer1username(null);
		setPlayer2username(null);
		setMessage('Pick a Weapon');	
		setGameTime(false);
	}

	function checkGame(data) {
		
		if (winner == 'true') {
			setMessage("Game Over,"+currentPlayer+' is the winner!' );
			return '';
		} else if (game[data.x][data.y] != '') {
			setMessage("Try an empty position " + currentPlayer + "  it's still your turn.");
			return '';
		} else {
			let cGame = game.map(row => [...row]);
			cGame[data.x][data.y] = currentWeapon;
			setGame(cGame);
			let x1 = getNextIndex(data.x);
			let x2 = getNextIndex(x1);
			let y1 = getNextIndex(data.y);
			let y2 = getNextIndex(y1);

			//check horizontally
			cGame[x1][data.y] == currentWeapon && cGame[x2][data.y] == currentWeapon ? setWinner('true') :
			//check vertically
			cGame[data.x][y1] == currentWeapon && cGame[data.x][y2] == currentWeapon ? setWinner('true')  :
			//check diagonals
			cGame[0][0] == currentWeapon && cGame[1][1] == currentWeapon && cGame[2][2] == currentWeapon ? 
			setWinner('true') : 
			cGame[0][2] == currentWeapon && cGame[1][1] == currentWeapon && cGame[2][0] == currentWeapon ? setWinner('true') : setWinner('false');
						
			return '';
		}	
	}

	function getNextIndex(index) {
		if (index+1 > 2) {
			index = 0;
		} else {
			index++;
		}
		return index;
	}

	function tooglePlayer() {
		let str = 'It is ';
		if (currentWeapon == 'X') {
			setCurrentWeapon('O');
			str = str + 'O';
		} else {
			setCurrentWeapon('X');
			str = str + 'X';
		}
		str = str + ' turn, '
		if (currentPlayer == player1username) {
			setCurrentPlayer(player2username);
			str = str + player2username;
		} else {
			setCurrentPlayer(player1username);
			str = str + player1username;
		}
		str = str + ' go ahead!';
		
		setMessage(str);
	}

	return (
		<div className="d-flex flex-column justify-content-center">
			<div className="text-center">
				<h1 className="text-center mt-5">Tic Tac Toe in React.js</h1>				
				<Instruction message={message} />
				<button onClick={resetGame}>Start Over</button>
			</div>

			{gameTime ? <Board sendBoard={checkGame} game={game} /> : <ChoosePlayers getPlayerData={getPlayerData} />}
			
		</div>
	);
};

export default Home;
