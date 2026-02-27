'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function InterviewSetupPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'resume' | 'manual' | null>(null)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [experience, setExperience] = useState('')
  const [location, setLocation] = useState('')

  const canProceed =
    (mode === 'resume' && !!resumeFile) ||
    (mode === 'manual' && role.trim() && company.trim())

  const handleProceed = async () => {
    if (mode === 'manual') {
      const params = new URLSearchParams({ role, company, experience, location })
      router.push(`/interview/session?${params.toString()}`)
    } else {
      router.push(`/interview/session?via=resume`)
    }
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (f) setResumeFile(f)
  }
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) setResumeFile(f)
  }
  const openPicker = () => fileInputRef.current?.click()

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-blue-50 px-6 py-4 shadow-sm flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Mock Interview – Setup</h1>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <p className="text-gray-600 mb-6">
          Upload your resume or choose the role & company manually. Then proceed to the interview.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <button
            onClick={() => setMode('resume')}
            className={`rounded-2xl text-left p-5 border transition-all ${
              mode === 'resume' ? 'border-blue-600 ring-2 ring-blue-100 bg-white' : 'border-blue-100 bg-white hover:border-blue-300'
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Resume</h3>
            <p className="text-sm text-gray-500">PDF / DOCX (max 5 MB).</p>
          </button>

          <button
            onClick={() => setMode('manual')}
            className={`rounded-2xl text-left p-5 border transition-all ${
              mode === 'manual' ? 'border-blue-600 ring-2 ring-blue-100 bg-white' : 'border-blue-100 bg-white hover:border-blue-300'
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Role & Company</h3>
            <p className="text-sm text-gray-500">Enter your target role and company.</p>
          </button>
        </div>

        {mode === 'resume' && (
          <section className="bg-white border border-blue-50 rounded-2xl p-6 mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">Resume</h4>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center bg-blue-50/40"
            >
              <p className="text-sm text-gray-500 mb-3">Drag & drop your file here, or</p>
              <button
                type="button"
                onClick={openPicker}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Browse files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={onSelectFile}
              />
              {resumeFile && (
                <p className="mt-3 text-sm text-gray-700">
                  Selected: <span className="font-medium">{resumeFile.name}</span>
                </p>
              )}
            </div>
          </section>
        )}

        {mode === 'manual' && (
          <section className="bg-white border border-blue-50 rounded-2xl p-6 mb-6">
            <h4 className="font-semibold text-gray-800 mb-4">Role Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Role <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g., Software Engineer"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Company <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Google"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Years of Experience (optional)</label>
                <input
                  type="number"
                  min={0}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g., 2"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Location (optional)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Chennai"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </section>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => history.back()}
            className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>
          <button
            disabled={!canProceed}
            onClick={handleProceed}
            className={`px-5 py-2 text-sm rounded-lg font-semibold ${
              canProceed ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Proceed
          </button>
        </div>
      </main>
    </div>
  )
}