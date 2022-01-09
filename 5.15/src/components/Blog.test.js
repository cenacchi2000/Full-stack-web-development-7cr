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

  test('if the like button is clicked twice, the event handler the component received as props is called twice', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(
      component.container.querySelector('.blog_url')
    ).not.toBe(null)

    expect(
      component.container.querySelector('.blog_likes')
    ).not.toBe(null)

    const button_likes = component.getByText('like')
    fireEvent.click(button_likes)
    expect(increaseLike.mock.calls).toHaveLength(1)

    fireEvent.click(button_likes)
    expect(increaseLike.mock.calls).toHaveLength(2)
  })
})