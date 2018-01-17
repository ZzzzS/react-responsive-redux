import _Object$getPrototypeOf from "@babel/runtime/core-js/object/get-prototype-of";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _inherits from "@babel/runtime/helpers/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mobileParser } from './parser';
import { setMobileDetect } from './redux';
import { defaultSizes } from './defaults';

var Resp = function (_React$PureComponent) {
  _inherits(Resp, _React$PureComponent);

  function Resp(props) {
    var _this;

    _classCallCheck(this, Resp);

    _this = _possibleConstructorReturn(this, (Resp.__proto__ || _Object$getPrototypeOf(Resp)).call(this, props));
    _this.onReSize = _this.onReSize.bind(_assertThisInitialized(_this));
    _this.mobileDetect = null;
    return _this;
  }

  _createClass(Resp, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var options = mobileParser({
        headers: {
          'user-agent': navigator.userAgent
        }
      });
      var mobileDetectChange = this.props.mobileDetectChange;
      mobileDetectChange(options);

      if (window) {
        window.addEventListener('resize', this.onReSize);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (window) {
        window.removeEventListener('resize', this.onReSize);
      }
    }
  }, {
    key: "onReSize",
    value: function onReSize() {
      var mobileDetectChange = this.props.mobileDetectChange;
      var width = document.body.clientWidth;
      var desktop;
      var tablet;
      var phone;
      var mobileDetect;

      if (width > defaultSizes.tablet) {
        desktop = true;
        mobileDetect = 'desktop';
      } else if (width > defaultSizes.phone && width <= defaultSizes.tablet) {
        tablet = true;
        mobileDetect = 'tablet';
      } else if (width <= defaultSizes.phone) {
        phone = true;
        mobileDetect = 'phone';
      }

      var mobile = tablet || phone;

      if (mobileDetect !== this.mobileDetect) {
        mobileDetectChange({
          desktop: !!desktop,
          mobile: !!mobile,
          tablet: !!tablet,
          phone: !!phone
        });
      }

      this.mobileDetect = mobileDetect;
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return React.Children.only(children);
    }
  }]);

  return Resp;
}(React.PureComponent);

Resp.propTypes = {
  children: PropTypes.element.isRequired,
  mobileDetectChange: PropTypes.func.isRequired
};
export var Responsive = connect(function () {
  return {};
}, function (dispatch) {
  return {
    mobileDetectChange: function mobileDetectChange(data) {
      return dispatch(setMobileDetect(data));
    }
  };
})(Resp);
//# sourceMappingURL=responsive.js.map