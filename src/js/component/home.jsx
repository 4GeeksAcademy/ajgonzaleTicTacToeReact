import React, { useState, useEffect } from "react";

import ChoosePlayers from "./ChoosePlayers";
import Instruction from "./Instruction";

const Home = () => {

	const [message, setMessage] = useState('');
	const [player1username, setPlayer1username] = useState('');
	const [player2username, setPlayer2username] = useState('');
	const [player1Weapon, setPlayer1Weapon] = useState('');
	
	useEffect(() => {
		setMessage('Pick a Weapon');
	  }, []);

	function getPlayerData(data) {
		setPlayer1username(data.player1);
		setPlayer2username(data.player2);
		setPlayer1Weapon(data.weapon);
		setMessage('It is '+data.weapon+' turn, '+data.player1 + ' go ahead!');
	}

	return (
		<div className="d-flex flex-column justify-content-center">
			<div>
				<h1 className="text-center mt-5">Tic Tac Toe in React.js</h1>				
				<Instruction message={message} />
			</div>

			<ChoosePlayers getPlayerData={getPlayerData} />			
		</div>
	);
};

export default Home;
