import firebase from "./firebase";
import {
  faBookmark,
  faEdit,
  faSmile,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Musings(props) {
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
      <div className="musingContainer">
        {/* terenary "nothing to see here??" */}
        {props.musingState.map((item) => {
          return (
            <div className="musingCard" key={item.key}>
              <div className="musingHeadline">
                {/* displays time */}
                <h4>{item.musing[2]}</h4>
              </div>

              <div className="musingTextBox">
                {/* displays writing prompt */}
                <p>{item.musing[0]}</p>
                {/* displays previously entered musing */}
                <p>{item.musing[1]}</p>

                {/*form is hidden and will appear will 'edit' it selected */}
                <form action="submit" id={item.key} className="textBoxEdit">
                  <label htmlFor="editMusing" className="visually-hidden">
                    edit musing here
                  </label>
                  <textarea
                    type="text"
                    id="editMusing"
                    defaultValue={item.musing[1]}
                  />

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleSaveEdit(
                        item.key,
                        item.musing[0],
                        item.musing[2],
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
                    <FontAwesomeIcon icon={faTrashAlt} className="navButton" />
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faBookmark} className="navButton" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Musings;
