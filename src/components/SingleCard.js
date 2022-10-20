import "./SingleCard.css";

export default function singleCard({ card, handleChoice, flipped, disabled }) {
    const clickHandle = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };
    return (
        <div className="single-card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="" />
                <img className="cover" src="./img/cover.png" onClick={clickHandle} alt="" />
            </div>
        </div>
    );
}
