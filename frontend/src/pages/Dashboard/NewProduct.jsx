import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import SideNavbar from "../../components/Dashboard/SideNavbar";
import { clearErrors, createProduct } from "../../redux/actions/productActions";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productsContstant";

const NewProduct = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(1);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreview, setImagesPreview] = useState([]);

  const categories = [
    "Jeans",
    "Trouser",
    "Shirt",
    "TShirt",
    "Footware",
    "EyeWare",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(success){
          alert.success("Product Created Successfully");
          navigate("/admin/dashboard");
          dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, loading, navigate, success, alert]);

  const createProductHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("description", description);
    myForm.set("category", category);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
          var reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div className="dashboard">
      <div className="left">
        <SideNavbar />
      </div>
      <div className="right">
        <div className="header">New Product</div>
        <div className="createProductForm">
          <form encType="multipart/form-data" onSubmit={createProductHandler}>
            <div className="input-div">
            <i className="fa-light fa-pen-to-square"></i>
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-div">
            <i className="fa-light fa-hand-holding-dollar"></i>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-div">
            <i className="fa-light fa-arrow-up-right-from-square"></i>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option defaultValue>Choose Category</option>
                {categories.map((cat) => (
                  <option value={cat} key={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-div">
            <i className="fa-light fa-cubes-stacked"></i>
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div className="input-div text-area">
              <textarea
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="4"
              />
            </div>
            <div className="input-div">
            <i className="fa-light fa-images"></i>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div> 
            <div className="selected-image-preview ">
              {imagePreview.map((image, i) => (
                <img src={image} alt="products" key={i} />
              ))}
            </div>
            <button type="submit" disabled={loading ? true : false}>Create Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
