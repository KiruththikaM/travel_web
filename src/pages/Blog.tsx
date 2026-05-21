import Card from '../components/Card'
import Search from '../components/Search'
import { useState } from 'react'



function Blog() {

  const [search, setSearch] = useState('')

  const blogs = [
  {
    id: 1,
    title: '10 Most Beautiful Places to Visit in 2025',
    category: 'DESTINATIONS',
    description: 'Discover the most stunning destinations around the world.',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWT-7DycWq2GLmonKXV2v4VAvdpomwMKiXZA&s',
  },

   {
    id: 2,
    title: 'How to Pack Smart for Any Trip',
    category: 'TRAVEL TIPS',
    description: 'Discover the most stunning destinations around the world.',
    image:
      'https://media.istockphoto.com/id/1130399708/photo/retro-camera-with-toy-plane-map-and-passport-on-white-background-travel-tips-concept.jpg?s=612x612&w=0&k=20&c=lyqWKkc0ZMjkTwCGk5gcUe9_HxXxRqfriWfIwpdnJSA=',
  },

  


]
  const filteredBlogs = blogs.filter((blog) =>
  blog.title.toLowerCase().includes(search.toLowerCase())
)
  

  return (
    <div>
    <div className='flex flex-wrap'>
        <div className=' px-80 py-20'>
            <div className='text-xm'>OUR BLOG </div>
            <div className='font-black text-4xl pt-2'>Travel Stories & Tips</div>
            <div className='font-black text-4xl'>From Around The World</div>
            <div className='text-xm pt-2'>Explore travel guides,tips,and inspiring stories to <br /> palen your next adventure. </div>
            <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className='pt-3 translate-1/4'><img src="https://png.pngtree.com/png-vector/20230902/ourmid/pngtree-tourist-couple-standing-at-the-airport-with-passport-and-suitcase-3d-png-image_9240130.png" alt="blog" />  </div>
         <div className='pt-20 '><img src="https://www.transparentpng.com/thumb/travel/RALK0S-travel-suitcase-airplane-photo-tour-clipart-photo.png" alt="blog" />  </div>
        
    </div>

<div className="flex gap-2 bg-slate-300 px-50 pt-20">

  
  <div className="w-2/3 flex flex-col gap-6">

    {filteredBlogs.map((blog) => (

      <Card key={blog.id} className="w-230 p-5 ">

        <div className="flex gap-3">

          <div className="w-1/2">
            <img
              className="w-75 h-50 object-cover rounded-md"
              src={blog.image}
              alt="blog"
            />
          </div>

          <div className="w-2/2 ">

            <div className="text-xs text-blue-500 font-bold">
              {blog.category}
            </div>

            <div className="text-xl font-bold pt-2">
              {blog.title}
            </div>

            <div className="text-sm text-gray-500 pt-2">
              {blog.description}
            </div>

          </div>

        </div>

      </Card>

    ))}

  </div>

 
  <div className="w-1/3 flex flex-col gap-6">

    
    <Card className="p-5">
      <div className="font-bold text-xl pb-3">
        Search
      </div>

      <Search
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Card>

    
    <Card className="p-5">

      <div className="font-bold text-xl pb-3">
        Popular Posts
      </div>

      <div className="flex flex-col gap-4">

        <div>
          <div className="font-semibold">
            Top 5 Beaches You Must Visit
          </div>

          <div className="text-sm text-gray-500">
            May 10, 2025
          </div>
        </div>

        <div>
          <div className="font-semibold">
            Budget Travel Tips
          </div>

          <div className="text-sm text-gray-500">
            May 12, 2025
          </div>
        </div>

      </div>

    </Card>

  </div>

</div>





    </div>
  )
}

export default Blog
