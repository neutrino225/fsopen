/** @format */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import CreateBlog from '../components/CreateBlog'

describe('Checking if it renders correctly', () => {
  test('renders content', () => {
    const blog = {
      title: 'Test title',
      author: 'Test Author',
      url: 'www.testing.com',
      likes: 10,
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.initialBlog')

    expect(div).toHaveTextContent('Test title')
    expect(div).toHaveTextContent('Test Author')
    expect(div).not.toHaveTextContent('www.testing.com')
    expect(div).not.toHaveTextContent('10')
  })
})

describe('Visibility of the blog', () => {
  test('clicking the button shows the blog', async () => {
    const blog = {
      title: 'Test title',
      author: 'Test Author',
      url: 'www.testing.com',
      likes: 10,
    }

    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} updateBlog={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.finalBlog')

    expect(div).toHaveTextContent('www.testing.com')
    expect(div).toHaveTextContent('10')
  })

  describe('Clicking the like button', () => {
    test('clicking the button twice calls event handler twice', async () => {
      const blog = {
        title: 'Test title',
        author: 'Test Author',
        url: 'www.testing.com',
        likes: 10,
      }

      const mockHandler = jest.fn()

      render(<Blog blog={blog} updateBlog={mockHandler} />)
      const user = userEvent.setup()
      const button = screen.getByText('view')
      await user.click(button)

      const likeButton = screen.getByText('like')
      await user.click(likeButton)
      await user.click(likeButton)

      expect(mockHandler.mock.calls).toHaveLength(2)
    })
  })

  describe('CreateBlog', () => {
    test('The new blog is valid and is also added to the list', async () => {
      const createBlog = jest.fn()
      const user = userEvent.setup()

      const { container } = render(<CreateBlog createBlog={createBlog} />)

      const title = container.querySelector('#title')
      const author = container.querySelector('#author')
      const url = container.querySelector('#url')

      await user.type(title, 'Test title')
      await user.type(author, 'Test Author')
      await user.type(url, 'www.testing.com')

      const createButton = screen.getByText('create')
      await user.click(createButton)

      expect(createBlog.mock.calls).toHaveLength(1)
      expect(createBlog.mock.calls[0][0].title).toBe('Test title')
      expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
      expect(createBlog.mock.calls[0][0].url).toBe('www.testing.com')
    })
  })
})
