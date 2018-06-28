import React from "react";
import PropTypes from "prop-types";

import "./FormErrorsComponent.css";

class FormErrorsComponent extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const formErrors = this.props.formErrors;

    return (
      <div className="formErrors">
        {Object.keys(formErrors).map((fieldName, i) => {
          if (formErrors[fieldName].length > 0) {
            return (
              <h5 key={i}>
                {fieldName} {formErrors[fieldName]}
              </h5>
            );
          } else {
            return "";
          }
        })}
      </div>
    );
  }
}

FormErrorsComponent.propTypes = {
  formErrors: PropTypes.object.isRequired
};

export default FormErrorsComponent;
