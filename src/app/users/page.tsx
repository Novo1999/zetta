'use client'
import { User } from '@/app/types'
import Modal from '@/components/Modal'
import { Spinner } from '@/components/Spinner'
import { useFetch } from '@/hooks/useFetch'
import React, { useState } from 'react'

export default function UsersPage() {
  const { data, loading, error, refetch } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users')
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
        <button onClick={() => refetch()} className="px-3 py-1 rounded bg-slate-100 text-black">
          Refetch
        </button>
      </div>

      {loading && (
        <div className="text-slate-500 min-h-[90vh] flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {error && <div className="text-red-600">Failed to load users: {error}</div>}

      {data && (
        <div className="overflow-auto bg-white rounded-2xl card-shadow">
          <table className="min-w-full divide-y">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-3 text-xs text-slate-500">Name</th>
                <th className="px-4 py-3 text-xs text-slate-500">Email</th>
                <th className="px-4 py-3 text-xs text-slate-500">Company</th>
              </tr>
            </thead>
            <tbody>
              {data.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 cursor-pointer text-black" onClick={() => onRowClick(u)}>
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3">{u.company?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title={selectedUser?.name}>
        {selectedUser ? (
          <div className="space-y-2 text-sm">
            <div>
              <strong>Email:</strong> {selectedUser.email}
            </div>
            <div>
              <strong>Phone:</strong> {selectedUser.phone}
            </div>
            <div>
              <strong>Website:</strong> {selectedUser.website}
            </div>
            <div>
              <strong>Company:</strong> {selectedUser.company?.name}
            </div>
            <div className="pt-2 text-xs text-slate-500">
              Address: {selectedUser.address?.suite}, {selectedUser.address?.street}, {selectedUser.address?.city}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
