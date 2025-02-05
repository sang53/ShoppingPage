import Carousel from "../Carousel/Carousel.jsx";

export default function MainPage() {
  return (
    <>
      <div className="flex-column-center gap-1rem text-center">
        <h1>Welcome to Fake Shopping Project!</h1>
        <p>Feel free to browse by category or product!</p>
        <p>
          This project was made with React & React-router as part of The Odin
          Project
        </p>
        <p>Here are some random products to view below!</p>
      </div>
      <Carousel />
    </>
  );
}
