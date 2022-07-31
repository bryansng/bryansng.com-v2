import React from 'react';

import content from '../config/content.json';
import MailTo from './MailTo';
import { TabContent } from './Navigation/Navigation';
import PaddingResizer from './universal/PaddingResizer';
import SlideIn from './universal/SlideIn';

class Contact extends React.Component {
  render() {
    const { componentOrder } = this.props;

    const contact = content.contact;
    const { title, desc, button_msg } = contact;
    return (
      <section id="contact">
        <SlideIn>
          <PaddingResizer>
            <article className="w-40-l w-90 center tc slide-in-bottom">
              <TabContent
                index={componentOrder}
                content="Contact"
                isLink={false}
              />
              <h2 className="f2 title">{title}</h2>
              <p className="pb4 paragraph lh-copy">{desc}</p>
              <MailTo isCenter={true} text={button_msg} />
            </article>
          </PaddingResizer>
        </SlideIn>
      </section>
    );
  }
}

export default Contact;
