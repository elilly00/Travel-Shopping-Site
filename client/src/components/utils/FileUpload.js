import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload() {

  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data'}
    };
    formData.append("file", files[0]);

    axios.post('/api/product/image', formData, config)
         .then(response => {
            if(response.data.success) {
              // console.log(response.data);
              setImages([...Images, response.data.filePath]);
            } else {
              alert("파일을 저장하는데 실패했습니다.");
            }
         });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);

    console.log('currentIndex', currentIndex);

    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
  }  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone onDrop={ dropHandler }>
        {({ getRootProps, getInputProps }) => (
            <div style={{ width: '300px', height: '300px', border: '1px solid lightgray',
                          display: 'flex', alignItems: 'center', justifyContent: 'center' 
                        }}
                {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: '3rem' }} />
            </div>
        )}
        </Dropzone>
        
        {/* Image preview */}
        <div style={{ display: 'flex', width: '350px', height: '300px', overflowX: 'scroll' }}>
          
          {Images.map((image, index) => (
            <div onClick={() => deleteHandler(image)} key={index}>
              <img style={{ minWidth: '350px', width: '300px', height: '300px' }}
                   src={`http://localhost:5020/${image}`}
               />
            </div>
          ))}

        </div>
    </div>
  );
}

export default FileUpload;