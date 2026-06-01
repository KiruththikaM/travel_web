import Card from '../components/Card'
import Search from '../components/Search'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chip } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import usePagination from '../hooks/usePagination'
import PageBreadcrumb from '../components/PageBreadcrumb'

const blogs = [
  {
    id: 1,
    title: '10 Most Beautiful Places to Visit in 2025',
    category: 'DESTINATIONS',
    description:
      'Discover the most stunning destinations around the world that will leave you breathless and craving for more adventures.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWT-7DycWq2GLmonKXV2v4VAvdpomwMKiXZA&s',
    date: 'May 10, 2025',
    author: 'Jane Doe',
  },
  {
    id: 2,
    title: 'How to Pack Smart for Any Trip',
    category: 'TRAVEL TIPS',
    description:
      'Master the art of packing light without sacrificing comfort. These proven tips will transform how you prepare for every journey.',
    image:
      'https://media.istockphoto.com/id/1130399708/photo/retro-camera-with-toy-plane-map-and-passport-on-white-background-travel-tips-concept.jpg?s=612x612&w=0&k=20&c=lyqWKkc0ZMjkTwCGk5gcUe9_HxXxRqfriWfIwpdnJSA=',
    date: 'May 12, 2025',
    author: 'John Smith',
  },
  {
    id: 3,
    title: 'Top 5 Beaches You Must Visit This Summer',
    category: 'DESTINATIONS',
    description:
      'From crystal-clear waters to pristine white sands, these beaches are the ultimate summer getaway destinations.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop',
    date: 'May 15, 2025',
    author: 'Sarah Lee',
  },
]

const popularPosts = [
  { title: 'Top 5 Beaches You Must Visit', date: 'May 10, 2025' },
  { title: 'Budget Travel Tips for 2025', date: 'May 12, 2025' },
  { title: 'Best Street Food Around the World', date: 'May 18, 2025' },
  { title: 'Solo Travel Safety Guide', date: 'May 20, 2025' },
]

const categories = ['All', 'DESTINATIONS', 'TRAVEL TIPS', 'FOOD', 'ADVENTURE']

const categoryColors: Record<string, 'primary' | 'success' | 'warning' | 'error' | 'default'> = {
  DESTINATIONS: 'primary',
  'TRAVEL TIPS': 'success',
  FOOD: 'warning',
  ADVENTURE: 'error',
}

function Blog() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const navigate = useNavigate()

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const { currentItems, currentPage, totalPages, goToPage, resetPage, hasNext, hasPrev } =
    usePagination(filteredBlogs, 2)

  
  useEffect(() => {
    resetPage()
  }, [search, activeCategory])

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 ">
        <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />
      </div>
      
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-10">
        
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">
                Our Blog
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-gray-900 dark:text-white">
                Travel Stories &amp; Tips
                <span className="block text-blue-600">From Around The World</span>
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
                Explore travel guides, tips, and inspiring stories to plan your next adventure.
              </p>
              <div className="mt-6 max-w-md mx-auto lg:mx-0">
                <Search value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>

            
            <div className="flex-1 flex justify-center items-end gap-4 relative">
              <img
                src="https://png.pngtree.com/png-vector/20230902/ourmid/pngtree-tourist-couple-standing-at-the-airport-with-passport-and-suitcase-3d-png-image_9240130.png"
                alt="Travelers"
                className="w-56 sm:w-72 lg:w-80 object-contain drop-shadow-xl"
              />
              <img
                src="https://www.transparentpng.com/thumb/travel/RALK0S-travel-suitcase-airplane-photo-tour-clipart-photo.png"
                alt="Travel gear"
                className="w-28 sm:w-36 lg:w-44 object-contain drop-shadow-xl mb-4"
              />
            </div>
          </div>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">

        
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-lg">
                No posts found matching your search.
              </div>
            ) : (
              currentItems.map((blog) => (
                <Card key={blog.id} hover className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                   
                    <div className="w-full sm:w-56 lg:w-64 flex-shrink-0">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-52 sm:h-full object-cover"
                        style={{ minHeight: '180px' }}
                      />
                    </div>

                   
                    <div className="flex flex-col justify-between p-5 flex-1">
                      <div>
                        <Chip
                          label={blog.category}
                          color={categoryColors[blog.category] ?? 'default'}
                          size="small"
                          className="mb-3"
                          sx={{ fontWeight: 700, fontSize: '0.65rem', letterSpacing: 1 }}
                        />
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white leading-snug mt-2">
                          {blog.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                          {blog.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <CalendarTodayIcon sx={{ fontSize: 13 }} />
                          {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <PersonIcon sx={{ fontSize: 13 }} />
                          {blog.author}
                        </span>
                        <button className="ml-auto text-blue-600 font-semibold hover:underline text-xs cursor-pointer" onClick={() => navigate(`/blog/${blog.id}`)}>
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}

            
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={!hasPrev}
                  className="px-4 py-2 rounded-lg border text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 cursor-pointer"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-9 h-9 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                      page === currentPage
                        ? 'bg-blue-600 text-white border-blue-600 shadow'
                        : 'text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={!hasNext}
                  className="px-4 py-2 rounded-lg border text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 cursor-pointer"
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3 flex flex-col gap-6">

           
            <Card className="p-5">
              <div className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Search</div>
              <Search value={search} onChange={(e) => setSearch(e.target.value)} />
            </Card>

            
            <Card className="p-5">
              <div className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Categories</div>
              <div className="flex flex-col gap-2">
                {categories.filter((c) => c !== 'All').map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                    }`}
                  >
                    {cat}
                  </button>
                  
                ))}
              </div>
            </Card>

          
            <Card className="p-5">
              <div className="font-bold text-lg mb-3 text-gray-800 dark:text-white">Popular Posts</div>
              <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
                {popularPosts.map((post, i) => (
                  <div key={i} className="py-3 first:pt-0 last:pb-0">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 cursor-pointer transition-colors">
                      {post.title}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <CalendarTodayIcon sx={{ fontSize: 11 }} />
                      {post.date}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
