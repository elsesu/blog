"use client"
import React from 'react'
import { usePreview } from '../../../sanity.preview'
import BlogList from './BlogList'

type Props = {
    query:string
}
const PreviewBloglist = ({query}:Props) => {
    const posts = usePreview(null, query)

  return <BlogList posts={posts}/>
   
  
}

export default PreviewBloglist
