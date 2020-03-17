//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react";
import "./App.css";
import BottomRow from "./BottomRow";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [scores, setScores] = useState(0);
  const [downs, setDowns] = useState(1);
  const [seconds, setSeconds] = useState(60);
  const [gameStart, setGameStart] = useState(true);
  const [toGo, setToGo] = useState(10);
  const homeTeam = 'Raiders';
  const awayTeam = 'Cowboys';

 
  
  function progress() {
    console.log(progress)
    setToGo(Math.random()*100 - toGo)
    
  }
    
  

  function adjustTime() {
    setSeconds(seconds - 5)
  }

  function determineWin() {
    setGameStart(!gameStart)
    if (homeScore > awayScore) {
      return alert(`And the winner is....` + homeTeam)
    } else {
      alert(`And the winner is ` + awayTeam)
    }
  }
  function newQuarter() {
    setSeconds(seconds * 0 + 60);
  }
  function startGame() {
    setGameStart(gameStart)
  }

  useEffect(() => {
    let interval = null;
    if (gameStart && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 1000)
    } else if (gameStart && seconds === 0 && quarter < 4) {
      setQuarter(quarter + 1);
      newQuarter();
    } else if (gameStart && seconds === 0 && quarter === 4) {
      determineWin();
    }
    
    return () => clearInterval(interval)
    }, [gameStart, seconds])
  
  
  function moveBall() {
    if (downs < 4) {
      setDowns(downs + 1)
    } else {
      setDowns(downs * 0)
    }
  }

  function advanceGame() {
    setScores(scores + 1)
    adjustTime();
    progress();
    console.log("Scores per quarter: " + scores)
    if (scores === 3) {
      setScores(0);
      newQuarter();
      
      if (quarter < 4) {   // if not fourth quarter
         setQuarter(quarter + 1)
      }
      else{ 
        console.log("game over")
        setQuarter(quarter * 0);
        setHomeScore(homeScore * 0);
        setAwayScore(awayScore * 0);
        setDowns(downs * 0);
        setSeconds(seconds * 0 + 60);
        determineWin();
        
        
        

      }
    } 
  }

  const touchdownHome = () => {setHomeScore(homeScore + 7)
    advanceGame();
    moveBall()}
  const fieldgoalHome = () => {setHomeScore(homeScore + 3) 
    advanceGame()}
  const fieldgoalAway = () => {setAwayScore(awayScore + 3) 
    advanceGame()}
  const touchdownAway = () => {setAwayScore(awayScore + 7) 
    advanceGame();
    moveBall()}

  return (
    <div className="container" onClick={startGame}>
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">{homeTeam}</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{seconds}</div>
          <div className="away">
            <h2 className="away__name">{awayTeam}</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow quarter={quarter} downs={downs} />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick={touchdownHome}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={fieldgoalHome}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={touchdownAway}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={fieldgoalAway}>Away Field Goal</button>
        </div>
      </section>
    </div>
  );
}

export default App;
