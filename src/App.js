import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import InfoArtista from "./components/InfoArtista";
import axios from "axios";

function App() {
  //state para guardar los datos ingresados por el usuario
  const [busquedaletra, guardarBusquedaLetra] = useState({});
  //state para guardar la info de la API letras
  const [letras, guardarLetras] = useState("");
  //state para guardar la info de la API artista
  const [info, guardarInfo] = useState({});

  useEffect(() => {
    if (Object.keys(busquedaletra).length === 0) return;
    const ConsultarApiLetra = async () => {
      const { artista, cancion } = busquedaletra;
      const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
      const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;

      //De esta forma se consultan ambas Api al mismo tiempo.
      const [infoLetra, infoArtista] = await Promise.all([
        axios.get(url),
        axios.get(url2)
      ]);
      // de esta forma se consultara una api primero y luego la otra
      // const resultado = await axios(url);
      // const resultado2=await axios(url2)

      guardarInfo(infoArtista.data.artists[0]);
      guardarLetras(infoLetra.data.lyrics);
    };
    ConsultarApiLetra();
  }, [busquedaletra, info]);

  return (
    <Fragment>
      <Formulario guardarBusquedaLetra={guardarBusquedaLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <InfoArtista info={info} />
          </div>
          <div className="col-md-6">
            <Cancion letras={letras} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
