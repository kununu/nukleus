import React from 'react';

import {MultipleChoice} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';

const MultipleChoiceDocs = () => (
  <DocsRoot
    title="MultipleChoice"
    component={
      <div>
        <MultipleChoice
          name="checkbox-group[]"
          heading="MultipleChoice"
          checkboxes={
          [
            {
              id: 'option-a',
              isChecked: true,
              label: 'option 1',
              value: 'option-1'
            },
            {
              id: 'option-b',
              isChecked: true,
              label: 'option 2',
              value: 'option-2'
            },
            {
              id: 'option-c',
              isChecked: false,
              label: 'option 3',
              value: 'option-2'
            },
            {
              id: 'option-d',
              isChecked: false,
              label: 'option 4',
              value: 'option-4'
            }
          ]
          } />

        <br />

        <MultipleChoice
          name="checkbox-group[]"
          heading="MultipleChoice (with buttons)"
          inputStyle="buttons"
          checkboxes={
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
          }]} />
      </div>
    }
    example={example}
    propsDefinition={propsDefinition}
    propsDefault={propsDefault} />
);

export default MultipleChoiceDocs;
