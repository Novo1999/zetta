'use client'
import Button from '@/components/Button';
import { signIn } from 'next-auth/react';
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  return (
    <Button onClick={() => signIn('google')}>
      Sign In With Google
      <FaGoogle />
    </Button>
  )
}
