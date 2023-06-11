import "./App.css";
import * as React from "react";
import data from "./data.json";
import { v4 as uuid } from "uuid";
import { Delete, Add, Build } from "@mui/icons-material";
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
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "2%",
  boxShadow: 24,
  p: 4,
};

const stylecard = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "60vw",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "2%",
  boxShadow: 24,
  p: 1,
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

  const editClose = () => setOpenEdit(false);

  const saveEditProduct = (id) => {
    const updatedDatas = datas.map((product) => {
      if (product.id === id) {
        return { ...product, ...products };
      }
      return product;
    });
    setDatas(updatedDatas);
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
    setOpenDetail(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p style={{ margin: "1rem" }}>
          Sit ipsum consequat incididunt tempor elit cillum aliqua ut laborum
          esse culpa incididunt duis. Ad anim nulla excepteur est incididunt
          duis aute ut. Minim do dolor anim veniam in et veniam qui ea fugiat
          adipisicing.
        </p>
      </header>
      <main>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>PRODUCTS</h2>

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
                sx={{ display: "flex", justifyContent: "center" }}
              >
                Add a product
              </Typography>
              <TextField
                label="Name"
                margin="normal"
                onChange={(e) =>
                  setProduct({ ...products, name: e.target.value })
                }
              ></TextField>
              <br />
              <TextField
                label="Price"
                margin="normal"
                type="number"
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
                margin="normal"
                onChange={(e) =>
                  setProduct({ ...products, description: e.target.value })
                }
              ></TextField>
              <br />
              <TextField
                label="Photo"
                margin="normal"
                onChange={(e) =>
                  setProduct({ ...products, photo: e.target.value })
                }
              ></TextField>
              <br />
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={AddProd}>Add</Button>
              </div>
            </Box>
          </Modal>
        </div>
        <hr style={{ margin: "1rem" }} />

        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          {datas.map((product, id) => {
            return (
              <div key={id}>
                <Grid sx={{ margin: "1rem" }}>
                  <Card sx={{ width: "18rem" }}>
                    <Modal
                      open={openDetail}
                      onClose={detailClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={stylecard}>
                        <div
                          style={{
                            display: "flex",
                            borderRadius: "1%",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: "50%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={prodDetail && prodDetail.photo}
                              alt="product"
                              style={{ height: "80vh", width: "auto" }}
                            ></img>
                          </div>
                          <div
                            style={{
                              width: "50%",
                              display: "flex",
                              flexFlow: "column",
                              justifyContent: "space-between",
                              margin: ".5rem",
                            }}
                          >
                            <Typography
                              id="modal-modal-title"
                              variant="h5"
                              component="h2"
                              sx={{ display: "flex", justifyContent: "start" }}
                            >
                              {prodDetail && prodDetail.name}
                            </Typography>
                            <Typography
                              id="modal-modal-title"
                              variant="h5"
                              component="h2"
                              sx={{ display: "flex", justifyContent: "start" }}
                            >
                              {prodDetail && prodDetail.description}
                            </Typography>
                            <Typography
                              id="modal-modal-title"
                              variant="h5"
                              component="h2"
                              sx={{ display: "flex", justifyContent: "start" }}
                            >
                              Price {prodDetail && prodDetail.price} ฿
                            </Typography>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "end",
                              }}
                            >
                              <Fab
                                color="secondary"
                                aria-label="edit"
                                onClick={() => editOpen(prodDetail.id)}
                                sx={{
                                  marginX: "1rem",
                                  marginY: ".3rem",
                                  scale: "80%",
                                }}
                              >
                                <Build />
                              </Fab>
                              <Fab
                                color="secondary"
                                aria-label="delete"
                                onClick={() => DeleteProd(prodDetail.id)}
                                sx={{
                                  marginX: "1rem",
                                  marginY: ".3rem",
                                  scale: "80%",
                                }}
                              >
                                <Delete />
                              </Fab>
                            </div>
                          </div>
                        </div>
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

                        <TextField
                          defaultValue={products.name}
                          label="Name"
                          margin="normal"
                          onChange={(e) =>
                            setProduct({ ...products, name: e.target.value })
                          }
                        ></TextField>
                        <TextField
                          defaultValue={products.price}
                          label="Price"
                          margin="normal"
                          type="number"
                          onChange={(e) =>
                            setProduct({ ...products, price: e.target.value })
                          }
                        ></TextField>
                        <TextField
                          defaultValue={products.description}
                          label="Description"
                          margin="normal"
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
                          onChange={(e) =>
                            setProduct({ ...products, photo: e.target.value })
                          }
                        ></TextField>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "end",
                          }}
                        >
                          <Button onClick={editClose}>Cancel</Button>
                          <Button onClick={() => saveEditProduct(products.id)}>
                            Save
                          </Button>
                        </div>
                      </Box>
                    </Modal>
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
                            Name: {product.name}
                          </Typography>
                          <Typography variant="body1">
                            Price: {product.price}
                          </Typography>
                        </div>
                        <Button onClick={() => detailOpen(product.id)}>
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
