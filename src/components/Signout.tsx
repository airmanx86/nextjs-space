
import { signOut } from '@/auth';
 
export default function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/' });
      }}
    >
      <button type='submit'>Sign out</button>
    </form>
  )
}
