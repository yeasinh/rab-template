"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const UserList: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState({
    nameBn:'',
     nameEn:'',
      role:'',
    name: "",
    email: "",
    phone: "",
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPage, setSelectedPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/users");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(data.length / itemsPerPage));
  }, [data, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleSearchQueryChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item: any) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const renderedData = searchQuery ? filteredData : currentData;

  const handleDelete = async (itemToDelete: any) => {
    try {
      const response = await fetch(
        `http://localhost:8000/users/${itemToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const reducedData = data.filter(
          (item: any) => item.id !== itemToDelete.id
        );
        setData(reducedData);
      } else {
        console.error("Failed to delete the item.");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleItemsPerPageChange = (event: any) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handleSelectedPageChange = (event: any) => {
    const pageNumber = parseInt(event.target.value);
    setSelectedPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="inner-page-wrapper">
      <div className="row">
        <div className="col-sm-12">
          <div className="page-title-bar">
            <h5 className="page-title">User List</h5>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="#">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User List
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="shorting-wrapper">
                <div className="row justify-content-between">
                  <div className="col">
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
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                          >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                          </select>
                        </div>
                        <div className="col-auto">
                          <span id="passwordHelpInline" className="form-text">
                            Entries
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <form className="table-search-wrapper" role="search">
                      <i className="fa-solid fa-magnifying-glass"></i>
                      <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search Here"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={handleSearchQueryChange}
                      />
                      {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                    </form>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover table-striped table-bordered align-middle">
                  <thead>
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Name (Bangla)</th>
                      <th scope="col">Name (Engish)</th>
                      <th scope="col">Email</th>
                      <th scope="col">Password</th>
                      <th scope="col">Role</th>
                      <th scope="col">Created By</th>
                      <th scope="col">Created</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={9} className="text-center fs-6">
                          Data Loading...
                        </td>
                      </tr>
                    ) : renderedData.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center fs-6">
                          No Data Found
                        </td>
                      </tr>
                    ) : (
                      renderedData.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <th scope="row">{startIndex + index + 1}</th>
                            <td>{item.nameBn}</td>
                            <td>{item.nameEn}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.role}</td>
                            <td>Admin</td>
                            <td>
                              <p>2024-08-28</p>
                              <p>05:00:00</p>
                            </td>
                            <td>
                              <Link
                                href={`./${item.id}`}
                                className="edit-icon"
                                title="Edit"
                              >
                                <i className="fa-solid fa-pen"></i>
                              </Link>
                              <Link
                                href="#"
                                className="view-icon"
                                title="Preview"
                                data-bs-toggle="modal"
                                data-bs-target="#previewModal"
                                onClick={() => setSelectedItem(item)}
                              >
                                <i className="fa-regular fa-eye"></i>
                              </Link>
                              <Link
                                href="#"
                                className="delete-icon"
                                title="Delete"
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                                onClick={() => setSelectedItem(item)}
                              >
                                <i className="fa-regular fa-trash-can"></i>
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="pagination-wrapper">
                <div className="page-range-wrapper">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label htmlFor="pagePar" className="col-form-label">
                        Page
                      </label>
                    </div>
                    <div className="col-auto">
                      <select
                        className="form-select form-select-sm"
                        id="pagePar"
                        value={selectedPage}
                        onChange={handleSelectedPageChange}
                      >
                        {[...Array(totalPages)].map((_, i) => (
                          <>
                            <option value={i + 1}>{i + 1}</option>
                          </>
                        ))}
                      </select>
                    </div>
                    <div className="col-auto">
                      <span id="passwordHelpInline" className="form-text">
                        of {totalPages}
                      </span>
                    </div>
                  </div>
                </div>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        href="#"
                        onClick={() => handlePageChange(1)}
                      >
                        &laquo;
                      </Link>
                    </li>
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        href="#"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        &lt;
                      </Link>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <Link
                          className="page-link"
                          href="#"
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </Link>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        href="#"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        &gt;
                      </Link>
                    </li>
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <Link
                        className="page-link"
                        href="#"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        &raquo;
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <div
        className="modal fade"
        id="previewModal"
        tabIndex={-1}
        aria-labelledby="previewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="previewModalLabel">
                Preview
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="">
                <table className="table table-borderless">
                  {
                    <tbody>
                      <tr>
                        <td>Name (Bangla)</td>
                        <td>:</td>
                        <td>{selectedItem.nameBn}</td> 
                      </tr>
                      <tr>
                        <td>Name (English)</td>
                        <td>:</td>
                        <td>{selectedItem.nameEn}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>:</td>
                        <td>{selectedItem.email}</td>
                      </tr>
                      <tr>
                        <td>Role</td>
                        <td>:</td>
                        <td>{selectedItem.role}</td>
                      </tr>
                    </tbody>
                  }
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex={-1}
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Delete Confirmation
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning mb-0" role="alert">
                Are you sure you want to delete the user {selectedItem.nameEn}?
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(selectedItem)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
