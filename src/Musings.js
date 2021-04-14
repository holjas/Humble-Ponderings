import MusingCard from "./MusingCard";

function Musings(props) {
  return (
    <section className="wrapper wrapperThick">
      {/* ternary for if there are musings to show: then populate w/ musings */}
      {props.musingState.length > 0 ? (
        // if there are musings to display, they go here...
        <div className="musingContainer">
          {props.musingState.map((item) => {
            return <MusingCard item={item} key={item.key} />;
          })}
        </div>
      ) : (
        // ternary: if there are NO musings to show: then retun "awaiting your musings"
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
