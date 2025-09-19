import { useState, useEffect, useRef } from 'react'
import './App.css'
import FallingStars from './FallingStars.jsx'

function App() {
  // STATE
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentMemory, setCurrentMemory] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [showParticles, setShowParticles] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const containerRef = useRef(null)
  const audioRef = useRef(null)

  // 1 LAGU SAJA
  const songUrl = '/lagu1.mp3'

  // ALBUM + KATA-KATA ULANG TAHUN
  const memories = [
    { id: 1,  image: "/liv 1.jpg",  text: "Hari ini kamu lahir; dunia jadi lebih hangat. Selamat ulang tahun, sayang." },
    { id: 2,  image: "/liv 2.jpg",  text: "Semoga setiap langkahmu dipenuhi tawa yang kita simpan di foto ini." },
    { id: 3,  image: "/liv 3.jpg",  text: "Aku berdoa: sehat, berkah, rezeki yang lapang, hati yang tenang." },
    { id: 4,  image: "/liv 4.jpg",  text: "Terima kasih sudah tumbuh bersama—kita belajar, jatuh, lalu bangkit lagi." },
    { id: 5,  image: "/liv 5.jpg",  text: "Kue mungkin habis; doaku untukmu tidak pernah." },
    { id: 6,  image: "/liv 6.jpg",  text: "Keinginanmu malam ini? Bisikkan—biar aku jadi orang pertama yang meng-amin-kan." },
    { id: 7,  image: "/liv 7.jpg",  text: "Semesta tak selalu ramah, tapi kamu selalu berani. Aku bangga." },
    { id: 8,  image: "/liv 8.jpg",  text: "Di tiap lilin yang padam, ada harap yang menyala di masa depanmu." },
    { id: 9,  image: "/liv 9.jpg",  text: "Usia boleh bertambah; manisnya senyummu tetap sama." },
    { id: 10, image: "/liv 10.jpg", text: "Semoga langkahmu dipermudah—dari hal kecil yang diam-diam kau perjuangkan." },
    { id: 11, image: "/liv 11.jpg", text: "Terima kasih sudah jadi rumah paling hangat di dadaku." },
    { id: 12, image: "/liv 12.jpg", text: "Kita tidak butuh pesta besar; cukup kamu, aku, dan masa depan yang dirajut." },
    { id: 13, image: "/liv 13.jpg", text: "Jika lelah, istirahat di pundakku; sisanya biar aku jagakan." },
    { id: 14, image: "/liv 14.jpg", text: "Semoga Tuhan menjaga semua yang kamu titipkan lewat doa malam ini." },
    { id: 15, image: "/liv 15.jpg", text: "Aku mencintaimu—hari ini, esok, selamanya. Selamat ulang tahun." },
    { id: 16, image: "/liv 16.jpg", text: "Mari terus menua seperti lagu favorit: tak pernah bosan didengar." },
    { id: 17, image: "/liv 17.jpg", text: "Hadiah terbaikku: hadir di sisimu, setiap hari." },
    { id: 18, image: "/liv 18.jpg", text: "Bersoraklah untuk mimpi-mimpimu; aku penonton paling setia." },
    { id: 19, image: "/liv 19.jpg", text: "Semoga setiap foto ini jadi pintu kecil menuju kenangan yang indah." },
    { id: 20, image: "/liv 20.jpg", text: "Sekali lagi aku ucapkan selamat ulang tahun semoga kita bisa seperti ini selamanya" },
  ]

  // Sinkron tombol ↔ audio element
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    if (isPlaying) {
      el.play().catch(() => setIsPlaying(false))
    } else {
      el.pause()
    }
  }, [isPlaying])

  // Mulai musik ketika tombol intro diklik
  const handleStart = () => {
    setShowIntro(false)
    setShowParticles(true)
    const el = audioRef.current
    if (el) {
      el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(true))
    } else {
      setIsPlaying(true)
    }
  }

  const openMemory = (memory, index) => { setSelectedImage(memory); setCurrentMemory(index) }
  const closeMemory = () => setSelectedImage(null)
  const nextMemory  = () => setCurrentMemory(p => (p + 1) % memories.length)
  const prevMemory  = () => setCurrentMemory(p => (p - 1 + memories.length) % memories.length)

  useEffect(() => {
    if (selectedImage) setSelectedImage(memories[currentMemory])
  }, [currentMemory]) // eslint-disable-line

  if (showIntro) {
    return (
      <div className="fixed inset-0 theme-birthday-bg flex items-center justify-center z-50">
        <div className="text-center theme-birthday-text">
          <div className="animate-bounce mb-8 text-8xl">🎁✨</div>
          <h1 className="text-5xl font-bold mb-4 theme-birthday-gradient-text">Selamat Ulang Tahun Riska Wulandari</h1>
          <p className="text-xl mb-8 animate-fade-in italic">
            Semoga setiap foto di album ini jadi doa yang indah — untuk langkahmu hari ini dan esok.
          </p>
          <button onClick={handleStart} className="theme-birthday-button">✨ Buka Hadiah </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden" ref={containerRef}>
      <div className="fixed inset-0 z-0 theme-birthday-bg" />

      {showParticles && (
        <>
          <div className="fixed inset-0 pointer-events-none z-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  zIndex: 10,
                }}
              >
                {i % 2 === 0 ? '🎀' : '🎉'}
              </div>
            ))}
          </div>
          <FallingStars />
        </>
      )}

      {/* Audio (single song) */}
      <div className="fixed bottom-4 right-4 z-40 theme-birthday-surface px-3 py-2 rounded-full shadow-lg flex items-center gap-2">
  <button className="theme-birthday-button" onClick={() => setIsPlaying(p => !p)}>
    {isPlaying ? '⏸︎ Pause' : '▶︎ Play'}
  </button>
  <audio ref={audioRef} src={songUrl} loop preload="auto" playsInline />
</div>


      {/* Header */}
      <header className="relative z-20 theme-birthday-surface sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center">
          <div className="text-6xl mb-2">🎁✨</div>
          <h1 className="text-4xl font-bold theme-birthday-gradient-text animate-pulse">
            Hadiah Ucapan & Album Ulang Tahun
          </h1>
          <p className="mt-2 text-sm opacity-80 theme-birthday-text">Dari aku, untukmu — dengan cinta.</p>
        </div>
      </header>

      {/* Pesan pembuka */}
      <section className="relative z-20 text-center py-16 px-4 flex flex-col items-center">
        <div className="max-w-2xl mx-auto theme-birthday-surface p-8">
          <div className="text-5xl mb-4 animate-bounce">🎂</div>
          <h2 className="text-3xl md:text-4xl font-bold theme-birthday-gradient-text mb-6">
            Rangkaian Doa untuk Hari Spesialmu
          </h2>
          <p className="text-xl md:text-2xl font-light italic theme-birthday-text">
            “Terima kasih sudah menjadi rumah paling hangat di hatiku. Semoga hari ini penuh tawa,
            berkah, dan kejutan manis. Aku selalu ada — hari ini, esok, dan seterusnya.”
          </p>
          <div className="text-2xl theme-birthday-accent animate-wave mt-4">🤍✨🎀</div>
        </div>
      </section>

      {/* Galeri */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <section className="mb-16">
          <h3 className="text-3xl font-bold theme-birthday-accent mb-12 text-center flex items-center justify-center gap-2">
            <span>Album Hadiah Untukmu</span> <span className="text-2xl">🎀</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                className="group relative theme-birthday-card overflow-hidden cursor-pointer card-hover-soft"
                onClick={() => openMemory(memory, index)}
              >
                <img
                  src={memory.image}
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Foto'; }}
                  alt={`Kenangan ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110 animate-float-wave"
                />
                <div
                  className="absolute bottom-0 left-0 w-full p-3 text-white text-sm text-center"
                  style={{ background: 'linear-gradient(0deg, rgba(232,107,145,.85), rgba(232,107,145,0))' }}
                >
                  {memory.text}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal detail foto */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeMemory}
        >
          <div
            className="relative max-w-3xl w-full theme-birthday-card p-4"
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius: '18px' }}
          >
            <img
              src={selectedImage.image}
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/1200x800?text=Foto'; }}
              alt="detail"
              className="w-full h-[70vh] object-contain"
              style={{ borderRadius: '18px' }}
            />
            <div className="mt-3 theme-birthday-text text-center text-lg">{selectedImage.text}</div>

            <button onClick={prevMemory} className="absolute left-2 top-1/2 -translate-y-1/2 theme-birthday-button px-3 py-2">←</button>
            <button onClick={nextMemory} className="absolute right-2 top-1/2 -translate-y-1/2 theme-birthday-button px-3 py-2">→</button>
            <button onClick={closeMemory} className="absolute -top-3 -right-3 theme-birthday-button px-3 py-2">✕</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-20 text-center py-6 theme-birthday-surface">
        <div className="text-3xl mb-2">🎂🎁✨</div>
        <p className="text-lg font-semibold theme-birthday-text">
          © Hari ini kita merayakan kamu — dan segala doa terbaik untuk masa depanmu.
        </p>
      </footer>
    </div>
  )
}

export default App
