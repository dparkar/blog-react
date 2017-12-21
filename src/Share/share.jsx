import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import { ShareButtons, ShareCounts } from 'react-share';
import FontAwesome from 'react-fontawesome';
import './share.css';

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
                    <FontAwesome name="facebook" className="navlinkfont" />
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
                    <FontAwesome name="linkedin" className="navlinkfont" />
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
                    <FontAwesome name="twitter" className="navlinkfont" />
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
                    <FontAwesome name="google-plus" className="navlinkfont" />
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
                    <FontAwesome name="whatsapp" className="navlinkfont" />
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
                    <FontAwesome name="pinterest-p" className="navlinkfont" />
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
                    <FontAwesome name="reddit-alien" className="navlinkfont" />
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
                    <FontAwesome name="tumblr" className="navlinkfont" />
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
                    <FontAwesome name="email" className="navlinkfont" />
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
