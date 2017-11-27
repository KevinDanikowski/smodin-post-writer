import React from 'react'
import Console from '../src/components/Console'

describe('Console item', () => {
    const wrapper = shallow(<Console />)

    it('should be a div', () => {
        expect(wrapper.type()).to.eql('div')
    })
})