import { JSDOM } from 'jsdom';
import { DataFetcher } from '../../types/DataFetcher';
import { googleClient } from '../clients/googleClient';
import { wikipediaClient } from '../clients/wikipediaClient';

export const wikipediaBandInfo: DataFetcher<string> = async (songInfo) => {
  if (!songInfo || !songInfo.artist) {
    return;
  }
  const googleBody = await googleClient.searchBandWikipediaHtml(songInfo.artist);
  const googleDom = new JSDOM(googleBody).window.document;
  const googleLink = (googleDom.querySelector('body h3') as HTMLHeadingElement)
    .parentNode as HTMLAnchorElement;

  if (!googleLink?.href) {
    return;
  }
  const wikipediaBody = await wikipediaClient.getBandInfoPageHtml(googleLink.href);
  const wikipediaDom = new JSDOM(wikipediaBody).window.document;

  if (
    !wikipediaDom
      .querySelector('h1')
      ?.textContent?.toLocaleLowerCase()
      .includes(songInfo.artist.toLocaleLowerCase())
  ) {
    return;
  }
  (wikipediaDom.querySelectorAll('.section') as NodeListOf<HTMLDivElement>).forEach((section) => {
    if (
      section.textContent &&
      section.textContent.match(
        /^[References|Read in another language|External links|Bibliography]/i
      )
    ) {
      section.parentNode?.removeChild(section);
    }
  });
  wikipediaDom
    .querySelectorAll('.metadata')
    .forEach((metadata) => metadata.parentNode?.removeChild(metadata));
  wikipediaDom
    .querySelectorAll('script')
    .forEach((script) => script.parentNode?.removeChild(script));
  return wikipediaDom
    .querySelector('#content')
    ?.innerHTML.replace(/Jump back a section/g, '')
    .replace(/Edit/g, '')
    .trim();
};
