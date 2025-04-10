import React from "react";
import SurgeryBookingList from "./surgeryBooking";
import PostOpNotes from "./postOpNotes";
import PostOpCareForm from "./postOpCareForm";

const PostOperative = ({ patientId }) => {
  return (
    <div className="full-screen-scrollable">
      <div className="h5">Post-Operative</div>
      <div>
        <SurgeryBookingList patientId={patientId} />
      </div>
      <div>
        <PostOpNotes patientId={patientId} />
      </div>
      <div>
        <PostOpCareForm patientId={patientId} />
      </div>
    </div>
  );
};

export default PostOperative;
