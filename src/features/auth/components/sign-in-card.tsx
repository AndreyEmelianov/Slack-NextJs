import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SignInFlow } from '../types';

interface SignInCardProps {
  changeAuthFlow: (state: SignInFlow) => void;
}

export const SignInCard = ({ changeAuthFlow }: SignInCardProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuthActions();

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    signIn('password', { email, password, flow: 'signIn' })
      .catch(() => {
        setError('Invalid email or password');
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const handleProviderSignIn = (value: 'github' | 'google') => {
    setIsPending(true);
    signIn(value).finally(() => {
      setIsPending(false);
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          {error}
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignIn} className="space-y-2.5">
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
            onClick={() => handleProviderSignIn('google')}
            className="w-full relative">
            <FcGoogle className="size-5 absolute top-3 left-2.5" />
            Continue with Google
          </Button>
          <Button
            disabled={isPending}
            variant="outline"
            size="lg"
            onClick={() => handleProviderSignIn('github')}
            className="w-full relative">
            <FaGithub className="size-5 absolute top-3 left-2.5" />
            Continue with GitHub
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => changeAuthFlow('signUp')}
            className="text-sky-700 hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
