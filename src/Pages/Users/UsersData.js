// ----------------------------------
// Data for Users table list
export const userColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "Staff",
    headerName: "Staff",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cell_img_div">
          <img
            className="cell_img"
            src="https://sachinsamal005.netlify.app/img/sachin-samal.png"
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
    renderCell: (params) => {
      return (
        <p className={`${params.row.email}`}>
          {params.row.email}
        </p>
      );
    },
  },

  {
    field: "Phone",
    headerName: "Phone",
    width: 160,
    renderCell: (params) => {
      return (
        <p className={`${params.row.email}`}>
          {params.row.phone}
        </p>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      return (
        <div
          className={`cell_status_div px-2 py-1 ${
            params.row.status === "active"
              ? "active"
              : "passive"
          }`}
        >
          {params.row.staus === "active"
            ? "Active"
            : "Passive"}
        </div>
      );
    },
  },
];

export const userRows = [
  {
    id: 1,
    username: "Snow",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    age: 21,
  },
  {
    id: 5,
    username: "Targaryen",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    age: 65,
  },
  {
    id: 10,
    username: "Maxie",
    age: 71,
  },
];

// ----------------------------------
