import { useState, useEffect, useRef } from 'react'
import './App.css'
import FallingStars from './FallingStars.jsx'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentMemory, setCurrentMemory] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [showParticles, setShowParticles] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState('local')
  const containerRef = useRef(null)
  const audioRef = useRef(null)

  const memories = [
    { id: 1, image: "/liv 1.jpg", text: "Langkah pertama kita memulai cerita ini ❤️" },
    { id: 2, image: "/liv 2.jpg", text: "Tawa yang menghapus lelah di perjalanan" },
    { id: 3, image: "/liv 3.jpg", text: "Kau genggam tanganku, seakan tak ingin lepas" },
    { id: 4, image: "/liv 4.jpg", text: "Malam itu kita berjanji untuk selalu berjuang" },
    { id: 5, image: "/liv 5.jpg", text: "Senja yang menyaksikan mimpi kita" },
    { id: 6, image: "/liv 6.jpg", text: "Kebersamaan yang sederhana namun berarti" },
    { id: 7, image: "/liv 7.jpg", text: "Kita menatap masa depan dengan yakin" },
    { id: 8, image: "/liv 8.jpg", text: "Langkah di jalan panjang, berdua" },
    { id: 9, image: "/liv 9.jpg", text: "Hujan turun, tapi kita tetap tertawa" },
    { id: 10, image: "/liv 10.jpg", text: "Pagi itu, kita sambut dunia bersama" },
    { id: 11, image: "/liv 11.jpg", text: "Perjalanan ini tak selalu mudah" },
    { id: 12, image: "/liv 12.jpg", text: "Namun hatimu selalu menjadi rumahku" },
    { id: 13, image: "/liv 13.jpg", text: "Kita lewati badai dengan erat" },
    { id: 14, image: "/liv 14.jpg", text: "Dan menyambut pelangi dengan senyum" },
    { id: 15, image: "/liv 15.jpg", text: "Setiap detik adalah perjuangan yang indah" },
    { id: 16, image: "/liv 16.jpg", text: "Bersamamu, setiap jarak terasa dekat" },
    { id: 17, image: "/liv 17.jpg", text: "Kita masih di jalan yang sama" },
    { id: 18, image: "/liv 18.jpg", text: "Dan akan terus melangkah… selamanya" }
  ]

  const songs = {
    local: {
      url: "/tulus diri.mp3",
      title: "LANY-you",
      description: "Lagu perjalanan cinta & perjuangan"
    },
    romantic: {
      url: "https://cdn.pixabay.com/audio/2022/03/15/audio_1808fbf07a.mp3",
      title: "Kenangan Romantis",
      description: "Mengiringi langkah kita"
    }
  }

  const handleStart = () => {
    setShowIntro(false)
    setShowParticles(true)
    setIsPlaying(true)
  }

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {})
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const openMemory = (memory, index) => {
    setCurrentMemory(index)
    setSelectedImage(memory)
    setShowParticles(true)
  }

  const closeMemory = () => {
    setSelectedImage(null)
  }

  const nextMemory = () => {
    const nextIndex = (currentMemory + 1) % memories.length
    setCurrentMemory(nextIndex)
    setSelectedImage(memories[nextIndex])
  }

  const prevMemory = () => {
    const prevIndex = currentMemory === 0 ? memories.length - 1 : currentMemory - 1
    setCurrentMemory(prevIndex)
    setSelectedImage(memories[prevIndex])
  }

  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#4b1c1c] via-[#2e0f0f] to-black flex items-center justify-center z-50">
        <div className="text-center text-white">
          <div className="animate-bounce mb-8 text-8xl">❤️🌹</div>
          <h1 className="text-5xl font-bold mb-4 animate-shimmer bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
            Selamat datang di perjalanan cinta kita
          </h1>
          <p className="text-xl mb-8 animate-fade-in italic text-red-200">
            Langkah demi langkah, kita jalani bersama — dalam tawa, air mata, dan doa.
          </p>
          <button
            onClick={handleStart}
            className="mt-6 px-6 py-3 bg-red-700 text-white rounded-full shadow-xl hover:bg-red-800 hover:scale-105 transition-transform duration-300 text-lg font-semibold"
          >
            🚀 Mulai Menyusuri Kisah Kita
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden" ref={containerRef}>
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4b1c1c] via-[#2e0f0f] to-black" style={{zIndex:0}}></div>
      </div>

      {showParticles && (
        <>
          <div className="fixed inset-0 pointer-events-none z-10">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                  zIndex: 10
                }}
              >
                {i % 2 === 0 ? '❤️' : '🌹'}
              </div>
            ))}
          </div>
          <FallingStars /> 
        </>
      )}

      <audio ref={audioRef} loop src={songs[currentSong].url} />
      <div className="fixed bottom-8 right-8 z-30 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/80 hover:bg-pink-200 text-pink-900 rounded-full shadow-lg p-4 flex items-center gap-2 transition-all"
          style={{backdropFilter:'blur(6px)'}}
        >
          {isPlaying ? '⏸️' : '▶️'} <span className="font-semibold">🎵 {songs[currentSong].title}</span>
        </button>
      </div>

      <header className="relative z-20 bg-white/10 backdrop-blur-md shadow-lg sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center">
          <div className="text-6xl mb-2">❤️🌹</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent animate-pulse">
            Jejak-jejak Perjalanan Cinta Kita
          </h1>
        </div>
      </header>

      <section className="relative z-20 text-center py-16 px-4 flex flex-col items-center">
  <div className="max-w-2xl mx-auto bg-white/10 rounded-3xl shadow-xl p-8 backdrop-blur-md border border-red-400">
    <div className="text-5xl mb-4 animate-bounce">🌹</div>
    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-pink-500 to-red-300 bg-clip-text text-transparent mb-8 animate-shimmer relative inline-block">
      Pesan singkat Dari Aku Untuk Perjalanan Kita 
      <span className="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 h-[3px] bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full animate-underline"></span>
    </h2>
    <p className="text-xl md:text-2xl font-light text-white mb-4 animate-fade-in italic">
      "Kita bukan hanya berjalan beriringan, tapi juga bertahan di tengah badai yang mencoba memisahkan, semoga kita bisa terus seperti ini."
    </p>
    <div className="text-2xl text-pink-300 animate-wave">❤️✨🌌</div>
  </div>
</section>



      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-red-200 mb-12 text-center flex items-center justify-center gap-2">
            <span>Galeri Perjalanan Kita</span> <span className="text-2xl">🌹</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {memories.map((memory, index) => (
              <div 
                key={memory.id}
                className="group relative bg-white/10 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-500 border-2 border-red-500"
                onClick={() => openMemory(memory, index)}
              >
                <img 
                  src={memory.image} 
                  alt={`Kenangan ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110 animate-float-wave"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-red-500 to-transparent p-2 text-white text-sm text-center">
                  {memory.text}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-20 bg-gradient-to-t from-[#2e0f0f] via-[#4b1c1c] to-black text-red-100 text-center py-4">
        <div className="text-3xl mb-2">❤️🌹✨</div>
        <p className="text-lg font-semibold">
          © Kisah ini ditulis oleh dua hati yang memilih untuk tetap berjuang.
        </p>
      </footer>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeMemory}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform scale-95 animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedImage.image} 
                alt="Detail Kenangan"
                className="w-full h-[70vh] object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-4 text-center text-lg italic">
                {selectedImage.text}
              </div>
              <button onClick={prevMemory} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-pink-200 rounded-full p-3 transition-all duration-300 hover:scale-110">←</button>
              <button onClick={nextMemory} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-pink-200 rounded-full p-3 transition-all duration-300 hover:scale-110">→</button>
              <button onClick={closeMemory} className="absolute top-4 right-4 bg-white/80 hover:bg-pink-200 rounded-full p-3 transition-all duration-300 hover:scale-110">✕</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
