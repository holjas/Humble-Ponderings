function Musings(props) {
  return (
    <>
      {props.musingState.map((item) => {
        return (
          <p key={item.key}>
            {item.musing[0]} AND {item.musing[1]}
          </p>
        );
      })}
    </>
  );
}

export default Musings;
