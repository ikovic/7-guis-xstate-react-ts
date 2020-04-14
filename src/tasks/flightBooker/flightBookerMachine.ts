import { createMachine, assign } from "xstate";

interface FlightContext {
  startDate?: string;
  returnDate?: string;
  trip: "oneWay" | "return";
}

type FlightState =
  | {
      value: "editing";
      context: FlightContext;
    }
  | {
      value: "submitted";
      context: FlightContext;
    };

type FlightEvent =
  | {
      type: "SET_TRIP";
      value: "oneWay" | "return";
    }
  | {
      type: "startDate.UPDATE";
      value: string;
    }
  | {
      type: "returnDate.UPDATE";
      value: string;
    }
  | { type: "SUBMIT" };

const flightBookerMachine = createMachine<
  FlightContext,
  FlightEvent,
  FlightState
>({
  id: "flight",
  initial: "editing",
  context: {
    startDate: undefined,
    returnDate: undefined,
    trip: "oneWay", // or 'return'
  },
  states: {
    editing: {
      on: {
        "startDate.UPDATE": {
          actions: assign({
            startDate: (_, event) => event.value,
          }),
        },
        "returnDate.UPDATE": {
          actions: assign({
            returnDate: (_, event) => event.value,
          }),
          cond: (context) => context.trip === "return",
        },
        SET_TRIP: {
          actions: assign({
            trip: (_, event) => event.value,
          }),
          cond: (_, event) =>
            event.value === "oneWay" || event.value === "return",
        },
        SUBMIT: {
          target: "submitted",
          cond: (context) => {
            if (context.trip === "oneWay") {
              return !!context.startDate;
            } else {
              return (
                !!context.startDate &&
                !!context.returnDate &&
                context.returnDate > context.startDate
              );
            }
          },
        },
      },
    },
    submitted: {
      type: "final",
    },
  },
});

export default flightBookerMachine;
