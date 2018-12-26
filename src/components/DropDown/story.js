import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, select} from '@storybook/addon-knobs/react';

import {
  DropDown,
  DropDownSelector,
  DropDownItem,
  DropDownItems
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
        <br />
        <h2>Country Switcher</h2>
        <p>
          The dropdown itself does not have any background color so it is important to
          position it how you like on whichever background you prefer. That is why
          there are two shade props <code>light</code> and <code>dark</code>. The shade is only to do with the color of the text. So if you place the dropdown over a dark background choose the light shade for white text and vice versa.
        </p>
        <div style={{
          background: '#f7f7f7',
          display: 'inline-block',
          padding: '10px',
          width: '50%'
        }}>
          <span>Light shade on dark background</span>
          <div style={{
            background: 'black',
            margin: '100px 0 100px',
            paddingRight: '10px',
            textAlign: 'right'
          }}>
            <DropDown
              position={select('position', {
                bottom: 'bottom',
                top: 'top'
              }, 'bottom')}
              shade="light"
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
        <div style={{
          background: 'black',
          display: 'inline-block',
          padding: '10px',
          width: '50%'
        }}>
          <span style={{color: '#f7f7f7'}}>Dark shade on light background and top position</span>
          <div style={{
            background: '#f7f7f7',
            margin: '100px 0 100px',
            paddingRight: '10px',
            textAlign: 'right'
          }}>
            <DropDown
              position={select('position', {
                bottom: 'bottom',
                top: 'top'
              }, 'top')}
              shade="dark"
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
