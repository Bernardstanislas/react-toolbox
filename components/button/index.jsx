import React from 'react';
import FontIcon from '../font_icon';
import Ripple from '../ripple';
import Tooltip from '../tooltip';
import style from './style';
import events from '../utils/events';

class Button extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    flat: React.PropTypes.bool,
    floating: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    loading: React.PropTypes.bool,
    mini: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    raised: React.PropTypes.bool,
    ripple: React.PropTypes.bool,
    toggle: React.PropTypes.bool,
    tooltip: React.PropTypes.string,
    type: React.PropTypes.string
  };

  static defaultProps = {
    accent: false,
    className: '',
    flat: false,
    floating: false,
    loading: false,
    mini: false,
    primary: false,
    raised: false,
    ripple: true,
    toggle: false
  };

  handleMouseDown = (event) => {
    events.pauseEvent(event);
    if (this.refs.ripple) this.refs.ripple.start(event);
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  render () {
    const {accent, flat, floating, href, icon, label, loading, mini,
           primary, raised, ripple, toggle, tooltip, ...others} = this.props;
    const element = href ? 'a' : 'button';
    const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
    const shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : toggle ? 'toggle' : 'flat';
    let className = `${style[shape]} ${style[level]}`;

    if (this.props.className) className += ` ${this.props.className}`;
    if (mini) className += ` ${style.mini}`;

    const props = {
      ...others,
      href,
      className,
      disabled: this.props.disabled || this.props.loading,
      onMouseDown: this.handleMouseDown
    };

    return React.createElement(element, props,
      ripple ? <Ripple ref='ripple' loading={loading}/> : null,
      tooltip ? <Tooltip className={style.tooltip} label={tooltip}/> : null,
      icon ? <FontIcon className={style.icon} value={icon}/> : null,
      label ? label : this.props.children
    );
  }
}

export default Button;
