

import { groq } from "next-sanity";
import { client } from "../../sanity/lib/client";
import BlogList from "./components/BlogList";



const query =  groq`
*[_type== 'post']{
  ...,
  author->,
  categories[]->
} | order(createdAt desc)
`

export default async function Home() {

    const posts = await client.fetch(query)
 
  return (

    <div className="text-4xl"><h1 className="bg-green-400 rounded-lg p-3 text-white font-bold">My tech Blog</h1>
    <BlogList posts={posts}/>
    </div>
  );
}
