import React from "react";
import EventBlock from "../EventBlock"; // Adjust path as needed

const EventsBlockWrapper = ({ data, variants }) => {
  return (
    <fieldset className="pb-4">
      <legend className="mb-2 flex flex-row text-base font-semibold">
        Events
      </legend>
      <EventBlock
        type="trending"
        layout="sidebar"
        data={data}
        variants={variants}
      />
    </fieldset>
  );
};

export default EventsBlockWrapper;
