"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import SearchComponent from "@/app/components/ui/search/Search";
import ReusableTable from "@/app/components/table/ReusableTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faqActions } from "@lib/slices/faq/faq.slice";
import { PublishStatus } from "@lib/services/faq/faq.service.type";
import { faqSchema } from "@lib/schema/schema-faq";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import PageRange from "@/app/components/pagination/PageRange";
import Pagination from "@/app/components/pagination/Pagination";

const FaqPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const faqs = useSelector(
    (state: RootState) => state.faq.getFaqResponse?.findAllFaq
  );

  const createFaqFetchStatus = useSelector(
    (state: RootState) => state.faq.createFaqFetchStatus
  );

  const editFaqFetchStatus = useSelector(
    (state: RootState) => state.faq.editFaqFetchStatus
  );

  const deleteFaqFetchStatus = useSelector(
    (state: RootState) => state.faq.deleteFaqFetchStatus
  );

  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    dispatch(
      faqActions.getFaqFetch({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (createFaqFetchStatus === FetchStatusEnum.SUCCESS) {
      toast.success("Successfully Created");
    } else if (createFaqFetchStatus === FetchStatusEnum.FAILURE) {
      toast.error("Failed to Create");
    }

    if (editFaqFetchStatus === FetchStatusEnum.SUCCESS) {
      toast.success("Successfully Updated");
    } else if (editFaqFetchStatus === FetchStatusEnum.FAILURE) {
      toast.error("Failed to Update");
    }

    if (deleteFaqFetchStatus === FetchStatusEnum.SUCCESS) {
      toast.success("Successfully Deleted");
    } else if (deleteFaqFetchStatus === FetchStatusEnum.FAILURE) {
      toast.error("Failed to Delete");
    }

    dispatch(
      faqActions.getFaqFetch({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );

    dispatch(faqActions.resetAllState());
  }, [createFaqFetchStatus, editFaqFetchStatus, deleteFaqFetchStatus]);

  const columns = [
    { header: "SL", accessor: "sl" },
    { header: "Title (Bangla)", accessor: "titleBn" },
    { header: "Title (English)", accessor: "titleEn" },
    { header: "Description (Bangla)", accessor: "descriptionBn" },
    { header: "Description (English)", accessor: "descriptionEn" },
  ];

  // Create a derived state for filtered data based on search term
  const filteredData =
    faqs?.filter((faq) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        faq.titleBn?.toLowerCase().includes(searchLower) ||
        faq.titleEn?.toLowerCase().includes(searchLower)
      );
    }) || [];

  // Prepare data for the table
  const recentData = filteredData.map((faq, index) => ({
    ...faq,
    sl: index + 1,
  }));

  // Pagination logic
  const totalPages = Math.ceil(recentData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = recentData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSelect = (faq) => {
    const isSelected = selected?.id !== faq?.id;
    setSelected(isSelected ? faq : null);

    if (isSelected) {
      handleSave.setValues({
        ...faq,
      });
    } else {
      handleSave.resetForm();
    }
  };

  const handleCancel = () => {
    handleSelect(null);
    handleSave.resetForm();
  };

  const handleSave = useFormik({
    initialValues: {
      titleBn: "",
      titleEn: "",
      descriptionBn: "",
      descriptionEn: "",
      isPublished: PublishStatus.YES,
    },

    validationSchema: faqSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        if (selected) {
          dispatch(
            faqActions.editFaqFetch({
              request: {
                id: selected.id,
                ...values,
              },
            })
          );
        } else {
          dispatch(
            faqActions.createFaqFetch({
              request: {
                ...values,
              },
            })
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
      handleCancel();
    },
  });

  const handleDelete = (faq) => {
    try {
      dispatch(
        faqActions.deleteFaqFetch({
          request: {
            id: faq.id,
          },
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="inner-page-wrapper">
      <ToastContainer />
      <div className="row">
        <div className="col-sm-12">
          <div className="page-title-bar d-flex justify-content-between align-items-center">
            <div>
              <h5 className="page-title">FAQ</h5>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    FAQ
                  </li>
                </ol>
              </nav>
            </div>
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#addModal"
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Add New FAQ
            </button>
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
                    <PageRange setItemsPerPage={setItemsPerPage} />
                  </div>
                  <div className="col">
                    <SearchComponent
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <ReusableTable
                  columns={columns}
                  data={currentData}
                  renderRowActions={(faq) => (
                    <>
                      <a
                        href="#"
                        className="edit-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#addModal"
                        onClick={() => handleSelect(faq)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </a>
                      <a
                        href="#"
                        className="view-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#previewModal"
                        onClick={() => handleSelect(faq)}
                      >
                        <i className="fa-regular fa-eye"></i>
                      </a>
                      <a
                        href="#"
                        className="delete-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => handleSelect(faq)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </a>
                    </>
                  )}
                />
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <div
        className="modal fade"
        id="addModal"
        tabIndex={-1}
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable custom-modal-width">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalLabel">
                Add FAQ
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancel}
              ></button>
            </div>
            <div className="modal-body">
              <div className="inner-page-wrapper">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <form onSubmit={handleSave.handleSubmit}>
                        <div className="card-body">
                          <div className="form-wrapper">
                            <label htmlFor="titleBn" className="form-label">
                              Title (Bangla)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="titleBn"
                              placeholder="Enter Title (Bangla)"
                              name="titleBn"
                              value={handleSave.values.titleBn}
                              onChange={handleSave.handleChange}
                              onBlur={handleSave.handleBlur}
                            />
                            {handleSave.touched.titleBn &&
                              handleSave.errors.titleBn && (
                                <div className="text-danger">
                                  {handleSave.errors.titleBn}
                                </div>
                              )}
                          </div>
                          <div className="form-wrapper">
                            <label htmlFor="titleEn" className="form-label">
                              Title (English)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="titleEn"
                              placeholder="Enter Title (English)"
                              name="titleEn"
                              value={handleSave.values.titleEn}
                              onChange={handleSave.handleChange}
                              onBlur={handleSave.handleBlur}
                            />
                            {handleSave.touched.titleEn &&
                              handleSave.errors.titleEn && (
                                <div className="text-danger">
                                  {handleSave.errors.titleEn}
                                </div>
                              )}
                          </div>
                          <div className="form-wrapper">
                            <label
                              htmlFor="descriptionBn"
                              className="form-label"
                            >
                              Description (Bangla)
                            </label>
                            <textarea
                              rows={5}
                              id="descriptionBn"
                              className="form-control"
                              placeholder="Enter Description (Bangla)"
                              name="descriptionBn"
                              value={handleSave.values.descriptionBn}
                              onChange={handleSave.handleChange}
                              onBlur={handleSave.handleBlur}
                            />
                            {handleSave.touched.descriptionBn &&
                              handleSave.errors.descriptionBn && (
                                <div className="text-danger">
                                  {handleSave.errors.descriptionBn}
                                </div>
                              )}
                          </div>
                          <div className="form-wrapper">
                            <label
                              htmlFor="descriptionEn"
                              className="form-label"
                            >
                              Description (English)
                            </label>
                            <textarea
                              rows={5}
                              id="descriptionEn"
                              className="form-control"
                              placeholder="Enter Description (English)"
                              name="descriptionEn"
                              value={handleSave.values.descriptionEn}
                              onChange={handleSave.handleChange}
                              onBlur={handleSave.handleBlur}
                            />
                            {handleSave.touched.descriptionEn &&
                              handleSave.errors.descriptionEn && (
                                <div className="text-danger">
                                  {handleSave.errors.descriptionEn}
                                </div>
                              )}
                          </div>
                          <div className="form-wrapper">
                            <label htmlFor="isPublished" className="form-label">
                              Published
                            </label>
                            <select
                              className="form-select"
                              id="isPublished"
                              disabled
                            >
                              <option value={PublishStatus.YES}>Yes</option>
                              <option value={PublishStatus.NO}>No</option>
                            </select>
                          </div>
                          <div className="form-wrapper text-end mt-4">
                            <button
                              type="button"
                              className="btn btn-secondary me-3"
                              data-bs-dismiss="modal"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                            <button type="submit" className="btn btn-success">
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
              <h1 className="modal-Name fs-5" id="previewModalLabel">
                Preview
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancel}
              ></button>
            </div>
            <div className="modal-body">
              <div className="">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Title (Bangla)</th>
                      <td>{selected?.titleBn}</td>
                    </tr>
                    <tr>
                      <th scope="row">Title (English)</th>
                      <td>{selected?.titleEn}</td>
                    </tr>
                    <tr>
                      <th scope="row">Description (Bangla)</th>
                      <td>{selected?.descriptionBn}</td>
                    </tr>
                    <tr>
                      <th scope="row">Description (English)</th>
                      <td>
                        <a href="#" className="text-primary">
                          {selected?.descriptionEn}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCancel}
              >
                Close
              </button>
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
                onClick={handleCancel}
              ></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning mb-0" role="alert">
                Are you sure you want to delete the FAQ?
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
                onClick={handleCancel}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  handleDelete(selected);
                  handleCancel();
                }}
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

export default FaqPage;
