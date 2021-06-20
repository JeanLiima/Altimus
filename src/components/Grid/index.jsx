import React, { useState, useRef } from "react";
import { Navigation } from "../navigation";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";

function initialState() {
  return [
    {
      id: "cy0FX",
      modelo: "Argo",
      placa: "abc-1234",
      marca: "Volskwagen",
      preco: 30000,
      ano: "2019",
      quilometragem: 10000,
      opcionais: ["opcional_1", "opcional_3"],
    },
    {
      id: "as83A",
      modelo: "308 GTSi",
      placa: "cba-4321",
      marca: "Ferrari",
      preco: 630000,
      ano: "2019",
      quilometragem: 2,
      opcionais: [],
    },
    {
      id: "o04WE",
      modelo: "Sandero",
      placa: "aaa-1111",
      marca: "Fiat",
      preco: 64000,
      ano: "2021",
      quilometragem: 12000,
      opcionais: [],
    },
  ];
}

export const GridPage = () => {
  const [products, setProducts] = useState(initialState);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState({});
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const toast2 = useRef(null);
  const dt = useRef(null);

  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const formatNumber = (value) => {
    return value.toLocaleString();
  };

  // console.log(products);
  const opcionaisSelectItens = [
    { label: "Ar Condicionado", value: "opcional_1" },
    { label: "4x4", value: "opcional_2" },
    { label: "Airbag", value: "opcional_3" },
    { label: "Direção Elétrica", value: "opcional_4" },
    { label: "Freio ABS", value: "opcional_5" },
  ];
  const anoSelectItens = [
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
    { label: "2019", value: "2019" },
    { label: "2018", value: "2018" },
    { label: "2017", value: "2017" },
    { label: "2016", value: "2016" },
    { label: "2015", value: "2015" },
    { label: "2014", value: "2014" },
    { label: "2013", value: "2013" },
    { label: "2012", value: "2012" },
    { label: "2011", value: "2011" },
    { label: "2010", value: "2010" },
    { label: "2009", value: "2009" },
    { label: "2008", value: "2008" },
    { label: "2007", value: "2007" },
    { label: "2006", value: "2006" },
    { label: "2005", value: "2005" },
    { label: "2004", value: "2004" },
    { label: "2003", value: "2003" },
    { label: "2002", value: "2002" },
    { label: "2001", value: "2001" },
    { label: "2000", value: "2000" },
  ];

  const openNew = () => {
    setProduct(products);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.quilometragem === undefined) {
      product.quilometragem = 0;
      toast2.current.show({
        severity: "info",
        summary: "Aviso",
        detail: "Não foi informado a quilometragem, então está 0km.",
        life: 3000,
      });
    }

    if (
      product.modelo &&
      product.placa &&
      product.marca &&
      product.preco &&
      product.ano
    ) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);
        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Produto Editado.",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Sucesso",
          detail: "Produto Criado.",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(products);
    } else {
      toast.current.show({
        severity: "info",
        summary: "Não foi possível adicionar",
        detail: "Verifique os campos marcados.",
        life: 3000,
      });
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(products);
    toast.current.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Produto Deletado.",
      life: 3000,
    });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Sucesso",
      detail: "Produtos Deletados.",
      life: 3000,
    });
  };

  const onMarcaChange = (e) => {
    let _product = { ...product };
    _product["marca"] = e.value;
    setProduct(_product);
  };

  const onOpcionaisChange = (e) => {
    let _product = { ...product };
    if (e.value) {
      _product["opcionais"] = e.value;
    }
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbar = () => {
    return (
      <React.Fragment>
        <Button
          label="Novo"
          icon="pi pi-plus"
          className="p-button-success p-mr-2"
          onClick={openNew}
        />
        <Button
          label="Deletar"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </React.Fragment>
    );
  };

  const codigoBody = (rowData) => {
    return <>{rowData.id}</>;
  };

  const modeloBody = (rowData) => {
    return <>{rowData.modelo}</>;
  };

  const anoBody = (rowData) => {
    return <>{rowData.ano}</>;
  };

  const placaBody = (rowData) => {
    return <>{rowData.placa}</>;
  };

  const precoBody = (rowData) => {
    return <>{formatCurrency(rowData.preco)}</>;
  };

  const marcaBody = (rowData) => {
    return <>{rowData.marca}</>;
  };

  const quilometragemBody = (rowData) => {
    return <>{formatNumber(rowData.quilometragem)} KM</>;
  };

  const actionBody = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </div>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0 p-pb-2">Veículos</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Pesquisar..."
          tooltip="Busque por: Placas, Marca, Modelo, Preço e Quilometragem"
        />
      </span>
    </div>
  );

  const productDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Salvar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </>
  );
  const deleteProductDialogFooter = (
    <>
      <Button
        label="Não"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Sim, desejo deletar."
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </>
  );
  const deleteProductsDialogFooter = (
    <>
      <Button
        label="Não"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Sim, desejo deletar."
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </>
  );

  return (
    <div className="p-d-inline-flex">
      <Navigation />
      <div className="p-col-10 p-pl-5">
        <div className="card">
          <Toast ref={toast} />
          <Toast ref={toast2} position="bottom-center" />
          <Toolbar className="p-mb-4" left={leftToolbar}></Toolbar>

          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} de {last} de um total de {totalRecords} veículos."
            globalFilter={globalFilter}
            emptyMessage="Nenhum veículo encontrado."
            header={header}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="id"
              header="Código"
              sortable
              body={codigoBody}
            ></Column>
            <Column
              field="placa"
              style={{ textAlign: "center" }}
              header="Placa"
              body={placaBody}
            ></Column>
            <Column
              field="marca"
              header="Marca"
              sortable
              body={marcaBody}
            ></Column>
            <Column
              field="modelo"
              header="Modelo"
              sortable
              body={modeloBody}
            ></Column>
            <Column
              field="ano"
              header="Ano"
              sortable
              body={anoBody}
              style={{ textAlign: "center" }}
            ></Column>
            <Column
              field="preco"
              header="Preço"
              body={precoBody}
              sortable
            ></Column>
            <Column
              field="quilometragem"
              header="Quilometragem"
              body={quilometragemBody}
              sortable
            ></Column>
            <Column body={actionBody}></Column>
          </DataTable>

          {/* Modal for editing one product */}
          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header="Detalhes do Veículo"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            <div className="p-field">
              <label htmlFor="modelo">Modelo</label>
              <InputText
                id="modelo"
                value={product.modelo}
                onChange={(e) => onInputChange(e, "modelo")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !product.modelo,
                })}
              />
              {submitted && !product.modelo && (
                <small className="p-invalid">Modelo é necessário.</small>
              )}
            </div>
            <div className="p-formgrid p-grid">
              <div className="p-field p-col">
                <label htmlFor="placa">Placa</label>
                <InputMask
                  id="placa"
                  mask="aa*-9999"
                  value={product.placa}
                  onChange={(e) => onInputChange(e, "placa")}
                  required
                  autoFocus
                  className={classNames(
                    { "p-invalid": submitted && !product.placa },
                    "p-text-uppercase"
                  )}
                />
                {submitted && !product.placa && (
                  <small className="p-invalid">
                    Placa do veículo é necessário.
                  </small>
                )}
              </div>
              <div className="p-field p-col">
                <label htmlFor="ano">Ano</label>
                <Dropdown
                  id="ano"
                  options={anoSelectItens}
                  value={product.ano}
                  onChange={(e) => onInputChange(e, "ano")}
                  autoFocus
                  required
                  filter
                  className={classNames({
                    "p-invalid": submitted && !product.ano,
                  })}
                />
                {submitted && !product.ano && (
                  <small className="p-invalid">
                    Ano do veículo é necessário.
                  </small>
                )}
              </div>
            </div>
            <div className="p-field">
              <label className="p-mb-3">Marca</label>
              <div className="p-formgrid p-grid">
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    inputId="marca1"
                    name="marca"
                    value="Volskwagen"
                    onChange={onMarcaChange}
                    checked={product.marca === "Volskwagen"}
                  />
                  <label htmlFor="marca1">Volskwagen</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    inputId="marca2"
                    name="marca"
                    value="Fiat"
                    onChange={onMarcaChange}
                    checked={product.marca === "Fiat"}
                  />
                  <label htmlFor="marca2">Fiat</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    inputId="marca3"
                    name="marca"
                    value="Ford"
                    onChange={onMarcaChange}
                    checked={product.marca === "Ford"}
                  />
                  <label htmlFor="marca3">Ford</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    inputId="marca4"
                    name="marca"
                    value="Honda"
                    onChange={onMarcaChange}
                    checked={product.marca === "Honda"}
                  />
                  <label htmlFor="marca4">Honda</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    inputId="marca5"
                    name="marca"
                    value="Chevrolet"
                    onChange={onMarcaChange}
                    checked={product.marca === "Chevrolet"}
                  />
                  <label htmlFor="marca5">Chevrolet</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    inputId="marca6"
                    name="marca"
                    value="Citroën"
                    onChange={onMarcaChange}
                    checked={product.marca === "Citroën"}
                  />
                  <label htmlFor="marca6">Citroën</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    inputId="marca7"
                    name="marca"
                    value="Audi"
                    onChange={onMarcaChange}
                    checked={product.marca === "Audi"}
                  />
                  <label htmlFor="marca7">Audi</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    inputId="marca8"
                    name="marca"
                    value="BMW"
                    onChange={onMarcaChange}
                    checked={product.marca === "BMW"}
                  />
                  <label htmlFor="marca8">BMW</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    inputId="marca9"
                    name="marca"
                    value="Ferrari"
                    onChange={onMarcaChange}
                    checked={product.marca === "Ferrari"}
                  />
                  <label htmlFor="marca9">Ferrari</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    inputId="marca10"
                    name="marca"
                    value="Bugatti"
                    onChange={onMarcaChange}
                    checked={product.marca === "Bugatti"}
                  />
                  <label htmlFor="marca10">Bugatti</label>
                </div>
              </div>
            </div>
            <div className="p-field">
              <label className="p-mb-3">Opcionais</label>
              <MultiSelect
                placeholder="Selecione os opcionais"
                inputId="opcionais"
                name="opcionais"
                value={product.opcionais}
                display="chip"
                options={opcionaisSelectItens}
                onChange={onOpcionaisChange}
              />
            </div>
            <div className="p-formgrid p-grid">
              <div className="p-field p-col">
                <label htmlFor="preco">Preço</label>
                <InputNumber
                  id="preco"
                  value={product.preco}
                  onValueChange={(e) => onInputNumberChange(e, "preco")}
                  mode="currency"
                  currency="BRL"
                  locale="pt-BR"
                  required
                  className={classNames({
                    "p-invalid": submitted && !product.preco,
                  })}
                />
                {submitted && !product.preco && (
                  <small className="p-invalid">
                    Preço do veículo é necessário.
                  </small>
                )}
              </div>
              <div className="p-field p-col">
                <label htmlFor="quilometragem">Quilometragem (KM)</label>
                <InputNumber
                  id="quilometragem"
                  value={product.quilometragem}
                  onValueChange={(e) => onInputNumberChange(e, "quilometragem")}
                  suffix=" KM"
                />
              </div>
            </div>
          </Dialog>

          {/* Modal for delete one product */}
          <Dialog
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirme"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle p-mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
                  Você deseja mesmo deletar <b>{product.nome}</b> da sua lista
                  de veículos?
                </span>
              )}
            </div>
          </Dialog>

          {/* Modal for delete all of the products are selected */}
          <Dialog
            visible={deleteProductsDialog}
            style={{ width: "450px" }}
            header="Confirme"
            modal
            footer={deleteProductsDialogFooter}
            onHide={hideDeleteProductsDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle p-mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
                  Você deseja deletar mesmo deletar o(s) produto(s)
                  selecionado(s)?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
