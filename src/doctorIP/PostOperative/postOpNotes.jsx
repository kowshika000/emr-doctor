import React, { useEffect, useState } from "react";
import Notes from "../components/Notes";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostOprNote } from "../../Redux/slice/IpSlice/GET/postOprNote";
import { createPostOprNote } from "../../Redux/slice/IpSlice/POST/postOprNote";
import { updatePostOprNote } from "../../Redux/slice/IpSlice/PUT/postOprNote";
import { deletePostOprNote } from "../../Redux/slice/IpSlice/DELETE/postOprNote";

const PostOpNotes = ({ patientId }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const { data } = useSelector((state) => state?.docEmr?.postNote);

  useEffect(() => {
    if (patientId) {
      dispatch(fetchPostOprNote({ patientId }));
    }
  }, [dispatch, patientId]);

  useEffect(() => {
    if (data) {
      const formattedNotes = data?.map((item, index) => {
        return {
          id: item.EmrNotesId,
          notes: item.notesDescription || "--",
          enteredDate: item.createdAt || "--",
          enteredBy: item.createdBy || "--",
        };
      });

      setNotes(formattedNotes);
    }
  }, [data]);

  const handleAddNote = (updatedNotes) => {
    const note = updatedNotes[updatedNotes.length - 1]?.notes || "";
    dispatch(createPostOprNote({ notesDescription: note, patientId }))
      .then(() => dispatch(fetchPostOprNote({ patientId })))
      .catch((error) => console.error("Error adding note:", error));
  };

  const handleEditNote = (editedNote) => {
    console.log("Incoming editedNote:", editedNote);

    if (!editedNote || !editedNote.id) {
      console.error("Edit failed: No valid ID found.");
      return;
    }
    const payload = {
      id: editedNote.id,
      newDescription: editedNote.notes,
      patientId,
    };
    dispatch(updatePostOprNote(payload))
      .then(() => dispatch(fetchPostOprNote({ patientId })))
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (deletedNote) => {
    console.log("deletedNote", deletedNote);

    if (!deletedNote || !deletedNote.id) {
      console.error("Delete failed: No valid ID found.");
      return;
    }

    dispatch(deletePostOprNote({ id: deletedNote.id }))
      .then(() => dispatch(fetchPostOprNote({ patientId })))
      .catch((error) => console.error("Error deleting note:", error));
  };
  return (
    <Notes
      title={"Post-Operative Notes"}
      rows={notes}
      onAddNote={handleAddNote}
      onDeleteNote={handleDeleteNote}
      onEditNote={handleEditNote}
      addBtnName={"Add Post-Operative Notes"}
    />
  );
};

export default PostOpNotes;
