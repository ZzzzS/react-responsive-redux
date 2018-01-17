"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Responsive = void 0;

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _parser = require("./parser");

var _redux = require("./redux");

var _defaults = require("./defaults");

var Resp = function (_React$PureComponent) {
  (0, _inherits2.default)(Resp, _React$PureComponent);

  function Resp(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Resp);
    _this = (0, _possibleConstructorReturn2.default)(this, (Resp.__proto__ || (0, _getPrototypeOf.default)(Resp)).call(this, props));
    _this.onReSize = _this.onReSize.bind((0, _assertThisInitialized2.default)(_this));
    _this.mobileDetect = null;
    return _this;
  }

  (0, _createClass2.default)(Resp, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var options = (0, _parser.mobileParser)({
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

      if (width > _defaults.defaultSizes.tablet) {
        desktop = true;
        mobileDetect = 'desktop';
      } else if (width > _defaults.defaultSizes.phone && width <= _defaults.defaultSizes.tablet) {
        tablet = true;
        mobileDetect = 'tablet';
      } else if (width <= _defaults.defaultSizes.phone) {
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
      return _react.default.Children.only(children);
    }
  }]);
  return Resp;
}(_react.default.PureComponent);

Resp.propTypes = {
  children: _propTypes.default.element.isRequired,
  mobileDetectChange: _propTypes.default.func.isRequired
};
var Responsive = (0, _reactRedux.connect)(function () {
  return {};
}, function (dispatch) {
  return {
    mobileDetectChange: function mobileDetectChange(data) {
      return dispatch((0, _redux.setMobileDetect)(data));
    }
  };
})(Resp);
exports.Responsive = Responsive;
//# sourceMappingURL=responsive.js.map