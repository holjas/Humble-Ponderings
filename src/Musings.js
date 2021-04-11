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
    // console.log(stuff[item]);
  }

  // console.log(props.musingState[1].musing[0]);
  // props.musingState.map((x) => console.log(x.musing[0]));

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
                <FontAwesomeIcon icon={faSmile} />
                <FontAwesomeIcon icon={faEdit} />
                <FontAwesomeIcon icon={faTrashAlt} />
                <FontAwesomeIcon icon={faBookmark} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Musings;
