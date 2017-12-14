import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
import './share.css';

let shareIconSize = 30;

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  EmailShareButton
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount
} = ShareCounts;

const LinkedinIcon = generateShareIcon('linkedin');
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const WhatsappIcon = generateShareIcon('whatsapp');
const PinterestIcon = generateShareIcon('pinterest');
const RedditIcon = generateShareIcon('reddit');
const TumblrIcon = generateShareIcon('tumblr');
const EmailIcon = generateShareIcon('email');

export default class Share extends TrackedComponent {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="network">
                  <FacebookShareButton
                    url={this.props.shareURL}
                    className="network__share-button"
                  >
                    <FacebookIcon size={shareIconSize} round />
                  </FacebookShareButton>
                  <FacebookShareCount
                    url={this.props.shareURL}
                    className="network__share-count"
                  />
                </div>
              </td>
              <td>
                <div className="network">
                  <LinkedinShareButton
                    url={this.props.shareURL}
                    className="network__share-button"
                  >
                    <LinkedinIcon size={shareIconSize} round />
                  </LinkedinShareButton>
                  <LinkedinShareCount
                    url={this.props.shareURL}
                    className="network__share-count"
                  />
                </div>
              </td>
              <td>
                <div className="network">
                  <TwitterShareButton
                    url={this.props.shareURL}
                    className="network__share-button"
                  >
                    <TwitterIcon size={shareIconSize} round />
                  </TwitterShareButton>
                  <div className="network__share-count">&nbsp;</div>
                </div>
              </td>
              <td>
                <div className="network">
                  <GooglePlusShareButton
                    url={this.props.shareURL}
                    className="network__share-button"
                  >
                    <GooglePlusIcon size={shareIconSize} round />
                  </GooglePlusShareButton>
                  <GooglePlusShareCount
                    url={this.props.shareURL}
                    className="network__share-count"
                  />
                </div>
              </td>
              <td>
                <div className="network">
                  <WhatsappShareButton
                    url={this.props.shareURL}
                    className="network__share-button"
                  >
                    <WhatsappIcon size={shareIconSize} round />
                  </WhatsappShareButton>
                  <div className="network__share-count">&nbsp;</div>
                </div>
              </td>
              <td>
                <div className="network">
                  <PinterestShareButton
                    url={this.props.shareURL}
                    className="network__share-button"
                  >
                    <PinterestIcon size={shareIconSize} round />
                  </PinterestShareButton>
                  <PinterestShareCount
                    url={this.props.shareURL}
                    className="network__share-count"
                  />
                </div>
              </td>
              <td>
                <div className="network">
                  <RedditShareButton
                    url={this.props.shareURL}
                    className="network__share-button"
                  >
                    <RedditIcon size={shareIconSize} round />
                  </RedditShareButton>
                  <RedditShareCount
                    url={this.props.shareURL}
                    className="network__share-count"
                  />
                </div>
              </td>
              <td>
                <div className="network">
                  <TumblrShareButton
                    url={this.props.shareURL}
                    className="network__share-button"
                  >
                    <TumblrIcon size={shareIconSize} round />
                  </TumblrShareButton>
                  <TumblrShareCount
                    url={this.props.shareURL}
                    className="network__share-count"
                  />
                </div>
              </td>
              <td>
                <div className="network">
                  <EmailShareButton
                    url={this.props.shareURL}
                    className="network__share-button"
                  >
                    <EmailIcon size={shareIconSize} round />
                  </EmailShareButton>
                  <div className="network__share-count">&nbsp;</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
