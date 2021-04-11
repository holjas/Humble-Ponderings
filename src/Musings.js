import firebase from "./firebase";
import {
  faBookmark,
  faEdit,
  faSmile,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//-MY180moA_TcalR8DXi-
//name on item you could never throw away

function Musings(props) {
  const handleEdit = (e) => {
    // const userId = `-MY18GTHtDlP_yYGnRXh`;
    // firebase
    //   .database()
    //   .ref("musings/" + userId)
    //   .set({
    //     1: "this is one",
    //     2: "TRY TO TARGET THIS",
    //     3: "this is three",
    //   });
    // console.log(e.currentTarget.id);
    // const targetedId = e.currentTarget.id;
    const targetedId = e.currentTarget.parentNode.parentNode.children[1];
    const targetedArea = document.getElementById(targetedId);
    targetedId.style.backgroundColor = "red";
    // console.log(e.currentTarget.parentNode.parentNode.children[1]);
  };

  // const openTextBox = () => {
  //   const textBoxArea = document.getElementById("textBoxArea");
  // };

  return (
    <section className="musingContainer warpperThick">
      {props.musingState.map((item) => {
        return (
          <div className="musingCard" key={item.key}>
            <div className="musingHeadline">
              <h4>{item.musing[3]}</h4>
            </div>

            <div className="musingTextBox">
              <p className="textEmphasis">{item.musing[1]}</p>
              <p id="textBoxDisplay">{item.musing[2]}</p>
              {/*  */}
              {/*  */}
              <form action="submit" id="textBoxEdit" className="textBoxEdit">
                <label htmlFor="editMusing">edit here</label>
                <input
                  // type="text"
                  id="editMusing"
                  // // onChange={handleChange}
                  // // value={userInput}
                />

                <button>edit button</button>
              </form>
              {/*  */}
              {/*  */}
              <div className="musingNav">
                <FontAwesomeIcon icon={faSmile} className="navMood" />

                <div onClick={handleEdit} id={item.key}>
                  <FontAwesomeIcon icon={faEdit} className="navButton" />
                </div>
                <div>
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
