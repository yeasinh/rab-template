import React from "react";

interface PreviewMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaData: {
    titleBn: string;
    titleEn: string;
    subTitleBn: string;
    subTitleEn: string;
    mediaType: string | null;
    mediaFilePath?: string | null;
    isPublished: string | null;
  } | null;
}

const PreviewMediaModal: React.FC<PreviewMediaModalProps> = ({
  isOpen,
  onClose,
  mediaData,
}) => {
  if (!mediaData) return null;

  const checkIfVideo = (mediaFilePath: string) => {
    if (mediaFilePath.match(".mp4")) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show d-block" : ""}`}
      id="previewMediaModal"
      tabIndex={-1}
      aria-labelledby="previewMediaModalLabel"
      aria-hidden="true"
      style={{
        display: isOpen ? "block" : "none",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="previewMediaModalLabel">
              Preview
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Title (Bangla)</td>
                    <td>:</td>
                    <td>{mediaData?.titleBn}</td>
                  </tr>
                  <tr>
                    <td>Title (English)</td>
                    <td>:</td>
                    <td>{mediaData?.titleEn}</td>
                  </tr>
                  <tr>
                    <td>Subtitle (Bangla)</td>
                    <td>:</td>
                    <td>{mediaData?.subTitleBn}</td>
                  </tr>
                  <tr>
                    <td>Subtitle (English)</td>
                    <td>:</td>
                    <td>{mediaData?.subTitleEn}</td>
                  </tr>
                  <tr>
                    <td>Media Type</td>
                    <td>:</td>
                    <td>{mediaData?.mediaType}</td>
                  </tr>
                  <tr>
                    <td>Featured Media</td>
                    <td>:</td>
                    <td>
                      {mediaData?.mediaFilePath
                        ? (checkIfVideo(mediaData.mediaFilePath) && (
                            <video
                              autoPlay
                              loop
                              muted
                              style={{ width: "100%" }}
                            >
                              <source
                                src={mediaData.mediaFilePath}
                                type="video/mp4"
                              />
                            </video>
                          )) ||
                          (!checkIfVideo(mediaData.mediaFilePath) && (
                            <img
                              src={mediaData.mediaFilePath}
                              alt="MediaFile"
                              width={250}
                              height={200}
                            />
                          ))
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td>Published</td>
                    <td>:</td>
                    <td>{mediaData?.isPublished}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMediaModal;
