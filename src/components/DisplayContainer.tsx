import { useEffect, useRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

import { AppState } from '../constants'

type DisplayContainerProps = {
  currVal: AppState['currVal']
  formulaDisplay: AppState['formula']
}

export const DisplayContainer = ({
  currVal,
  formulaDisplay,
}: DisplayContainerProps) => {
  const scrollBarsRef = useRef<Scrollbars & HTMLDivElement>(null)

  useEffect(() => {
    // automatically scrolls formula display to right so that we can always see the latest input
    scrollBarsRef?.current?.scrollToRight()
  }, [formulaDisplay])

  return (
    <section className="display-container" data-testid="calculator-display">
      <p id="display" className="main-display" data-testid="main-display">
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
          <p
            id="formula-display"
            className="formula-display"
            data-testid="formula-display"
          >
            {formulaDisplay}
          </p>
        </Scrollbars>
      </div>
    </section>
  )
}
