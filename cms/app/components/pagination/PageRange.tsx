const PageRange = ({ setItemsPerPage }) => {
  return (
    <div className="page-range-wrapper">
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <label htmlFor="pagePar" className="col-form-label">
            Show
          </label>
        </div>
        <div className="col-auto">
          <select
            className="form-select form-select-sm"
            id="pagePar"
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value="20" selected>
              20
            </option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="col-auto">
          <span id="passwordHelpInline" className="form-text">
            Entries
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageRange;
