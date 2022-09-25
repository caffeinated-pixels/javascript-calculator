import { useEffect, useRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

export const DisplayContainer = ({ currVal, formulaDisplay }) => {
  const scrollBarsRef = useRef(null)

  useEffect(() => {
    // automatically scrolls formula display to right so that we can always see the latest input
    scrollBarsRef.current.scrollToRight()
  }, [formulaDisplay])

  return (
    <section className="display-container">
      <p id="display" className="main-display">
        {currVal}
      </p>
      <hr />
      <div className="formula-container">
        {/* need to specify autoHeight to prevent component having no height! */}
        <Scrollbars
          autoHeight
          autoHeightMin={35}
          autoHeightMax={45}
          ref={scrollBarsRef}
        >
          <p id="formula-display" className="formula-display">
            {formulaDisplay}
          </p>
        </Scrollbars>
      </div>
    </section>
  )
}
