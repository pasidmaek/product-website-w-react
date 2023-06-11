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
  boxShadow: 24,
  p: 4,
};

function App() {
  const initialState = React.useMemo(
    () => ({
      id: 0,
      name: "",
      description: "",
      price: 0,
      photo: "",
    }),
    []
  );

  React.useEffect(() => {
    setData([...data]);
    setProduct(initialState);
  }, [initialState]);

  const [products, setProduct] = React.useState({});

  React.useEffect(() => {
    setData([...data]);
    setProduct(initialState);
  }, [initialState]);

  const [datas, setData] = React.useState([]);

  const [openAdd, setOpenAdd] = React.useState(false);
  const addOpen = () => setOpenAdd(true);
  const addClose = () => setOpenAdd(false);

  const [openDetail, setOpenDetail] = React.useState(false);
  const [openEditProd, setOpenEdit] = React.useState(false);
  const [prodDetail, setProdDetail] = React.useState([]);
  const detailOpen = (id) => {
    const prod = datas.find((product) => product.id === id);
    setProdDetail(prod);
    setOpenDetail(true);
  };
  const detailClose = () => setOpenDetail(false);

  const editOpen = (id) => {
    if (editedProduct) {
    const updatedDatas = datas.map((product) =>
      product.id === editedProduct.id ? editedProduct : product
    );
    setData(updatedDatas);
    setOpenEdit(true);
  };
  const editClode = () => setOpenEdit(false);

  const AddProd = () => {
    const newProduct = { ...products, id: uuid() };
    setProduct(newProduct);
    datas.push(newProduct);
    setData([...datas]);
    setOpenAdd(false);
    setProduct(initialState);
  };

  const DeleteProd = (id) => {
    datas.splice(
      datas.findIndex((x) => x.id === id),
      1
    );
    setData([...datas]);
    setOpenDetail(false);
  };

  const [editedProduct, setEditedProduct] = React.useState(null);

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
              <div>
                <Grid sx={{ margin: "1rem" }}>
                  <Card sx={{ width: "18rem" }}>
                    <Modal
                      open={openDetail}
                      onClose={detailClose}
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
                          {prodDetail && prodDetail.name}
                        </Typography>
                        <Typography
                          id="modal-modal-title"
                          variant="h5"
                          component="h2"
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {prodDetail && prodDetail.price}
                        </Typography>
                        <Typography
                          id="modal-modal-title"
                          variant="h5"
                          component="h2"
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {prodDetail && prodDetail.description}
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
                            aria-label="delete"
                            onClick={() => setOpenEdit(products.id)}
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
                            onClick={() => DeleteProd(product.id)}
                            sx={{
                              marginX: "1rem",
                              marginY: ".3rem",
                              scale: "80%",
                            }}
                          >
                            <Delete />
                          </Fab>
                        </div>
                      </Box>

                      <Box sx={style} open={openEditProd}>
                        <TextField
                          label="Name"
                          margin="normal"
                          onChange={(e) =>
                            setProduct({ ...products, name: e.target.value })
                          }
                        ></TextField>
                        <Typography
                          id="modal-modal-title"
                          variant="h5"
                          component="h2"
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {prodDetail && prodDetail.name}
                        </Typography>
                        <Typography
                          id="modal-modal-title"
                          variant="h5"
                          component="h2"
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {prodDetail && prodDetail.price}
                        </Typography>
                        <Typography
                          id="modal-modal-title"
                          variant="h5"
                          component="h2"
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          {prodDetail && prodDetail.description}
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
                            aria-label="delete"
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
                            onClick={() => DeleteProd(product.id)}
                            sx={{
                              marginX: "1rem",
                              marginY: ".3rem",
                              scale: "80%",
                            }}
                          >
                            <Delete />
                          </Fab>
                        </div>
                      </Box>
                    </Modal>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <div
                          style={{
                            minWidth: "140px",
                            maxWidth: "140px",
                            height: "140px",
                            backgroundColor: "#3a3a3a",
                          }}
                        ></div>
                      </div>

                      <div
                        style={{
                          width: "50%",
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
                            {product.id}
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
