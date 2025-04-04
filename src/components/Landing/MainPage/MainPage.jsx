import Carousel from "../Carousel/Carousel.jsx";
import classes from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div className={`flex-column-center ${classes.container}`}>
      <div
        className={`flex-column-center gap-1rem text-center ${classes.text}`}
      >
        <h1>Welcome to my Shopping Page!</h1>
        <p>Feel free to browse by category or product!</p>
        <p>
          This project was made with React & React Router as part of The Odin
          Project by Sang Won Cho.
        </p>
        <p>Here are some random products to view below!</p>
      </div>
      <Carousel />
    </div>
  );
}
