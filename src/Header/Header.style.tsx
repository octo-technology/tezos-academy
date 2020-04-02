import { Link } from "react-router-dom";
import styled from "styled-components/macro";

export const HeaderStyled = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

export const HeaderMenu = styled.div`
  height: 50px;
  background: rgba(0, 44, 69, 0.6);
  border-bottom: 1px solid #0a456d;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
`;

export const HeaderSubMenu = styled.div`
  height: 30px;
  background: rgba(10, 24, 34, 0.8);
  border-bottom: 1px solid #0a456d;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
`;

export const HeaderLogo = styled.img`
  padding: 7px;
  display: inline-block;
`;

export const HeaderMenuItem = styled(Link)`
  font-size: 16px;
  line-height: 50px;
  color: #08658b;
  display: inline-block;
  margin-left: 40px;
  vertical-align: top;

  &.selected {
    color: #fff;
  }
`;

export const HeaderMenuSelector = styled.div`
  position: absolute;
  width: 85px;
  height: 3px;
  left: 314px;
  top: 47px;
  background: #42edf8;
  box-shadow: 0px 0px 25px rgba(11, 183, 226, 0.65), 0px 0px 15px rgba(0, 112, 202, 0.6);
`;

export const HeaderSubMenuItem = styled(Link)`
  font-size: 12px;
  line-height: 30px;
  color: #08658b;
  display: inline-block;
  margin-left: 20px;
  vertical-align: top;
  will-change: color;
  transition: color 0.2s ease-in-out;

  &.selected {
    color: #fff;
  }
`;
