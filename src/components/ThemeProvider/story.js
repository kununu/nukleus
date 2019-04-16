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
      <p>* These are important if you want to change input specific styling that is shared between all comps.</p>
      <p>
        <code>.hidden</code><br/>
        <code>.clearfix</code> - Only used in DropDown and Tabs currently<br/>
        <code>.formControl</code> - Used to change all form element basic styling such as box-shadows, padding, borders and focus behaviour<br/>
        <code>.formControlError</code> - For adding form element specific styling when there is an error<br/>
        <code>.formGroup</code> - Used to add global form element group styles<br/>
        <code>.controlNote</code> - Used to adjust label styles<br/>
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
        <code>.autocompleteContainer</code> - Used to add container styles such as position relative<br/>
        <code>.spinner</code> - Autocomplete can use custom spinners and this is the wrapper for tham<br/>
        <code>.suggestionInfo</code> - Used to style each suggestion in the drop down<br/>
        <code>.suggestionsContainer</code> - Used to style the suggestion container<br/>
        <code>.suggestion</code> - Used to style active suggestion box<br/>
        <code>.suggestionHighlighted</code><br/>
        <code>.suggestionsFooter</code><br/>

        <small>* It also relies on the shared formGroup, formControl, formControlError, controlNote, controlLabelRequired and srOnly styles</small>
      </p>

      <h4>Custom Choice Styles</h4>
      <p>
        <code>.choiceContainer</code> - Wrapper for the entire component<br/>
        <code>.choiceButton</code> - Used to style each radio button<br/>
        <code>.choiceFlexible</code> - Added to the choiceContainer element when there are more than 3 options per row<br/>

        <small>* It also relies on the shared formGroup, controlNote and controlLabelRequired styles</small>
      </p>

      <h4>Custom Combobox Styles</h4>
      <p>
        <code>.comboboxContainer</code> - Used to add any container specific styling such as position relative<br/>
        <code>.suggestionsContainer</code> - Used to style the suggestion container<br/>
        <code>.suggestion</code> - Used to style active suggestion box<br/>
        <code>.suggestionHighlighted</code><br/>
        <code>.comboboxHandle</code> - Used to style the fake select handle if there is one<br/>
        <code>.isNotSearchable</code> - Used to prevent users typing in the input if it's not searchable<br/>

        <small>* It also relies on the shared formGroup, formControl, formControlError, controlNote, controlLabel, controlLabelRequired and hidden styles</small>
      </p>

      <br />
      <br />

      <h4>Custom DatePicker Styles</h4>
      <p>
        <code>.datePickerContainer</code> - Used to add any container specific styling such as position relative<br/>
        <code>.datePickerInnerContainer</code> - Used to style inner container<br/>
        <code>.datePickerIcon</code> - Used to style active suggestion box<br/>
       
        <small>* It also relies on the shared formGroup, formControl, formControlError, controlNote, controlLabel, controlLabelRequired and hidden styles</small>
      </p>

      <br />
      <br />

      <h4>Custom DropDown Styles</h4>
      <p>
        <code>.dropDownContainer</code> - Used to add any container specific styling such as position relative<br/>
        <code>.dropDownToggle</code> - Used to style drop down selection button<br/>
        <code>.dropDownItemList</code> - Used to style the drop down unordered list item<br/>
        <code>.dropDownItem</code><br/> - Used to style the drop down specific list items<br/>
        <code>.dropDownIcon</code> - Used to style the drop down item icons if there are any<br/>
        <code>.up .down</code> - Used to style position specific class added via props<br/>
        <code>.dark .light</code> - Used to style shade specific class added via props<br/>
      </p>

      <br />

      <h4>Custom DropDown Styles</h4>
      <p>
        <code>.dropDownContainer</code> - Used to add any container specific styling such as position relative<br/>
        <code>.dropDownToggle</code> - Used to style drop down selection button<br/>
        <code>.dropDownItemList</code> - Used to style the drop down unordered list item<br/>
        <code>.dropDownItem</code><br/> - Used to style the drop down specific list items<br/>
        <code>.dropDownIcon</code> - Used to style the drop down item icons if there are any<br/>
        <code>.up .down</code> - Used to style position specific class added via props<br/>
        <code>.dark .light</code> - Used to style shade specific class added via props<br/>
      </p>

      <br />

      <h4>Custom Error Styles</h4>
      <p>
        <code>.errorContainer</code> - Used to add any container specific styling such as position relative<br/>
        <code>.errorInfo</code> - Used to style error content<br/>
      </p>

      <br />

      <h4>Custom InfoBox Styles</h4>
      <p>
        <code>.infoBox</code> - Used for all styles<br/>
      </p>

      <br />

      <h4>Custom InfoLabel Styles</h4>
      <p>
        <code>.infoLabel</code> - Used for all styles<br/>
      </p>

      <br />

      <h4>Custom InfoText Styles</h4>
      <p>
        <code>.infoText</code> - Used for all styles<br/>
      </p>

      <br />
      
      <h4>Custom Label Styles</h4>

      <small>* It only relies on the shared controlLabel and srOnly styles</small>
      <br />

      <h4>Custom Modal Styles</h4>
      <p>
        <code>.underlay</code> - Styles that are passed to the Aria Modal component - used to animate the underlay.<br/>
        <code>.underlayHasEntered</code> - Styles that are passed to the Aria Modal component. They style how the background should appear when modal is open.<br/>
        <code>.modal</code> - Used to style the Modal container<br/>
        <code>.modalIsOpen</code> - Used to animate the modal (Should be included if you use .modal<br/>
        <code>.modalHeader</code> - Used to style modal header section<br/>
        <code>.modalTitle</code> - Used to style the modal title<br/>
        <code>.modalCloseButton</code> - Used to style the top right button<br/>
        <code>.modalCloseIcon</code> - Used to style the top right button SVG to close the modal<br/>
        <code>.modalBody</code> - Used to style the modal body section<br/>
        <code>.modalFooter</code> - Used to style the footer section of the modal<br/>
      </p>

      <br />

      <h4>Custom MultipleChoice Styles</h4>
      <p>
        <code>.choiceContainer</code> - Used to style the main outer container.<br/>
        <code>.buttons</code> - Used to style secondary button styles (User prop inputStyle)<br/>
        <code>.inline</code> - Used to style primary inline button styles (User prop inputStyle)<br/>
        <code>.inlineLabel</code> - Used to add extra styles to the label when inline inputStyle is present<br/>
        <code>.choiceInnerContainer</code> - Used to style the inner container<br/>
        <code>.choice</code> - Used to style each choice block that wraps around the checkbox field<br/>
      </p>

      <small>* It also relies on the shared formGroup, formControl, controlNote and controlLabelRequired styles</small>

      <br />
    </div>
  ));
