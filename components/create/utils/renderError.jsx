import React from "react";

const renderError = (field, formErrors) => {
  return formErrors[field] ? (
    <span className="error-message text-red text-sm mt-1 text-nowrap">
      {formErrors[field]}
    </span>
  ) : null;
};

export default renderError;
