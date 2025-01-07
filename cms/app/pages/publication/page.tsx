"use client";

import PageRange from "@/app/components/pagination/PageRange";
import Pagination from "@/app/components/pagination/Pagination";
import ReusableTable from "@/app/components/table/ReusableTable";
import SearchComponent from "@/app/components/ui/search/Search";
import { handleFileUpdate } from "@/app/utils/handleFileUpdate";
import { useAppDispatch } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { publicationSchema } from "@lib/schema/schema-publication";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import { PublishTypes } from "@lib/services/media/media.service.type";
import {
  CheckStatus,
  PublishStatus,
} from "@lib/services/publication/publication.service.type";
import { publicationActions } from "@lib/slices/publication/publication.slice";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Publications: React.FC = () => {
  const dispatch = useAppDispatch();

  const publications = useSelector(
    (state: RootState) =>
      state.publication.getPublicationResponse?.findAllPublication
  );

  const createPublicationFetchStatus = useSelector(
    (state: RootState) => state.publication.createPublicationFetchStatus
  );

  const editPublicationFetchStatus = useSelector(
    (state: RootState) => state.publication.editPublicationFetchStatus
  );

  const deletePublicationFetchStatus = useSelector(
    (state: RootState) => state.publication.deletePublicationFetchStatus
  );

  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(
      publicationActions.getPublicationFetch({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (createPublicationFetchStatus === FetchStatusEnum.SUCCESS) {
      toast.success("Successfully Created");
    } else if (createPublicationFetchStatus === FetchStatusEnum.FAILURE) {
      toast.error("Failed to Create");
    }

    if (editPublicationFetchStatus === FetchStatusEnum.SUCCESS) {
      toast.success("Successfully Updated");
    } else if (editPublicationFetchStatus === FetchStatusEnum.FAILURE) {
      toast.error("Failed to Update");
    }

    if (deletePublicationFetchStatus === FetchStatusEnum.SUCCESS) {
      toast.success("Successfully Deleted");
    } else if (deletePublicationFetchStatus === FetchStatusEnum.FAILURE) {
      toast.error("Failed to Delete");
    }

    dispatch(
      publicationActions.getPublicationFetch({
        request: {
          page: 0,
          limit: 500,
        },
      })
    );

    dispatch(publicationActions.resetAllState());
  }, [
    createPublicationFetchStatus,
    editPublicationFetchStatus,
    deletePublicationFetchStatus,
  ]);

  const columns = [
    { header: "SL", accessor: "sl" },
    { header: "Title (Bangla)", accessor: "titleBn" },
    { header: "Title (English)", accessor: "titleEn" },
    { header: "Author Name (Bangla)", accessor: "authorNameBn" },
    { header: "Author Name (English)", accessor: "authorNameEn" },
    { header: "Publisher (Bangla)", accessor: "publisherBn" },
    { header: "Publisher (English)", accessor: "publisherEn" },
  ];

  // Create a derived state for filtered data based on search term
  const filteredData =
    publications?.filter((publication) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        publication.titleBn?.toLowerCase().includes(searchLower) ||
        publication.titleEn?.toLowerCase().includes(searchLower)
      );
    }) || [];

  // Prepare data for the table
  const recentData = filteredData.map((publication, index) => ({
    ...publication,
    sl: index + 1,
    publicationYear: new Date(publication.publicationYear).toDateString(),
    isPublished: publication.isPublished ? "YES" : "NO",
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

  const handleSelect = (publication) => {
    const isSelected = selected?.id !== publication?.id;
    setSelected(isSelected ? publication : null);

    if (isSelected) {
      handleFileUpdate(
        publication?.publicationFilePath,
        "publicationFilePath",
        handleSave
      );
      handleSave.setValues({
        ...publication,
      });
    } else {
      handleSave.resetForm();
    }
  };

  const handleCancel = () => {
    handleSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    handleSave.resetForm();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      handleSave.setFieldValue(
        `${event.currentTarget.name}`,
        event.target.files[0]
      );
    }
  };

  const handleSave = useFormik({
    initialValues: {
      titleBn: "",
      titleEn: "",
      authorNameBn: "",
      authorNameEn: "",
      publisherBn: "",
      publisherEn: "",
      publicationFilePath: null,
      publicationYear: null,
      isPreviewButton: CheckStatus.YES,
      isDownloadButton: CheckStatus.YES,
      isPublished: PublishStatus.YES,
    },

    validationSchema: publicationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        if (selected) {
          dispatch(
            publicationActions.editPublicationFetch({
              request: {
                id: selected.id,
                ...values,
              },
            })
          );
        } else {
          dispatch(
            publicationActions.createPublicationFetch({
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

  const handleDelete = (publication) => {
    try {
      dispatch(
        publicationActions.deletePublicationFetch({
          request: {
            id: publication.id,
          },
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
    handleCancel();
  };

  return (
    <div className="inner-page-wrapper">
      <ToastContainer />
      <div className="row">
        <div className="col-sm-12">
          <div className="page-Name-bar d-flex justify-content-between align-items-center">
            <div>
              <h5 className="page-Name">Publications</h5>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Publications
                  </li>
                </ol>
              </nav>
            </div>
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#addModal"
            >
              <i className="fa fa-plus" aria-hidden="true"></i> Add New
            </button>
          </div>
        </div>
      </div>
      {/* <div className="row">
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
                  renderRowActions={(publication) => (
                    <>
                      <a
                        href="#"
                        className="edit-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#addModal"
                        onClick={() => handleSelect(publication)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </a>
                      <a
                        href="#"
                        className="view-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#previewModal"
                        onClick={() => handleSelect(publication)}
                      >
                        <i className="fa-regular fa-eye"></i>
                      </a>
                      <a
                        href="#"
                        className="delete-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => handleSelect(publication)}
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
      </div> */}
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
              <div className="table-wrapper responsive-table">
                <ReusableTable
                  columns={columns}
                  data={currentData}
                  renderRowActions={(publication) => (
                    <>
                      <a
                        href="#"
                        className="edit-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#addModal"
                        onClick={() => handleSelect(publication)}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </a>
                      <a
                        href="#"
                        className="view-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#previewModal"
                        onClick={() => handleSelect(publication)}
                      >
                        <i className="fa-regular fa-eye"></i>
                      </a>
                      <a
                        href="#"
                        className="delete-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => handleSelect(publication)}
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
              <h1 className="modal-Name fs-5" id="addModalLabel">
                Add New Publication
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleCancel()}
              ></button>
            </div>
            <div className="modal-body">
              <div className="inner-page-wrapper">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <form onSubmit={handleSave.handleSubmit}>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-wrapper">
                                <label htmlFor="TitleBn" className="form-label">
                                  Publication Title (Bangla)
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="TitleBn"
                                  placeholder="Enter Publication Title (Bangla)"
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
                            </div>
                            <div className="col-md-6">
                              <div className="form-wrapper">
                                <label htmlFor="TitleEn" className="form-label">
                                  Publication Title (English)
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="TitleEn"
                                  placeholder="Enter Publication Title (English)"
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
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-wrapper">
                                <label
                                  htmlFor="AuthorBn"
                                  className="form-label"
                                >
                                  Author Name (Bangla)
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="AuthorBn"
                                  placeholder="Enter Author Name (Bangla)"
                                  name="authorNameBn"
                                  value={handleSave.values.authorNameBn}
                                  onChange={handleSave.handleChange}
                                  onBlur={handleSave.handleBlur}
                                />
                                {handleSave.touched.authorNameBn &&
                                  handleSave.errors.authorNameBn && (
                                    <div className="text-danger">
                                      {handleSave.errors.authorNameBn}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-wrapper">
                                <label
                                  htmlFor="AuthorEn"
                                  className="form-label"
                                >
                                  Author Name (English)
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="AuthorEn"
                                  placeholder="Enter Author Name (English)"
                                  name="authorNameEn"
                                  value={handleSave.values.authorNameEn}
                                  onChange={handleSave.handleChange}
                                  onBlur={handleSave.handleBlur}
                                />
                                {handleSave.touched.authorNameEn &&
                                  handleSave.errors.authorNameEn && (
                                    <div className="text-danger">
                                      {handleSave.errors.authorNameEn}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-wrapper">
                                <label
                                  htmlFor="PublisherBn"
                                  className="form-label"
                                >
                                  Publisher Name (Bangla)
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="PublisherBn"
                                  placeholder="Enter Publisher Name (Bangla)"
                                  name="publisherBn"
                                  value={handleSave.values.publisherBn}
                                  onChange={handleSave.handleChange}
                                  onBlur={handleSave.handleBlur}
                                />
                                {handleSave.touched.publisherBn &&
                                  handleSave.errors.publisherBn && (
                                    <div className="text-danger">
                                      {handleSave.errors.publisherBn}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-wrapper">
                                <label
                                  htmlFor="PublisherEn"
                                  className="form-label"
                                >
                                  Publisher Name (English)
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="PublisherEn"
                                  placeholder="Enter Publisher Name (English)"
                                  name="publisherEn"
                                  value={handleSave.values.publisherEn}
                                  onChange={handleSave.handleChange}
                                  onBlur={handleSave.handleBlur}
                                />
                                {handleSave.touched.publisherEn &&
                                  handleSave.errors.publisherEn && (
                                    <div className="text-danger">
                                      {handleSave.errors.publisherEn}
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="form-wrapper">
                            <label
                              htmlFor="PublicationDate"
                              className="form-label"
                            >
                              Publication Year
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              id="PublicationDate"
                              name="publicationYear"
                              value={handleSave.values.publicationYear}
                              onChange={handleSave.handleChange}
                              onBlur={handleSave.handleBlur}
                            />
                            {handleSave.touched.publicationYear &&
                              handleSave.errors.publicationYear && (
                                <div className="text-danger">
                                  {handleSave.errors.publicationYear.toString()}
                                </div>
                              )}
                          </div>
                          <div className="form-wrapper">
                            <label
                              htmlFor="PublicationFile"
                              className="form-label"
                            >
                              Publication File
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="PublicationFile"
                              name="publicationFilePath"
                              ref={fileInputRef}
                              onChange={(event) => handleFileChange(event)}
                              onBlur={handleSave.handleBlur}
                            />
                            {handleSave.touched.publicationFilePath &&
                              handleSave.errors.publicationFilePath && (
                                <div className="text-danger">
                                  {handleSave.errors.publicationFilePath.toString()}
                                </div>
                              )}
                            {selected && (
                              <a
                                href={selected?.publicationFilePath}
                                target="_blank"
                                className="text-primary"
                              >
                                Click to view existing file
                              </a>
                            )}
                          </div>
                          <div className="form-wrapper">
                            <label htmlFor="showButtons" className="form-label">
                              Show Buttons
                            </label>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="previewCheckbox"
                                checked={
                                  handleSave.values.isPreviewButton ===
                                  CheckStatus.YES
                                }
                                onChange={(e) => {
                                  handleSave.setFieldValue(
                                    "isPreviewButton",
                                    e.target.checked
                                      ? CheckStatus.YES
                                      : CheckStatus.NO
                                  );
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="previewCheckbox"
                              >
                                Preview Button
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="downloadCheckbox"
                                checked={
                                  handleSave.values.isDownloadButton ===
                                  CheckStatus.YES
                                }
                                onChange={(e) => {
                                  handleSave.setFieldValue(
                                    "isDownloadButton",
                                    e.target.checked
                                      ? CheckStatus.YES
                                      : CheckStatus.NO
                                  );
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="downloadCheckbox"
                              >
                                Download Button
                              </label>
                            </div>
                          </div>
                          <div className="form-wrapper">
                            <label htmlFor="Published" className="form-label">
                              Published
                            </label>
                            <select
                              className="form-select"
                              id="Published"
                              name="isPublished"
                              value={handleSave.values.isPublished}
                              onChange={handleSave.handleChange}
                              onBlur={handleSave.handleBlur}
                            >
                              <option value={PublishTypes.YES}>Yes</option>
                              <option value={PublishTypes.NO}>No</option>
                            </select>
                            {handleSave.touched.isPublished &&
                              handleSave.errors.isPublished && (
                                <div className="text-danger">
                                  {handleSave.errors.isPublished}
                                </div>
                              )}
                          </div>
                          <div className="form-wrapper text-end mt-4">
                            <button
                              type="button"
                              className="btn btn-secondary me-3"
                              data-bs-dismiss="modal"
                              onClick={() => handleCancel()}
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
                onClick={() => handleCancel()}
              ></button>
            </div>
            <div className="modal-body">
              <div className="">
                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th scope="row">Publication Title (Bangla)</th>
                      <td>{selected?.titleBn}</td>
                    </tr>
                    <tr>
                      <th scope="row">Publication Title (English)</th>
                      <td>{selected?.titleEn}</td>
                    </tr>
                    <tr>
                      <th scope="row">Author Name (Bangla)</th>
                      <td>{selected?.authorNameBn}</td>
                    </tr>
                    <tr>
                      <th scope="row">Author Name (English)</th>
                      <td>{selected?.authorNameEn}</td>
                    </tr>
                    <tr>
                      <th scope="row">Publisher Name (Bangla)</th>
                      <td>{selected?.publisherBn}</td>
                    </tr>
                    <tr>
                      <th scope="row">Publisher Name (English)</th>
                      <td>{selected?.publisherEn}</td>
                    </tr>
                    <tr>
                      <th scope="row">Publication Year</th>
                      <td>
                        {new Date(selected?.publicationYear).toDateString()}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Publication File</th>
                      <td>
                        <a
                          href={selected?.publicationFilePath}
                          target="_blank"
                          className="text-primary"
                        >
                          file
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Preview Button</th>
                      <td>{selected?.isPreviewButton}</td>
                    </tr>
                    <tr>
                      <th scope="row">Download Button</th>
                      <td>{selected?.isDownloadButton}</td>
                    </tr>
                    <tr>
                      <th scope="row">Published</th>
                      <td>{selected?.isPublished}</td>
                    </tr>
                    <tr>
                      <th scope="row">Created By</th>
                      <td>Admin</td>
                    </tr>
                    <tr>
                      <th scope="row">Created At</th>
                      <td>
                        <p>{new Date(selected?.createdAt).toDateString()}</p>
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
                onClick={() => handleCancel()}
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
              <h1 className="modal-Name fs-5" id="deleteModalLabel">
                Delete Confirmation
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleCancel()}
              ></button>
            </div>
            <div className="modal-body">
              <div className="alert alert-warning mb-0" role="alert">
                Are you sure you want to delete the publication?
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
                onClick={() => handleCancel()}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(selected)}
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

export default Publications;
