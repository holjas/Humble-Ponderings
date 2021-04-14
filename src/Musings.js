import { useState } from "react";
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
import { faBookmark as faBookmarkFull } from "@fortawesome/free-solid-svg-icons";
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
