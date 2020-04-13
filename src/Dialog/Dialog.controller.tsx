import * as PropTypes from "prop-types";
import * as React from "react";

import { DialogView } from "./Dialog.view";

type DialogProps = {
  children: string;
};

export const Dialog = ({ children }: DialogProps) => {
  console.log(children);
  return <DialogView text={children[0]} />;
};

Dialog.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Dialog.defaultProps = {};
