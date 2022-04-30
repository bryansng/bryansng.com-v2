import React from "react";
import MailTo from "./MailTo";
import content from "../config/content";
import { TabContent } from "./Navigation/Navigation";
import SlideIn from "./universal/SlideIn";
import PaddingResizer from "./universal/PaddingResizer";

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
