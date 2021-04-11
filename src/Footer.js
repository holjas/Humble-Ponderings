import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="wrapper">
      <div className="footerSmallContainer">
        <h2>created by</h2>
        <div className="footerCreatedText">
          <a
            href="https://github.com/hidavehenry"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithubSquare} />
          </a>
          <a
            href="https://www.linkedin.com/in/dave-henry-765b9b159/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <h3>David Henry</h3>
        </div>
        <div className="footerCreatedText">
          <a href="https://github.com/holjas" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithubSquare} />
          </a>
          <a
            href="https://www.linkedin.com/in/hollyjasiura/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <h3>Holly Jasiura</h3>
        </div>
      </div>

      <div className="footerSmallContainer">
        <h2>created for</h2>
        <div className="footerCreatedText">
          <a
            href="https://github.com/gwynnifer-co/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="assets/gwynniferCoLogo.png"
              alt="gwynnifer co logo"
              title="wynnifer co logo"
            />
          </a>

          <h3>Gwynnifer Co.</h3>
        </div>
        <div className="footerCreatedText">
          <a href="https://junocollege.com/" target="_blank" rel="noreferrer">
            <img
              src="assets/junoLogo.jpg"
              alt="juno college logo"
              title="juno college logo"
            />
          </a>

          <h3>Juno College of Technology</h3>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
