import React from "react";
import { useMachine } from "@xstate/react";

import tempConverterMachine from "./tempConverterMachine";

const TemperatureConverter = () => {
  const [state, send] = useMachine(tempConverterMachine);
  const { celsius, fahrenheit } = state.context;

  return (
    <article>
      <h2>Temperature Converter</h2>
      <p>
        The task is to build a frame containing two textfields TC and TF
        representing the temperature in Celsius and Fahrenheit, respectively.
        Initially, both TC and TF are empty. When the user enters a numerical
        value into TC the corresponding value in TF is automatically updated and
        vice versa. When the user enters a non-numerical string into TC the
        value in TF is not updated and vice versa. The formula for converting a
        temperature C in Celsius into a temperature F in Fahrenheit is C = (F -
        32) * (5/9) and the dual direction is F = C * (9/5) + 32.
      </p>
      <h3>Solution</h3>
      <div>
        <label htmlFor="celsius">Celsius </label>
        <input
          id="celsius"
          type="text"
          value={celsius}
          onChange={(e) =>
            send({ type: "ENTER_CELSIUS", value: Number(e.target.value) })
          }
        />
        <b> = </b>
        <label htmlFor="fahrenheit">Fahrenheit </label>
        <input
          id="fahrenheit"
          type="text"
          value={fahrenheit}
          onChange={(e) =>
            send({ type: "ENTER_FAHRENHEIT", value: Number(e.target.value) })
          }
        />
      </div>
    </article>
  );
};

export default TemperatureConverter;
