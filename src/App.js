import "./App.css";
import * as React from "react";
import data from "./data.json";
import { v4 as uuid } from "uuid";
import { Delete, Add, Build, Cancel } from "@mui/icons-material";
import {
  Fab,
  Grid,
  Card,
  Typography,
  Modal,
  Box,
  Button,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000, 30%",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
  overflow: "auto",
};

const stylecancel = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  maxHeight: "80vh",
  display: "flex",
  flexFlow: "column",
  alignItems: "center",
  bgcolor: "background.paper",
  border: "2px solid #000, 30%",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

function App() {
  const initialState = React.useMemo(
    () => ({
      id: 0,
      name: "",
      description: "",
      price: 0,
      photo:
        "https://images.unsplash.com/photo-1560393464-5c69a73c5770?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=465&q=80",
    }),
    []
  );

  const [products, setProduct] = React.useState(initialState);
  const [datas, setDatas] = React.useState([...data]);

  const [openAdd, setOpenAdd] = React.useState(false);
  const addOpen = () => setOpenAdd(true);
  const addClose = () => setOpenAdd(false);

  const [openDetail, setOpenDetail] = React.useState(false);
  const [prodDetail, setProdDetail] = React.useState(null);
  const [openEditProd, setOpenEdit] = React.useState(false);

  const detailOpen = (id) => {
    const prod = datas.find((product) => product.id === id);
    setProdDetail(prod);
    setOpenDetail(true);
  };
  const detailClose = () => setOpenDetail(false);

  const editOpen = (id) => {
    const prod = datas.find((product) => product.id === id);
    setProduct(prod);
    setOpenEdit(true);
  };

  const editClose = () => {
    setProduct(initialState);
    setOpenEdit(false);
  };
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const confirmDeleteOpen = () => setOpenConfirmDelete(true);
  const confirmDeleteClose = () => setOpenConfirmDelete(false);

  const saveEditProduct = (id) => {
    const updatedDatas = datas.map((product) => {
      if (product.id === id) {
        return { ...product, ...products };
      }
      return product;
    });
    setDatas(updatedDatas);
    setProduct(initialState);
    setOpenEdit(false);
    setOpenDetail(false);
  };

  const AddProd = () => {
    const newProduct = { ...products, id: uuid() };
    setDatas([...datas, newProduct]);
    setOpenAdd(false);
    setProduct(initialState);
  };

  const DeleteProd = (id) => {
    const updatedDatas = datas.filter((product) => product.id !== id);
    setDatas(updatedDatas);
    setOpenConfirmDelete(false);
    setOpenDetail(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p style={{ margin: "2rem" }}>
          Sit ipsum consequat incididunt tempor elit cillum aliqua ut laborum
          esse culpa incididunt duis. Ad anim nulla excepteur est incididunt
          duis aute ut. Minim do dolor anim veniam in et veniam qui ea fugiat
          adipisicing.
        </p>
      </header>
      <main>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>PRODUCTS</h2>
        </div>
        <hr style={{ margin: "1rem" }} />
        <Modal
          open={openAdd}
          onClose={addClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginY: "1rem",
              }}
            >
              Add a product
            </Typography>
            <div
              style={{
                display: "flex",
                flexFlow: "column ",
                alignItems: "center",
              }}
            >
              <TextField
                label="Name"
                margin="dense"
                sx={{ width: "80%" }}
                onChange={(e) =>
                  setProduct({ ...products, name: e.target.value })
                }
              ></TextField>
              <br />
              <TextField
                label="Price"
                margin="dense"
                type="number"
                sx={{ width: "80%" }}
                onChange={(e) =>
                  setProduct({
                    ...products,
                    price: e.target.value,
                  })
                }
              ></TextField>
              <br />
              <TextField
                label="Description"
                margin="dense"
                sx={{ width: "80%" }}
                onChange={(e) =>
                  setProduct({ ...products, description: e.target.value })
                }
              ></TextField>
              <br />
              <TextField
                label="Photo"
                margin="dense"
                sx={{ width: "80%" }}
                onChange={(e) =>
                  setProduct({ ...products, photo: e.target.value })
                }
              ></TextField>
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                onClick={AddProd}
                color="primary"
                sx={{ backgroundColor: "#757de8", color: "white" }}
              >
                Add
              </Button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openDetail}
          onClose={detailClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container rowSpacing={0} columnSpacing={0}>
              <Grid
                xs={12}
                sm={12}
                md={5.3}
                lg={5.3}
                sx={{
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={prodDetail && prodDetail.photo}
                  alt="product"
                  style={{
                    height: "60vh",
                    width: "auto",
                  }}
                ></img>
              </Grid>
              <Grid
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  margin: "1rem",
                  display: "flex",
                  flexFlow: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    left: "95%",
                    top: "0%",
                    width: "fit-content",
                  }}
                >
                  <Cancel
                    onClick={detailClose}
                    sx={{ cursor: "pointer", minWidth: "20%" }}
                  />
                </div>
                <div>
                  <Typography
                    id="modal-modal-title"
                    variant="subtitle1"
                    align="left"
                  >
                    <b>Name: </b> {prodDetail && prodDetail.name}
                  </Typography>
                  <br />
                  <Typography
                    id="modal-modal-title"
                    variant="subtitle1"
                    align="left"
                    sx={{
                      overflow: "auto",
                    }}
                  >
                    <b>Description: </b>
                    {prodDetail && prodDetail.description}
                  </Typography>
                  <br />
                  <Typography
                    id="modal-modal-title"
                    variant="subtitle1"
                    align="left"
                  >
                    <b>Price: </b>
                    {prodDetail && prodDetail.price} ฿
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Fab
                    color="info"
                    aria-label="edit"
                    onClick={() => editOpen(prodDetail.id)}
                    sx={{
                      marginX: ".3rem",
                      marginY: ".3rem",
                      width: "40px",
                      height: "auto",
                    }}
                  >
                    <Build sx={{ width: "20px", height: "auto" }} />
                  </Fab>
                  <Fab
                    color="error"
                    aria-label="delete"
                    onClick={confirmDeleteOpen}
                    sx={{
                      marginX: ".3rem",
                      marginY: ".3rem",
                      width: "40px",
                      height: "auto",
                    }}
                  >
                    <Delete sx={{ width: "20px", height: "auto" }} />
                  </Fab>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={openEditProd}
          onClose={editClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ display: "flex", justifyContent: "center" }}
            >
              Edit Product
            </Typography>
            <div
              style={{
                display: "flex",
                flexFlow: "column ",
                alignItems: "center",
              }}
            >
              <TextField
                defaultValue={products.name}
                label="Name"
                margin="normal"
                sx={{ width: "80%" }}
                onChange={(e) =>
                  setProduct({ ...products, name: e.target.value })
                }
              ></TextField>
              <TextField
                defaultValue={products.price}
                label="Price"
                margin="normal"
                type="number"
                sx={{ width: "80%" }}
                onChange={(e) =>
                  setProduct({ ...products, price: e.target.value })
                }
              ></TextField>
              <TextField
                defaultValue={products.description}
                label="Description"
                margin="normal"
                sx={{ width: "80%" }}
                onChange={(e) =>
                  setProduct({
                    ...products,
                    description: e.target.value,
                  })
                }
              ></TextField>
              <TextField
                defaultValue={products.photo}
                label="Photo"
                margin="normal"
                sx={{ width: "80%" }}
                onChange={(e) =>
                  setProduct({ ...products, photo: e.target.value })
                }
              ></TextField>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "end",
              }}
            >
              <Button
                color="error"
                onClick={editClose}
                style={{ marginX: "1rem" }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => saveEditProduct(products.id)}
                style={{ marginX: "1rem" }}
              >
                Save
              </Button>
            </div>
          </Box>
        </Modal>
        <Modal
          open={openConfirmDelete}
          onClose={confirmDeleteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={stylecancel}>
            <Typography id="modal-modal-title" variant="h6" align="center">
              Do you want to delete?
            </Typography>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button color="error" onClick={() => setOpenConfirmDelete(false)}>
                No
              </Button>
              <Button color="primary" onClick={() => DeleteProd(prodDetail.id)}>
                Yes
              </Button>
            </div>
          </Box>
        </Modal>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          {datas.map((product, id) => {
            return (
              <div key={id}>
                <Grid sx={{ margin: "1rem" }}>
                  <Card sx={{ width: "18rem" }}>
                    <div style={{ display: "flex", flexFlow: "column" }}>
                      <div
                        style={{ display: "flex ", justifyContent: "center" }}
                      >
                        <img
                          src={product.photo}
                          alt={product.name}
                          style={{ maxWidth: "100%", overflow: "hidden" }}
                        ></img>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexFlow: "column",
                          justifyContent: "space-between",
                          margin: ".4rem",
                        }}
                      >
                        <div style={{ margin: ".5rem" }} value="key">
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {product.name}
                          </Typography>
                          <Typography variant="body1">
                            {product.price} ฿
                          </Typography>
                        </div>
                        <Button
                          onClick={() => detailOpen(product.id)}
                          color="info"
                        >
                          See More
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Grid>
              </div>
            );
          })}
        </Grid>
        <div
          style={{
            position: "sticky",
            bottom: "0",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={addOpen}
            sx={{ margin: "1rem" }}
          >
            <Add />
          </Fab>
        </div>
      </main>
    </div>
  );
}

export default App;
