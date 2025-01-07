import { useAppDispatch, useAppSelector } from "@lib/hooks";
import { RootState } from "@lib/root.reducer";
import { FetchStatusEnum } from "@lib/services/fetch.type";
import { mediaActions } from "@lib/slices/media/media.slice";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

interface DeleteMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaData: any;
}

const DeleteMediaModal: React.FC<DeleteMediaModalProps> = ({
  isOpen,
  onClose,
  mediaData,
}) => {
  useEffect(() => {
    const body = document.body;

    if (isOpen) {
      // Create backdrop when modal is open
      const backdrop = document.createElement("div");
      backdrop.className = "modal-backdrop fade show";
      document.body.appendChild(backdrop);
      body.classList.add("modal-open");

      // Cleanup function to remove backdrop and class
      return () => {
        backdrop.remove();
        body.classList.remove("modal-open");
      };
    }
  }, [isOpen]);

  const dispatch = useAppDispatch();

  const deleteMediaFetchStatus = useAppSelector(
    (state: RootState) => state.media.deleteMediaFetchStatus
  );

  const handleDelete = (media) => {
    try {
      dispatch(
        mediaActions.deleteMediaFetch({
          request: {
            id: media.id,
          },
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (deleteMediaFetchStatus === FetchStatusEnum.SUCCESS) {
      toast("Successfully deleted media");
      onClose();
      location.reload();
    } else if (deleteMediaFetchStatus === FetchStatusEnum.ERROR) {
      toast("Failed to delete media");
    }
  }, [deleteMediaFetchStatus, onClose]);

  return (
    <>
      {isOpen && (
        <>
          <div
            className="modal fade show"
            id="deleteMediaModal"
            tabIndex={-1}
            style={{ display: "block" }}
          >
            <ToastContainer />
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5">Delete Confirmation</h1>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={onClose}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="alert alert-warning mb-0" role="alert">
                    Are you sure you want to delete the media?
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(mediaData)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default DeleteMediaModal;
