export default function Footer() {
  return (
    <footer id="contact" className="dark-trigger relative overflow-hidden bg-grayBlue py-24 text-center">
      <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-grayBlue via-brandOrange to-grayBlue" />
      <div className="relative z-10 px-6">
        <h2 className="mb-8 text-3xl font-black text-white md:text-4xl">WORK WITH ME?</h2>
        <div className="mb-12 flex justify-center gap-8">
          <a
            href="https://wa.me/919136952869"
            className="hover-trigger text-3xl text-white transition-all hover:-translate-y-2 hover:text-brandOrange"
          >
            <i className="fab fa-whatsapp" />
          </a>
          <a
            href="mailto:Siddheshmy2@gmail.com"
            className="hover-trigger text-3xl text-white transition-all hover:-translate-y-2 hover:text-brandOrange"
          >
            <i className="fas fa-envelope" />
          </a>
          <a
            href="https://github.com/siddhesh-yeerabattini"
            className="hover-trigger text-3xl text-white transition-all hover:-translate-y-2 hover:text-brandOrange"
          >
            <i className="fab fa-github" />
          </a>
        </div>
        <p className="text-xs font-bold tracking-[0.3em] text-gray-500">© 2026 SIDDHESH YEERABATTINI</p>
      </div>
    </footer>
  )
}
