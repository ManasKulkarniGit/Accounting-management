// Product data list
export const categoryListTableColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "productImg",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cell_img_div">
            <img className="cell_img" src={params.row.productImg} alt="avatar" />
          </div>
        );
      },
    },
    {
      field: "productName",
      headerName: "Product",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 120,
    },
  
    {
      field: "model",
      headerName: "Model",
      width: 100,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 70,
    },
  ];
  
  export const categorytListTableRows = [
    {
      id: 1,
      productName: "Acer nitro 5",
      productImg:
        "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      price: "$985",
      brand: "ACER",
      model: "Nitro 5",
      quantity: "30",
    },
    {
      id: 2,
      productName: "Redragon S101",
      productImg:
        "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      price: "$65",
      brand: "Unknown",
      model: "VIP 5",
      quantity: "25",
    },
    {
      id: 3,
      productName: "Razer Blade 15",
      productImg:
        "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      price: "$435",
      brand: "VIP 5",
      model: "5Loh",
      quantity: "57",
    },
  ];
  