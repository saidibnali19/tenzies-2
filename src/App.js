import { useEffect, useState } from 'react';
import './App.css';
import Die from './Components/Die';

function App() {
  const [dice, setDice] = useState(generateNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    if (dice.every(die => die.isHeld) && dice.every(die => die.label === dice[0].label)) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])
  
  const myDice = dice.map(die => <Die key={die.id} label={die.label} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  function generateNewDice() {
    const ids = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"]
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: ids[i],
        label: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return newDice
  }

  function rollDice() {
    if (tenzies) {
      setDice(generateNewDice())
      setTenzies(false)
    }
    else setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? die : {...die, label: Math.ceil(Math.random() * 6)}
    }))
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  return (
    <div className="tenzies | bg-primary text-secondary text-center flow">
      <h1>Tenzies</h1>
      <p className="tenzies__subtitle">Roll untill all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className="tenzies__grid | grid">
        {myDice}
      </div>
      <button className="button--play-reset | button bg-accent-400 text-light" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </div>
  );
}

export default App;