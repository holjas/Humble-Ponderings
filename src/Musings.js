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
  const stuff = Object.values(props);
  // stuff.map((x, y) => console.log(x + "word"));
  for (const item in stuff) {
    const objectKey = Object.keys(stuff[item]);
    objectKey.sort((a, b) => {
      return b - a;
    });
    console.log(stuff[item]);
  }

  // // remove musing
  // const removeMusing = (props) => {
  //   const userId = `-MY23fP9h4gvOjL_I7-0`;
  //   firebase.database().ref("musings/" + userId);
  //   // dbRef.("musings").remove();
  //   console.log('clicked!')
  // }


  // console.log(props.musingState[1].musing[0]);
  // props.musingState.map((x) => console.log(x.musing[0]));

  const handleEdit = (e) => {
    const userId = `-MY23fP9h4gvOjL_I7-0`;
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


            <section className="moodMeter">
              <FontAwesomeIcon icon={faSmile} />
              <FontAwesomeIcon icon={faEdit} />
              <FontAwesomeIcon icon={faTrashAlt} onClick={ () => props.removeMusing(props.musings) }/>
              <FontAwesomeIcon icon={faBookmark} />
            </section>

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
