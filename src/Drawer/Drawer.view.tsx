import * as PropTypes from "prop-types";
import * as React from "react";
import { Link } from "react-router-dom";

import { DrawerItem, DrawerMask, DrawerStyled } from "./Drawer.style";
import { chapterData } from "../Chapter/Chapter.data";

type DrawerViewProps = {
  showing: boolean;
  hideCallback: () => void;
  pathname: string;
  user: any;
  removeAuthUserCallback: () => void;
};

export const DrawerView = ({ showing, hideCallback, pathname, user, removeAuthUserCallback }: DrawerViewProps) => (
  <>
    <DrawerMask className={`${showing}`} onClick={() => hideCallback()} />
    <DrawerStyled className={`${showing}`}>
      <h1>Menu</h1>

      {chapterData.map((chapter) => (
        <DrawerItem className={pathname === chapter.pathname ? "current-path" : "other-path"}>
          <Link to={chapter.pathname} onClick={() => hideCallback()}>
            {chapter.name}
          </Link>
        </DrawerItem>
      ))}

      <DrawerItem className={pathname === "/coming-next" ? "current-path" : "other-path"}>
        <Link to="/coming-next" onClick={() => hideCallback()}>
          What's next?
        </Link>
      </DrawerItem>
    </DrawerStyled>
  </>
);

DrawerView.propTypes = {
  showing: PropTypes.bool,
  hideCallback: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  user: PropTypes.object,
  removeAuthUserCallback: PropTypes.func.isRequired,
};

DrawerView.defaultProps = {
  showing: false,
  user: undefined,
};
