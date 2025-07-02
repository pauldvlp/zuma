import { useEffect } from 'react'

export const Footer = () => {
  const handleScroll: EventListener = () => {
    console.log(window)
    document.querySelector('[data-scroll-top]')
      ?.setAttribute('data-scroll-top', JSON.stringify(window.scrollY === 0))
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      data-scroll-top={true}
      className='data-[scroll-top=true]:fixed data-[scroll-top=true]:bottom-0 data-[scroll-top=true]:inset-x-0 data-[scroll-top=true]:z-10 bg-background transition duration-300'
    >
      <footer className='max-w-5xl mx-auto p-4 md:px-8 md:py-6 text-center'>
        Hecho con 💛 por
        {' '}
        <a
          className='hover:underline text-accent-foreground'
          href='https://github.com/pauldvlp'
          target='_blank'
          rel='noopener noreferrer'
        >
          pauldvlp
        </a>
      </footer>
    </div>
  )
}
