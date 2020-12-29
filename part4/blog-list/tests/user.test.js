const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('132132', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

test('user - creation succeeds with a fresh username', async () => {
  const usersAtStart = await helper.usersInDB()

  const newUser = {
    username: 'mkwan',
    name: 'Matthew Kwan',
    password: '132132',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDB()
  expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

afterAll(() => {
  mongoose.connection.close()
})