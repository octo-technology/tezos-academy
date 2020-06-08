import * as React from 'react'
import { Link } from 'react-router-dom'

import { Button, ButtonBorder, ButtonText } from '../Chapters/Pascal/ChapterAbout/ChapterAbout.style'
//prettier-ignore
import { HomeAdventure, HomeAlert, HomeAlertBand, HomeAlertText, HomeBadge, HomeBadgeGrid, HomeComets, HomeEditor, HomeFooter, HomeFooterGrid, HomeHeader, HomeHeaderGrid, HomeHeaderLeft, HomeHeaderOcto, HomeHeaderRight, HomeLanguage, HomeLanguageGrid, HomeShip, HomeStyled } from './Home.style'

export const HomeView = () => {
  return (
    <HomeStyled>
      <HomeHeader>
        <HomeComets>
          <svg
            className="rocket-svg"
            data-name="Layer 2"
            xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
            viewBox="0 0 270 370"
          >
            <defs></defs>
            <title>Comets</title>
            <g id="comets">
              <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
              <line x1="163" y1="-8" x2="163" y2="699"></line>
              <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
              <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
              <line x1="102" y1="-76" x2="102" y2="489"></line>
              <line x1="26" y1="-19" x2="26" y2="527"></line>
              <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
              <line x1="230" y1="-462" x2="230" y2="663"></line>
              <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
              <line x1="163" y1="-8" x2="163" y2="699"></line>
              <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
              <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
              <line x1="102" y1="-76" x2="102" y2="489"></line>
              <line x1="26" y1="-19" x2="26" y2="527"></line>
              <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
              <line x1="255" y1="-462" x2="255" y2="663"></line>
              <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
              <line x1="163" y1="-8" x2="163" y2="699"></line>
              <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
              <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
              <line x1="102" y1="-76" x2="102" y2="489"></line>
              <line x1="26" y1="-19" x2="26" y2="527"></line>
              <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
              <line x1="276" y1="-462" x2="276" y2="663"></line>
              <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
              <line x1="163" y1="-8" x2="163" y2="699"></line>
              <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
              <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
              <line x1="102" y1="-76" x2="102" y2="489"></line>
              <line x1="26" y1="-19" x2="26" y2="527"></line>
              <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
              <line x1="179" y1="-462" x2="179" y2="663"></line>
              <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
              <line x1="163" y1="-8" x2="163" y2="699"></line>
              <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
              <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
              <line x1="102" y1="-76" x2="102" y2="489"></line>
              <line x1="26" y1="-19" x2="26" y2="527"></line>
              <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
              <line x1="155" y1="-462" x2="155" y2="663"></line>
              <line x1="77.5" y1="-15" x2="77.5" y2="1092.5"></line>
              <line x1="163" y1="-8" x2="163" y2="699"></line>
              <line x1="49.5" y1="-33" x2="49.5" y2="589.5"></line>
              <line x1="60.5" y1="-33" x2="60.5" y2="298.5"></line>
              <line x1="102" y1="-76" x2="102" y2="489"></line>
              <line x1="26" y1="-19" x2="26" y2="527"></line>
              <line x1="305.6" y1="-174.3" x2="305.6" y2="734.7"></line>
              <line x1="291" y1="-462" x2="291" y2="663"></line>
            </g>
          </svg>
        </HomeComets>
        <HomeHeaderGrid>
          <HomeHeaderLeft>
            <h1>Learn to code Tezos Smart Contracts the easy way!</h1>
            <p>Tezos academy is a fun interactive tutorial to the LIGO language</p>
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
            <HomeShip>
              <img className="laser" alt="laser" src="/images/laser.svg" />
              <img className="ship" alt="ship" src="/images/ship.svg" />
              <img className="flame" alt="flame" src="/images/flame.svg" />
            </HomeShip>
          </HomeHeaderRight>
        </HomeHeaderGrid>
        <HomeHeaderOcto>
          <img alt="octo" src="/images/by-octo.svg" />
        </HomeHeaderOcto>
      </HomeHeader>

      <HomeAdventure>
        <h1>Take part in an epic adventure</h1>
        <p>Tezos academy is a fun interactive tutorial to the LIGO language</p>
        <img alt="adventure" src="/images/adventure.png" />
      </HomeAdventure>

      <HomeLanguage>
        <h1>Choose your language</h1>
        <p>Tezos academy is compatible with PascaLIGO, CameLIGO and ReasonLIGO</p>
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
        <p>Type your solution to each exercice online and compare with the solution</p>
        <img alt="editor" src="/images/editor.png" />
      </HomeEditor>

      <HomeBadge>
        <h1>Get your completion badge</h1>
        <p>Tezos Academy tracks your progress and deliver a badge upon completion of all chapters</p>

        <HomeBadgeGrid>
          <img alt="badge" src="/images/badge.svg" />
          <p>
            This nominative badge will be available for you through a dedicated URL that you can then share on LinkedIn
            or other social networks to prove to the world that you have completed your training on Tezos Academy.
          </p>
        </HomeBadgeGrid>
      </HomeBadge>

      <HomeAlert>
        <img alt="boss" src="/images/boss.png" />
        <HomeAlertBand />
        <HomeAlertText>
          <div>The enemy is here!</div>
          <Link to="/pascal/chapter-about">
            <Button>
              <ButtonBorder />
              <ButtonText onClick={() => {}}>
                <img alt="rocket" src="/icons/rocket.svg" />
                INTO BATTLE
              </ButtonText>
            </Button>
          </Link>
        </HomeAlertText>
      </HomeAlert>

      <HomeFooter>
        <HomeFooterGrid>
          <img alt="logo" src="/images/logo.svg" />
          <div>
            <p>About Tezos Link</p>
            <a href="mailto:beta@octo.com" target="_blank">
              Support
            </a>
            <a href="https://www.reddit.com/r/tezos/" target="_blank">
              Reddit
            </a>
          </div>
          <div>
            <p>About OCTO</p>
            <a href="https://octo.com" target="_blank">
              Homepage
            </a>
            <a href="https://blog.octo.com" target="_blank">
              Our blog
            </a>
          </div>
          <div>
            <p>About the devs</p>
            <a href="https://www.linkedin.com/in/aymeric-bethencourt-96665046/" target="_blank">
              Aymeric Bethencourt
            </a>
            <a href="https://www.linkedin.com/in/frank-hillard-300b6b106/" target="_blank">
              Franck Hillard
            </a>
          </div>
          <img alt="octo" src="/images/by-octo.svg" />
        </HomeFooterGrid>
      </HomeFooter>
    </HomeStyled>
  )
}
