import { Metadata } from 'next';
import logoImg from '@public/static/images/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Eva Events',
  description: '',
  logo: logoImg,
  icon: logoImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: 'Eva Events',
    description,
    openGraph: {},
  };
  // return {
  //   title: title ? `${title} - Isomorphic Furyroad` : siteConfig.title,
  //   description,
  //   openGraph: openGraph ?? {
  //     title: title ? `${title} - Isomorphic Furyroad` : title,
  //     description,
  //     url: 'https://isomorphic-furyroad.vercel.app',
  //     siteName: 'Isomorphic Furyroad', // https://developers.google.com/search/docs/appearance/site-names
  //     images: {
  //       url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
  //       width: 1200,
  //       height: 630,
  //     },
  //     locale: 'en_US',
  //     type: 'website',
  //   },
  // };
};
