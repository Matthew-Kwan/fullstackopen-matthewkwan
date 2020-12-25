const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => { 
  return blogs.reduce((sum,blog) => {
    return sum + blog.likes
  }, 0)
}

const favouriteBlog = (blogs) => {
  max_likes = Math.max.apply(Math, blogs.map((blog) => {return blog.likes}))
  return_blog = blogs.filter(blog => blog.likes == max_likes)[0]

  delete return_blog._id
  delete return_blog.__v
  delete return_blog.url

  return return_blog
}

module.exports = {
  dummy,      
  totalLikes,
  favouriteBlog
}