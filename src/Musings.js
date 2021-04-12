// import firebase from "./firebase";
import {
  faBookmark,
  faEdit,
  faSmile,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Musings(props) {
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
    // const userId = `-MY23fP9h4gvOjL_I7-0`;
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
    const targetedId = e.currentTarget.parentNode.parentNode.children[1]; //target the musing
    targetedId.style.display = "none"; //hide the musing
    // console.log(e.currentTarget.parentNode.parentNode.children);
    // targetedId.style.color = "red";
    const editForm = e.currentTarget.parentNode.parentNode.children[2]; //target the edit box
    editForm.style.display = "flex";

    // console.log(e.currentTarget.parentNode.parentNode.children[1]);
  };

  // return FA icon for related value

  
  // const openTextBox = (area) => {
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
                <label htmlFor="editMusing" className="visually-hidden">
                  edit musing here
                </label>
                <textarea
                  type="text"
                  id="editMusing"
                  // // onChange={handleChange}
                  value={item.musing[2]}
                />

                <button>save changes</button>
              </form>
              {/*  */}
              {/*  */}
              <div className="musingNav">
                <FontAwesomeIcon icon={faSmile} className="navMood" />
                <p id="navMood">{item.musing[3]}</p>

                <div onClick={handleEdit} id={item.key}>
                  <FontAwesomeIcon icon={faEdit} className="navButton" />
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="navButton"
                    onClick={() => props.removeMusing(props.musings)}
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
