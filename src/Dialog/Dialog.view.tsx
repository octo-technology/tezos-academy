import * as PropTypes from "prop-types";
import * as React from "react";

import { DialogCharacter, DialogStyled, DialogText, DialogTextInside } from "./Dialog.style";

type DialogProps = {
  text: string;
};

export const DialogView = ({ text }: DialogProps) => (
  <DialogStyled>
    <DialogCharacter>
      <img alt="character-bg" className="character-bg" src="/elements/character-bg.svg" />
      <div className="glitch">
        <div className="glitch__item"></div>
        <div className="glitch__item"></div>
        <div className="glitch__item"></div>
        <div className="glitch__item"></div>
        <div className="glitch__item"></div>
      </div>
    </DialogCharacter>
    <DialogText>
      <DialogTextInside>{text}</DialogTextInside>
    </DialogText>
  </DialogStyled>
);

DialogView.propTypes = {
  text: PropTypes.string.isRequired,
};

DialogView.defaultProps = {};
