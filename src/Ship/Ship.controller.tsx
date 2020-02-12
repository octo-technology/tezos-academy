import * as React from "react";
import * as PropTypes from "prop-types";

import { ShipView } from "./Ship.view";

type ShipProps = {
  shipCode: string;
};

export const Ship = ({ shipCode }: ShipProps) => {
  return <ShipView shipCode={shipCode} />;
};

Ship.propTypes = {
  shipCode: PropTypes.string.isRequired
};

Ship.defaultProps = {};
