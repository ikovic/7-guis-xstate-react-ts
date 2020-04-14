import { Machine, assign, spawn, Interpreter, sendParent } from "xstate";

interface WorkerContext {}

interface TimerMachineContext {
  duration: number;
  timeStarted: number;
  timerRef?: null | Interpreter<WorkerContext, any, any>;
}

interface SetDurationEvent {
  type: "SET_DURATION";
  duration: number;
}
interface DoneEvent {
  type: "DONE";
}
type TimerMachineEvent = DoneEvent | SetDurationEvent;

const Worker = (duration: number) =>
  Machine<WorkerContext, any, any>({
    id: "timer",
    initial: "active",
    states: {
      active: {
        after: {
          [duration]: "finished",
        },
      },
      finished: { type: "final", entry: sendParent("DONE") },
    },
  });

const timerMachine = Machine<TimerMachineContext, TimerMachineEvent>(
  {
    id: "timerMachine",
    context: {
      timeStarted: Date.now(),
      duration: 5000,
      timerRef: null,
    },
    initial: "running",
    states: {
      running: {
        entry: assign<TimerMachineContext>({
          timerRef: (ctx) =>
            spawn<WorkerContext, any>(Worker(ctx.duration), "timerMachine"),
        }),
        on: {
          /* SET_DURATION: {
            target: "running",
            actions: "setDuration",
          }, */
          DONE: "done",
        },
      },
      done: {
        type: "final",
      },
    },
  },
  {
    actions: {
      /* setDuration: assign<TimerMachineContext, SetDurationEvent>((_, event) => {
        return { duration: event.duration };
      }), */
      setTimeStarted: assign<TimerMachineContext>({ timeStarted: Date.now() }),
    },
  }
);

export default timerMachine;
