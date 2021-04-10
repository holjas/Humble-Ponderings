import {
  faBookmark,
  faEdit,
  faSmile,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Musings(props) {
  return (
    <>
      {props.musingState.map((item) => {
        return (
          <div className="musingCard" key={item.key}>
            <div className="musingHeadline">
              <h4>{item.musing[2]}</h4>
            </div>

            <p className="textEmphasis">{item.musing[0]}</p>
            <p>{item.musing[1]}</p>

            <div className="moodMeter">
              <FontAwesomeIcon icon={faSmile} />
              <FontAwesomeIcon icon={faEdit} />
              <FontAwesomeIcon icon={faTrashAlt} />
              <FontAwesomeIcon icon={faBookmark} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Musings;
