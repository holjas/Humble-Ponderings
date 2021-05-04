function Moodbar({ handleMood }) {
  return (
    <>
      {/* Moods bar start. user selects a mood to include with thought musing*/}
      <label htmlFor="moodWrapper">
        <h4>How are you feeling today?</h4>
      </label>

      <div className="moodWrapper">
        <label htmlFor="happy" className="visually-hidden">
          happy mood
        </label>
        <input
          type="image"
          src="/assets/grin-regular.svg"
          alt="happy face line drawing"
          className="mood"
          onClick={handleMood}
          value="happy"
          id="happy"
        ></input>

        <label htmlFor="love" className="visually-hidden">
          love mood
        </label>
        <input
          type="image"
          src="/assets/grin-hearts-regular.svg"
          alt="happy face with heart eyes line drawing"
          className="mood"
          onClick={handleMood}
          value="love"
          id="love"
        ></input>

        <label htmlFor="excited" className="visually-hidden">
          excited mood
        </label>
        <input
          type="image"
          src="/assets/grin-stars-regular.svg"
          alt="excited face line drawing"
          className="mood"
          onClick={handleMood}
          value="excited"
          id="excited"
        ></input>

        <label htmlFor="whatever" className="visually-hidden">
          whatever mood
        </label>
        <input
          type="image"
          src="/assets/meh-rolling-eyes-regular.svg"
          alt="indifferent face line drawing"
          className="mood"
          onClick={handleMood}
          value="whatever"
          id="whatever"
        ></input>

        <label htmlFor="angry" className="visually-hidden">
          angry mood
        </label>
        <input
          type="image"
          src="/assets/angry-regular.svg"
          alt="angry face line drawing"
          className="mood"
          onClick={handleMood}
          value="angry"
          id="angry"
        ></input>

        <label htmlFor="shocked" className="visually-hidden">
          shocked mood
        </label>
        <input
          type="image"
          src="/assets/dizzy-regular.svg"
          alt="shocked face line drawing"
          className="mood"
          onClick={handleMood}
          value="shocked"
          id="shocked"
        ></input>

        <label htmlFor="tired" className="visually-hidden">
          tired mood
        </label>
        <input
          type="image"
          src="/assets/tired-regular.svg"
          alt="tired face line drawing"
          className="mood"
          onClick={handleMood}
          value="tired"
          id="tired"
        ></input>

        <label htmlFor="sad" className="visually-hidden">
          sad mood
        </label>
        <input
          type="image"
          src="/assets/sad-cry-regular.svg"
          alt="sad face line drawing"
          className="mood"
          onClick={handleMood}
          value="sad"
          id="sad"
        ></input>
      </div>
      {/* Moods bar end*/}
    </>
  );
}
export default Moodbar;
