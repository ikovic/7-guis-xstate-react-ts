import React from "react";
import { useMachine } from "@xstate/react";

import usersMachine from "./usersMachine";
import { User } from "./users";
interface UserListProps {
  users: User[];
  selectedUser: null | User;
  handleSelect: (user: User) => void;
  clearSelection: () => void;
}
const UserList = ({
  users,
  selectedUser,
  handleSelect,
  clearSelection,
}: UserListProps) => {
  if (users.length === 0) {
    return <span>No results</span>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li
          key={user.id}
          onClick={() => {
            if (selectedUser && selectedUser.id === user.id) {
              clearSelection();
            } else {
              handleSelect(user);
            }
          }}
          style={{
            ...(selectedUser && selectedUser.id === user.id
              ? { backgroundColor: "blue", color: "white" }
              : {}),
          }}
        >{`${user.surname}, ${user.name}`}</li>
      ))}
    </ul>
  );
};

interface CrudState {
  selectedUser: null | User;
  name: string;
  surname: string;
  filter: string;
}

type ActionType =
  | { type: "selectUser"; user: User }
  | { type: "clearSelection" }
  | { type: "updateName"; name: string }
  | { type: "updateSurname"; surname: string }
  | { type: "setFilter"; filter: string };

const initialState = {
  selectedUser: null,
  name: "",
  surname: "",
  filter: "",
};

const crudReducer = (state: CrudState, action: ActionType): CrudState => {
  switch (action.type) {
    case "selectUser": {
      const { name, surname } = action.user;
      return { ...state, selectedUser: action.user, name, surname };
    }
    case "clearSelection": {
      return { ...state, selectedUser: null, name: "", surname: "" };
    }
    case "setFilter": {
      return { ...state, selectedUser: null, filter: action.filter };
    }
    case "updateName": {
      return { ...state, name: action.name };
    }
    case "updateSurname": {
      return { ...state, surname: action.surname };
    }
    default:
      return state;
  }
};

const Crud = () => {
  const [{ selectedUser, name, surname, filter }, dispatch] = React.useReducer(
    crudReducer,
    initialState
  );
  const [current, send] = useMachine(usersMachine);

  const { users } = current.context;

  const userSelected = selectedUser !== null;

  const filteredUsers = React.useMemo(() => {
    if (filter === "") {
      return users;
    }

    return users.filter((user) => user.surname.startsWith(filter));
  }, [filter, users]);

  return (
    <article>
      <h2>CRUD</h2>
      <p>
        The task is to build a frame containing the following elements: a
        textfield Tprefix, a pair of textfields Tname and Tsurname, a listbox L,
        buttons BC, BU and BD and the three labels as seen in the screenshot. L
        presents a view of the data in the database that consists of a list of
        names. At most one entry can be selected in L at a time.
      </p>
      <p>
        By entering a string into Tprefix the user can filter the names whose
        surname start with the entered prefix—this should happen immediately
        without having to submit the prefix with enter. Clicking BC will append
        the resulting name from concatenating the strings in Tname and Tsurname
        to L. BU and BD are enabled iff an entry in L is selected. In contrast
        to BC, BU will not append the resulting name but instead replace the
        selected entry with the new name. BD will remove the selected entry. The
        layout is to be done like suggested in the screenshot. In particular, L
        must occupy all the remaining space.
      </p>
      <p>
        CRUD (Create, Read, Update and Delete) represents a typical graphical
        business application. The primary challenge is the separation of domain
        and presentation logic in the source code that is more or less forced on
        the implementer due to the ability to filter the view by a prefix.
        Traditionally, some form of MVC pattern is used to achieve the
        separation of domain and presentation logic. Also, the approach to
        managing the mutation of the list of names is tested. A good solution
        will have a good separation between the domain and presentation logic
        without much overhead (e.g. in the form of toolkit specific concepts or
        language/paradigm concepts), a mutation management that is fast but not
        error-prone and a natural representation of the layout (layout builders
        are allowed, of course, but would increase the overhead).
      </p>
      <p>
        <strong>Note:</strong> task notes do not specify any kind of persistence
        across different sessions, all the data could be stored in memory. To
        make the task more relevant, I've added a server that holds the data in
        a JSON file. This way we can see how to manage async requests within
        XState.
      </p>
      <h3>Solution</h3>
      <div>
        <label htmlFor="filterInput">Filter prefix: </label>
        <input
          id="filterInput"
          type="text"
          value={filter}
          onChange={(e) =>
            dispatch({ type: "setFilter", filter: e.target.value })
          }
        />
        <div>
          {current.matches("loading") && "loading..."}
          {current.matches("loadingError") &&
            "Error while loading! Refresh to try again."}
          {current.matches("loaded") && (
            <UserList
              users={filteredUsers}
              selectedUser={selectedUser}
              handleSelect={(user) => dispatch({ type: "selectUser", user })}
              clearSelection={() => dispatch({ type: "clearSelection" })}
            />
          )}

          <div>
            <label htmlFor="nameInput">Name: </label>
            <input
              id="nameInput"
              type="text"
              value={name}
              onChange={(event) =>
                dispatch({ type: "updateName", name: event.target.value })
              }
            />
            <label htmlFor="surnameInput">Surname: </label>
            <input
              id="surnameInput"
              type="text"
              value={surname}
              onChange={(event) =>
                dispatch({ type: "updateSurname", surname: event.target.value })
              }
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              send({ type: "CREATE_USER", user: { name, surname } });
            }}
          >
            Create
          </button>
          <button
            onClick={() =>
              send({
                type: "UPDATE_USER",
                user: { id: selectedUser?.id, name, surname },
              })
            }
            disabled={!userSelected}
          >
            Update
          </button>
          <button
            disabled={!userSelected}
            onClick={() => send({ type: "DELETE_USER", user: selectedUser })}
          >
            Delete
          </button>
        </div>
      </div>
      <h3>Notes</h3>
      <p>
        Usually I wouldn't mix UI state with business logic. If we really wanted
        to power this component with a state machine, I would probably go for
        separate machines. I think the best way to handle complex form state
        like this is having a state machine that manages the application
        business logic and a local reducer that updates the UI.
      </p>
    </article>
  );
};

export default Crud;
