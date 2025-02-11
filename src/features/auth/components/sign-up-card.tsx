import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { TriangleAlert } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SignInFlow } from '../types';

interface SignUpCardProps {
  changeAuthFlow: (state: SignInFlow) => void;
}

export const SignUpCard = ({ changeAuthFlow }: SignUpCardProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuthActions();

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Password do not match');
      return;
    }

    setIsPending(true);
    signIn('password', { name, email, password, flow: 'signUp' })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const handleProviderSignUp = (value: 'github' | 'google') => {
    setIsPending(true);
    signIn(value).finally(() => {
      setIsPending(false);
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          {error}
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            required
            disabled={isPending}
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            required
            disabled={isPending}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            disabled={isPending}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            required
            disabled={isPending}
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" size="lg" disabled={isPending} className="w-full">
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={isPending}
            variant="outline"
            size="lg"
            onClick={() => handleProviderSignUp('google')}
            className="w-full relative">
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={isPending}
            variant="outline"
            size="lg"
            onClick={() => handleProviderSignUp('github')}
            className="w-full relative">
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with GitHub
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{' '}
          <span
            onClick={() => changeAuthFlow('signIn')}
            className="text-sky-700 hover:underline cursor-pointer">
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
