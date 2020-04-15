import { Machine, assign } from "xstate";

interface WorkerContext {}

interface TimerMachineContext {
  duration: number;
  elapsed: number;
  interval: number;
}

interface SetDurationEvent {
  type: "SET_DURATION";
  duration: number;
}
interface DoneEvent {
  type: "DONE";
}

interface TickEvent {
  type: "TICK";
}

interface ResetEvent {
  type: "RESET";
}

type TimerMachineEvent = DoneEvent | SetDurationEvent | TickEvent | ResetEvent;

const timerMachine = Machine<TimerMachineContext, TimerMachineEvent>(
  {
    id: "timerMachine",
    context: {
      elapsed: 0,
      duration: 20,
      interval: 0.01,
    },
    initial: "running",
    states: {
      running: {
        invoke: {
          id: "tick",
          src: (context) => (sendEvent) => {
            const intervalId = setInterval(
              () => sendEvent("TICK"),
              context.interval * 1000
            );

            // cleanup function
            return () => clearInterval(intervalId);
          },
        },
        on: {
          // transient transition, happens every time this state is entered
          // actions cannot do transitions, so we couldn't use entry instead
          "": {
            target: "done",
            cond: "isDone",
          },
          SET_DURATION: {
            // not using the string form since TypeScript doesn't know how to infer this
            actions: assign((_, event) => {
              return { duration: event.duration };
            }),
          },
          TICK: {
            actions: "setElapsed",
          },
          DONE: "done",
          // some duplication here - it seems that there is a '.on' property on the root machine config
          // it allows running actions on events regardless of the current state which seems to be odd
          RESET: {
            // internal transition, no need to run invoke again
            actions: "reset",
          },
        },
      },
      done: {
        on: {
          SET_DURATION: {
            // not using the string form since TypeScript doesn't know how to infer this
            actions: assign((_, event) => {
              return { duration: event.duration };
            }),
          },
          RESET: {
            target: "running",
            actions: "reset",
          },
        },
      },
    },
  },
  {
    actions: {
      setElapsed: assign((context, _) => ({
        elapsed: context.elapsed + context.interval,
      })),
      reset: assign((context, _) => ({
        elapsed: 0,
      })),
    },
    guards: {
      isDone: (context) => {
        const { elapsed, duration } = context;
        return elapsed >= duration;
      },
    },
  }
);

export default timerMachine;
