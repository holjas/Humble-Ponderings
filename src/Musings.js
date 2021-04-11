import {
  faBookmark,
  faEdit,
  faSmile,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  return (
    <>
      {props.musingState.map((item) => {
        return (
          <div className="musingCard" key={item.key}>
            <div className="musingHeadline">
              <h4>{item.musing[3]}</h4>
            </div>

            <p className="textEmphasis">{item.musing[1]}</p>
            <p>{item.musing[2]}</p>

            <section className="moodMeter">
              <FontAwesomeIcon icon={faSmile} />
              <FontAwesomeIcon icon={faEdit} />
              <FontAwesomeIcon icon={faTrashAlt} onClick={ () => props.removeMusing(props.musings) }/>
              <FontAwesomeIcon icon={faBookmark} />
            </section>
          </div>
        );
      })}
    </>
  );
}

export default Musings;
