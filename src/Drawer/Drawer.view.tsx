import * as PropTypes from "prop-types";
import * as React from "react";
import { Link } from "react-router-dom";

import { DrawerItem, DrawerMask, DrawerStyled } from "./Drawer.style";

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

      <DrawerItem className={pathname === "/" || pathname === "/1" ? "current-path" : "other-path"}>
        <Link to="/1" onClick={() => hideCallback()}>
          1 - About
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/2" ? "current-path" : "other-path"}>
        <Link to="/2" onClick={() => hideCallback()}>
          2 - Types
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/3" ? "current-path" : "other-path"}>
        <Link to="/3" onClick={() => hideCallback()}>
          3 - Variables
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/4" ? "current-path" : "other-path"}>
        <Link to="/4" onClick={() => hideCallback()}>
          4 - Math
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/5" ? "current-path" : "other-path"}>
        <Link to="/5" onClick={() => hideCallback()}>
          5 - Strings
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/6" ? "current-path" : "other-path"}>
        <Link to="/6" onClick={() => hideCallback()}>
          6 - Functions
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/7" ? "current-path" : "other-path"}>
        <Link to="/7" onClick={() => hideCallback()}>
          7 - Conditionals
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/8" ? "current-path" : "other-path"}>
        <Link to="/8" onClick={() => hideCallback()}>
          8 - Loops
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/9" ? "current-path" : "other-path"}>
        <Link to="/9" onClick={() => hideCallback()}>
          9 - Records
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/10" ? "current-path" : "other-path"}>
        <Link to="/10" onClick={() => hideCallback()}>
          10 - Maps
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/11" ? "current-path" : "other-path"}>
        <Link to="/11" onClick={() => hideCallback()}>
          11 - Timestamps
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/12" ? "current-path" : "other-path"}>
        <Link to="/12" onClick={() => hideCallback()}>
          12 - Addresses
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/13" ? "current-path" : "other-path"}>
        <Link to="/13" onClick={() => hideCallback()}>
          13 - Main function
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/14" ? "current-path" : "other-path"}>
        <Link to="/14" onClick={() => hideCallback()}>
          14 - Built-ins
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/15" ? "current-path" : "other-path"}>
        <Link to="/15" onClick={() => hideCallback()}>
          15 - Cast
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/16" ? "current-path" : "other-path"}>
        <Link to="/16" onClick={() => hideCallback()}>
          16 - Tuples
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/17" ? "current-path" : "other-path"}>
        <Link to="/17" onClick={() => hideCallback()}>
          17 - Fail with
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/18" ? "current-path" : "other-path"}>
        <Link to="/18" onClick={() => hideCallback()}>
          18 - Variant
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/19" ? "current-path" : "other-path"}>
        <Link to="/19" onClick={() => hideCallback()}>
          19 - Pattern Matching
        </Link>
      </DrawerItem>

      <DrawerItem className={pathname === "/20" ? "current-path" : "other-path"}>
        <Link to="/20" onClick={() => hideCallback()}>
          20 - Transactions
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
