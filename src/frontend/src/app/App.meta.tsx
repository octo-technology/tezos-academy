import React from 'react'
import { Helmet } from 'react-helmet'

export const AppMeta = () => (
  <Helmet>
    <title>Lean to write Tezos Smart Contracts the fun way | TezosAcademy</title>
    <meta
      name="description"
      content="TezosAcademy is a fun interactive tutorial about learning to writte Tezos smart contract in LIGO"
    />
    <meta property="og:title" content="Lean to write Tezos Smart Contracts the fun way | TezosAcademy" />
    <meta property="og:url" content="https://tezosacademy.io" />
    <meta property="og:site_name" content="TezosAcademy" />
    <meta property="og:type" content="article" />
    <meta
      property="og:description"
      content="TezosAcademy is a fun interactive tutorial about learning to writte Tezos smart contract in LIGO"
    />
    <meta property="og:image" content="https://b2.tezosacademy.io/file/tezosacademy/ogimage.png" />
  </Helmet>
)
