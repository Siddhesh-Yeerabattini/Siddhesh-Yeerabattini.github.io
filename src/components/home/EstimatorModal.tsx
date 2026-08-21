import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getEstimate } from '../../lib/gemini'

export default function EstimatorModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const closeModal = () => {
    setIsOpen(false)
    setResult(null)
    setError(null)
    setDescription('')
  }

  const handleAnalyze = async () => {
    if (!description.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const estimate = await getEstimate(description)
      setResult(estimate)
    } catch (err) {
      setError(
        err instanceof Error
          ? `Sorry, I couldn't generate an estimate right now (${err.message}). Please reach out directly at Siddheshmy2@gmail.com.`
          : "Sorry, I couldn't generate an estimate right now. Please reach out directly at Siddheshmy2@gmail.com.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mt-12 text-center">
        <button
          onClick={() => setIsOpen(true)}
          className="hover-trigger group inline-flex items-center gap-2 rounded-full bg-grayBlue px-8 py-4 font-bold text-white shadow-xl transition-all hover:scale-105 hover:bg-brandOrange"
        >
          <i className="fas fa-magic text-yellow-400 group-hover:animate-spin" />
          <span>Get Instant AI Quote</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-grayBlue/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative bg-grayBlue p-6">
                <h3 className="mb-1 text-2xl font-bold text-white">✨ Project Estimator</h3>
                <button
                  onClick={closeModal}
                  className="absolute right-4 top-4 text-white/50 transition-colors hover:text-white"
                  aria-label="Close estimator"
                >
                  <i className="fas fa-times text-xl" />
                </button>
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-brandOrange/20 blur-xl" />
              </div>

              {/* Body */}
              <div className="p-6">
                <label className="mb-2 block text-sm font-bold text-gray-700">Describe your project idea:</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-4 w-full rounded-lg border border-gray-200 p-3 text-sm focus:border-brandOrange focus:outline-none focus:ring-1 focus:ring-brandOrange"
                  placeholder="E.g., I need a 5-page React website for my bakery with a contact form..."
                />

                {(result || error) && (
                  <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-600">
                    {error ? (
                      <p>{error}</p>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: result ?? '' }} />
                    )}
                  </div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={loading || !description.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-brandOrange py-3 font-bold text-white transition-colors hover:bg-grayBlue disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>{loading ? 'Analyzing...' : 'Analyze Estimate'}</span>
                  <i className={loading ? 'fas fa-spinner fa-spin' : 'fas fa-calculator'} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
