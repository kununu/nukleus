import React, {PropTypes} from 'react';
import {Link} from 'react-router'; // eslint-disable-line import/no-extraneous-dependencies

import Autocomplete from 'components/Autocomplete';
import Button from 'components/Button';
import Choice from 'components/Choice';
import Combobox from 'components/Combobox';
import DatePicker from 'components/DatePicker';
import DropDown from 'components/DropDown';
import InfoText from 'components/InfoText';
import MultipleChoice from 'components/MultipleChoice';
import Notification from 'components/Notification';
import Paginator from 'components/Paginator';
import Table from 'components/Table';
import Tabs from 'components/Tabs';
import TextField from 'components/TextField';
import ToolTip from 'components/ToolTip';
import Select from 'components/Select';
import Stars from 'components/Stars';
import {
  controlLabel
} from 'components/index.scss';

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
              isRequired
              requiredLabel="Required"
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

            <Stars
              value={3}
              name="test2"
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

        <div className="row">
          <div className="col-md-8">
            <Tabs
              items={[
                <Link to={{pathname: '/playground/', query}}>First Tab</Link>,
                <Link to={{pathname: '/playground/2', query}}>Second Tab</Link>,
                <Link to={{pathname: '/playground/3', query}}>Third Tab</Link>
              ]}
              pathname={pathname} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <Tabs
              theme="block"
              items={[
                <Link to={{pathname: '/playground/', query}}>First Tab</Link>,
                <Link to={{pathname: '/playground/2', query}}><span className={styles.itemNumber}>10</span> Second Tab</Link>,
                <Link to={{pathname: '/playground/3', query}}>Third Tab</Link>
              ]}
              pathname={pathname} />
          </div>
        </div>

        <br /><br />

        <div className="row">
          <div className="col-md-8">
            <Stars name="test" value={2.5} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <Autocomplete
              autoFocus
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
              onSelectSuggestion={suggestion => { console.log('You have chosen ', suggestion); }} // eslint-disable-line no-console
              placeholder="Type something..."
              suggestionsFooter={<Link href="hi">No suggestions found?</Link>}
              label="Autocomplete"
              isRequired
              requiredLabel="Required"
              name="autocomplete" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <Autocomplete
              autoFocus
              data={{
                items: [
                  {item: 'meow', itemInfo: 'hard'},
                  {item: 'meowing', itemInfo: 'harder'}
                ]
              }}
              scrollTo
              id="test-error"
              value="purrr"
              error="An Error"
              errorSubInfo="with useful hints"
              query={query}
              onSelectSuggestion={suggestion => { console.log('You have chosen ', suggestion); }} // eslint-disable-line no-console
              placeholder="Type something..."
              suggestionsFooter={<Link href="hi">No suggestions found?</Link>}
              label="Autocomplete with Error"
              isRequired
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
              isRequired
              requiredLabel="Required" />
            <InfoText
              text="I am the info text for the TextField component." />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <TextField
              id="text-field"
              label={
                (<span>
                  <label className={controlLabel} htmlFor="text-field">TextField</label>
                  <ToolTip position="bottomLeft" label="TextField Info" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." />
                </span>
                )
              }
              name="text-field"
              isRequired
              requiredLabel="Required" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <TextField
              id="text-field-limited"
              label="TextField with Char Limit"
              name="text-field-limited"
              displayLength
              maxLength={120}
              isRequired
              requiredLabel="Required" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <TextField
              id="text-field-error"
              label="TextField with error"
              name="text-field-error"
              error="This is an error message"
              errorSubInfo="Some useful hints"
              isRequired
              requiredLabel="Required" />
          </div>
        </div>

        <br />

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
            <TextField
              id="text-area-large"
              label="TextArea Large"
              name="text-area-large"
              maxLength={120}
              displayLength
              inputStyle="inline mediumSize"
              multiLine
              query={query} />
          </div>
        </div>

        <div className="row" style={{backgroundColor: '#0c0c23', textAlign: 'right'}}>
          <DropDown
            position="bottom"
            items={[
              {
                active: true,
                icon: <img alt="test" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABaAAD/4QOBaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Y2E3ODg1MjItZDI4YS00MDhlLTk1MDItYTdmMTk5OWYxYmU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYxNEY5MkZFRTcwMDExRTZCOTcwQkE3QkRFREZBMzk3IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYxNEY5MkZERTcwMDExRTZCOTcwQkE3QkRFREZBMzk3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTZiNjZiZTMtNzJkYS00NTgxLWEzNWQtY2I2ODU5ZmQwNDNlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmNhNzg4NTIyLWQyOGEtNDA4ZS05NTAyLWE3ZjE5OTlmMWJlNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uACZBZG9iZQBkwAAAAAEDABUEAwYKDQAABZcAAAZWAAAG5AAAB3j/2wCEAAEBAQEBAQEBAQECAQEBAgICAQECAgICAgICAgIDAgMDAwMCAwMEBAQEBAMFBQUFBQUHBwcHBwgICAgICAgICAgBAQEBAgICBQMDBQcFBAUHCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICP/CABEIABAAFgMBEQACEQEDEQH/xACnAAEBAQAAAAAAAAAAAAAAAAAJBggBAQEAAwAAAAAAAAAAAAAAAAgHBAYJEAACAgMBAQAAAAAAAAAAAAADBQAEAQIGBwgRAAEDAgQHAQAAAAAAAAAAAAMBAgQSBSIyFAYAEBExQYETFRIAAQEHBQEAAAAAAAAAAAAAAQIAEBEhMUEDUWHxEgQyEwEBAAEEAgMBAAAAAAAAAAABESEAEDFBUWFxgaGx/9oADAMBAAIRAxEAAAHLhd7vIbQSAY00b9Zla+htBIBjTRv/AP/aAAgBAQABBQJGjadI06D57uV+UiN405tp0H0JcscpP//aAAgBAgABBQIANibWEGcCgD7D2sP85FP/2gAIAQMAAQUCaNAUgKPXh7340VgugUeQj0vz/9oACAECAgY/AuqasCn6vR3ZNWAT9Xo7/9oACAEDAgY/AjmzGCBxZsifQUp84j1IComctbbBxw5hFB5s2RXoCVecx6gFUROWlty7/9oACAEBAQY/AotlssXW3ObXpo1Yx1fMbiuxFc1uVq+eLJL27Glz93H037trLKgoANUZzjUKqDyk6ImNffflFvVllaK5wq9NJoGSn6DcJ2ErXNyuXxxZIm3ZMuBu4Gm/duhYsFQGpjOaahFUmYnRUwJ67cv/2gAIAQEDAT8h+vsAAlRWf1rqfALZgYxY3Y+/sAAlUWf1rqfALZgKxYzY/9oACAECAwE/IQ4VaGFcYsGM+O/ewdINLCmNSHGfPfrb/9oACAEDAwE/IcYn1iyoMBeU611FA7CX7Wvd442xifSpYgyh5DvXcUDsLfpY93nnb//aAAwDAQACEQMRAAAQwGA//9oACAEBAwE/EP58B/wDGshUD8xnekR/uGSMNf34D/gGNLSAT4jO9Ij/AHDBGWv/2gAIAQIDAT8QyAFChYK5UOB70pr5GQTHpAZY887ZACjBlEcInC9aE18jAIj2hMMeONv/2gAIAQMDAT8Q+ytW2B02FLWAplj9VjDFl6oAPPr6K1bYHHYFkaKOGP1WcMGzqoh8ev/Z" />,
                link: <a href="/playground/">test</a>,
                value: 'Schweiz'
              },
              {
                active: false,
                icon: <img alt="test" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABaAAD/4QOBaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Y2E3ODg1MjItZDI4YS00MDhlLTk1MDItYTdmMTk5OWYxYmU1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYxNTA3Qjg1RTcwMDExRTZCOTcwQkE3QkRFREZBMzk3IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYxNTA3Qjg0RTcwMDExRTZCOTcwQkE3QkRFREZBMzk3IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTZiNjZiZTMtNzJkYS00NTgxLWEzNWQtY2I2ODU5ZmQwNDNlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmNhNzg4NTIyLWQyOGEtNDA4ZS05NTAyLWE3ZjE5OTlmMWJlNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uACZBZG9iZQBkwAAAAAEDABUEAwYKDQAABbUAAAaaAAAHLAAAB8H/2wCEAAEBAQEBAQEBAQECAQEBAgICAQECAgICAgICAgIDAgMDAwMCAwMEBAQEBAMFBQUFBQUHBwcHBwgICAgICAgICAgBAQEBAgICBQMDBQcFBAUHCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICP/CABEIABAAFgMBEQACEQEDEQH/xADHAAADAQAAAAAAAAAAAAAAAAACBwgFAQEBAQAAAAAAAAAAAAAAAAAHCAYQAAAGAQMFAAAAAAAAAAAAAAACAwQFBgEjJQcTFBUmFxEAAAUCAwUJAQAAAAAAAAAAAQIDEwQREgAxBUEiFAYHIVFxMnLTNUamlxIAAQEEBQYPAAAAAAAAAAAAAQIAETED8EFREgQhYdFCkjOBkbEiMnKi0uITI5NElKQTAQABAwQCAwEBAAAAAAAAAAERITFBABDwUWFxkbHB0eH/2gAMAwEAAhEDEQAAAZRtPOMoMoSoYzt5IqhqeZ2eieK3/9oACAEBAAEFAoU+zVxu5WtPipgEaU1MJNaWjn08f//aAAgBAgABBQJxjUvxc5j+kcZ5CkRLWpy+T0h//9oACAEDAAEFAsDjZUhH/ftx8nYiDpBY1XcR/9oACAECAgY/AjSkbK63+oOuKr1SqR433lQPthunL2fDnLXJykEPfAi2wZy2p22//9oACAEDAgY/AmVeIHMMZqpVadZPJobeS/uzdDbnE7UjvN5mHRiUqIdHDnJwk2N8n8rf/9oACAEBAQY/AtJUcyjIC7flYkA1ud2cPm4FG/MRqsCNGixJElROBNEYkbQ4munKBZERCoxJgolIAWWXtFEtG92nDx/gtW/muhe5hNuTy4m1Y1SZ1FC1tq2lFNnDp09Be4MEEp+WDNhakU63UBQChYml2AoYQDdRIXwKAbMfU/3WP//aAAgBAQMBPyHm3wnF7tWkTIM0H4LzGgaK2Kv+WyxYxVqGLFA+f5jZB4AbP//aAAgBAgMBPyGk+X79f0w04mF6zl59zMrzo+H/ALpV+V4O3vQg/wDJspB/ot9r/9oACAEDAwE/IbOc58KB9wn1Cr6w3wN9ARvPZbwjEGuPNNj/AP/aAAwDAQACEQMRAAAQpQN//9oACAEBAwE/EIqZjTo31lH1MjWNbeAGCG1H/wDFBLe+MsVrD68ZGpVCSQqkNb//2gAIAQIDAT8QsDFEdqkXzhKxb6oDOVq2zSHIPM7EKTlTMy6zXOU1O690mwYQbEAl16FSWEp2n//aAAgBAwMBPxB0+ufXeMRq+TkKLYITDDBC0SaLnFuYPjTj41HRwBKZAsDCjqf/2Q==" />,
                link: <a href="/playground/">test</a>,
                value: 'United States'
              }
            ]} />
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <MultipleChoice
              name="choices[]"
              heading="MultipleChoice"
              choices={
              [{
                id: 'option-a',
                isChecked: true,
                label: 'option a',
                value: 'option-a'
              },
              {
                id: 'option-b',
                isChecked: false,
                label: 'option b',
                value: 'option-b'
              },
              {
                id: 'option-c',
                isChecked: false,
                label: 'option c',
                value: 'option-c'
              },
              {
                id: 'option-d',
                isChecked: false,
                label: 'option d',
                value: 'option-d'
              }]} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <DatePicker
              icon={<i className="fa fa-calendar" aria-hidden="true" />}
              id="date-picker"
              name="date-picker"
              isRequired
              requiredLabel="Required"
              title="DatePicker" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <DatePicker
              icon={<i className="fa fa-calendar" aria-hidden="true" />}
              id="date-picker-with-error"
              name="date-picker-with-error"
              error="Wrong Date"
              errorSubInfo="Maybe provide hints about Date Formats"
              isRequired
              requiredLabel="Required"
              title="DatePicker with Error" />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <Select
              title="Select"
              name="select"
              id="select"
              isRequired
              requiredLabel="Required"
              value="option"
              items={[{key: 'test', value: 'test'}]} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <Select
              title="Select with Error"
              name="select-error"
              id="select-error"
              error="Please select something"
              errorSubInfo="Anything"
              isRequired
              requiredLabel="Required"
              value="option"
              items={{option: 'Option', 'option-2': 'Option 2', 'option-3': 'Option 3'}} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <Combobox
              handle={<i className="fa fa-chevron-down" aria-hidden="true" />}
              name="name"
              label="Combobox"
              id="name"
              isRequired
              requiredLabel="Required"
              placeholder="Type m"
              keyName="name"
              items={['music', 'maths', 'manga', 'morning', 'musical', 'mania', 'message', 'metal', 'micro', 'macro', 'microphone']} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <Combobox
              handle={<i className="fa fa-chevron-down" aria-hidden="true" />}
              name="name-error"
              label="Combobox with Error"
              id="name-error"
              error="Error in a Comboxbox"
              errorSubInfo="What can you do?"
              isRequired
              requiredLabel="Required"
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
            <Button type="default" text="Default Button" />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="primary" text="Primary Button" />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="secondary" text="Secondary Button" />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="info" text="Info Button" />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="danger" text="Danger Button" />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="link" text="Link Button" />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="default" text="Default Button" disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="primary" text="Primary Button" disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="secondary" text="Secondary Button" disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="info" text="Info Button" disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="danger" text="Danger Button" disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="link" text="Link Button" disabled />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="default" text="Default Button" outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="primary" text="Primary Button" outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="secondary" text="Secondary Button" outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="info" text="Info Button" outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="danger" text="Danger Button" outline />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="link" text="Link Button" outline />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="default" text="Default Button" outline disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="primary" text="Primary Button" outline disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="secondary" text="Secondary Button" outline disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="info" text="Info Button" outline disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="danger" text="Danger Button" outline disabled />
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6 margin-bottom-third">
            <Button type="link" text="Link Button" outline disabled />
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
              link={<Link to="/playground/huhuh">Info Link</Link>}
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
            <Button type="primary" text="Full width Button" fullWidth />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-lg-12 margin-bottom-third">
            <Button type="primary" text="Mobile Full width Button" mobileFullWidth />
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
                },
                {
                  id: 'option-d',
                  label: 'Checked Custom Option D',
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

        <br />

        <div className="row">
          <div className="col-md-10">
            <Choice
              heading="Choice with multiple rows"
              name="option-3-6"
              onChange={() => {}}
              customTheme={styles.customThemeChoice}
              options={[
                {
                  id: 'option-a-3-6',
                  label: 'Option A',
                  value: 'option-a-3-6'
                },
                {
                  id: 'option-b-3-6',
                  label: 'Option B is longer to show, that all items have the same height in modern browsers',
                  value: 'option-b-3-6'
                },
                {
                  id: 'option-c-3-6',
                  label: 'Option C',
                  value: 'option-c-3-6'
                },
                {
                  id: 'option-d-3-6',
                  label: 'Option D',
                  value: 'option-d-3-6'
                },
                {
                  id: 'option-e-3-6',
                  label: 'Option E',
                  value: 'option-e-3-6'
                },
                {
                  id: 'option-f-3-6',
                  label: 'Option F',
                  value: 'option-f-3-6'
                }
              ]}
              optionsPerRow="3"
              query={query} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-10">
            <Choice
              name="option-3-5"
              onChange={() => {}}
              customTheme={styles.customThemeChoice}
              options={[
                {
                  id: 'option-a-3-5',
                  label: 'Option A',
                  value: 'option-a-3-5'
                },
                {
                  id: 'option-b-3-5',
                  label: 'Option B',
                  value: 'option-b-3-5'
                },
                {
                  id: 'option-c-3-5',
                  label: 'Option C',
                  value: 'option-c-3-5'
                },
                {
                  id: 'option-d-3-5',
                  label: 'Option D',
                  value: 'option-d-3-5'
                },
                {
                  id: 'option-e-3-5',
                  label: 'Option E',
                  value: 'option-e-3-5'
                }
              ]}
              optionsPerRow="3"
              query={query} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-10">
            <Choice
              name="option-5-8"
              onChange={() => {}}
              customTheme={styles.customThemeChoice}
              options={[
                {
                  id: 'option-a-5-8',
                  label: 'Option A',
                  value: 'option-a-5-8'
                },
                {
                  id: 'option-b-5-8',
                  label: 'Option B',
                  value: 'option-b-5-8'
                },
                {
                  id: 'option-c-5-8',
                  label: 'Option C',
                  value: 'option-c-5-8'
                },
                {
                  id: 'option-d-5-8',
                  label: 'Option D',
                  value: 'option-d-5-8'
                },
                {
                  id: 'option-e-5-8',
                  label: 'Option E',
                  value: 'option-e-5-8'
                },
                {
                  id: 'option-f-5-8',
                  label: 'Option F',
                  value: 'option-f-5-8'
                },
                {
                  id: 'option-g-5-8',
                  label: 'Option G',
                  value: 'option-g-5-8'
                },
                {
                  id: 'option-h-5-8',
                  label: 'Option H',
                  value: 'option-h-5-8'
                }
              ]}
              optionsPerRow="5"
              query={query} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-4">
            <TextField
              id="text-field-grid"
              error="has an error"
              errorSubInfo="Please do something about this"
              label="TextField"
              isRequired
              requiredLabel="Required"
              name="text-field-grid" />
          </div>
          <div className="col-md-4">
            <TextField
              id="text-field-grid-password"
              label="TextField (password)"
              name="text-field-grid-password"
              isRequired
              requiredLabel="Required"
              type="password" />
          </div>
          <div className="col-md-4">
            <DatePicker
              icon={<i className="fa fa-calendar" aria-hidden="true" />}
              id="date-picker-grid-with-error"
              name="date-picker-grid-with-error"
              error="Wrong Date"
              errorSubInfo="Maybe provide hints about Date Formats"
              isRequired
              requiredLabel="Required"
              title="DatePicker with Error" />
          </div>
        </div>
      </div>
    </div>

    <Notification
      message="Hello, I am a notification box"
      icon={<i className="fa fa-check" />}
      visible />
  </div>
);

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default App;
