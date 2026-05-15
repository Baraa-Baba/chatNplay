import React from 'react'

const ChooseGame = ({ userGame, setUserGame, isDashboard }) => {



    return (
        <>
            <label className={'dashboardLabel chooseGameLabel'}>Choose game</label>
            <select value={userGame}
                className={isDashboard ? 'dashBoardInput' : 'selectGender'} onInput={(e) => setUserGame(e.target.value)}>
                <option value="no-game">None</option>
                <option value="chess">Chess</option>
                <option value="ticTak">Tic-Tac-Toe</option> 
            </select>
        </>
    );

}
export default ChooseGame
