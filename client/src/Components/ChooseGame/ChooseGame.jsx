import React from 'react'

const ChooseGame = ({ userGame, setUserGame, isDashboard }) => {



    return (
        <>
            <label className={'dashboardLabel'}>Choose Game</label>
            <select value={userGame} style={{ fontSize: '2rem' }}
                class={isDashboard ? 'dashBoardInput' : 'selectGender font26Mobile'} onInput={(e) => setUserGame(e.target.value)}>
                <option value="no-game">none</option>
                <option value="chess">chess</option>
                <option value="ticTak">ticTak</option>
                <option value="superTicTak">superTicTak</option>
            </select>
        </>
    );

}
export default ChooseGame
