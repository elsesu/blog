function Banner () {
  return (
    <div className='flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold'>
      <div>
        <h1 className='text-7xl text-white font-bold rounded-lg p-3 bg-black'>Sesu Daily Blog</h1>
        <h2 className='mt-5 md:mt-0'>Welcome To {" "} <span className='underline decoration-4'>The Best Blog In The Country</span>{" "}</h2>
      </div>
      <h1 className='mt-5 text-white max-w-sm p-3 bg-black font-bold rounded-lg'> New Stories | The Newest Trends in AI | The Monthly Story </h1>
      
    </div>
  )
}

export default Banner
