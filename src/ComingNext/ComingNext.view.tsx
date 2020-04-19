import * as React from "react";

import { ComingNextStyled, ComingNextCell, ComingNextGrid } from "./ComingNext.style";

export const ComingNext = () => (
  <ComingNextStyled>
    <h1>Coming next on tezos academy!</h1>
    <ComingNextGrid>
      <ComingNextCell>
        <h3>New features</h3>
        <div>
          - Additional 10 chapters (more complex concepts and instructions, integration with FA2, battle functions, …).
          <br />
          <br />
          - The ability for users to choose between PasquaLIGO, CameLIGO or ReasonLIGO, which will modify each course
          and editor solution in real time.
          <br />
          <br />
          - A backend with persistent database for users to register and save their progress (and for usage metrics).
          <br />
          <br />
          - The delivery of a certificate of completion badge.
          <br />
          <br />
          - An homepage to draw more engagement.
          <br />
          <br />- Spaceship battles animations.
        </div>
      </ComingNextCell>
      <ComingNextCell>
        <h3>Spaceship battles</h3>
        <img alt="battle" src="/elements/ship-battle.png" />
      </ComingNextCell>
      <ComingNextCell>
        <h3>New ships and boss fights</h3>
        <img alt="battle" src="/elements/boss.png" />
      </ComingNextCell>
      <ComingNextCell>
        <h3>New story: Is Dr Zod really who he says he is?</h3>
        <img alt="battle" src="/elements/zod.png" />
      </ComingNextCell>
    </ComingNextGrid>
  </ComingNextStyled>
);
