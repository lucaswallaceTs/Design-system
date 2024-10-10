/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import "./styles.scss";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";
import {
  Button,
  CardEvent,
  Dialog,
  ModalBox,
} from "design-system-ticket-sports";
import { Footer } from "design-system-ticket-sports";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");

  useEffect(() => {
    // obter restaurantes
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((resposta) => {
        setRestaurantes([...restaurantes, ...resposta.data.results]);
        setProximaPagina(resposta.data.next);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };
  const [openModalSendRegistration, setOpenModalSendRegistration] =
    useState<boolean>(false);

    const handleOpenModal = () => {
      setOpenModalSendRegistration(true);
    };
  
    const handleCloseModal = () => {
      setOpenModalSendRegistration(false);
    };
  return (
    <>
      {openModalSendRegistration && (
        <Dialog openModal={openModalSendRegistration}>
          <ModalBox title={"addd"} textInfo={"ddddd"} children={handleCloseModal} />
        </Dialog>
      )}
      <section className={style.ListaRestaurantes}>
        <h1>
          <Button title={"Modal"} variation={"primary"} size={"medium"} onClick={handleOpenModal}/>
          Os restaurantes mais <em>bacanas</em>!
        </h1>
        <div className="cards">
          <CardEvent
            titleEvent={"Evento"}
            location={"Suzano"}
            dateEvent={"14/05/19"}
            imageEvent={
              "https://cdn.ticketsports.com.br/ticketagora/images/thumb/IOQ77E6U2HCAWMN2S2ZC4TIRJY51ZCGHA57209W14H2Y1KPF00.png"
            }
            colorStatus={"positivo"}
            status={"Aberto"}
          />
          <CardEvent
            titleEvent={"Evento"}
            location={"Suzano"}
            dateEvent={"14/05/19"}
            imageEvent={
              "https://cdn.ticketsports.com.br/ticketagora/images/thumb/IOQ77E6U2HCAWMN2S2ZC4TIRJY51ZCGHA57209W14H2Y1KPF00.png"
            }
            colorStatus={"positivo"}
            status={"Aberto"}
          />
        </div>
        <Footer text={"assaa"} />

        {restaurantes?.map((item) => (
          <Restaurante restaurante={item} key={item.id} />
        ))}
        {proximaPagina && (
          <Button
            title="Ver mais"
            variation={"primary"}
            size={"medium"}
            onClick={verMais}
          />
        )}
      </section>
    </>
  );
};

export default ListaRestaurantes;
