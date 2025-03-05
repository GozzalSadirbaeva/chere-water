import React from 'react'

const NotFoundPage = () => {
  return (
    <div>
      <img src="/404.svg" alt="" />
      <p className='font-semibold text-2xl leading-[32px] pt-16 pb-6'dangerouslySetInnerHTML={{
            __html: parseHTMLString(t("not-found")),
          }}></p>
      <button className="hidden btn-bg md:flex gap-[10px] rounded-3xl text-white border-2 border-white px-5 py-2 mb-44" dangerouslySetInnerHTML={{
            __html: parseHTMLString(t("not-found-btn")),
          }}>
        
      </button>
    </div>
  )
}

export default NotFoundPage
