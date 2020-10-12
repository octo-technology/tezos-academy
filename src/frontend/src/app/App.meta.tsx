import React from 'react'
import { Helmet } from 'react-helmet'

export const AppMeta = () => (
  <Helmet>
    <title>Learn to write Tezos Smart Contracts the fun way | TezosAcademy</title>
    <meta name="title" content="Learn to write Tezos Smart Contracts the fun way | TezosAcademy" />
    <meta
      name="description"
      content="TezosAcademy is a fun interactive tutorial about learning to writte Tezos smart contract in LIGO"
    />

    <meta property="og:title" content="Learn to write Tezos Smart Contracts the fun way | TezosAcademy" />
    <meta
      property="og:description"
      content="TezosAcademy is a fun interactive tutorial about learning to writte Tezos smart contract in LIGO"
    />
    <meta property="og:url" content="//tezosacademy.io" />
    <meta property="og:site_name" content="TezosAcademy" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="//tezosacademy.io/ogimage.png" />
  </Helmet>
)
