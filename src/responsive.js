/**
 * Created by zzzz on 17/01/2018.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mobileParser } from './parser'
import { setMobileDetect } from './redux'
import { defaultSizes } from './defaults'

class Resp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onReSize = this.onReSize.bind(this)
    this.mobileDetect = null
  }

  componentWillMount() {
    const options = mobileParser({
      headers: {
        'user-agent': navigator.userAgent,
      },
    })

    const { mobileDetectChange } = this.props
    mobileDetectChange(options)

    if (window) {
      window.addEventListener('resize', this.onReSize)
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.onReSize)
    }
  }

  onReSize() {
    const { mobileDetectChange } = this.props
    const width = document.body.clientWidth

    let desktop
    let tablet
    let phone
    let mobileDetect

    if (width > defaultSizes.tablet) {
      desktop = true
      mobileDetect = 'desktop'
    } else if (width > defaultSizes.phone && width <= defaultSizes.tablet) {
      tablet = true
      mobileDetect = 'tablet'
    } else if (width <= defaultSizes.phone) {
      phone = true
      mobileDetect = 'phone'
    }

    const mobile = tablet || phone

    if (mobileDetect !== this.mobileDetect) {
      mobileDetectChange({
        desktop: !!desktop,
        mobile: !!mobile,
        tablet: !!tablet,
        phone: !!phone,
      })
    }

    this.mobileDetect = mobileDetect
  }

  render() {
    const { children } = this.props
    return (
      React.Children.only(children)
    )
  }
}

Resp.propTypes = {
  children: PropTypes.element.isRequired,
  mobileDetectChange: PropTypes.func.isRequired,
}

export const Responsive = connect(
  () => ({}),
  dispatch => ({
    mobileDetectChange: data => dispatch(setMobileDetect(data)),
  }),
)(Resp)
