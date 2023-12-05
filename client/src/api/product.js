import { API_URL } from "../GlobalVar";
export const getProduct = async () => {
  try {
    const response = await fetch(API_URL + "/api/product/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};


export const search = async (search) => {
  try {
    const response = await fetch(API_URL + "/api/product/search/" + search, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const findById = async (id) => {
  try {
    console.log(id)
    const response = await fetch(API_URL + "/api/product/find/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

// const uploadProductFiles = async (files) => {
//   if (files.length === 0) {
//     console.error('No files selected.');
//     return;
//   }

//   const formData = new FormData();

//   files.forEach((file, index) => {
//     formData.append(`file${index}`, file);
//   });

//   try {
//     const response = await fetch(API_URL + "/api/seller/product/files/", {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       console.log('Files uploaded successfully.');
//       // Do something after successful upload
//     } else {
//       console.error('Failed to upload files.');
//     }
//   } catch (error) {
//     console.error('Error uploading files:', error);
//   }
// };

// const createProduct = async (productName,productPrice,productDescription,seller,attributes,category) => {
//   try {
//     const response = await fetch(API_URL + "/api/seller/product/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: productName,
//         price: productPrice,
//         description: productDescription,
//         seller,
//         attributes,
//         category,
//       }),
//     });
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

