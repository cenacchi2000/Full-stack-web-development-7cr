import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title:"How to test React JS Code",
    author:"Munnazzah Aslam", 
    url:"www.testblog.com",
    likes:"123"
  }

  const increaseLike =jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} increaseLike={increaseLike}/>
    )
  })

  test('checks that the url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(
      component.container.querySelector('.blog_url')
    ).not.toBe(null)

    expect(
      component.container.querySelector('.blog_likes')
    ).not.toBe(null)
  })

})