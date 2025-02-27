import PropTypes from "prop-types";

export default function SortSelect({ by, order, setSort }) {
  return (
    <div>
      <select onChange={(e) => setSort([e.target.value, "asc"])} value={by}>
        <option value="cat">Category</option>
        <option value="alpha">Alphabet</option>
        <option value="price">Price</option>
      </select>
      <button onClick={() => setSort([by, order === "asc" ? "desc" : "asc"])}>
        {order === "asc" ? upArrow : downArrow}
      </button>
    </div>
  );
}

const upArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5l0 14" />
    <path d="M18 11l-6 -6" />
    <path d="M6 11l6 -6" />
  </svg>
);

const downArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5l0 14" />
    <path d="M18 13l-6 6" />
    <path d="M6 13l6 6" />
  </svg>
);

SortSelect.propTypes = {
  by: PropTypes.string,
  order: PropTypes.string,
  setSort: PropTypes.func,
};
