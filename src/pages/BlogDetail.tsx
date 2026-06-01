import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PageBreadcrumb from '../components/PageBreadcrumb'

const blogs = [
  {
    id: 1,
    title: '10 Most Beautiful Places to Visit in 2025',
    category: 'DESTINATIONS',
    description: 'Discover the most stunning destinations around the world that will leave you breathless and craving for more adventures.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&auto=format&fit=crop',
    date: '10 MAY, 2025',
    author: 'Jane Doe',
    comments: 7,
    tags: ['Travel', 'Destinations', '2025', 'Adventure'],
    body: [
      'The world is full of breathtaking places waiting to be explored. From the turquoise waters of the Maldives to the ancient ruins of Machu Picchu, 2025 is the perfect year to tick off those bucket-list destinations.',
      'Whether you\'re drawn to the serene landscapes of New Zealand, the vibrant culture of Japan, or the sun-drenched coasts of the Amalfi, each destination offers a unique experience that stays with you long after you return home.',
      'Planning ahead is key. Book flights early, research local customs, and always leave room for spontaneous detours — often the best memories are made when you least expect them.',
      'From hidden gems in Southeast Asia to iconic European cities, our curated list covers every type of traveler. Solo adventurers, couples, and families alike will find something to inspire their next journey.',
      'Pack your bags, grab your passport, and get ready to explore the most beautiful corners of our planet in 2025.',
    ],
  },
  {
    id: 2,
    title: 'How to Pack Smart for Any Trip',
    category: 'TRAVEL TIPS',
    description: 'Master the art of packing light without sacrificing comfort. These proven tips will transform how you prepare for every journey.',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1200&auto=format&fit=crop',
    date: '12 MAY, 2025',
    author: 'John Smith',
    comments: 2,
    tags: ['Packing', 'Tips', 'Minimalist', 'Travel'],
    body: [
      'Overpacking is one of the most common travel mistakes. Lugging a heavy suitcase through cobblestone streets or paying airline baggage fees can quickly dampen the excitement of any trip.',
      'The golden rule: lay out everything you think you need, then put half of it back. Versatile clothing items that can be mixed and matched are your best friends. Stick to a neutral color palette so everything coordinates effortlessly.',
      'Invest in quality packing cubes — they compress your clothes and keep your bag organized. Roll instead of fold to save space and reduce wrinkles.',
      'Always pack a small day bag for excursions. A lightweight backpack that folds into its own pocket is ideal. Keep essentials like your passport, charger, and a change of clothes in your carry-on in case checked luggage is delayed.',
      'With a little planning, you can travel light, stress-free, and still have everything you need for an amazing trip.',
    ],
  },
  {
    id: 3,
    title: 'Top 5 Beaches You Must Visit This Summer',
    category: 'DESTINATIONS',
    description: 'From crystal-clear waters to pristine white sands, these beaches are the ultimate summer getaway destinations.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop',
    date: '15 MAY, 2025',
    author: 'Sarah Lee',
    comments: 5,
    tags: ['Beach', 'Summer', 'Destinations', 'Ocean'],
    body: [
      'Summer is synonymous with beaches, and 2025 has no shortage of stunning coastal escapes. Whether you prefer lively shores with beach bars and water sports or secluded coves with nothing but the sound of waves, there\'s a perfect beach for you.',
      'Navagio Beach in Greece stuns with its shipwreck backdrop and impossibly blue water. Whitehaven Beach in Australia stretches for seven kilometers of pure white silica sand. The pink sands of Harbour Island in the Bahamas are unlike anything you\'ve seen before.',
      'For those seeking adventure, the beaches of Bali offer world-class surfing alongside spiritual temples and lush rice terraces. And closer to home, the Outer Banks of North Carolina deliver wild, unspoiled coastline perfect for a road trip.',
      'Whichever beach you choose, remember to respect the environment — take only photos, leave only footprints, and help keep these natural wonders pristine for generations to come.',
    ],
  },
]

const popularPosts = [
  { id: 1, title: '10 Most Beautiful Places to Visit in 2025', date: '10 MAY, 2025', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=120&auto=format&fit=crop' },
  { id: 2, title: 'How to Pack Smart for Any Trip', date: '12 MAY, 2025', image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=120&auto=format&fit=crop' },
  { id: 3, title: 'Top 5 Beaches You Must Visit This Summer', date: '15 MAY, 2025', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&auto=format&fit=crop' },
]

const categories = ['DESTINATIONS', 'TRAVEL TIPS', 'ADVENTURE', 'FOOD']

function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const blog = blogs.find((b) => b.id === Number(id))

  const currentIndex = blogs.findIndex((b) => b.id === Number(id))
  const prevPost = currentIndex > 0 ? blogs[currentIndex - 1] : null
  const nextPost = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <p className="text-xl font-semibold mb-4">Post not found.</p>
        <button onClick={() => navigate('/blog')} className="text-teal-500 hover:underline flex items-center gap-1 cursor-pointer">
          <ArrowBackIcon fontSize="small" /> Back to Blog
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <PageBreadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: blog.title }]} />
      </div>

     
      <div className="w-full h-[320px] sm:h-[440px] lg:h-[540px] overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>

    
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

         
          <article className="w-full lg:w-[65%]">

         
            <button
              onClick={() => navigate('/blog')}
              className="flex items-center gap-1 text-xs uppercase tracking-widest text-teal-500 font-bold hover:opacity-70 transition cursor-pointer mb-8"
            >
              <ArrowBackIcon sx={{ fontSize: 15 }} /> Back to Blog
            </button>

            
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-teal-500 border border-teal-400 px-2 py-0.5">
                {blog.category}
              </span>
            </div>

            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-4">
              {blog.title}
            </h1>

            
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wide text-gray-400 font-medium mb-8 pb-8 border-b border-gray-100 dark:border-gray-700">
              <span>{blog.date}</span>
              <span className="text-gray-300 dark:text-gray-600">/</span>
              <span className="text-teal-500 font-semibold">{blog.comments} Comments</span>
              <span className="text-gray-300 dark:text-gray-600">/</span>
              <span>By {blog.author}</span>
            </div>

            
            <div className="space-y-5">
              {blog.body.map((para, i) => (
                <p key={i} className="text-gray-600 dark:text-gray-300 leading-[1.9] text-[15px]">
                  {para}
                </p>
              ))}
            </div>

            
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center gap-2">
              <LocalOfferIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase tracking-wider hover:border-teal-400 hover:text-teal-500 transition cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

           
            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-between gap-4">
              {prevPost ? (
                <button
                  onClick={() => navigate(`/blog/${prevPost.id}`)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-500 transition cursor-pointer group"
                >
                  <ChevronLeftIcon fontSize="small" />
                  <span className="text-left">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Previous</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-teal-500 transition line-clamp-1">{prevPost.title}</span>
                  </span>
                </button>
              ) : <div />}
              {nextPost ? (
                <button
                  onClick={() => navigate(`/blog/${nextPost.id}`)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-500 transition cursor-pointer group text-right"
                >
                  <span className="text-right">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Next</span>
                    <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-teal-500 transition line-clamp-1">{nextPost.title}</span>
                  </span>
                  <ChevronRightIcon fontSize="small" />
                </button>
              ) : <div />}
            </div>
          </article>

          
          <aside className="w-full lg:w-[35%] flex flex-col gap-10">

          
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white mb-5 pb-3 border-b-2 border-teal-500 inline-block">
                About the Author 
              </h3>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-teal-600 font-black text-xl flex-shrink-0">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-gray-800 dark:text-white text-sm">{blog.author}</div>
                  <div className="text-xs text-gray-400 mt-0.5">Travel Writer &amp; Explorer</div>
                </div>
              </div>
            </div>

          
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white mb-5 pb-3 border-b-2 border-teal-500 inline-block">
                Popular Posts
              </h3>
              <div className="flex flex-col gap-4 mt-4">
                {popularPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.id}`)}
                    className="flex gap-3 cursor-pointer group"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-14 object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-teal-500 transition leading-snug">
                        {post.title}
                      </div>
                      <div className="text-[11px] uppercase tracking-wide text-gray-400 mt-1">{post.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

           
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-900 dark:text-white mb-5 pb-3 border-b-2 border-teal-500 inline-block">
                Categories
              </h3>
              <div className="flex flex-col mt-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => navigate('/blog')}
                    className="text-left py-2.5 border-b border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-500 hover:pl-2 transition-all duration-200 cursor-pointer font-medium uppercase tracking-wide text-[11px]"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
