import React from 'react';
import 'tachyons';
import './App.css';
import './config/theme/dark_simplified.css';
import LogoIntro from './components/LogoIntro/LogoIntro';
import Navigation from './components/Navigation/Navigation';
import Intro from './components/Intro';
import About from './components/About';
import Projects from './components/Projects/Projects';
import Works from './components/Works';
import Contact from './components/Contact';
import Footer from './components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogoAnimationOver: false
    };
  }

  showContent = () => {
    this.setState({ isLogoAnimationOver: true });
  }

  render() {
    let finalizedComponents = [];
    const orders = {
      "intro": 0,
      "about": 1,
      "projects": 2,
      "works": 3,
      "contact": 4
    };
    const components = {
      "intro": <Intro />,
      "about": <About />,
      "projects": <Projects />,
      "works": <Works />,
      "contact": <Contact />
    };

    for (let name in components) {
      finalizedComponents.push(
        <div key={name} className={`order-${orders[name]}`}>
          {
            // Pass component's order to the component.
            // We clone it first then pass the prop.
            // https://stackoverflow.com/questions/32370994/how-to-pass-props-to-this-props-children
            React.cloneElement(components[name], { componentOrder: orders[name] })
          }
        </div>
      )
    }

    const { isLogoAnimationOver } = this.state;
    isLogoAnimationOver ?
    document.body.classList.remove("overflow-hidden") :
    document.body.classList.add("overflow-hidden")
    return (
      isLogoAnimationOver
      ?
      <div className="overflow-x-hidden">
        <Navigation />
        <div className="entire-page-bg font-opensans page-root transition-ease-in">
          <div className="flex flex-column">
            {finalizedComponents}
          </div>
          <Footer />
        </div>
      </div>
      :
      <LogoIntro showContent={this.showContent} />
    );
  }
}

export default App;
