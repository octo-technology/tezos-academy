import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button, ButtonBorder, ButtonText } from '../ChapterAbout/ChapterAbout.style'
//prettier-ignore
import { HomeAdventure, HomeAlert, HomeAlertBand, HomeAlertText, HomeBadge, HomeBadgeGrid, HomeEditor, HomeFooter, HomeFooterGrid, HomeHeader, HomeHeaderGrid, HomeHeaderLeft, HomeHeaderOcto, HomeHeaderRight, HomeLanguage, HomeLanguageGrid, HomeStyled } from './Home.style'

export const HomeView = () => {
  const isMobile = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 600

  return (
    <HomeStyled>
      <HomeHeader>
        <HomeHeaderGrid>
          <HomeHeaderLeft>
            <h1>Learn to code Tezos Smart Contracts the easy way!</h1>
            <p>Tezos Academy is a fun interactive tutorial to the LIGO language</p>
            <Link to="/pascal/chapter-about">
              <Button>
                <ButtonBorder />
                <ButtonText onClick={() => {}}>
                  <img alt="rocket" src="/icons/rocket.svg" />
                  GET STARTED
                </ButtonText>
              </Button>
            </Link>
          </HomeHeaderLeft>
          <HomeHeaderRight>
            <img src="/images/tezos.svg" />
          </HomeHeaderRight>
        </HomeHeaderGrid>
      </HomeHeader>

      <HomeAdventure>
        <h1>Take part in an epic adventure</h1>
        <p>Tezos Academy is a fun interactive tutorial to the LIGO language</p>
        <img alt="adventure" src="/images/adventure.png" />
      </HomeAdventure>

      <HomeLanguage>
        <h1>Choose your language</h1>
        <p>Tezos Academy is compatible with PascaLIGO, CameLIGO and ReasonLIGO</p>
        <HomeLanguageGrid>
          <div>
            <h3>PascalLIGO</h3>
            <p>PascaLIGO has a syntax close to Pascal, great for simplicity.</p>
            <img alt="pascal" src="/images/pascal.svg" />
            <Link to="/pascal/chapter-about">
              <Button>
                <ButtonBorder />
                <ButtonText onClick={() => {}}>
                  <img alt="rocket" src="/icons/rocket.svg" />
                  START WITH PASCAL
                </ButtonText>
              </Button>
            </Link>
          </div>

          <div>
            <h3>ReasonLIGO</h3>
            <p>ReasonLIGO has a syntax close to ReasonML, for next level learning.</p>
            <img alt="reason" src="/images/reason.svg" />
            <Link to="/reason/chapter-about">
              <Button>
                <ButtonBorder />
                <ButtonText onClick={() => {}}>
                  <img alt="rocket" src="/icons/rocket.svg" />
                  START WITH REASON
                </ButtonText>
              </Button>
            </Link>
          </div>

          <div>
            <h3>CameLIGO</h3>
            <p>CameLIGO has a syntax close to OCaml, great for leaning formal languages.</p>
            <img alt="camel" src="/images/camel.svg" />
            <Link to="/camel/chapter-about">
              <Button>
                <ButtonBorder />
                <ButtonText onClick={() => {}}>
                  <img alt="rocket" src="/icons/rocket.svg" />
                  START WITH CAMEL
                </ButtonText>
              </Button>
            </Link>
          </div>
        </HomeLanguageGrid>
      </HomeLanguage>

      <HomeEditor>
        <h1>Interactive editor with git-diff solutions</h1>
        <p>Type your solution to each exercise online and compare with the solution</p>
        <img alt="editor" src="/images/editor.png" />
      </HomeEditor>
    </HomeStyled>
  )
}
