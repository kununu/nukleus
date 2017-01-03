import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import CheckboxGroup from 'components/CheckboxGroup';
import Combobox from 'components/Combobox';
import DatePicker from 'components/DatePicker';
import InfoText from 'components/InfoText';
import Logo from 'components/Logo';
import Notification from 'components/Notification';
import Paginator from 'components/Paginator';
import Table from 'components/Table';
import Tabs from 'components/Tabs';
import TextField from 'components/TextField';
import Select from 'components/Select';
import Stars from 'components/Stars';


const App = ({location: {pathname, query}}) => (
  <div className="app-container container">
    <div className="panel">
      <div className="panel-body">

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
            <Logo
              href="/playground/"
              pendingRequests={3} />
          </div>
        </div>

        <br />

        <div className="row">
          <div className="col-md-8">
            <Paginator
              totalPages={10}
              pathname={pathname}
              query={query} />
          </div>
        </div>

        <div className="clearfix">
          <div className="panel-heading col-md-8" style={{padding: '30px 20px'}}>
            <div className="clearfix relative">
              <Tabs
                pages={[
                  {path: '/playground/', query, title: 'First tab'},
                  {path: '/playground/2', query, title: 'Second tab'},
                  {path: '/playground/3', query, title: 'Third tab'}
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
            <CheckboxGroup
              name="checkbox-group[]"
              heading="CheckboxGroup"
              checkboxes={
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
