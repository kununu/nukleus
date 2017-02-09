import React, {Component, PropTypes} from 'react';

import {Notification} from 'nukleus';
import DocsRoot from 'components/DocsRoot';

import {default as propsDefinition} from './props-definition.txt';
import {default as propsDefault} from './props-default.txt';
import styles from './index.scss';

export default class NotificationDocs extends Component {
  static propTypes = {
    notificationVisible: PropTypes.bool
  };

  static defaultProps = {
    notificationVisible: false
  };

  state = {
    notificationVisible: this.props.notificationVisible
  };

  componentDidUpdate () {
    Prism.highlightAll();
  }

  onClickToggleLink = () => {
    this.setState({
      notificationVisible: !this.state.notificationVisible
    });
  }

  render () {
    const example = `<Notification${'\n  '}message="Hi, I am a notification box"${'\n  '}icons=${'{{\n    '}error: <i className="fa fa-times" />,${'\n    '}success: <i className="fa fa-check" />${'\n  }}\n  '}visible={${this.state.notificationVisible}} />`;

    return (
      <DocsRoot
        title="Notification"
        component={
          <div>
            <a
              tabIndex={0}
              className={styles.toggleLink}
              onClick={this.onClickToggleLink}>
                Click to toggle to notification box.
              </a>
            <Notification
              message="Hi, I am a notification box"
              icons={{
                error: <i className="fa fa-times" />,
                success: <i className="fa fa-check" />
              }}
              visible={this.state.notificationVisible} />
          </div>
        }
        example={example}
        propsDefinition={propsDefinition}
        propsDefault={propsDefault} />
    );
  }
}
