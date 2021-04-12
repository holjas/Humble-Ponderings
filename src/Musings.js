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
  const handleSaveEdit = (e) => {
    e.preventDefault();
    // const editMusing = e.target.parentNode[0].value);
    const targetKey = e.currentTarget.parentNode;
    console.log(targetKey);

    // firebase
    //   .database()
    //   .ref("musings/" + targetKey)
    //   .set({
    //     1: "this is one",
    //     2: "TRY TO TARGET THIS",
    //     3: "this is three",
    //   });
  };
  //captures the text input values
  // const handleChange = (event) => {
  //   event.target.value = "CHANGE BY ME";
  //   // console.log(event.target.value);
  // };

  return (
    <section className="musingContainer warpperThick">
      {props.musingState.map((item) => {
        return (
          <div className="musingCard" key={item.key}>
            <div className="musingHeadline">
              <h4>{item.musing[2]}</h4>
            </div>

            <div className="musingTextBox">
              <p className="textEmphasis">{item.musing[0]}</p>
              <p id="textBoxDisplay">{item.musing[1]}</p>
              {/*  */}
              {/*  */}
              <form action="submit" id="textBoxEdit" className="textBoxEdit">
                <label htmlFor="editMusing" className="visually-hidden">
                  edit musing here
                </label>
                <textarea
                  type="text"
                  id="editMusing"
                  defaultValue={item.musing[1]}
                />

                <button onClick={handleSaveEdit}>save changes</button>
              </form>
              {/*  */}
              {/*  */}
              <div className="musingNav">
                <FontAwesomeIcon icon={faSmile} className="navMood" />

                <div onClick={handleEdit} id={item.key}>
                  <FontAwesomeIcon icon={faEdit} className="navButton" />
                </div>
                <div onClick={handleRemoveMusing} id={item.key}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="navButton"
                    // onClick={() => props.removeMusing(props.musings)}
                  />
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
