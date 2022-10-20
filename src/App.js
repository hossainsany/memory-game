import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

const cardImages = [
    { src: "./img/helmet-1.png", matched: false },
    { src: "./img/potion-1.png", matched: false },
    { src: "./img/ring-1.png", matched: false },
    { src: "./img/scroll-1.png", matched: false },
    { src: "./img/shield-1.png", matched: false },
    { src: "./img/sword-1.png", matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCards);
        setTurns(0);
    };

    //make chooice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    //compare choices
    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCard) => {
                    return prevCard.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });

                resetChoices();
            } else {
                setTimeout(() => resetChoices(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    console.log(cards);
    //reset choices
    const resetChoices = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurn) => prevTurn + 1);
        setDisabled(false);
    };

    //auto start
    useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <div className="App">
            <h1>Magic Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard
                        card={card}
                        key={card.id}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
            <p className="turn-counter">Turns: {turns}</p>
        </div>
    );
}

export default App;
