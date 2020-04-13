import React from "react";
import { useMachine } from "@xstate/react";

import counterMachine from "./counterMachine";

const Counter = () => {
  const [state, send] = useMachine(counterMachine);

  return (
    <article>
      <h1>Counter</h1>
      <p>
        The task is to build a frame containing a label or read-only textfield T
        and a button B. Initially, the value in T is “0” and each click of B
        increases the value in T by one.
      </p>
      <h2>Solution</h2>
      <div>
        {`${state.context.value} `}
        <button onClick={() => send("INCREMENT")}>Increment</button>
      </div>
    </article>
  );
};

export default Counter;
