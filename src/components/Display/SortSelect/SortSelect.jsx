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
        {order}
      </button>
    </div>
  );
}

SortSelect.propTypes = {
  by: PropTypes.string,
  order: PropTypes.string,
  setSort: PropTypes.func,
};
