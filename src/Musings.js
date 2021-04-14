import { useState } from "react";
import firebase from "./firebase";
import {
  faBookmark,
  faEdit,
  faSmile,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Musings(props) {
  const [bookmarkIcon, setBookmarkIcon] = useState(false);
  //remove/delete musing
  const handleRemoveMusing = (e) => {
    const targetKey = e.currentTarget.id;
    firebase
      .database()
      .ref("musings/" + targetKey)
      .remove();
  };
  //edit musing, opens the textarea window to make changes
  const handleEdit = (e) => {
    const targetedId = e.currentTarget.parentNode.parentNode.children[1];
    targetedId.style.display = "none";
    const editForm = e.currentTarget.parentNode.parentNode.children[2];
    editForm.style.display = "flex";
  };

  //edit musing save button/ send changes to firebse
  const handleSaveEdit = (itemKey, prompt, dateTime, editMusing, event) => {
    firebase
      .database()
      .ref("musings/" + itemKey)
      .set({
        0: prompt,
        1: editMusing,
        2: dateTime,
      });
    handleThis(event);
  };
  //hide the edit textform and retun to the regular card view
  const handleThis = (e) => {
    const targetedId = e.currentTarget.parentNode.parentNode.children[1];
    targetedId.style.display = "-webkit-box";
    const editForm = e.currentTarget.parentNode.parentNode.children[2];
    editForm.style.display = "none";
  };

  return (
    <section className="wrapper wrapperThick">
      {/* ternary for if there are musings to show: then populate w/ musings */}
      {props.musingState.length > 0 ? (
        <div className="musingContainer">
          {props.musingState.map((item) => {
            const dateTime = item.musing[2];
            const writingPrompt = item.musing[0];
            const userMusing = item.musing[1];
            return (
              <div className="musingCard" key={item.key}>
                <div className="musingHeadline">
                  {/* displays time */}
                  <h4>{dateTime}</h4>
                </div>

                <div className="musingTextBox">
                  {/* displays writing prompt */}
                  <p>{writingPrompt}</p>
                  {/* displays previously entered musing */}
                  <p>{userMusing}</p>

                  {/*form is hidden and will appear will 'edit' it selected */}
                  <form action="submit" id={item.key} className="textBoxEdit">
                    <label htmlFor="editMusing" className="visually-hidden">
                      edit musing here
                    </label>
                    <textarea
                      type="text"
                      id="editMusing"
                      defaultValue={userMusing}
                    />

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleSaveEdit(
                          item.key,
                          writingPrompt,
                          dateTime,
                          e.currentTarget.parentNode[0].value,
                          e
                        );
                      }}
                    >
                      save changes
                    </button>
                  </form>
                  {/*  */}
                  {/* card nav bar, with edit/delete/bookmark */}
                  <div className="musingNav">
                    <FontAwesomeIcon icon={faSmile} className="navMood" />
                    <div onClick={handleEdit} id={item.key}>
                      <FontAwesomeIcon icon={faEdit} className="navButton" />
                    </div>
                    <div onClick={handleRemoveMusing} id={item.key}>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="navButton"
                      />
                    </div>
                    <div>
                      <FontAwesomeIcon
                        onClick={() => setBookmarkIcon(!bookmarkIcon)}
                        icon={bookmarkIcon ? faBookmarkFull : faBookmark}
                        className="navButton"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // ternary for if there are NO musings to show: then retun "awaiting your musings"
        <>
          <div className="musingWaitingContainer">
            <img
              src="/assets/gwynniferWaiting.gif"
              alt="thought bubble animation"
            />
          </div>
          <h2 className="musingAwaiting">Awaiting your thoughts</h2>
        </>
      )}
    </section>
  );
}

export default Musings;
