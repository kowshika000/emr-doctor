import React from "react";
import SurgeryBookingList from "./surgeryBooking";
import PostOpNotes from "./postOpNotes";
import PostOpCareForm from "./postOpCareForm";

const PostOperative = () => {
  return (
    <div className="full-screen-scrollable">
      <div className="h5">Post-Operative</div>
      <div>
        <SurgeryBookingList />
      </div>
      <div>
        <PostOpNotes />
      </div>
      <div>
        <PostOpCareForm />
      </div>
    </div>
  );
};

export default PostOperative;
