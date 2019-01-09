/* eslint-disable react/jsx-curly-brace-presence */
import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {withKnobs} from '@storybook/addon-knobs/react';

import {
  DropDown,
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
        icon: <span aria-label="at" role="img">🇦🇹</span>,
        value: 'Österreich'
      },

      ch: {
        icon: <span aria-label="ch" role="img">🇨🇭</span>,
        value: 'Schweiz'
      },
      de: {
        icon: <span aria-label="de" role="img">🇩🇪</span>,
        value: 'Deutschland'
      },
      us: {
        icon: <span aria-label="us" role="img">🇺🇸</span>,
        value: 'United States'
      }
    };

    return (
      <>{countries[v].value} {countries[v].icon}</>
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
          The DropDown component behaves differently depending on the <code>showOnHover</code> property.
          If true the menu will be shown on mouse hover. Otherwise, the menu will only open with a user click.
          <br />
          The props <code>pullRight</code> and <code>direction</code> may be used to control alignment and direction in which dropdown will open.
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
                <DropDown title="Products">
                  <DropDownItem isActive>
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
          <span style={{color: '#ffffff'}}>Dropdown with <code>icon</code>, <code>{'pullRight'}</code> and <code>{'showOnHover={false}'}</code> props</span>
          <div style={{
            background: '#ffffff',
            margin: '100px 0 100px',
            textAlign: 'right'
          }}>
            <DropDown
              pullRight
              showOnHover={false}
              title={this.selectedMenuItem()}>
              <DropDownItem
                isActive={activeValue === 'at'}
                icon={<span aria-label="at" role="img">🇦🇹</span>}>
                <a onClick={e => this.updateActiveValue(e, 'at')} href="/">Österreich</a>
              </DropDownItem>
              <DropDownItem
                isActive={activeValue === 'de'}
                icon={<span aria-label="de" role="img">🇩🇪</span>}>
                <a onClick={e => this.updateActiveValue(e, 'de')} href="/de">Deutschland</a>
              </DropDownItem>
              <DropDownItem
                isActive={activeValue === 'ch'}
                icon={<span aria-label="ch" role="img">🇨🇭</span>}>
                <a onClick={e => this.updateActiveValue(e, 'ch')} href="/ch">Schweiz</a>
              </DropDownItem>
              <DropDownItem
                isActive={activeValue === 'us'}
                icon={<span aria-label="us" role="img">🇺🇸</span>}>
                <a onClick={e => this.updateActiveValue(e, 'us')} href="/us">United States</a>
              </DropDownItem>
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
          <span style={{color: '#ffffff'}}>Dropdown with <code>{'pullRight'}</code> and <code>{'direction="up"'}</code> props</span>
          <div style={{
            background: '#ffffff',
            margin: '100px 0 100px',
            textAlign: 'right'
          }}>
            <DropDown
              direction="up"
              pullRight
              title={this.selectedMenuItem()}>
              <DropDownItem
                isActive={activeValue === 'at'}
                icon={<span aria-label="at" role="img">🇦🇹</span>}>
                <a onClick={e => this.updateActiveValue(e, 'at')} href="/">Österreich</a>
              </DropDownItem>
              <DropDownItem
                isActive={activeValue === 'de'}
                icon={<span aria-label="de" role="img">🇩🇪</span>}>
                <a onClick={e => this.updateActiveValue(e, 'de')} href="/de">Deutschland</a>
              </DropDownItem>
              <DropDownItem
                isActive={activeValue === 'ch'}
                icon={<span aria-label="ch" role="img">🇨🇭</span>}>
                <a onClick={e => this.updateActiveValue(e, 'ch')} href="/ch">Schweiz</a>
              </DropDownItem>
              <DropDownItem
                isActive={activeValue === 'us'}
                icon={<span aria-label="us" role="img">🇺🇸</span>}>
                <a onClick={e => this.updateActiveValue(e, 'us')} href="/us">United States</a>
              </DropDownItem>
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
/* eslint-enable react/jsx-curly-brace-presence */
