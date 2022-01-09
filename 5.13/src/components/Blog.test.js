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

  test('checks that the component displaying a blog renders the title and author, but does not render its url or number of likes by default', () => {
    expect(
      component.container.querySelector('.blog_title_author')
    ).not.toHaveStyle('display: none')

    expect(
      component.container.querySelector('.blog_url')
    ).toBe(null)

    expect(
      component.container.querySelector('.blog_likes')
    ).toBe(null)
  })


})