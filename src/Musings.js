import firebase from "./firebase";
import {
  faBookmark,
  faEdit,
  faSmile,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Musings(props) {
  //remove musing
  const handleRemoveMusing = (e) => {
    const targetKey = e.currentTarget.id;
    firebase
      .database()
      .ref("musings/" + targetKey)
      .remove();
  };
  //edit musing, opens the textarea window to make changes
  const handleEdit = (e) => {
    const targetedId = e.currentTarget.parentNode.parentNode.children[1]; //target the musing
    targetedId.style.display = "none"; //hide the musing
    const editForm = e.currentTarget.parentNode.parentNode.children[2]; //target the edit box
    editForm.style.display = "flex";

    // const targetKey = e.currentTarget.id;
    // firebase
    //   .database()
    //   .ref("musings/" + targetKey)
    //   .set({
    //     1: "this is one",
    //     2: "TRY TO TARGET THIS",
    //     3: "this is three",
    //   });
    //console.log(e.currentTarget.id); //this captures our key
    // const targetedId = e.currentTarget.id;

    // console.log(e.currentTarget.parentNode.parentNode.children);
    // targetedId.style.color = "red";

    // console.log(e.currentTarget.parentNode.parentNode.children[1]);
  };
  //edit musing save button/ send changes to firebse
  const handleSaveEdit = (itemKey, prompt, dateTime, editMusing) => {
    // const editMusing = e.currentTarget.parentNode[0].value;
    // console.log(e.currentTarget.parentNode.parentNode.value);
    firebase
      .database()
      .ref("musings/" + itemKey)
      .set({
        0: prompt,
        1: editMusing,
        2: dateTime,
      });
    console.log("PROMPT", prompt);
    console.log("DATETIME", dateTime);
    console.log("EDIT MUSING", editMusing);
  };
  //captures the text input values
  // const handleChange = (event) => {
  //   event.target.value = "CHANGE BY ME";
  //   // console.log(event.target.value);
  // };

  return (
    <section className="musingContainer warpperThick">
      {props.musingState.map((item) => {
        // console.log(item.musing[1]);
        // console.log(item.musing[2]);
        // console.log(item.musing[3]);

        return (
          <div className="musingCard" key={item.key}>
            <div className="musingHeadline">
              {/* displays time */}
              <h4>{item.musing[2]}</h4>
            </div>

            <div className="musingTextBox">
              {/* displays writing prompt */}
              <p className="textEmphasis">{item.musing[0]}</p>
              {/* displays previously entered musing */}
              <p id="textBoxDisplay">{item.musing[1]}</p>

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
                      e.currentTarget.parentNode[0].value
                    );
                  }}
                >
                  save changes
                </button>
              </form>
              {/*  */}
              {/*  */}
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
    </section>
  );
}

export default Musings;
