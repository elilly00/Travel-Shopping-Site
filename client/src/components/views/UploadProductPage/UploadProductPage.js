import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import axios from "axios";

const { TextArea } = Input;

/* 국가 목록은 <option>을 여러 개 생성하지 않고 
   따로 객채로 key값과 value 값을 만들어 
   해당 변수를 받아와 map을 통해 생성한다. */
const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };

  const continentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    console.log(newImages, Images);
    setImages(newImages);
  };

  const submitHandler = (event) => {
    console.log("submit");
    event.preventDefault();

    if (!Title || !Description || !Price || !Continent || !Images) {
      console.log(Title, Description, Price, Continent, Images);
      return alert("모든 값을 넣어주셔야 합니다.");
    }
    // 서버에 채운 값들을 request로 보냄
    const body = {
      //로그인 된 사람의 ID
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continents: Continents,
    };
    axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공했습니다.");
        props.history.push("/");
      } else {
        alert("상품 업로드에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>여행 상품 업로드</h2>
      </div>

      <Form onSubmitCapture={submitHandler}>
        {/* DropZone */}

        {/* FileUpload component */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Name</label>
        <Input onChange={titleChangeHandler} value={Title} />

        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />

        <br />
        <br />
        <label>Price($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />

        <br />
        <br />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button htmlType="submit">
            Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
