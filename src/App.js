import './App.css';
import './config/theme/dark_simplified.css';
import 'tachyons';

import React from 'react';

import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Intro from './components/Intro';
import LogoIntro from './components/LogoIntro/LogoIntro';
import Navigation from './components/Navigation/Navigation';
import Projects from './components/Projects/Projects';
import SEO from './components/SEO/SEO';
import content from './config/content';

// import "normalize.css";
const { settings } = content;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogoAnimationOver: false,
    };
  }

  showContent = () => {
    this.setState({ isLogoAnimationOver: true });
  };

  render() {
    let finalizedComponents = [];
    const orders = {
      intro: 0,
      about: 1,
      projects: 2,
      // works: 3,
      contact: 3,
    };
    const components = {
      intro: <Intro />,
      about: <About />,
      projects: <Projects />,
      // works: <Works />,
      contact: <Contact />,
    };

    for (let name in components) {
      finalizedComponents.push(
        <div key={name} className={`order-${orders[name]}`}>
          {
            // Pass component's order to the component.
            // We clone it first then pass the prop.
            // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
            React.cloneElement(components[name], {
              componentOrder: orders[name],
            })
          }
        </div>
      );
    }

    const { isLogoAnimationOver } = this.state;
    const { enable_logo_animation } = settings;
    isLogoAnimationOver || !enable_logo_animation
      ? document.body.classList.remove("overflow-hidden")
      : document.body.classList.add("overflow-hidden");
    return isLogoAnimationOver || !enable_logo_animation ? (
      <div className="overflow-x-hidden">
        <SEO />
        <Navigation />
        <div className="entire-page-bg font-opensans page-root transition-ease-in">
          <main className="flex flex-column">{finalizedComponents}</main>
          <Footer />
        </div>
      </div>
    ) : (
      <LogoIntro showContent={this.showContent} />
    );
  }
}

export default App;
