import React, { useState, useEffect } from "react";
import {responses} from "./responses"
import Circle from "./svgComponents/Rec"
import Cross from "./svgComponents/Cross";
import Info from "./svgComponents/Info";


const getResults = () => {
  if(localStorage.TicTac){
    return JSON.parse(localStorage.TicTac);
  } else {
    return { user1: 0, user2: 0, draw: 0 };
  }
}

const App = () => {
  const [activeUser, setActiveUser] = useState(1);
  const [totalSelection, setTotalSelection] = useState([]);
  const [user1Selection, setUser1Selection] = useState([]);
  const [user2Selection, setUser2Selection] = useState([]);
  const [winner, setWinner] = useState("");
  const [results, setResults] = useState(getResults());
  

  const handleClick = (n) => {
    if (
      activeUser === 1 &&
      !JSON.stringify(totalSelection).includes([1, n]) &&
      !JSON.stringify(totalSelection).includes([2, n])
    ) {
      setTotalSelection([...totalSelection, [1, n]]);
      setUser1Selection([...user1Selection, n]);
      setActiveUser(2);
      findWinner([...user1Selection, n], [...totalSelection, [1, n]]);
    } else if (
      activeUser === 2 &&
      !JSON.stringify(totalSelection).includes([2, n]) &&
      !JSON.stringify(totalSelection).includes([1, n])
    ) {
      setTotalSelection([...totalSelection, [2, n]]);
      setUser2Selection([...user2Selection, n]);
      setActiveUser(1);
      findWinner([...user2Selection, n], [...totalSelection, [2, n]]);
    }
  };

  const findWinner = (selection, total) => {
    let result = responses
      .map((response) => {
        return response
          .map((item) => {
            if (selection.includes(item)) {
              return true;
            } else {
              return false;
            }
          })
          .every((val) => {
            return val;
          });
      })
      .includes(true);
    showWinner(result, activeUser, total);
  };

  const showWinner = (result, user, total)=>{
    if(result && user === 1){
      setWinner("user1");
      setResults({ ...results, user1: results.user1 + 1 });
      localStorage.setItem("TicTac" ,JSON.stringify({...results, user1: results.user1 + 1 }))
    } else if(result && user === 2){
      setWinner("user2");
      setResults({ ...results, user2: results.user2 + 1 });
      localStorage.setItem("TicTac" ,JSON.stringify({...results, user2: results.user2 + 1 }))
    } else if (!result && total.length===9) {
      setWinner("draw");
      setResults({ ...results, draw: results.draw + 1 });
      localStorage.setItem("TicTac" ,JSON.stringify({...results, draw: results.draw + 1 }))
    }
  }

  const resetResults = ()=>{
    localStorage.setItem(
      "TicTac",
      JSON.stringify({ user1: 0, user2: 0, draw: 0 })
    );
    window.location.reload();
  }

  const showInfo = () => {
    document.querySelector(".show-info").style.display = "block";
  };

  const hideInfo = (event)=>{
    if (
      event.target.classList.contains("show-info__row") ||
      event.target.classList.contains("show-info")
    ) {
      document.querySelector(".show-info").style.display = "none";
    }
  }

  if (winner === "user1"){
    return (
      <div className="container winner">
        <div className="row winner__row">
          <div className="col-sm-5">
            <h1>
              Winner: <Circle className="circle" />
            </h1>
            <button onClick={() => window.location.reload()}>
              Restart Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (winner === "user2") {
    return (
      <div className="container winner">
        <div className="row winner__row">
          <div className="col-sm-5">
            <h1>
              Winner: <Cross className="cross" />
            </h1>
            <button onClick={() => window.location.reload()}>Restart Game</button>
          </div>
        </div>
      </div>
    );
  }

  if (winner === "draw") {
    return (
      <div className="container winner">
        <div className="row winner__row">
          <div className="col-sm-5">
            <h1>
              DRAW
            </h1>
            <button onClick={() => window.location.reload()}>
              Restart Game
            </button>
          </div>
        </div>
      </div>
    );
  }

    return (
      <main className="tic">

        <div className="show-info" onClick={hideInfo}>
          <div className="container">
            <div className="row show-info__row">
              <div className="col-sm-6 show-info__col">
                <h2>Welcome Everybody</h2>
                <p>
                  Tic Tac Toe is a game for two users. where any user who can
                  fill 3 fiels in a row would be the Winner. you can see your
                  results at the bottom of this page. You can reset the results
                  to 0 if you wish.
                </p>
                <p>Hope you enjoy this game</p>
                <p> <i>Developed By Aref Movahedzadeh</i> </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container tic__container">
          <div className="row tic__row">
            <div className="col-sm-12 tic__col">
              <div className="tic__info">
                <h1>
                  <span>Tic Tac Toe </span>
                  <Info onClick={showInfo} />
                </h1>
                <p>
                  Turn:{" "}
                  {activeUser === 1 ? (
                    <Circle className="circle" />
                  ) : (
                    <Cross className="cross" />
                  )}{" "}
                </p>
              </div>
              <div className="tic__placeholder">
                <ul className="tic__grid">
                  <li id="1" onClick={() => handleClick(1)}>
                    <span>
                      {JSON.stringify(totalSelection).includes([1, 1]) && (
                        <Circle className="circle" />
                      )}
                      {JSON.stringify(totalSelection).includes([2, 1]) && (
                        <Cross className="cross" />
                      )}
                    </span>
                  </li>
                  <li id="2" onClick={() => handleClick(2)}>
                    <span>
                      {JSON.stringify(totalSelection).includes([1, 2]) && (
                        <Circle className="circle" />
                      )}
                      {JSON.stringify(totalSelection).includes([2, 2]) && (
                        <Cross className="cross" />
                      )}
                    </span>
                  </li>
                  <li id="3" onClick={() => handleClick(3)}>
                    <span>
                      {JSON.stringify(totalSelection).includes([1, 3]) && (
                        <Circle className="circle" />
                      )}
                      {JSON.stringify(totalSelection).includes([2, 3]) && (
                        <Cross className="cross" />
                      )}
                    </span>
                  </li>
                  <li id="4" onClick={() => handleClick(4)}>
                    <span>
                      {JSON.stringify(totalSelection).includes([1, 4]) && (
                        <Circle className="circle" />
                      )}
                      {JSON.stringify(totalSelection).includes([2, 4]) && (
                        <Cross className="cross" />
                      )}
                    </span>
                  </li>
                  <li id="5" onClick={() => handleClick(5)}>
                    <span>
                      {JSON.stringify(totalSelection).includes([1, 5]) && (
                        <Circle className="circle" />
                      )}
                      {JSON.stringify(totalSelection).includes([2, 5]) && (
                        <Cross className="cross" />
                      )}
                    </span>
                  </li>
                  <li id="6" onClick={() => handleClick(6)}>
                    <span>
                      {JSON.stringify(totalSelection).includes([1, 6]) && (
                        <Circle className="circle" />
                      )}
                      {JSON.stringify(totalSelection).includes([2, 6]) && (
                        <Cross className="cross" />
                      )}
                    </span>
                  </li>
                  <li id="7" onClick={() => handleClick(7)}>
                    <span>
                      {JSON.stringify(totalSelection).includes([1, 7]) && (
                        <Circle className="circle" />
                      )}
                      {JSON.stringify(totalSelection).includes([2, 7]) && (
                        <Cross className="cross" />
                      )}
                    </span>
                  </li>
                  <li id="8" onClick={() => handleClick(8)}>
                    <span>
                      {JSON.stringify(totalSelection).includes([1, 8]) && (
                        <Circle className="circle" />
                      )}
                      {JSON.stringify(totalSelection).includes([2, 8]) && (
                        <Cross className="cross" />
                      )}
                    </span>
                  </li>
                  <li id="9" onClick={() => handleClick(9)}>
                    <span>
                      {JSON.stringify(totalSelection).includes([1, 9]) && (
                        <Circle className="circle" />
                      )}
                      {JSON.stringify(totalSelection).includes([2, 9]) && (
                        <Cross className="cross" />
                      )}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="results">
                <h3 className="results__head">
                  <span>results</span>
                  <button onClick={resetResults}>reset</button>
                </h3>
                <p className="results__usr1">
                  <Circle className="circle" /> wins: {`${results.user1}`}
                </p>
                <p className="results__usr2">
                  <Cross className="cross" /> wins: {`${results.user2}`}
                </p>
                <p className="results__draw">Draw: {`${results.draw}`}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default App

