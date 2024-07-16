
import { groq } from 'next-sanity';
import { client } from '../../../../sanity/lib/client';
import Image from 'next/image';
import urlFor from '../../../../sanity/lib/urlFor';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 30; // Revalidate every 30 seconds

export async function generateStaticParams() {
  const query = groq`*[_type == 'post']{ "slug": slug.current }`;
  
  try {
    const slugs: { slug: string }[] = await client.fetch(query);
    console.log("Fetched slugs:", slugs); // Log the fetched slugs

    return slugs.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error fetching slugs:", error); // Log any errors
    return [];
  }
}

const Post = async ({ params: { slug } }: Props) => {
  const bodyQuery = groq `*[]`
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
    _id,
    title,
    description,
    mainImage,
    "author": author->{
      name,
      image
    },
    "categories": categories[]->{
      _id,
      title
    },
    _createdAt,
    "slug": slug.current
  }`;
  

  try {
    const postResponse = await client.fetch(query, { slug });
    const post = JSON.parse(JSON.stringify(postResponse)); // Ensure response is valid JSON
   const bodyText = await client.fetch(bodyQuery)
   const body = JSON.parse(JSON.stringify(bodyText))


    return (
      <article className="px-10 pb-28">
        <section className="space-y-2 text-white">
          <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
            <div className="absolute top-0 w-full opacity-10 blur-sm pb-10">
              <Image
                className="object-cover object-left mx-auto"
                src={urlFor(post.mainImage).url()}
                alt={post.author.name}
                height={300}
                width={300}
              />
            </div>
            <section className="mt-6 pb-5 bg-gray-700 w-full p-5">
              <div className="flex flex-col md:flex-row justify-between gap-y-5">
                <div>
                  <h1 className="text-4xl font-extrabold">{post.title}</h1>
                  <p>
                    {new Date(post._createdAt).toLocaleDateString('en-us', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    className="rounded-full"
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    height={40}
                    width={40}
                  />
                  <div className="w-64">
                    <h1 className="text-lg font-bold">{post.author.name}</h1>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div>
            <h1 className="italic pt-10 text-black">{post.description}</h1>
          </div>
          <div className="flex items-center justify-end mt-auto">
          {post.categories.map((category: Category) => (
              <div key={category._id}>
                {category.title} </div>
            ))}
          </div>
        </section>
      </article>
    );
  } catch (error) {
    console.error("Error fetching post:", error); // Log any errors
    return null; // Handle error appropriately
  }
};

export default Post;