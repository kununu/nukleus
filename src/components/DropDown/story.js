import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {withInfo} from '@storybook/addon-info';
import {withKnobs} from '@storybook/addon-knobs/react';

import ThemeProvider from '../ThemeProvider';

import styles from './storyStyles.scss';

import {
  DropDown,
  DropDownItem,
} from './index';

const DropDownInfo = () => (
  <div>
    <h3>
      Dropdown
    </h3>
    <p>
      The DropDown component behaves differently depending on the
      {' '}
      <code>showOnHover</code>
      property. If true the menu will be shown on mouse hover. Otherwise, the menu will only open with a user click.
      <br />
      The props
      {' '}
      <code>pullRight</code>
      {' '}
      and
      {' '}
      <code>direction</code>
      {' '}
      may be used to control alignment and direction in which dropdown will open.
    </p>
  </div>
);

const countries = [
  {
    active: false,
    icon: <img
      title="Austrian Flag"
      alt="Austrian Flag"
      src="https://assets.kununu.com/images/footer/at.png"
    />,
    link: (
      <a
        href="/"
        onClick={e => e.preventDefault()}
      >
        Austria
      </a>),
    value: 'Austria',
  },
  {
    active: false,
    icon: <img
      title="German Flag"
      alt="German Flag"
      src="https://assets.kununu.com/images/footer/de.png"
    />,
    link: (
      <a
        href="/"
        onClick={e => e.preventDefault()}
      >
        Germany
      </a>),
    value: 'Germany',
  },
  {
    active: false,
    icon: <img
      title="Swiss Flag"
      alt="Swiss Flag"
      src="https://assets.kununu.com/images/footer/ch.png"
    />,
    link: (
      <a
        href="/"
        onClick={e => e.preventDefault()}
      >
        Switzerland
      </a>),
    value: 'Switzerland',
  },
  {
    active: true,
    icon: <img
      title="American Flag"
      alt="American Flag"
      src="https://assets.kununu.com/images/footer/us.png"
    />,
    link: (
      <a
        href="/"
        onClick={e => e.preventDefault()}
      >
        United States
      </a>),
    value: 'United States',
  },
];

const activeCountry = () => {
  const active = countries.filter(item => item.active);

  return (
    <span>
      {active[0].value}
      {' '}
      {active[0].icon}
    </span>
  );
};

storiesOf('DropDown', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator((story, context) => withInfo('The DropDown component!')(story)(context))
  .addDecorator(withKnobs)
  .add('basics', () => (
    <div className={styles.dropDownStory}>
      <DropDownInfo />
      <div style={{
        display: 'block',
        margin: '70px auto 0',
        width: '75%',
      }}
      >
        <div style={{
          background: '#f1f1f1',
          padding: '20px',
        }}
        >
          <p style={{marginTop: '0'}}>
            DropDown opens on hover with
            <code>{'showOnHover={true}'}</code>
            {' '}
            prop by default
          </p>
          <ul style={{
            background: '#ffffff',
            margin: '0',
            padding: '0',
          }}
          >
            <li className={styles.menuItem}>
              <DropDown title="Products">
                <DropDownItem isActive>
                  <a
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                    Bathroom
                  </a>
                </DropDownItem>
                <DropDownItem>
                  <a
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                    Bedroom
                  </a>
                </DropDownItem>
                <DropDownItem>
                  <a
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                    Cooking
                  </a>
                </DropDownItem>
              </DropDown>
            </li>
            <li className={styles.menuItem}>
              <a
                href="/"
                onClick={e => e.preventDefault()}
              >
                Offers
              </a>
            </li>
            <li className={styles.menuItem}>
              <a
                href="/"
                onClick={e => e.preventDefault()}
              >
              Services
              </a>
            </li>
          </ul>
        </div>
        <div style={{
          background: '#f1f1f1',
          margin: '50px 0 0',
          padding: '20px',
        }}
        >
          <p style={{marginTop: '0'}}>
            DropDown opens only when clicked with
            <code>{'showOnHover={false}'}</code>
            {' '}
            prop by default
          </p>
          <ul style={{
            background: '#ffffff',
            margin: '0',
            padding: '0',
          }}
          >
            <li className={styles.menuItem}>
              <DropDown
                showOnHover={false}
                title="Products"
              >
                <DropDownItem isActive>
                  <a
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                      Bathroom
                  </a>
                </DropDownItem>
                <DropDownItem>
                  <a
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                    Bedroom
                  </a>
                </DropDownItem>
                <DropDownItem>
                  <a
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                  Cooking
                  </a>
                </DropDownItem>
              </DropDown>
            </li>
            <li className={styles.menuItem}>
              <a
                href="/"
                onClick={e => e.preventDefault()}
              >
                Offers
              </a>
            </li>
            <li className={styles.menuItem}>
              <a
                href="/"
                onClick={e => e.preventDefault()}
              >
                Services
              </a>
            </li>
          </ul>
        </div>
        <div style={{
          background: '#f1f1f1',
          margin: '50px 0 0',
          padding: '20px',
        }}
        >
          <p style={{marginTop: '0'}}>
            A
            <code>title</code>
            {' '}
            prop value is required. It can be either a
            <code>string</code>
            {' '}
            or
            <code>element</code>
            .
          </p>
          <ul style={{
            background: '#ffffff',
            margin: '0',
            padding: '0',
          }}
          >
            <li className={styles.menuItem}>
              <DropDown
                showOnHover={false}
                title="Products"
              >
                <DropDownItem isActive>
                  <a
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                    Bathroom
                  </a>
                </DropDownItem>
                <DropDownItem>
                  <a
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                    Bedroom
                  </a>
                </DropDownItem>
                <DropDownItem>
                  <a
                    href="/"
                    onClick={e => e.preventDefault()}
                  >
                    Cooking
                  </a>
                </DropDownItem>
              </DropDown>
            </li>
            <li className={styles.menuItem}>
              <a
                href="/"
                onClick={e => e.preventDefault()}
              >
                Offers
              </a>
            </li>
            <li className={styles.menuItem}>
              <a
                href="/"
                onClick={e => e.preventDefault()}
              >
                Services
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ))
  .add('alignment control', () => (
    <div>
      <DropDownInfo />
      <div style={{
        display: 'block',
        margin: '70px auto 0',
        width: '75%',
      }}
      >
        <div style={{
          background: '#f1f1f1',
          padding: '20px',
        }}
        >
          <p style={{marginTop: '0'}}>
            Add
            {' '}
            <code>pullRight</code>
            {' '}
prop to open dropdown aligned to right side
          </p>
          <div style={{
            background: '#ffffff',
            textAlign: 'right',
          }}
          >
            <DropDown
              pullRight
              title={(
                <span>
                  Austria
                  <span
                    aria-label="at"
                    role="img"
                  >
                    🇦🇹
                  </span>
                </span>
              )}
            >
              <DropDownItem
                isActive
                icon={(
                  <span
                    aria-label="at"
                    role="img"
                  >
                    🇦🇹
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Austria
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="de"
                    role="img"
                  >
                    🇩🇪
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Germany
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="ch"
                    role="img"
                  >
                    🇨🇭
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Switzerland
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="us"
                    role="img"
                  >
                    🇺🇸
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  United States
                </a>
              </DropDownItem>
            </DropDown>
          </div>
        </div>
        <div style={{
          background: '#f1f1f1',
          margin: '50px 0 0',
          padding: '20px',
        }}
        >
          <p style={{marginTop: '0'}}>DropDown opens aligned to left side by default</p>
          <div style={{background: '#ffffff'}}>
            <DropDown
              title={(
                <span>
                  United States
                  <span
                    aria-label="us"
                    role="img"
                  >
                    🇺🇸
                  </span>
                </span>
              )}
            >
              <DropDownItem
                icon={(
                  <span
                    aria-label="at"
                    role="img"
                  >
                    🇦🇹
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Austria
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="de"
                    role="img"
                  >
                    🇩🇪
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Germany
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="ch"
                    role="img"
                  >
                    🇨🇭
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Switzerland
                </a>
              </DropDownItem>
              <DropDownItem
                isActive
                icon={(
                  <span
                    aria-label="us"
                    role="img"
                  >
                    🇺🇸
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  United States
                </a>
              </DropDownItem>
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  ))
  .add('direction control', () => (
    <div>
      <DropDownInfo />
      <div style={{
        display: 'block',
        margin: '70px auto 0',
        width: '75%',
      }}
      >
        <div style={{
          background: '#f1f1f1',
          padding: '20px',
        }}
        >
          <p style={{marginTop: '0'}}>
            Add
            <code>direction=&quot;up&quot;</code>
            {' '}
            prop to open dropdown in up direction
          </p>
          <div style={{
            background: '#ffffff',
            textAlign: 'right',
          }}
          >
            <DropDown
              direction="up"
              pullRight
              title={(
                <span>
                  Austria
                  <span
                    aria-label="at"
                    role="img"
                  >
                    🇦🇹
                  </span>
                </span>
              )}
            >
              <DropDownItem
                isActive
                icon={(
                  <span
                    aria-label="at"
                    role="img"
                  >
                    🇦🇹
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Austria
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="de"
                    role="img"
                  >
                    🇩🇪
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Germany
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="ch"
                    role="img"
                  >
                    🇨🇭
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Switzerland
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="us"
                    role="img"
                  >
                    🇺🇸
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  United States
                </a>
              </DropDownItem>
            </DropDown>
          </div>
        </div>
        <div style={{
          background: '#f1f1f1',
          margin: '50px 0 0',
          padding: '20px',
        }}
        >
          <p style={{marginTop: '0'}}>
            DropDown opens with
            {' '}
            <code>direction=&quot;down&quot;</code>
            {' '}
prop by default
          </p>
          <div style={{
            background: '#ffffff',
            textAlign: 'right',
          }}
          >
            <DropDown
              direction="down"
              pullRight
              title={(
                <span>
                  United States
                  <span
                    aria-label="us"
                    role="img"
                  >
                    🇺🇸
                  </span>
                </span>
              )}
            >
              <DropDownItem
                icon={(
                  <span
                    aria-label="at"
                    role="img"
                  >
                    🇦🇹
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Austria
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="de"
                    role="img"
                  >
                    🇩🇪
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Germany
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="ch"
                    role="img"
                  >
                    🇨🇭
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Switzerland
                </a>
              </DropDownItem>
              <DropDownItem
                isActive
                icon={(
                  <span
                    aria-label="us"
                    role="img"
                  >
                    🇺🇸
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  United States
                </a>
              </DropDownItem>
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  ))
  .add('with icons', () => (
    <div>
      <DropDownInfo />
      <div style={{
        display: 'block',
        margin: '70px auto 0',
        width: '75%',
      }}
      >
        <div style={{
          background: '#f1f1f1',
          padding: '20px',
        }}
        >
          <p style={{marginTop: '0'}}>
            Add
            <code>icon</code>
            {' '}
            prop (e.g.
            <code>{'<DropDownItem icon={...} />'}</code>
            ) with an emoji or image tag
          </p>
          <div style={{background: '#ffffff'}}>
            <DropDown
              title={(
                <span>
                  Austria
                  <span
                    aria-label="at"
                    role="img"
                  >
                    🇦🇹
                  </span>
                </span>
              )}
            >
              <DropDownItem
                isActive
                icon={(
                  <span
                    aria-label="at"
                    role="img"
                  >
                    🇦🇹
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Austria
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="de"
                    role="img"
                  >
                    🇩🇪
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Germany
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="ch"
                    role="img"
                  >
                  🇨🇭
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Switzerland
                </a>
              </DropDownItem>
              <DropDownItem
                icon={(
                  <span
                    aria-label="us"
                    role="img"
                  >
                    🇺🇸
                  </span>
                )}
              >
                <a
                  href="/"
                  onClick={(e) => { e.preventDefault(); }}
                >
                  United States
                </a>
              </DropDownItem>
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  ))
  .add('shades', () => (
    <div>
      <DropDownInfo />
      <div style={{
        display: 'block',
        margin: '70px auto 0',
        width: '75%',
      }}
      >
        <div style={{
          background: '#f1f1f1',
          padding: '20px',
        }}
        >
          <p style={{marginTop: '0'}}>
            Add
            {' '}
            <code>shade=&quot;light&quot;</code>
            {' '}
            prop (e.g.
            {' '}
            <code>{'<DropDown shade="light" />'}</code>
            ) to enable light shade on dark backgrounds.
          </p>
          <div style={{background: '#18242b'}}>
            <DropDown
              direction="up"
              showOnHover={false}
              pullRight
              shade="light"
              title={activeCountry()}
            >
              {countries.map((item, index) => (
                <DropDownItem
                  key={index} // eslint-disable-line react/no-array-index-key
                  icon={item.icon}
                >
                  {item.link}
                </DropDownItem>
              ))}
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  ))
  .add('custom', () => (
    <ThemeProvider theme={styles}>
      <DropDownInfo />
      <div style={{
        display: 'block',
        margin: '70px auto 0',
        width: '75%',
      }}
      >
        <div style={{
          background: '#f1f1f1',
          padding: '20px',
        }}
        >
          <div style={{background: '#18242b'}}>
            <DropDown
              direction="down"
              showOnHover={false}
              pullRight
              shade="light"
              title={activeCountry()}
            >
              {countries.map((item, index) => (
                <DropDownItem
                  key={index} // eslint-disable-line react/no-array-index-key
                  icon={item.icon}
                >
                  {item.link}
                </DropDownItem>
              ))}
            </DropDown>
          </div>
        </div>
      </div>
    </ThemeProvider>
  ));
