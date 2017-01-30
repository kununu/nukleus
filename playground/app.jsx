import React, {PropTypes} from 'react';
import {Link} from 'react-router'; // eslint-disable-line import/no-extraneous-dependencies

import Autocomplete from 'components/Autocomplete';
import Button from 'components/Button';
import Choice from 'components/Choice';
import Combobox from 'components/Combobox';
import DatePicker from 'components/DatePicker';
import InfoText from 'components/InfoText';
import MultipleChoice from 'components/MultipleChoice';
import Notification from 'components/Notification';
import Paginator from 'components/Paginator';
import Table from 'components/Table';
import Tabs from 'components/Tabs';
import TextField from 'components/TextField';
import Select from 'components/Select';
import Stars from 'components/Stars';

import styles from './app.scss';

const App = ({location: {pathname, query}}) => (
  <div className="app-container container">
    <div className="panel">
      <div className="panel-body">

        <div className="row">
          <div className="col-md-8">
            <MultipleChoice
              name="choices[]"
              heading="MultipleChoice"
              inputStyle="buttons"
              choices={
              [{
                id: 'option-1',
                isChecked: true,
                label: 'flex. Arbeitszeit',
                value: 'option-1'
              },
              {
                id: 'option-2',
                isChecked: false,
                label: 'Homeoffice',
                value: 'option-2'
              },
              {
                id: 'option-3',
                isChecked: false,
                label: 'Kantine',
                value: 'option-2'
              },
              {
                id: 'option-4',
                isChecked: false,
                label: 'Essenszulagen',
                value: 'option-2'
              },
              {
                id: 'option-5',
                isChecked: false,
                label: 'Kinderbetreuung',
                value: 'option-2'
              },
              {
                id: 'option-6',
                isChecked: false,
                label: 'Betr. Altersvorsorge',
                value: 'option-2'
              },
              {
                id: 'option-7',
                isChecked: false,
                label: 'Barrierefreiheit',
                value: 'option-2'
              },
              {
                id: 'option-8',
                isChecked: false,
                label: 'Gesundheitsmaßnahmen',
                value: 'option-2'
              },
              {
                id: 'option-9',
                isChecked: false,
                label: 'Betriebsartzt',
                value: 'option-4'
              },
              {
                id: 'option-10',
                isChecked: false,
                label: 'Coaching',
                value: 'option-4'
              },
              {
                id: 'option-11',
                isChecked: false,
                label: 'Parkplatz',
                value: 'option-4'
              },
              {
                id: 'option-12',
                isChecked: false,
                label: 'gute Verkehrsanbindung',
                value: 'option-4'
              },
              {
                id: 'option-13',
                isChecked: false,
                label: 'Mitarbeiterrabatte',
                value: 'option-4'
              },
              {
                id: 'option-14',
                isChecked: false,
                label: 'Firmenwagen',
                value: 'option-4'
              },
              {
                id: 'option-15',
                isChecked: false,
                label: 'Mitarbeiterhandy',
                value: 'option-4'
              },
              {
                id: 'option-16',
                isChecked: false,
                label: 'Mitarbeiterbeteiligung',
                value: 'option-4'
              },
              {
                id: 'option-17',
                isChecked: false,
                label: 'Mitarbeiterevents',
                value: 'option-4'
              },
              {
                id: 'option-18',
                isChecked: false,
                label: 'Internetnutzung',
                value: 'option-4'
              },
              {
                id: 'option-19',
                isChecked: false,
                label: 'Hunde geduldet',
                value: 'option-4'
              }
              ]} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-xs-12 col-sm-5 col-md-2">
            <Stars
              value={3}
              name="test"
              selectable
              colors={['red', 'green']} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <Paginator
              totalPages={10}
              pathname={pathname}
              query={query}
              baseLink={<Link to={{pathname: '/playground/', query}}>1</Link>} />
          </div>
        </div>

        <div className="clearfix">
          <div className="panel-heading col-md-8" style={{padding: '30px 20px'}}>
            <div className="clearfix relative">
              <Tabs
                items={[
                  <Link to={{pathname: '/playground/', query}}>First Tab</Link>,
                  <Link to={{pathname: '/playground/2', query}}>Second Tab</Link>,
                  <Link to={{pathname: '/playground/3', query}}>Third Tab</Link>
                ]}
                pathname={pathname} />
            </div>
          </div>
        </div>

        <br /><br />

        <div className="row">
          <div className="col-md-8">
            <Stars value={2.5} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <Autocomplete
              data={{
                items: [
                  {item: 'meow', itemInfo: 'hard'},
                  {item: 'meowing', itemInfo: 'harder'}
                ]
              }}
              scrollTo
              id="test"
              value="purrr"
              query={query}
              onGetSuggestions={() => {}}
              placeholder="Type something..."
              suggestionsFooter={<Link href="hi">No suggestions found?</Link>}
              label="Autocomplete"
              requiredLabel="Required"
              name="autocomplete" />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <TextField
              id="text-field"
              label="TextField"
              name="text-field"
              required
              requiredLabel />
            <InfoText
              text="I am the info text for the TextField component." />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <TextField
              id="text-field-password"
              label="TextField (password)"
              name="text-field-password"
              type="password" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <TextField
              id="text-area"
              label="TextField (multiLine)"
              name="text-area"
              multiLine
              query={query} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <MultipleChoice
              name="choices[]"
              heading="MultipleChoice"
              choices={
              [{
                id: 'option-1',
                isChecked: true,
                label: 'option 1',
                value: 'option-1'
              },
              {
                id: 'option-2',
                isChecked: false,
                label: 'option 2',
                value: 'option-2'
              },
              {
                id: 'option-3',
                isChecked: false,
                label: 'option 3',
                value: 'option-2'
              },
              {
                id: 'option-4',
                isChecked: false,
                label: 'option 4',
                value: 'option-4'
              }]} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <DatePicker
              id="date-picker"
              name="date-picker"
              title="DatePicker" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <Select
              title="Select"
              name="select"
              id="select"
              required
              value="option"
              items={{option: 'Option', 'option-2': 'Option 2', 'option-3': 'Option 3'}} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <Combobox
              name="name"
              label="Combobox"
              id="name"
              required
              placeholder="Type m"
              keyName="name"
              items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <Table
              items={{
                id: [1, 2, 3, 4, 5],
                'in hiragana': ['いち', 'に', 'さん', 'よん', 'ご'],
                'in kanji': ['一', '二', '三', '四', '五'],
                'in words': ['one', 'two', 'three', 'four', 'five'],
                link: [
                  <Link to="/playground/">One</Link>,
                  <Link to="/playground/">Two</Link>,
                  <Link to="/playground/">Three</Link>,
                  'Four',
                  <Link to="/playground/">Five</Link>
                ]
              }} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <Table
              defaultRowCount={2}
              defaultTitleCount={2} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="default" text="Default Button" onClick={() => {}} />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="primary" text="Primary Button" onClick={() => {}} />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="secondary" text="Secondary Button" onClick={() => {}} />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="info" text="Info Button" onClick={() => {}} />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="danger" text="Danger Button" onClick={() => {}} />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="link" text="Link Button" onClick={() => {}} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="default" text="Default Button" onClick={() => {}} disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="primary" text="Primary Button" onClick={() => {}} disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="secondary" text="Secondary Button" onClick={() => {}} disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="info" text="Info Button" onClick={() => {}} disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="danger" text="Danger Button" onClick={() => {}} disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="link" text="Link Button" onClick={() => {}} disabled />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="default" text="Default Button" onClick={() => {}} outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="primary" text="Primary Button" onClick={() => {}} outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="secondary" text="Secondary Button" onClick={() => {}} outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="info" text="Info Button" onClick={() => {}} outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="danger" text="Danger Button" onClick={() => {}} outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="link" text="Link Button" onClick={() => {}} outline />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="default" text="Default Button" onClick={() => {}} outline disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="primary" text="Primary Button" onClick={() => {}} outline disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="secondary" text="Secondary Button" onClick={() => {}} outline disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="info" text="Info Button" onClick={() => {}} outline disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="danger" text="Danger Button" onClick={() => {}} outline disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="link" text="Link Button" onClick={() => {}} outline disabled />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="custom" text="Custom Button" onClick={() => {}} customTheme={styles.customThemeButton} />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="custom" text="Custom Button" onClick={() => {}} customTheme={styles.customThemeButton} disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="custom" text="Custom Button" onClick={() => {}} customTheme={styles.customThemeButton} outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="custom" text="Custom Button" onClick={() => {}} customTheme={styles.customThemeButton} outline disabled />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button
              type="default"
              link={<Link to="/playground">Button Link</Link>} />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button
              type="primary"
              disabled
              link={<Link to="/playground">Primary Link</Link>} />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button
              type="secondary"
              link={<Link to="/playground">Secondary Link</Link>}
              outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button
              type="info"
              link={<Link to="/playground">Info Link</Link>}
              disabled
              outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button
              type="custom"
              link={<Link to="/playground">Danger Link</Link>}
              customTheme={styles.customThemeButton} />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button
              type="link"
              link={<Link to="/playground">Link Link</Link>} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-12 margin-bottom-third">
            <Button type="primary" text="Full width Button" onClick={() => {}} fullWidth />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-12 margin-bottom-third">
            <Button type="primary" text="Mobile Full width Button" onClick={() => {}} mobileFullWidth />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-10">
            <Choice
              heading="Choice"
              name="basic"
              onChange={() => {}}
              options={[
                {
                  id: 'option-a',
                  label: 'Option A',
                  value: 'option-a'
                },
                {
                  id: 'option-b',
                  label: 'Option B',
                  value: 'option-b'
                },
                {
                  id: 'option-c',
                  label: 'Option C',
                  value: 'option-c'
                },
                {
                  id: 'option-d',
                  label: 'Option D',
                  value: 'option-d'
                },
                {
                  id: 'option-e',
                  label: 'Option E',
                  value: 'option-e'
                },
                {
                  id: 'option-f',
                  label: 'Option F',
                  value: 'option-f'
                }
              ]}
              query={query} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-10">
            <Choice
              checked="option-a"
              name="disabled"
              onChange={() => {}}
              disabled
              options={[
                {
                  id: 'option-a',
                  label: 'Checked Disabled Option A',
                  value: 'option-a'
                },
                {
                  id: 'option-b',
                  label: 'Option B',
                  value: 'option-b'
                },
                {
                  id: 'option-c',
                  label: 'Option C',
                  value: 'option-c'
                }
              ]} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-10">
            <Choice
              heading="Custom Choice"
              checked="option-a"
              name="custom"
              onChange={() => {}}
              customTheme={styles.customThemeChoice}
              options={[
                {
                  id: 'option-a',
                  label: 'Checked Custom Option A',
                  value: 'option-a'
                },
                {
                  id: 'option-b',
                  label: 'Option B',
                  value: 'option-b'
                },
                {
                  id: 'option-c',
                  label: 'Option C',
                  value: 'option-c'
                }
              ]} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-10">
            <Choice
              checked="option-a"
              name="custom-disabled"
              onChange={() => {}}
              disabled
              customTheme={styles.customThemeChoice}
              options={[
                {
                  id: 'option-a',
                  label: 'Checked Custom Disabled Option A',
                  value: 'option-a'
                },
                {
                  id: 'option-b',
                  label: 'Option B',
                  value: 'option-b'
                },
                {
                  id: 'option-c',
                  label: 'Option C',
                  value: 'option-c'
                }
              ]} />
          </div>
        </div>

      </div>
    </div>

    <Notification
      message="Hello, I am a notification box"
      visible />
  </div>
);

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default App;
