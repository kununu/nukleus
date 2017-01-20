import React, {Component} from 'react';

import {InfoText, TextField} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as example} from './example.txt';
import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';
import styles from './index.scss';

export default class InfoTextDocs extends Component {
  state = {
    infoTextVisible: false
  };

  onClickToggleLink = () => {
    this.setState({
      infoTextVisible: !this.state.infoTextVisible
    });
  }

  render () {
    return (
      <DocsRoot
        title="InfoText"
        component={
          <div>
            <a
              tabIndex={0}
              className={styles.toggleLink}
              onClick={this.onClickToggleLink}>
              Click to toggle info text.
            </a>

            <div className={styles.paddingTop}>
              <TextField
                id="text-field"
                label="TextField"
                name="text-field" />

              {this.state.infoTextVisible &&
                <div>
                  <InfoText text="I am an info text." />
                </div>
              }
            </div>
          </div>
        }
        example={example}
        propsDefinition={propsDefinition}
        propsDefault={propsDefault} />
    );
  }
}
