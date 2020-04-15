import { Machine, assign } from "xstate";
import { User, getUsers, deleteUser, createUser, updateUser } from "./users";

interface UsersContext {
  users: User[];
  error: null | Error;
}

const usersMachine = Machine<UsersContext>({
  id: "usersMachine",
  context: {
    users: [],
    error: null,
  },
  initial: "initial",
  states: {
    initial: {
      on: {
        "": "loading",
      },
    },
    loading: {
      invoke: {
        id: "getUsers",
        src: () => getUsers(),
        onDone: {
          target: "loaded",
          actions: assign((_, event) => {
            return { users: event.data };
          }),
        },
        onError: {
          target: "loadingError",
          actions: assign((_, event) => ({ error: event.data })),
        },
      },
    },
    loaded: {
      initial: "initial",
      states: {
        initial: {
          on: {
            DELETE_USER: "deletingUser",
            CREATE_USER: "creatingUser",
            UPDATE_USER: "updatingUser",
          },
        },
        deletingUser: {
          invoke: {
            id: "deleteUser",
            src: (_, event) => deleteUser(event.user),
            onDone: {
              target: "#usersMachine.loaded",
              actions: assign((context, event) => {
                const { users } = context;
                return {
                  users: users.filter((user) => user.id !== event.data.id),
                };
              }),
            },
            onError: {
              target: "#usersMachine.loadingError",
              actions: assign((_, event) => ({ error: event.data })),
            },
          },
        },
        creatingUser: {
          invoke: {
            id: "createUser",
            src: (_, event) => createUser(event.user),
            onDone: {
              target: "#usersMachine.loaded",
              actions: assign((context, event) => {
                const { users } = context;
                return {
                  users: [...users, event.data],
                };
              }),
            },
            onError: {
              target: "#usersMachine.loadingError",
              actions: assign((_, event) => ({ error: event.data })),
            },
          },
        },
        updatingUser: {
          invoke: {
            id: "updateUser",
            src: (_, event) => updateUser(event.user),
            onDone: {
              target: "#usersMachine.loaded",
              actions: assign((context, event) => {
                const { users } = context;
                return {
                  users: users.map((user) => {
                    if (user.id === event.data.id) {
                      return event.data;
                    }
                    return user;
                  }),
                };
              }),
            },
            onError: {
              target: "#usersMachine.loadingError",
              actions: assign((_, event) => ({ error: event.data })),
            },
          },
        },
      },
    },
    loadingError: {},
  },
});

export default usersMachine;
