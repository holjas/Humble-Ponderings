import { useState } from "react";
import firebase from "./firebase";
import {
  faBookmark,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MusingCard({ item }) {
  const [bookmarkIcon, setBookmarkIcon] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const dateTime = item.musing[2];
  const writingPrompt = item.musing[0];
  const userMusing = item.musing[1];
  const moodNav = item.musing[3];

  //remove/delete musing
  const handleRemoveMusing = (e) => {
    const targetKey = e.currentTarget.id;
    firebase
      .database()
      .ref("musings/" + targetKey)
      .remove();
  };
  //edit musing, opens the textarea window to make changes
  const handleShowEditBox = () => {
    setIsEdit(true);
  };
  //edit musing save button/ send changes to firebse
  const handleSaveEdit = (itemKey, prompt, dateTime, editMusing) => {
    firebase
      .database()
      .ref("musings/" + itemKey)
      .set({
        0: prompt,
        1: editMusing,
        2: dateTime,
        3: moodNav,
      });
    setIsEdit(false);
  };
  //on the muse card, return the mood that was originally submitted
  const musingNavMood = (moodNav) => {
    switch (moodNav) {
      case "happy":
        return (
          <img
            src="/assets/grin-regular.svg"
            alt="happy face line drawing"
            className="cardMood"
          />
        );

      case "love":
        return (
          <img
            src="/assets/grin-hearts-regular.svg"
            alt="happy face with heart eyes line drawing"
            className="cardMood"
          />
        );

      case "excited":
        return (
          <img
            src="/assets/grin-stars-regular.svg"
            alt="excited face line drawing"
            className="cardMood"
          />
        );
      case "whatever":
        return (
          <img
            src="/assets/meh-rolling-eyes-regular.svg"
            alt="indifferent face line drawing"
            className="cardMood"
          />
        );
      case "angry":
        return (
          <img
            src="/assets/angry-regular.svg"
            alt="angry face line drawing"
            className="cardMood"
          />
        );
      case "shocked":
        return (
          <img
            src="/assets/dizzy-regular.svg"
            alt="shocked face line drawing"
            className="cardMood"
          />
        );
      case "tired":
        return (
          <img
            src="/assets/tired-regular.svg"
            alt="tired face line drawing"
            className="cardMood"
          />
        );
      case "sad":
        return (
          <img
            src="/assets/sad-cry-regular.svg"
            alt="sad face line drawing"
            className="cardMood"
          />
        );

      default:
        return (
          <img
            src="/assets/gwynniferHead.png"
            alt="ghostly woman haunting our code"
            className="gwynnifer"
          />
        );
    }
  };

  return (
    <div className="musingCard" key={item.key}>
      <div className="musingHeadline">
        {/* displays time musing was received*/}
        <h4>{dateTime}</h4>
      </div>

      <div className="musingTextBox">
        {/* displays writing prompt */}
        <p>{writingPrompt}</p>
        {/* displays previously entered musing / hides when edit window is open */}
        {!isEdit && <p>{userMusing}</p>}

        {/* displays edit window when user selects */}
        {isEdit && (
          <form action="submit" id={item.key} className="textBoxEdit">
            <label htmlFor="editMusing" className="visually-hidden">
              edit musing here
            </label>
            <textarea type="text" id="editMusing" defaultValue={userMusing} />

            <button
              onClick={(e) => {
                e.preventDefault();
                handleSaveEdit(
                  item.key,
                  writingPrompt,
                  dateTime,
                  e.currentTarget.parentNode[0].value
                );
              }}
            >
              save changes
            </button>
          </form>
        )}

        {/* card nav bar, with edit/delete/bookmark */}
        <div className="musingNav">
          {musingNavMood(moodNav)}

          <div onClick={handleShowEditBox} id={item.key}>
            <FontAwesomeIcon icon={faEdit} className="navButton" />
          </div>
          <div onClick={handleRemoveMusing} id={item.key}>
            <FontAwesomeIcon icon={faTrashAlt} className="navButton" />
          </div>
          <div onClick={() => setBookmarkIcon(!bookmarkIcon)}>
            <FontAwesomeIcon
              icon={bookmarkIcon ? faBookmarkFull : faBookmark}
              className="navButton"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MusingCard;
