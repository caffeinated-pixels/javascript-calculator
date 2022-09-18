import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

class DisplayContainer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.formulaDisplay !== this.props.formulaDisplay) {
      // only fires if formulaDisplay updates, otherwise the below would prevent scrolling left
      const { scrollbars } = this.refs
      // automatically scrolls formula display to right so that we can always see the latest input
      scrollbars.scrollToRight()
    }
  }

  render() {
    return (
      <section className="display-container">
        <p id="display" className="main-display">
          {this.props.currVal}
        </p>
        <hr />
        <div className="formula-container">
          {/* need to specify autoHeight to prevent component having no height! */}
          <Scrollbars
            autoHeight
            autoHeightMin={35}
            autoHeightMax={45}
            ref="scrollbars"
          >
            <p id="formula-display" className="formula-display">
              {this.props.formulaDisplay}
            </p>
          </Scrollbars>
        </div>
      </section>
    )
  }
}

export default DisplayContainer
