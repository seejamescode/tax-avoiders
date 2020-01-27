import React from "react";
import {
  FacebookShareCount,
  PinterestShareCount,
  VKShareCount,
  OKShareCount,
  RedditShareCount,
  TumblrShareCount,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon
} from "react-share";
import styled from "styled-components";

const formatNumber = string =>
  parseFloat(string) === 0
    ? null
    : parseFloat(string) >= 1000000
    ? `${Math.round((string / 1000000) * 10) / 10}m`
    : parseFloat(string) >= 1000
    ? `${Math.round((string / 1000) * 10) / 10}k`
    : string;

const Ul = styled.ul`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(2rem, 1fr));
  list-style: none;
  margin-top: 0.5rem;
  padding: 0;
  width: 100%;

  button {
    display: flex;
    position: relative;

    :hover {
      :after {
        border: 4px solid ${({ theme }) => theme.colors.libertyGreen};
        border-radius: 50%;
        content: "";
        height: calc(100% - 4px);
        left: -2px;
        position: absolute;
        top: -2px;
        width: calc(100% - 4px);
      }
    }
  }
`;

const Share = ({ imageUrl, title, url }) => (
  <Ul>
    <li>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <div>
        <FacebookShareCount url={url}>
          {count => formatNumber(count)}
        </FacebookShareCount>
      </div>
    </li>
    <li>
      <FacebookMessengerShareButton url={url} appid="521270401588372">
        <FacebookMessengerIcon size={32} round />
      </FacebookMessengerShareButton>
    </li>
    <li>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </li>
    <li>
      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </li>
    <li>
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </li>
    <li>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </li>
    <li>
      <PinterestShareButton url={url} media={imageUrl}>
        <PinterestIcon size={32} round />
      </PinterestShareButton>
      <div>
        <PinterestShareCount url={url}>
          {count => formatNumber(count)}
        </PinterestShareCount>
      </div>
    </li>
    <li>
      <VKShareButton url={url} image={imageUrl}>
        <VKIcon size={32} round />
      </VKShareButton>

      <div>
        <VKShareCount url={url}>{count => formatNumber(count)}</VKShareCount>
      </div>
    </li>
    <li>
      <OKShareButton url={url} image={imageUrl}>
        <OKIcon size={32} round />
      </OKShareButton>
      <div>
        <OKShareCount url={url}>{count => formatNumber(count)}</OKShareCount>
      </div>
    </li>
    <li>
      <RedditShareButton
        url={url}
        title={title}
        windowWidth={660}
        windowHeight={460}
      >
        <RedditIcon size={32} round />
      </RedditShareButton>
      <div>
        <RedditShareCount url={url} />
      </div>
    </li>
    <li>
      <TumblrShareButton url={url} title={title}>
        <TumblrIcon size={32} round />
      </TumblrShareButton>
      <div>
        <TumblrShareCount url={url}>
          {count => formatNumber(count)}
        </TumblrShareCount>
      </div>
    </li>
    <li>
      <LivejournalShareButton url={url} title={title} description={url}>
        <LivejournalIcon size={32} round />
      </LivejournalShareButton>
    </li>
    <li>
      <MailruShareButton url={url} title={title}>
        <MailruIcon size={32} round />
      </MailruShareButton>
    </li>
    <li>
      <EmailShareButton url={url} subject={title} body="body">
        <EmailIcon size={32} round />
      </EmailShareButton>
    </li>
    <li>
      <ViberShareButton url={url} title={title}>
        <ViberIcon size={32} round />
      </ViberShareButton>
    </li>
    <li>
      <WorkplaceShareButton url={url} quote={title}>
        <WorkplaceIcon size={32} round />
      </WorkplaceShareButton>
    </li>
    <li>
      <LineShareButton url={url} title={title}>
        <LineIcon size={32} round />
      </LineShareButton>
    </li>
    <li>
      <WeiboShareButton url={url} title={title} image={imageUrl}>
        <WeiboIcon size={32} round />
      </WeiboShareButton>
    </li>
    <li>
      <PocketShareButton url={url} title={title}>
        <PocketIcon size={32} round />
      </PocketShareButton>
    </li>
    <li>
      <InstapaperShareButton url={url} title={title}>
        <InstapaperIcon size={32} round />
      </InstapaperShareButton>
    </li>
  </Ul>
);

export default Share;
