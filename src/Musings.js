import firebase from "./firebase";
import { useState } from 'react'
import {
  faBookmark,
  faEdit,
  faSmile,
  faTrashAlt,
  // faGrinAlt,
  // faGrinHearts,
  // faGrinStars,
  // faMehRollingEyes,
  // faAngry,
  // faDizzy,
  // faTired,
  // faSadCry,
} from "@fortawesome/free-regular-svg-icons";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Musings(props) {
  const [userMood, setUserMood] = useState('');

  const handleUserMood = (e) => {
    console.log(e.target.value);
    setUserMood(e.target.value);

    // // const { userMood } = props;
    //   switch (userMood) {
    //     case 'happy':
    //       return <p><FontAwesomeIcon icon={faGrinAlt} /></p>;
    //       break;
    //     case 'love':
    //       return <p><FontAwesomeIcon icon={faGrinHearts} /></p>;
    //       break;
    //     case 'excited':
    //       return <p><FontAwesomeIcon icon={faGrinStars} /></p>;
    //       break;
    //     case 'whatever':
    //       return <p><FontAwesomeIcon icon={faMehRollingEyes} /></p>;
    //       break;
    //     case 'angry':
    //       return <p><FontAwesomeIcon icon={faAngry} /></p>;
    //       break;
    //     case 'shocked':
    //       return <p><FontAwesomeIcon icon={faDizzy} /></p>;
    //       break;
    //     case 'tired':
    //       return <p><FontAwesomeIcon icon={faTired} /></p>;
    //       break;
    //     case 'sad':
    //       return <p><FontAwesomeIcon icon={faSadCry} /></p>;
    //       break;
    //     default:
    //       return <p><FontAwesomeIcon icon={faSmile} className="navMood" /></p>;
    //       break;
    //   }


  }



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


  // const openTextBox = (area) => {
  //   const textBoxArea = document.getElementById("textBoxArea");
  // };

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
    targetedId.style.display = "block";
    const editForm = e.currentTarget.parentNode.parentNode.children[2];
    editForm.style.display = "none";
  };


  return (
    <section className="musingContainer warpperThick">
      {props.musingState.map((item) => {
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
                <div className="navMood">
                <p id="navMood" value={userMood} onChange={handleUserMood}></p>
                </div>
                {/* <FontAwesomeIcon icon={faSmile} className="navMood" />
                <p id="navMood">{item.musing[3]}</p> */}

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
