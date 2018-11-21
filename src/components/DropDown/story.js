import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {withKnobs, select, boolean} from '@storybook/addon-knobs/react';

import DropDown from './index';

class DropDownExample extends Component {
  state = {
    activeValue: '/'
  }

  updateActiveValue = (e, val) => {
    e.preventDefault();
    this.setState({activeValue: val});
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
          The dropdown itself does not have any background color so it's important to
          position it how you like on whichever background you prefer. That is why
          there are two shade props <code>light</code> and <code>dark</code>. The shade is only to do with the color of the text. So if you place the dropdown over a dark background choose the light shade for white text and vice versa.
        </p>
        <br />
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
              visibleOnHover={boolean('visibleOnHover', false)}
              items={[
               {
                 active: activeValue === '/',
                 icon: <span aria-label="at" role="img">🇦🇹</span>,
                 link: <a onClick={e => this.updateActiveValue(e, '/')} href="/">Austria</a>,
                 value: 'Austria'
               },
               {
                 active: activeValue === '/de',
                 icon: <span aria-label="de" role="img">🇩🇪</span>,
                 link: <a onClick={e => this.updateActiveValue(e, '/de')} href="/de">German</a>,
                 value: 'German'
               },
               {
                 active: activeValue === '/ch',
                 icon: <span aria-label="ch" role="img">🇨🇭</span>,
                 link: <a onClick={e => this.updateActiveValue(e, '/ch')} href="/ch">Switzerland</a>,
                 value: 'Switzerland'
               },
               {
                 active: activeValue === '/us',
                 icon: <span aria-label="us" role="img">🇺🇸</span>,
                 link: <a onClick={e => this.updateActiveValue(e, '/us')} href="/us">United States</a>,
                 value: 'United States'
               }
             ]} />
          </div>
        </div>
        <div style={{
          background: 'black',
          display: 'inline-block',
          padding: '10px',
          width: '50%'
        }}>
          <span style={{color: '#f7f7f7'}}>Dark shade on light background</span>
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
              }, 'bottom')}
              shade="dark"
              visibleOnHover={boolean('visibleOnHover', false)}
              items={[
               {
                 active: activeValue === '/',
                 icon: <span aria-label="at" role="img">🇦🇹</span>,
                 link: <a onClick={e => this.updateActiveValue(e, '/')} href="/">Austria</a>,
                 value: 'Austria'
               },
               {
                 active: activeValue === '/de',
                 icon: <span aria-label="de" role="img">🇩🇪</span>,
                 link: <a onClick={e => this.updateActiveValue(e, '/de')} href="/de">German</a>,
                 value: 'German'
               },
               {
                 active: activeValue === '/ch',
                 icon: <span aria-label="ch" role="img">🇨🇭</span>,
                 link: <a onClick={e => this.updateActiveValue(e, '/ch')} href="/ch">Switzerland</a>,
                 value: 'Switzerland'
               },
               {
                 active: activeValue === '/us',
                 icon: <span aria-label="us" role="img">🇺🇸</span>,
                 link: <a onClick={e => this.updateActiveValue(e, '/us')} href="/us">United States</a>,
                 value: 'United States'
               }
             ]} />
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
