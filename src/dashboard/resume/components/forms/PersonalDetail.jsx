import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LocalStorageApi from './../../../../../service/LocalStorageApi'
import { toast } from 'sonner'

function PersonalDetail({ enabledNext }) {
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Reset initialization when resumeId changes
  useEffect(() => {
    setIsInitialized(false);
  }, [params?.resumeId]);

  useEffect(() => {
    // Initialize form data when resumeInfo becomes available (only once per resume)
    if (resumeInfo && Object.keys(resumeInfo).length > 0 && !isInitialized) {
      const newFormData = {
        firstName: resumeInfo.firstName || '',
        lastName: resumeInfo.lastName || '',
        jobTitle: resumeInfo.jobTitle || '',
        address: resumeInfo.address || '',
        phone: resumeInfo.phone || '',
        email: resumeInfo.email || '',
      }
      setFormData(newFormData)
      setIsInitialized(true)
    }
  }, [resumeInfo, isInitialized])

  const handleInputChange = (e) => {
    enabledNext(false)
    const { name, value } = e.target

    const newFormData = {
      ...formData,
      [name]: value,
    }
    setFormData(newFormData)

    setResumeInfo(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)

    // Trim string fields before saving
    const cleaned = Object.fromEntries(
      Object.entries(formData).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
    )

    LocalStorageApi.UpdateResumeDetail(params?.resumeId, { data: cleaned }).then(
      () => {
        enabledNext(true)
        setLoading(false)
        toast('Details updated')
      },
      () => {
        setLoading(false)
      }
    )
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get started with your basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              value={formData.firstName || ''}
              placeholder="Enter your first name"
              autoComplete="given-name"
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              value={formData.lastName || ''}
              placeholder="Enter your last name"
              autoComplete="family-name"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              value={formData.jobTitle || ''}
              placeholder="e.g., Frontend Developer"
              autoComplete="organization-title"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              value={formData.address || ''}
              placeholder="Street, City, State (optional)"
              autoComplete="street-address"
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              type="tel"
              value={formData.phone || ''}
              placeholder="e.g., +91 98765 43210"
              autoComplete="tel"
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              type="email"
              value={formData.email || ''}
              placeholder="e.g., you@example.com"
              autoComplete="email"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail
