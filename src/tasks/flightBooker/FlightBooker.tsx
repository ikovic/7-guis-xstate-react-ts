import React, { ChangeEvent } from "react";
import { useMachine } from "@xstate/react";

import flightBookerMachine from "./flightBookerMachine";

interface DateInputProps {
  error: boolean;
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const DateInput = ({
  error,
  value,
  onChange,
  disabled = false,
}: DateInputProps) => {
  const [touched, setTouched] = React.useState(false);

  return (
    <>
      <label data-state={error && touched ? "error" : "idle"}>
        <input
          style={{
            ...(error && touched ? { borderColor: "red" } : {}),
          }}
          type="date"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
          }}
          value={value || ""}
          disabled={disabled}
          onBlur={(e) => setTouched(true)}
        />
      </label>
    </>
  );
};

const FlightBooker = () => {
  const [state, send] = useMachine(flightBookerMachine);

  const { startDate, returnDate, trip } = state.context;

  const handleFlightTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "oneWay" ? "oneWay" : "return";
    send({ type: "SET_TRIP", value });
  };

  // does not change state, called outside of interpreter
  const canSubmit = flightBookerMachine.transition(state, "SUBMIT").changed;

  return (
    <article>
      <h2>Flight Booker</h2>
      <p>
        The task is to build a frame containing a combobox C with the two
        options “one-way flight” and “return flight”, two textfields T1 and T2
        representing the start and return date, respectively, and a button B for
        submitting the selected flight.
      </p>
      <p>
        T2 is enabled iff C’s value is “return flight”. When C has the value
        “return flight” and T2’s date is strictly before T1’s then B is
        disabled.
      </p>
      <p>
        When a non-disabled textfield T has an ill-formatted date then T is
        colored red and B is disabled. When clicking B a message is displayed
        informing the user of his selection (e.g. “You have booked a one-way
        flight on 04.04.2014.”). Initially, C has the value “one-way flight” and
        T1 as well as T2 have the same (arbitrary) date (it is implied that T2
        is disabled).
      </p>
      <h3>Solution</h3>
      <div>
        <select
          id="flightTypeSelect"
          value={trip}
          onChange={handleFlightTypeChange}
        >
          <option value="oneWay">one-way flight</option>
          <option value="return">return flight</option>
        </select>
        <DateInput
          error={!startDate}
          value={startDate}
          onChange={(value) => send({ type: "startDate.UPDATE", value })}
        />
        <DateInput
          error={!returnDate}
          value={returnDate}
          onChange={(value) => send({ type: "returnDate.UPDATE", value })}
          disabled={trip === "oneWay"}
        />
        <button disabled={!canSubmit}>Book</button>
      </div>
      <h3>Problems</h3>
      <p>
        I've first tried modelling this by using nested state machines. That
        turned out to be overly verbose and unsuitable for this use case. So far
        it seems that state machines are a bit of an overkill for managing form
        state.
      </p>
    </article>
  );
};

export default FlightBooker;
