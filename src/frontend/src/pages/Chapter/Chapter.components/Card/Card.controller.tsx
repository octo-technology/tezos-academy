import * as React from "react";
import * as PropTypes from "prop-types";

import { CardView } from "./Card.view";

type CardProps = {
  shipCode: string;
};

export const Card = ({ shipCode }: CardProps) => {
  return <CardView shipCode={shipCode} />;
};

Card.propTypes = {
  shipCode: PropTypes.string.isRequired
};

Card.defaultProps = {};
