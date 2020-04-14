import React from "react";
import { useMachine } from "@xstate/react";

import timerMachine from "./timerMachine";

const Timer = () => {
  const [state, send] = useMachine(timerMachine);
  const { duration } = state.context;

  console.log(state.value, { context: state.context });

  return (
    <article>
      <h2>Timer</h2>
      <p>
        The task is to build a frame containing a gauge G for the elapsed time
        e, a label which shows the elapsed time as a numerical value, a slider S
        by which the duration d of the timer can be adjusted while the timer is
        running and a reset button R.
      </p>
      <p>
        Adjusting S must immediately reflect on d and not only when S is
        released. It follows that while moving S the filled amount of G will
        (usually) change immediately. When e ≥ d is true then the timer stops
        (and G will be full). If, thereafter, d is increased such that d > e
        will be true then the timer restarts to tick until e ≥ d is true again.
        Clicking R will reset e to zero.
      </p>
      <p>
        Timer deals with concurrency in the sense that a timer process that
        updates the elapsed time runs concurrently to the user’s interactions
        with the GUI application. This also means that the solution to competing
        user and signal interactions is tested. The fact that slider adjustments
        must be reflected immediately moreover tests the responsiveness of the
        solution. A good solution will make it clear that the signal is a timer
        tick and, as always, has not much scaffolding.
      </p>
      <h3>Solution</h3>
      <div>
        Elapsed time: <strong>11.8s</strong>
        <div>
          <progress value="70" max="100">
            70 %
          </progress>
        </div>
        <div>
          <label htmlFor="durationSlider">Duration: </label>
          <input
            type="range"
            id="durationSlider"
            min="1"
            max="20"
            step={1}
            value={duration}
            onChange={(event) =>
              send({
                type: "SET_DURATION",
                duration: Number(event.target.value) * 1000,
              })
            }
          />
        </div>
        <div>
          <button>Reset</button>
        </div>
      </div>
    </article>
  );
};

export default Timer;