import React, { useState, useContext, useRef } from "react";
import StoreContext from "../Store/context";
import { useHistory } from "react-router";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

function initialState() {
  return { username: "", password: "" };
}

function login({ username, password }) {
  const erros = {};
  if (username === "admin" && password === "admin") {
    return { token: "token_falso" };
  } else {
    erros.username = "Usuário inválido.";
    erros.password = "Senha inválida.";
  }
  return { erros };
}

const UserLogin = () => {
  const toast = useRef(null);
  const [erros, setErros] = useState({});
  const [values, setValues] = useState(initialState);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  function onSubmit(event) {
    event.preventDefault();

    const { token, erros } = login(values);

    if (token) {
      setToken(token);
      return history.push("/altimus");
    } else if (erros) {
      setErros(erros);
      toast.current.show({
        severity: "error",
        summary: "Erro",
        detail: "Tente novamente. Dica: 'admin'",
        life: 3000,
      });
    }

    setValues(initialState);
  }

  return (
    <div className="p-d-flex p-jc-center">
      <Toast ref={toast} />
      <div
        className="p-flex-column p-shadow-6 p-p-5 p-mt-5"
        style={{ width: "300px" }}
      >
        <h3 className="p-text-light p-text-center p-mt-0">Acesse o Sistema</h3>
        <form className="p-fluid card" onSubmit={onSubmit}>
          <div className="p-field p-text-center">
            <label
              htmlFor="username"
              className="p-col-fixed p-text-center p-pb-0"
              style={{ width: "100px" }}
            >
              Usuário
            </label>
            <div className="p-text-nowrap">
              <InputText
                id="username"
                type="text"
                name="username"
                className={erros.username && "p-invalid"}
                value={values.username}
                onChange={onChange}
              />
              {erros.username && (
                <Message severity="error" text={erros.username} />
              )}
            </div>
          </div>
          <div className="p-field p-text-center">
            <label
              htmlFor="password"
              className="p-col-fixed p-text-center p-pb-0"
              style={{ width: "100px" }}
            >
              Senha
            </label>
            <div className="card">
              <Password
                id="password"
                value={values.password}
                onChange={onChange}
                name="password"
                className={erros.password && "p-invalid"}
                toggleMask
                feedback={false}
              />
              {erros.password && (
                <Message severity="error" text={erros.password} />
              )}
            </div>
          </div>
          <Button
            type="submit"
            label="Entrar"
            value="submit"
            className="p-d-block p-mx-auto"
          />
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
