import React from "react";

interface Props {
  status: string;
}

const DisplayValidationResponse: React.FC<Props> = (props) => (
  <div>
    <p className="validation">{props.status}!</p>
  </div>
);

export default DisplayValidationResponse;
