import example from "../../img/1.png";
import { useNavigate } from "react-router-dom";
import men from "../../img/men.jpg";
import women from "../../img/women.jpg";
import girls from "../../img/girl.jpg";
import boys from "../../img/boys.jpeg";
import offers from "../../img/offer.jpg";
import accesories from "../../img/accesories.jpg";
import { Typography } from "@mui/material";
const SelectCategory = () => {
  const navigate = useNavigate();

  const pages = [
    { information: "Hombre", location: "/hombre", img: men },
    { information: "Mujer", location: "/mujer", img: women },
    { information: "Niñas", location: "/girls", img: girls },
    { information: "Niños", location: "/boys", img: boys },
  
    { information: "Accesorios", location: "/accesorios", img: accesories },
    // { information: "Ofertas", location: "/ofertas", img: offers },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {pages.map((page, index) => (
        <div
          key={index}
          style={{
            border: "solid black",
            backgroundImage: `url(${page.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "30rem",
            height: "45rem", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "20px", 
            cursor: "pointer",
          }}
          onClick={() => navigate(page.location)}
        >
          <Typography
            variant="h3" // Adjust variant for larger text
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: add background for better text readability
              padding: "0.5rem", // Optional: add padding around the text
              borderRadius: "0.5rem", // Optional: round the corners of the text background
            }}
          >
            {page.information}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;
