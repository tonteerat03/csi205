import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Animation = () => {
  const fieldRef = useRef(null);
  const ballRef = useRef(null);

  // Constants
  const fieldWidth = 800;
  const fieldHeight = 400;
  const ballSize = 150;
  const vx = 4;
  const vy = 4;
  const maxX = fieldWidth - ballSize - 2 * 1;
  const maxY = fieldHeight - ballSize - 2 * 1;

  // States
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [running, setRunning] = useState(false);
  const [ballImage, setBallImage] = useState(null);

  // Toggle Run / Pause
  const toggleRun = () => setRunning((prev) => !prev);

  // Calculate ball position
  const calculate = () => {
    let { x, y } = position;
    let newRight = goRight;
    let newDown = goDown;

    if (newRight) {
      x += vx;
      if (x >= maxX) newRight = false;
    } else {
      x -= vx;
      if (x <= 0) newRight = true;
    }

    if (newDown) {
      y += vy;
      if (y >= maxY) newDown = false;
    } else {
      y -= vy;
      if (y <= 0) newDown = true;
    }

    setPosition({ x, y });
    setGoRight(newRight);
    setGoDown(newDown);
  };

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (running) calculate();
    }, 25);
    return () => clearInterval(interval);
  });

  // Apply movement
  useEffect(() => {
    if (ballRef.current) {
      ballRef.current.style.left = position.x + "px";
      ballRef.current.style.top = position.y + "px";
    }
  }, [position]);

  // Keyboard control
  useEffect(() => {
    const handleKey = (event) => {
      if (event.code === "Space") {
        event.preventDefault();
        toggleRun();
      }
      switch (event.key) {
        case "0": setBallImage(null); break;
        case "1": setBallImage("Basketball.png"); break;
        case "2": setBallImage("Football.png"); break;
        case "3": setBallImage("Volleyball.png"); break;
        case "4": setBallImage("Human.gif"); break;
        case "5": setBallImage("Cartoon.png"); break;
        default: break;
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Inline Styles
  const styles = {
    container: {
      margin: "auto",
      width: "fit-content",
      border: "1px solid black",
      borderRadius: "10px",
      padding: "10px",
      textAlign: "center",
    },
    field: {
      border: "1px solid black",
      borderRadius: "10px",
      width: `${fieldWidth}px`,
      height: `${fieldHeight}px`,
      marginBottom: "1rem",
      backgroundImage: "url('images.jpg')",
      backgroundPosition: "center",
      position: "relative",
      overflow: "hidden",
    },
    ball: {
      position: "absolute",
      width: `${ballSize}px`,
      height: `${ballSize}px`,
      borderRadius: "50%",
      border: "1px solid black",
      backgroundColor: ballImage ? "transparent" : "rgb(138, 213, 213)",
      backgroundImage: ballImage ? `url(${ballImage})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      left: position.x,
      top: position.y,
      transition: "left 0.02s linear, top 0.02s linear",
    },
    buttonGap: {
      marginRight: "15px",
    },
  };

  return (
    <div style={styles.container}>
      <div ref={fieldRef} style={styles.field}>
        <div ref={ballRef} style={styles.ball}></div>
      </div>

      <div>
        <button
          className={`btn ${running ? "btn-warning" : "btn-success"}`}
          style={styles.buttonGap}
          onClick={toggleRun}
        >
          <i className={`bi ${running ? "bi-pause" : "bi-play"}`}></i>
          {running ? " PAUSE" : " RUN"}
        </button>

        <button className="btn btn-secondary" onClick={() => setBallImage(null)}>None</button>
        <button className="btn btn-outline-primary" onClick={() => setBallImage("Basketball.png")}>Basketball</button>
        <button className="btn btn-outline-primary" onClick={() => setBallImage("Football.png")}>Football</button>
        <button className="btn btn-outline-primary" onClick={() => setBallImage("Volleyball.png")}>Volleyball</button>
        <button className="btn btn-outline-primary" onClick={() => setBallImage("Human.gif")}>Human</button>
        <button className="btn btn-outline-primary" onClick={() => setBallImage("Cartoon.png")}>Cartoon</button>
      </div>
    </div>
  );
};

export default Animation;