import React from "react";

const Crud = () => {
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
        <input id="filterInput" type="text" />
        <div>
          user list
          <div>
            <label htmlFor="nameInput">Name: </label>
            <input id="nameInput" type="text" />
            <label htmlFor="surnameInput">Surname: </label>
            <input id="surnameInput" type="text" />
          </div>
        </div>
        <div>
          <button>Create</button>
          <button>Update</button>
          <button>Delete</button>
        </div>
      </div>
    </article>
  );
};

export default Crud;
