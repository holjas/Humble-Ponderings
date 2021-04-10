function Musings(props) {
  return (
    <>
      {props.musingState.map((item) => {
        return <p key={item.key}>{item.musing}</p>;
      })}
    </>
  );
}

export default Musings;
