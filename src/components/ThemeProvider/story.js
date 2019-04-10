import React from 'react';
import {storiesOf} from '@storybook/react';
import {defaultOptions} from 'defaultOptions'; // eslint-disable-line import/no-unresolved
import {withOptions} from '@storybook/addon-options';
import {action} from '@storybook/addon-actions';
import {withNotes} from '@storybook/addon-notes';
import {withInfo} from '@storybook/addon-info';
import {
  withKnobs, text, boolean, select, number,
} from '@storybook/addon-knobs/react';

import ThemeProvider from './index';

storiesOf('ThemeProvider', module)
  .addDecorator(withOptions({...defaultOptions}))
  .addDecorator(withKnobs)
  .addDecorator(withNotes(""))
  .addDecorator((story, context) => withInfo('Theme provider component')(story)(context))
  .add('basics', () => (
    <div>
      <h2>
        Theme Provider
      </h2>
      <h4>
        Customize nukleus with your own theme. Have complete control over all the component styling.
      </h4>
      <p>
        A theme lets you apply your own look and feel to your app and customize any design aspects to meet your needs.
      </p>
      <p>
        In order to theme nukleus you must use the <code>ThemeProvider</code> component. This is of course completely optional as nukleus comes with it's own default theme. The ThemeProvider uses React <code>context</code> to pass your theme to each component. This means you need to make sure that the ThemeProvider is wrapped around a parent of the component you are trying to customize. If you like you can even wrap it around the entire application or per page depending on your needs and how many components you want to theme.
      </p>
      <hr />
      <h3>How does it work?</h3>
      <h4>CSS Modules</h4>
      <p>
        As nukleus uses css modules you need to pass the them as an imported css module like so:

        <pre>
          .foo &#123;color: red;&#125;<br />
          .foo:hover &#123;color: green;&#125;<br />
          .bar &#123;color: blue;&#125;<br />
        </pre>
        <pre>
          import ThemeProvider from "nukleus/dist/components/ThemeProvider";<br/>
          import myTheme from './index.scss';<br />
          ...<br />
          &lt;ThemeProvider theme=&#123;myTheme&#125;&gt;&lt;App /&gt;&lt;/ThemeProvider&gt;
        </pre>
      </p>
      <hr />
      <h3>Customizing</h3>
      <p>
        Below you will find a list of all the possible css classes you can overwrite. You can update just one or all of them depending on how much customization your require.
      </p>

      <h4>Shared styles</h4>
      
      <p>
        <code>.hidden</code><br/>
        <code>.clearfix</code> - Only used in DropDown and Tabs currently<br/>
        <code>.formControl</code> - Used to change all form element basic styling such as box-shadows, padding, borders and focus behaviour<br/>
        <code>.formControlError</code> - For adding form element specific styling when there is an error
        <code>.controlNote</code> - Used to adjust label styles<br/>
        <code>.formGroup</code> - Used to add global form element group styles<br/>
        <code>.controlLabelRequired</code> - Used for styling required labels<br/>
        <code>.inline</code> - Used for styling labels on components with inputStyle inline<br/>
      </p>

      <h4>Custom Button Styles</h4>
      <p>
        <code>.button</code> - Used to directly style the button element (border, cursor, line-height, hover, disabled etc.)<br/>
        <code>.default</code><br/>
        <code>.primary</code><br/>
        <code>.secondary</code><br/>
        <code>.info</code><br/>
        <code>.danger</code><br/>
        <code>.disabledLink</code> - If the button is an anchor tag (link) and disabled<br/>
      </p>

      <h4>Custom Autocomplete Styles</h4>
      <p>
        <code>.spinner</code> - Autocomplete can use custom spinners and this is the wrapper for tham<br/>
        <code>.suggestionInfo</code> - Used to style each suggestion in the drop down<br/>
        <code>.suggestionContainer</code> - Used to style the suggestion container<br/>
        <code>.suggestion</code> - Used to style active suggestion box<br/>
        <code>.suggestionHighlighted</code><br/>
        <code>.suggestionsFooter</code><br/>
        <code>.autocompleteContainer</code> - Used to add container styles such as position relative<br/>
      </p>
    </div>
  ));
