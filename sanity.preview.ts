"use client"

import { projectId, dataset } from "./sanity/env"

function onPublicAccesOnly(){
    throw new Error('unable to load preview')
}

if(!projectId || !dataset){
    throw new Error('missing projectid or dataset')
}
function definePreview(e:any){
return e
} 

export const usePreview = definePreview({
    projectId,
    dataset,
    onPublicAccesOnly,
})