
import { signIn } from '@/auth';
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('keycloak', { redirectTo: '/' });
      }}
    >
      <button type='submit'>Signin with Keycloak</button>
    </form>
  )
}
