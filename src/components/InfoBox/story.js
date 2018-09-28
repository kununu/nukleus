import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions';
import {withOptions} from '@storybook/addon-options';
// import {action} from '@storybook/addon-actions';
// import {withNotes} from '@storybook/addon-notes';
// import {withInfo} from '@storybook/addon-info';
// import {withKnobs, text, boolean} from '@storybook/addon-knobs/react';
// import backgrounds from '@storybook/addon-backgrounds';

// import InfoBox from './index';

storiesOf('InfoBox', module)
  .addDecorator(withOptions({...defaultOptions}))
  .add('basics', () => (
    <div>Coming soon</div>
  ));

//  <InfoBox
//      position="bottom"
//      items={[
//        {
//          active: true,
//          icon: <img
//            alt="Austrian flag"
//            src={at} />,
//          link: <Link to={{pathname: '/drop-down'}}>Austria</Link>,
//          value: 'Austria'
//        },
//        {
//          active: false,
//          icon: <img
//            alt="German flag"
//            src={de} />,
//          link: <Link to={{pathname: '/drop-down/de'}}>German</Link>,
//          value: 'German'
//        },
//        {
//          active: false,
//          icon: <img
//            alt="Swiss flag"
//            src={ch} />,
//          link: <Link to={{pathname: '/drop-down/ch'}}>Switzerland</Link>,
//          value: 'Switzerland'
//        },
//        {
//          active: false,
//          icon: <img
//            alt="American flag"
//            src={us} />,
//          link: <Link to={{pathname: '/drop-down/us'}}>United States</Link>,
//          value: 'United States'
//        }
//      ]} />
//
