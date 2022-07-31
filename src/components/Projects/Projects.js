import React from 'react';
import styled from 'styled-components';

import content from '../../config/content';
import { TabContent } from '../Navigation/Navigation';
import PaddingResizer from '../universal/PaddingResizer';
import SlideIn from '../universal/SlideIn';
import Repos from './Repos/Repos';

const Container = styled.div.attrs({
  className: `w-40-xxxl w-50-xxl w-60-xl w-70-l-mine w-90-m w-90-ns center tc`
})`
  max-width: 60em;
  min-height: 50vh;
`;

export default class Projects extends React.Component {
  render() {
    const { componentOrder } = this.props;
    const { section_name } = content.projects;
    return (
      <section id="projects">
        <SlideIn>
          <PaddingResizer>
            <Container>
              <header className="pv3">
                <TabContent
                  index={componentOrder}
                  content={section_name}
                  isLink={false}
                />
              </header>
              <Repos />
            </Container>
          </PaddingResizer>
        </SlideIn>
      </section>
    );
  }
}
