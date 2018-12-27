import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, select} from '@storybook/addon-knobs/react';

import {
  DropDown,
  DropDownSelector,
  DropDownItems,
  DropDownItem
} from './index';

class DropDownExample extends Component {
  state = {
    activeValue: 'at'
  }

  updateActiveValue = (e, val) => {
    e.preventDefault();
    this.setState({activeValue: val});
  }

  selectedMenuItem = () => {
    const {activeValue: v} = this.state;

    const countries = {
      at: {
        code: 'at',
        icon: <span aria-label="at" role="img">🇦🇹</span>,
        link: <a onClick={e => this.updateActiveValue(e, '/')} href="/">Austria</a>,
        path: '/',
        value: 'Austria'
      },

      ch: {
        code: 'ch',
        icon: <span aria-label="ch" role="img">🇨🇭</span>,
        link: <a onClick={e => this.updateActiveValue(e, '/ch')} href="/ch">Switzerland</a>,
        path: '/ch',
        value: 'Switzerland'
      },
      de: {
        code: 'de',
        icon: <span aria-label="de" role="img">🇩🇪</span>,
        link: <a onClick={e => this.updateActiveValue(e, '/de')} href="/de">German</a>,
        path: '/de',
        value: 'German'
      },
      us: {
        code: 'us',
        icon: <span aria-label="us" role="img">🇺🇸</span>,
        link: <a onClick={e => this.updateActiveValue(e, '/us')} href="/us">United States</a>,
        path: '/us',
        value: 'United States'
      }
    };

    return (
      <DropDownItem
        isActive={v === countries[v].path}
        icon={countries[v].icon}>
        <a onClick={e => this.updateActiveValue(e, countries[v].code)} href={countries[v].code}>{countries[v].value}</a>
      </DropDownItem>
    );
  }

  render () {
    const {
      activeValue
    } = this.state;

    return (
      <div>
        <h3>
          Dropdown
        </h3>
        <p>
          DropDown component can behave differently depending on purpose it will be used. With <code>showOnHover</code> prop enabled,
          it will show and hide menu when your mouse pass by.
          <br />
          <code>align</code> and <code>direction</code> can also be used to control alignment and direction in which dropdown will open.
        </p>
        <div style={{
          background: '#d1d3d5',
          display: 'inline-block',
          padding: '10px',
          width: '50%'
        }}>
          <span>Navigation menu with dropdown</span>
          <div style={{
            background: '#ffffff',
            margin: '100px 0 100px',
            paddingRight: '10px',
            textAlign: 'right'
          }}>
            <ul>
              <li>
                <DropDown>
                  <DropDownSelector>
                    <DropDownItem isActive>
                      <a href="/" onClick={e => e.preventDefault()}>Products&nbsp;&nbsp;<span aria-label="Arrow down" role="img">🔽</span></a>
                    </DropDownItem>
                  </DropDownSelector>
                  <DropDownItems>
                    <DropDownItem>
                      <a href="/" onClick={e => e.preventDefault()}>Bathroom</a>
                    </DropDownItem>
                    <DropDownItem>
                      <a href="/" onClick={e => e.preventDefault()}>Bedroom</a>
                    </DropDownItem>
                    <DropDownItem>
                      <a href="/" onClick={e => e.preventDefault()}>Cooking</a>
                    </DropDownItem>
                    <DropDownItem>
                      <a href="/" onClick={e => e.preventDefault()}>Decoration</a>
                    </DropDownItem>
                    <DropDownItem>
                      <a href="/" onClick={e => e.preventDefault()}>Home Electronics</a>
                    </DropDownItem>
                  </DropDownItems>
                </DropDown>
              </li>
              <li>
                <a href="/" onClick={e => e.preventDefault()}>Offers</a>
              </li>
              <li>
                <a href="/" onClick={e => e.preventDefault()}>Services</a>
              </li>
            </ul>
          </div>
        </div>
        <div style={{
          background: '#5d656a',
          display: 'inline-block',
          padding: '10px',
          width: '50%'
        }}>
          <span style={{color: '#ffffff'}}>Dropdown with <code>icon</code>, <code>align="right"</code> and <code>showOnHover=&#123;false&#125;</code> props</span>
          <div style={{
            background: '#ffffff',
            margin: '100px 0 100px',
            textAlign: 'right'
          }}>
            <DropDown
              align="right"
              showOnHover={false}>
              <DropDownSelector>
                {this.selectedMenuItem()}
              </DropDownSelector>
              <DropDownItems>
                <DropDownItem
                  isActive={activeValue === 'at'}
                  icon={<span aria-label="at" role="img">🇦🇹</span>}>
                  <a onClick={e => this.updateActiveValue(e, 'at')} href="/">Austria</a>
                </DropDownItem>
                <DropDownItem
                  isActive={activeValue === 'de'}
                  icon={<span aria-label="de" role="img">🇩🇪</span>}>
                  <a onClick={e => this.updateActiveValue(e, 'de')} href="/de">German</a>
                </DropDownItem>
                <DropDownItem
                  isActive={activeValue === 'ch'}
                  icon={<span aria-label="ch" role="img">🇨🇭</span>}>
                  <a onClick={e => this.updateActiveValue(e, 'ch')} href="/ch">Switzerland</a>
                </DropDownItem>
                <DropDownItem
                  isActive={activeValue === 'us'}
                  icon={<span aria-label="us" role="img">🇺🇸</span>}>
                  <a onClick={e => this.updateActiveValue(e, 'us')} href="/us">United States</a>
                </DropDownItem>
              </DropDownItems>
            </DropDown>
          </div>
        </div>
        <br />
        <div style={{
          background: '#5d656a',
          display: 'inline-block',
          padding: '10px',
          width: '50%'
        }}>
          <span style={{color: '#ffffff'}}>Dropdown with <code>align="right"</code> and <code>direction="up"</code> props</span>
          <div style={{
            background: '#ffffff',
            margin: '100px 0 100px',
            textAlign: 'right'
          }}>
            <DropDown
              align="right"
              direction="up"
              showOnHover={false}>
              <DropDownSelector>
                {this.selectedMenuItem()}
              </DropDownSelector>
              <DropDownItems>
                <DropDownItem
                  isActive={activeValue === 'at'}
                  icon={<span aria-label="at" role="img">🇦🇹</span>}>
                  <a onClick={e => this.updateActiveValue(e, 'at')} href="/">Austria</a>
                </DropDownItem>
                <DropDownItem
                  isActive={activeValue === 'de'}
                  icon={<span aria-label="de" role="img">🇩🇪</span>}>
                  <a onClick={e => this.updateActiveValue(e, 'de')} href="/de">German</a>
                </DropDownItem>
                <DropDownItem
                  isActive={activeValue === 'ch'}
                  icon={<span aria-label="ch" role="img">🇨🇭</span>}>
                  <a onClick={e => this.updateActiveValue(e, 'ch')} href="/ch">Switzerland</a>
                </DropDownItem>
                <DropDownItem
                  isActive={activeValue === 'us'}
                  icon={<span aria-label="us" role="img">🇺🇸</span>}>
                  <a onClick={e => this.updateActiveValue(e, 'us')} href="/us">United States</a>
                </DropDownItem>
              </DropDownItems>
            </DropDown>
          </div>
        </div>
      </div>
    );
  }
}

storiesOf('DropDown', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator((story, context) => withInfo('The DropDown component!')(story)(context))
  .addDecorator(withKnobs)
  .add('basics', () => <DropDownExample />);
