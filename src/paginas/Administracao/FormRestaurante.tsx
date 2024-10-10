/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const FormRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const onSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        axios.post('http://localhost:8000/api/v2/restaurantes/', {
            nome: nomeRestaurante
        })
        .then(() => {
            alert("Restaurante cadastrado com sucesso!")
        })
    }
    return(
        <form onSubmit={onSubmit}>
            <TextField 
            value={nomeRestaurante} 
            onChange={ evento => setNomeRestaurante(evento.target.value)} 
            id="standard-basic" 
            label="Nome do restaurante" 
            variant="standard" />
            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    )
}

export default FormRestaurante;