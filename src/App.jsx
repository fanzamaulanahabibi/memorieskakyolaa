import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentMemory, setCurrentMemory] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [showParticles, setShowParticles] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState('local')
  const containerRef = useRef(null)
  const audioRef = useRef(null)

  // Data album kenangan - 4 foto lokal
  const memories = [
    {
      id: 1,
      image: "/liv 1.jpg"
    },
    {
      id: 2,
      image: "/liv 2.jpg"
    },
    {
      id: 3,
      image: "/liv 3.jpg"
    },
    {
      id: 4,
      image: "/liv 4.jpg"
    }
  ]

  // Opsi lagu - menggunakan file lokal tulus diri.mp3
  const songs = {
    local: {
      url: "/tulus diri.mp3",
      title: "Tulus Diri",
      description: "Lagu favorit untuk kenangan cinta"
    },
    romantic: {
      url: "https://cdn.pixabay.com/audio/2022/03/15/audio_1808fbf07a.mp3",
      title: "Lagu Romantis",
      description: "Membawa suasana cinta"
    }
  }

  // Handle scroll untuk efek parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intro animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false)
      setShowParticles(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-play musik saat website dibuka
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true)
    }, 2500) // Mulai musik setelah intro selesai
    return () => clearTimeout(timer)
  }, [])

  // Musik backsound romantis
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {})
    } else if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [isPlaying])

  // Handler klik di mana saja untuk memulai musik jika belum berjalan
  useEffect(() => {
    function handleUserClick() {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          setIsPlaying(true)
        })
      }
    }
    if (!isPlaying) {
      window.addEventListener('click', handleUserClick)
    }
    return () => {
      window.removeEventListener('click', handleUserClick)
    }
  }, [isPlaying])

  // Modal untuk melihat gambar lebih besar
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

  // Intro Screen
  if (showIntro) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-pink-300 via-red-200 to-purple-100 flex items-center justify-center z-50">
        <div className="text-center text-pink-900">
          <div className="animate-bounce mb-8 text-8xl">💕</div>
          <h1 className="text-5xl font-bold mb-4 animate-pulse">Album rangkaian Kebahgian kecil</h1>
          <p className="text-xl mb-8 animate-fade-in">Membuka album kenangan saya...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden" ref={containerRef}>
      {/* Background gradasi cinta dan kasih sayang */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-300 via-red-200 to-purple-100" style={{zIndex:0}}></div>
        {/* Gelombang cinta SVG di atas */}
        <svg className="absolute top-0 left-0 w-full h-24" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{zIndex:1}}>
          <path fill="#f9a8d4" fillOpacity="0.5" d="M0,40 C360,120 1080,-40 1440,60 L1440,0 L0,0 Z" />
          <path fill="#fda4af" fillOpacity="0.7" d="M0,60 C480,0 960,120 1440,40 L1440,0 L0,0 Z" />
        </svg>
        {/* Gelombang cinta SVG di bawah */}
        <svg className="absolute bottom-0 left-0 w-full h-24" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{zIndex:1}}>
          <path fill="#f3e8ff" fillOpacity="0.7" d="M0,60 C480,120 960,0 1440,40 L1440,100 L0,100 Z" />
        </svg>
      </div>

      {/* Floating particles: hati dan bunga */}
      {showParticles && (
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
              {i % 2 === 0 ? '💖' : '🌸'}
            </div>
          ))}
        </div>
      )}

      {/* Audio element & kontrol */}
      <audio ref={audioRef} loop src={songs[currentSong].url} />
      <div className="fixed bottom-8 right-8 z-30 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/80 hover:bg-pink-200 text-pink-900 rounded-full shadow-lg p-4 flex items-center gap-2 transition-all"
          style={{backdropFilter:'blur(6px)'}}
        >
          {isPlaying ? '⏸️' : '▶️'}
          <span className="font-semibold">🎵 Tulus Diri</span>
        </button>
        {isPlaying && (
          <div className="bg-white/80 backdrop-blur-md rounded-lg p-3 text-pink-900 text-sm animate-fade-in">
            <div className="font-semibold">🎵 {songs[currentSong].title}</div>
            <div className="text-xs opacity-75">{songs[currentSong].description}</div>
            <div className="text-xs opacity-75 mt-1">🔄 Loop otomatis</div>
          </div>
        )}
      </div>

      {/* Header dengan tema cinta */}
      <header className="relative z-20 bg-white/30 backdrop-blur-md shadow-lg sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center">
          <div className="text-6xl mb-2">💝</div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-400 bg-clip-text text-transparent animate-pulse">
            serpihan-serpihan kenangan kebahagian kecil dari bagian hidup saya
          </h1>
        </div>
      </header>

      {/* Hero Section dengan kalimat kenangan */}
      <section className="relative z-20 text-center py-16 px-4 flex flex-col items-center">
        <div className="max-w-2xl mx-auto bg-white/60 rounded-3xl shadow-xl p-8 backdrop-blur-md border border-pink-100">
          <div className="text-5xl mb-4 animate-bounce">💕</div>
          <p className="text-xl md:text-2xl font-semibold text-pink-900 mb-4 animate-fade-in">
            "barangkali kegagalan yang kudapatkan ini adalah menuju impian yang aku selalu minta pada tuhanku"
          </p>
          <div className="text-2xl text-pink-600 animate-wave">💖🌸💕</div>
        </div>
      </section>

      {/* Main Content: Galeri Foto Full Foto */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-pink-900 mb-12 text-center flex items-center justify-center gap-2">
            <span>Galeri Kenangan </span> <span className="text-2xl">💕</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {memories.map((memory, index) => (
              <div 
                key={memory.id}
                className="group relative bg-white/80 rounded-2xl shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-500 border-2 border-pink-100"
                onClick={() => openMemory(memory, index)}
              >
                <img 
                  src={memory.image} 
                  alt={`Kenangan Cinta ${index + 1}`}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110 animate-float-wave"
                />
                {/* Efek cinta di bawah foto */}
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-pink-100 to-transparent" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer dengan ilustrasi cinta */}
      <footer className="relative z-20 bg-gradient-to-t from-pink-100 via-red-100 to-white text-pink-900 py-12 mt-8 border-t-2 border-pink-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-3xl mb-2">💕🌸💖</div>
          <p className="text-lg font-semibold">
            © Dibuat dengan cinta dan kasih sayang.
          </p>
        </div>
      </footer>

      {/* Modal Full Foto */}
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
                alt="Kenangan Cinta Detail"
                className="w-full h-[70vh] object-cover"
              />
              {/* Navigation buttons */}
              <button 
                onClick={prevMemory}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-pink-200 rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                ←
              </button>
              <button 
                onClick={nextMemory}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-pink-200 rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                →
              </button>
              {/* Close button */}
              <button 
                onClick={closeMemory}
                className="absolute top-4 right-4 bg-white/80 hover:bg-pink-200 rounded-full p-3 transition-all duration-300 hover:scale-110"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
