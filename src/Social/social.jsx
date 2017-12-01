import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import { ShareButtons, generateShareIcon } from 'react-share';
import ReactDisqusThread from 'react-disqus-thread';

let shareIconSize;
let shareURL;
let disqusShortName;
let disqusIdentifier;
let disqusTitle;

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

export default class Social extends TrackedComponent {
  constructor(props) {
    super(props);

    var title = this.props.log.title;
    var dateTime = this.props.log.datetime;

    shareURL = 'http://dplogs.com/log/' + title;
    shareIconSize = 26;
    disqusShortName = title;
    disqusIdentifier = dateTime;
    disqusTitle = title;
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                <FacebookShareButton url={shareURL}>
                  <FacebookIcon size={shareIconSize} round />
                </FacebookShareButton>
              </td>
              <td>
                <LinkedinShareButton url={shareURL}>
                  <LinkedinIcon size={shareIconSize} round />
                </LinkedinShareButton>
              </td>
              <td>
                <TwitterShareButton url={shareURL}>
                  <TwitterIcon size={shareIconSize} round />
                </TwitterShareButton>
              </td>
              <td>
                <GooglePlusShareButton url={shareURL}>
                  <GooglePlusIcon size={shareIconSize} round />
                </GooglePlusShareButton>
              </td>
              <td>
                <WhatsappShareButton url={shareURL}>
                  <WhatsappIcon size={shareIconSize} round />
                </WhatsappShareButton>
              </td>
              <td>
                <RedditShareButton url={shareURL}>
                  <RedditIcon size={shareIconSize} round />
                </RedditShareButton>
              </td>
              <td>
                <EmailShareButton url={shareURL}>
                  <EmailIcon size={shareIconSize} round />
                </EmailShareButton>
              </td>
            </tr>
          </tbody>
        </table>
        <ReactDisqusThread
          shortname={disqusShortName}
          identifier={disqusIdentifier}
          title={disqusTitle}
          url={shareURL}
        />
      </div>
    );
  }
}
