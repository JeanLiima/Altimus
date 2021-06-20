import React, { useContext } from "react";
import StoreContext from "./Store/context";
import { Menu } from "primereact/menu";
import { useHistory } from "react-router";

export const Navigation = () => {
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  const menuitems = [
    {
      label: "Páginas",
      items: [
        {
          label: "Home",
          icon: "pi pi-fw pi-chart-bar",
          command: () => {
            history.push("/home");
          },
        },
        {
          label: "Veículos",
          icon: "pi pi-fw pi-book",
          command: () => {
            history.push("/veiculos");
          },
        },
      ],
    },
    {
      label: "Usuário",
      items: [
        {
          label: "Sair",
          icon: "pi pi-fw pi-sign-out",
          command: () => {
            setToken();
          },
        },
      ],
    },
  ];

  return (
    <div className="p-grid p-fluid p-col-2">
      <div className="p-col-12 p-md-4">
        <div className="card">
          <Menu model={menuitems} />
        </div>
      </div>
    </div>
  );
};
