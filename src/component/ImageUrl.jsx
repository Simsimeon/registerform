import React, { useState } from "react";
import { ProfileProvider, useProfile } from "../context/ProfileProvider";
import { Cloudinary } from "@cloudinary/url-gen";

const ImageUrl = () => {
  const {
    submittedUrl,
    setSubmittedUrl,

    imageError,
    setImageError,
    loading,
    handleUpload,
  } = useProfile();

  const handleChange = (event) => {
    setSubmittedUrl(event.target.value);
    // Clear error as user types
    if (imageError) setImageError("");
  };

  return (
    <div>
      <h3>Submit Image URL</h3>

      <div className="input-box">
        <input
          id="imageUrlInput"
          type="text" // Use type="text" for a URL string input
          value={submittedUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
          style={{ borderColor: imageError ? "red" : "" }}
        />
        {imageError && (
          <p className="error-message" style={{ color: "red" }}>
            {imageError}
          </p>
        )}
      </div>
      <button
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          // handleValidateEmail();
          handleUpload();
        }}
      >
        {loading ? "Uploading" : "Upload URL"}
      </button>
    </div>
  );
};

export default ImageUrl;

// import { Cloudinary } from "@cloudinary/url-gen";
// import { auto } from "@cloudinary/url-gen/actions/resize";
// import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
// import { AdvancedImage } from "@cloudinary/react";

// export const App = () => {
//   const cld = new Cloudinary({ cloud: { cloudName: "digidg6yu" } });

//   // Use this sample image or upload your own via the Media Library
//   const img = cld
//     .image("cld-sample-5")
//     .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
//     .quality("auto")
//     .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

//   return <AdvancedImage cldImg={img} />;
// };
