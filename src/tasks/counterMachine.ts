import { Machine, assign } from "xstate";

interface CounterContext {
  value: number;
}

const counterMachine = Machine<CounterContext>(
  {
    id: "counterMachine",
    initial: "displayValue",
    context: {
      value: 0,
    },
    states: {
      displayValue: {
        on: {
          INCREMENT: {
            target: "displayValue",
            actions: "incrementValue",
          },
        },
      },
    },
  },
  {
    actions: {
      incrementValue: assign({ value: (context) => context.value + 1 }),
    },
  }
);

export default counterMachine;
