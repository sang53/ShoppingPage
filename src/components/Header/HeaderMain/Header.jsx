import NavBar from "../NavBar/NavBar";
import classes from "./Header.module.css";

export default function Header() {
  return (
    <div className={"z-idx-1 " + classes.headerWrapper}>
      <div className="flex pad-1rem">
        <h1 className={classes.heading}>Fake Shopping Project</h1>
        <NavBar />
      </div>
      <hr className={classes.divider} />
    </div>
  );
}
