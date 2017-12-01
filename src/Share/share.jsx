import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import { ShareButtons, generateShareIcon } from 'react-share';
import './share.css';

let shareIconSize = 30;

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton
} = ShareButtons;

const LinkedinIcon = generateShareIcon('linkedin');
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const WhatsappIcon = generateShareIcon('whatsapp');
const RedditIcon = generateShareIcon('reddit');
const EmailIcon = generateShareIcon('email');

export default class Share extends TrackedComponent {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="shareButton">
                  <FacebookShareButton url={this.props.shareURL}>
                    <FacebookIcon size={shareIconSize} round />
                  </FacebookShareButton>
                </div>
              </td>
              <td>
                <div className="shareButton">
                  <LinkedinShareButton url={this.props.shareURL}>
                    <LinkedinIcon size={shareIconSize} round />
                  </LinkedinShareButton>
                </div>
              </td>
              <td>
                <div className="shareButton">
                  <TwitterShareButton url={this.props.shareURL}>
                    <TwitterIcon size={shareIconSize} round />
                  </TwitterShareButton>
                </div>
              </td>
              <td>
                <div className="shareButton">
                  <GooglePlusShareButton url={this.props.shareURL}>
                    <GooglePlusIcon size={shareIconSize} round />
                  </GooglePlusShareButton>
                </div>
              </td>
              <td>
                <div className="shareButton">
                  <WhatsappShareButton url={this.props.shareURL}>
                    <WhatsappIcon size={shareIconSize} round />
                  </WhatsappShareButton>
                </div>
              </td>
              <td>
                <div className="shareButton">
                  <RedditShareButton url={this.props.shareURL}>
                    <RedditIcon size={shareIconSize} round />
                  </RedditShareButton>
                </div>
              </td>
              <td>
                <div className="shareButton">
                  <EmailShareButton url={this.props.shareURL}>
                    <EmailIcon size={shareIconSize} round />
                  </EmailShareButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
