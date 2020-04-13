import { Machine, assign } from "xstate";

interface TemperatureConverterContext {
  celsius: number;
  fahrenheit: number;
}

type EnterCelsiusEvent = { type: "ENTER_CELSIUS"; value: number };
type EnterFahrenheitEvent = { type: "ENTER_FAHRENHEIT"; value: number };

// used a type alias here since event could be a string (interfaces do not work on primitives)
type TemperatureConverterEvent = EnterCelsiusEvent | EnterFahrenheitEvent;

const tempConverterMachine = Machine<
  TemperatureConverterContext,
  TemperatureConverterEvent
>(
  {
    id: "tempConverterMachine",
    initial: "displayValues",
    context: {
      celsius: 0,
      fahrenheit: 0,
    },
    states: {
      displayValues: {
        on: {
          ENTER_CELSIUS: {
            cond: "inputIsNumber",
            target: "displayValues",
            actions: "convertToFahrenheit",
          },
          ENTER_FAHRENHEIT: {
            target: "displayValues",
            actions: "convertToCelsius",
            cond: "inputIsNumber",
          },
        },
      },
    },
  },
  {
    actions: {
      convertToFahrenheit: assign((_, event) => {
        return { celsius: event.value, fahrenheit: event.value * (9 / 5) + 32 };
      }),
      convertToCelsius: assign((_, event) => {
        return {
          celsius: (event.value - 32) * (5 / 9),
          fahrenheit: event.value,
        };
      }),
    },
    guards: {
      inputIsNumber: (_, event) => {
        const { value } = event;
        return typeof value === "number" && isFinite(value);
      },
    },
  }
);

export default tempConverterMachine;
