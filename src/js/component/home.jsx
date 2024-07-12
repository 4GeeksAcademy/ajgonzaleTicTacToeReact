import React, { useState, useEffect } from "react";

import Instruction from "./Instruction";
import ChoosePlayers from "./ChoosePlayers";
import Board from "./Board";

const Home = () => {

	const [message, setMessage] = useState('');
	const [player1username, setPlayer1username] = useState('');
	const [player2username, setPlayer2username] = useState('');
	const [gameTime, setGameTime] = useState(false);
	const [currentPlayer, setCurrentPlayer] = useState('');
	const [currentWeapon, setCurrentWeapon] = useState('');
	const [game, setGame] = useState([['','',''],['','',''],['','','']]);
	const [winner, setWinner] = useState(false);
	const [playerData, setPlayerData] = useState(null);

	useEffect(() => {
			resetGame();		
		}, []);

	useEffect(() => {
		winner ? setMessage(currentWeapon+' Wins!, '+currentPlayer+' congrats!') : tooglePlayer();
	}, [game]);

	useEffect(() => {
		if (playerData != null) {
			console.log(playerData)
			setPlayer1username(playerData.player1);
			setPlayer2username(playerData.player2);
			setCurrentPlayer(playerData.player1);
			setCurrentWeapon(playerData.weapon);
			setMessage('It is '+playerData.weapon+' turn, '+playerData.player1 + ' go ahead!');
			setGameTime(true);
		}				
	}, [playerData]);

	function resetGame() {
		setPlayer1username(null);
		setPlayer2username(null);
		setMessage('Pick a Weapon');	
		setGameTime(false);
		setWinner(false);
		setGame([['','',''],['','',''],['','','']]);
	}

	function checkGame(data) {
		console.log(game);
		if (winner) {
			setMessage("Game Over, "+currentPlayer+' is the winner!' );
			
		} else if (game[data.x][data.y] != '') {
			setMessage("Try an empty position " + currentPlayer + "  it's still your turn.");
			
		} else {
			let cGame = game.map(row => [...row]);
			cGame[data.x][data.y] = currentWeapon;
			setGame(cGame);
			console.log('cgame',cGame, currentWeapon);

			//check horizontally
			cGame[getNextIndex(data.x)][data.y] == currentWeapon && cGame[getNextIndex(getNextIndex(data.x))][data.y] == currentWeapon ? setWinner(true) :
			//check vertically
			cGame[data.x][getNextIndex(data.y)] == currentWeapon && cGame[data.x][getNextIndex(getNextIndex(data.y))] == currentWeapon ? setWinner(true)  :
			//check diagonals
			cGame[0][0] == currentWeapon && cGame[1][1] == currentWeapon && cGame[2][2] == currentWeapon ? 
			setWinner(true) : 
			cGame[0][2] == currentWeapon && cGame[1][1] == currentWeapon && cGame[2][0] == currentWeapon ? setWinner(true) : setWinner(false);

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
		if (gameTime) {
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
	}

	return (
		<div className="d-flex flex-column justify-content-center center">
			<div className="text-center">
				<h1 className="text-center mt-5">Tic Tac Toe in React.js</h1>				
				<Instruction message={message} />
				<button onClick={resetGame}>Start Over</button>
			</div>

			{gameTime ? <Board checkGame={checkGame} game={game} /> : <ChoosePlayers setPlayerData={setPlayerData} />}
			
		</div>
	);
};

export default Home;
