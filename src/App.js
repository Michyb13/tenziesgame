import './App.css';
import Die from "./components/Die"
import {nanoid} from "nanoid"
import React from "react"
import Confetti from "react-confetti"


function App() {
  const [numbers, setNumbers] = React.useState(createNumbers)
  const [hasWon, setHasWon] = React.useState(false)


  React.useEffect( () => {
        const allHeld = numbers.every(die => die.isHeld)
        const firstNumber = numbers[0].value
        const allNumbers = numbers.every(die => die.value === firstNumber)

        if(allHeld && allNumbers){
            setHasWon(true)
        }
  }, [numbers])


  function generateNewDice(){
    const randomNumber = Math.ceil(Math.random()* 6)
    return({
        id: nanoid(),
        value: randomNumber,
        isHeld: false
    }

    )
}
 
function createNumbers(){
    const newArray = []
    for(let i = 0 ; i < 10 ; i++){
         
        newArray.push(generateNewDice())
    }
    return newArray
 }


 function rollDice(){
    if(!hasWon){
    setNumbers(prevNumbers => prevNumbers.map(die => {
        return die.isHeld ? die : generateNewDice()
    }

    ))
} else{
     setNumbers(createNumbers)
     setHasWon(false) 
        
    }
 }

 function holdDice(id){
        setNumbers(prevNumbers => prevNumbers.map(die => {
            return die.id === id ? 
            {...die, isHeld: !die.isHeld} : 
            die
        }))
 }

 const numbersMap = numbers.map( die => {
    return (
       
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            handleClick ={() => holdDice(die.id)}
        />
        
    )
 })
 
    return(
    <main>
        {hasWon && <Confetti />}
         <h1 className="title">Tenzies🎲</h1>
         <p className="instructions">Roll until all dice are the same. 
         Click each die to freeze it at its current value between rolls.</p>
        <div className="die-container">
        {numbersMap}
        </div>
        <button onClick={rollDice}>{hasWon ? "New Game" : "Roll" }</button>
       {hasWon && <h3 className='congratulation'>YOU WIN!🎉🍾</h3>}
    </main>
  )
}

export default App;
