import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export const PhotoModal = ({
  show,
  onHide,
  deviceId,
  photo,
  setPhoto,
  onCrop,
}) => {
  const { t } = useTranslation("KnowYourCustomer");
  const cropperRef = useRef();

  const handleTakePhoto = (dataUri) => {
    setPhoto(dataUri);
  };

  const handleReTakePhoto = () => {
    setPhoto("");
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    setPhoto(cropper.getCroppedCanvas().toDataURL());
    onCrop();
  };

  return (
    <Modal
      className="photo-modal"
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="cont ained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="mb-2" />
      <Modal.Body>
        <div>
          {photo ? (
            <Cropper
              ref={cropperRef}
              style={{ height: "100%", width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              src={photo}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive
              autoCropArea={1}
              checkOrientation={false}
              guides
            />
          ) : (
            <div className="camera-holder">
              <Camera
                onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
                idealFacingMode={deviceId}
                isImageMirror
              />
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {photo && (
          <>
            <button
              type="button"
              className="btn-secondary btn-medium"
              onClick={handleReTakePhoto}
            >
              {t("Retake")}
            </button>
            <button
              type="button"
              className="btn-primary btn-medium"
              onClick={handleCrop}
            >
              {t("Crop")}
            </button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

PhotoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  photo: PropTypes.string.isRequired,
  setPhoto: PropTypes.func.isRequired,
  onCrop: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  deviceId: PropTypes.string.isRequired,
};
