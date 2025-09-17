'use client'
import { User } from '@/app/types'
import { USERS_URL } from '@/app/utils/constants'
import { default as Button } from '@/components/Button'
import Modal from '@/components/Modal'
import Spinner from '@/components/Spinner'
import { useFetch } from '@/hooks/useFetch'
import { useState } from 'react'

export default function UsersPage() {
  const { data, loading, error, refetch } = useFetch<User[]>(USERS_URL)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  function onRowClick(u: User) {
    setSelectedUser(u)
    setIsOpen(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button onClick={() => refetch(USERS_URL)}>Refetch</Button>
      </div>

      {loading && (
        <div className="text-slate-500 min-h-[90vh] flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {error && !data && (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load users</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={() => refetch(USERS_URL)} className="bg-sky-500 hover:bg-sky-600 text-white">
              Try Again
            </Button>
          </div>
        </div>
      )}

      {data && !loading && (
        <div className="overflow-auto bg-white rounded-2xl card-shadow">
          <table className="min-w-full divide-y">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-wider font-medium">Name</th>
                <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-wider font-medium">Email</th>
                <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-wider font-medium">Company</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 cursor-pointer text-black transition-colors duration-150" onClick={() => onRowClick(u)}>
                  <td className="px-4 py-3 whitespace-nowrap">{u.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{u.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{u.company?.name || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title={selectedUser?.name}>
        {selectedUser ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex flex-col space-y-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</span>
                <span className="text-sm text-gray-900">{selectedUser.email}</span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</span>
                <span className="text-sm text-gray-900">{selectedUser.phone}</span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Website</span>
                <span className="text-sm text-blue-600 hover:text-blue-800">
                  <a href={`https://${selectedUser.website}`} target="_blank" rel="noopener noreferrer">
                    {selectedUser.website}
                  </a>
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Company</span>
                <span className="text-sm text-gray-900">{selectedUser.company?.name || '-'}</span>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Address</span>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedUser.address?.suite && `${selectedUser.address.suite}, `}
                  {selectedUser.address?.street && `${selectedUser.address.street}, `}
                  {selectedUser.address?.city}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
