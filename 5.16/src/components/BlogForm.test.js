import React from 'react'
import { render, fireEvent, userEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const submitBlogForm = jest.fn()

  const component = render(
    <BlogForm submitBlogForm={submitBlogForm} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('#blogForm')
  

  fireEvent.change(title, { 
    target: { value: 'Test Blog' } 
  })

  fireEvent.change(author, { 
    target: { value: 'Munnazzah' } 
  })

  fireEvent.change(url, { 
    target: { value: 'www.testblog.com' } 
  })

  fireEvent.submit(form)

  expect(submitBlogForm.mock.calls).toHaveLength(1)
  expect(submitBlogForm.mock.calls[0][0].title).toBe('Test Blog')
  expect(submitBlogForm.mock.calls[0][1].author).toBe('Munnazzah')
  expect(submitBlogForm.mock.calls[0][2].url).toBe('www.testblog.com')


})