import React from 'react'
import { render } from '../testUtils'
import { Index, getStaticProps } from '../../pages'

const { props } = getStaticProps()

describe('Home page', () => {
  it('matches snapshot', () => {

    const { asFragment } = render(<Index {...props} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
