function Musings(props) {
  return (
    // <>
    //   <p>{props.musing}</p>
    // </>

    <>
      {props.musingState.map((item) => {
        return <p key={item.key}>{item.musing}</p>;
      })}
    </>
  );
}

export default Musings;
