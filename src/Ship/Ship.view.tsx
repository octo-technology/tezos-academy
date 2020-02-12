import * as React from "react";
import * as PropTypes from "prop-types";

import { ShipStyled, ShipCabin, ShipGun, ShipWings, ShipEngine, ShipFlame, ShipLaser } from "./Ship.style";

type ShipViewProps = {
  shipCode: string;
};

const flameStyles = [
  [
    // red
    [
      { top: "232px", left: "104px" },
      { top: "232px", left: "136px" }
    ],
    [{ top: "234px", left: "120px" }, { display: "none" }],
    [{ top: "243px", left: "120px" }, { display: "none" }],
    [{ top: "263px", left: "120px" }, { display: "none" }],
    [{ top: "263px", left: "120px" }, { display: "none" }]
  ],
  [
    // blue
    [
      { top: "240px", left: "109px" },
      { top: "240px", left: "131px" }
    ],
    [{ top: "224px", left: "120px" }, { display: "none" }],
    [
      { top: "229px", left: "106px" },
      { top: "229px", left: "134px" }
    ],
    [{ top: "220px", left: "120px" }, { display: "none" }],
    [
      { top: "235px", left: "109px" },
      { top: "235px", left: "131px" }
    ]
  ],
  [
    // yellow
    [
      { top: "235px", left: "112px" },
      { top: "235px", left: "128px" }
    ],
    [
      { top: "230px", left: "111px" },
      { top: "230px", left: "129px" }
    ],
    [{ top: "241px", left: "120px" }, { display: "none" }],
    [{ top: "259px", left: "120px" }, { display: "none" }],
    [{ top: "264px", left: "120px" }, { display: "none" }]
  ]
];

const laserStyles = [
  [
    // red
    [
      { top: "13px", left: "82px" },
      { top: "13px", left: "152px" }
    ],
    [
      { top: "-10px", left: "87px" },
      { top: "-10px", left: "147px" }
    ],
    [
      { top: "-13px", left: "83px" },
      { top: "-13px", left: "151px" }
    ],
    [
      { top: "-30px", left: "70px" },
      { top: "-30px", left: "165px" }
    ],
    [
      { top: "-46px", left: "75px" },
      { top: "-46px", left: "160px" }
    ]
  ],
  [
    // blue
    [
      { top: "-20px", left: "102px" },
      { top: "-20px", left: "132px" }
    ],
    [
      { top: "-20px", left: "103px" },
      { top: "-20px", left: "131px" }
    ],
    [
      { top: "-9px", left: "93px" },
      { top: "-9px", left: "141px" }
    ],
    [
      { top: "0px", left: "100px" },
      { top: "0px", left: "134px" }
    ],
    [
      { top: "-69px", left: "106px" },
      { top: "-69px", left: "129px" }
    ]
  ],
  [
    // yellow
    [
      { top: "20px", left: "90px" },
      { top: "20px", left: "145px" }
    ],
    [
      { top: "20px", left: "90px" },
      { top: "20px", left: "145px" }
    ],
    [
      { top: "30px", left: "61px" },
      { top: "30px", left: "175px" }
    ],
    [
      { top: "3px", left: "71px" },
      { top: "3px", left: "164px" }
    ],
    [
      { top: "1px", left: "64px" },
      { top: "1px", left: "170px" }
    ]
  ]
];

const classIndexToColor = ["r", "b", "y"];

export const ShipView = ({ shipCode }: ShipViewProps) => {
  const classCode = parseInt(shipCode[0]);
  const classColor = classIndexToColor[classCode];
  const cabinCode = parseInt(shipCode[1]);
  const engineCode = parseInt(shipCode[2]);
  const gunsCode = parseInt(shipCode[3]);
  const wingsCode = parseInt(shipCode[4]);
  const flameCode = parseInt(shipCode[5]);
  const flameStyle = flameStyles[classCode][engineCode];
  const laserStyle = laserStyles[classCode][gunsCode];

  return (
    <ShipStyled>
      <ShipWings alt="wings" src={`/ships/${classColor}w${wingsCode}.svg`} />
      <ShipGun alt="gun" src={`/ships/${classColor}g${gunsCode}.svg`} />
      <ShipEngine alt="engine" src={`/ships/${classColor}e${engineCode}.svg`} />
      <ShipCabin alt="cabin" src={`/ships/${classColor}c${cabinCode}.svg`} />
      <ShipFlame alt="flame0" src={`/ships/flame${flameCode}.svg`} style={flameStyle[0]} />
      <ShipFlame alt="flame1" src={`/ships/flame${flameCode}.svg`} style={flameStyle[1]} />
      <ShipLaser alt="laser0" src="/ships/laser1.svg" style={laserStyle[0]} />
      <ShipLaser alt="laser1" src="/ships/laser1.svg" style={laserStyle[1]} />
    </ShipStyled>
  );
};

ShipView.propTypes = {
  shipCode: PropTypes.string.isRequired
};

ShipView.defaultProps = {};
