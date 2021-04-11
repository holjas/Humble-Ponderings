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
    //onclick, grab the user input text
    // const dbRef = firebase.database();
    const userId = `-MY18GTHtDlP_yYGnRXh`;
    // firebase.database().ref(`${userId}`).set("WORDS");
    firebase
      .database()
      .ref("musings/" + userId)
      .set({
        1: "this is one",
        2: "TRY TO TARGET THIS",
        3: "this is three",
      });
  };

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
              <p>{item.musing[2]}</p>
              {/* <p>mood={item.musing[4]}</p> */}

              <div className="musingNav">
                <FontAwesomeIcon icon={faSmile} className="navMood" />

                <div onClick={handleEdit} key={item.key}>
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
