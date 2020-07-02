import React, { Fragment } from "react";

const Cancion = ({ letras }) => {
  if (letras.length === 0) {
    return null;
  }
  return (
    <Fragment>
      <h2>Letra de la Cancion</h2>
      <p className="letra">{letras}</p>
    </Fragment>
  );
};

export default Cancion;
