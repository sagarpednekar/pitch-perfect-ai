'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import FormField from '@/components/form/form-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { auth } from '@/core/db/client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { login } from '@/features/auth/actions';

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(3),
});

function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Form submitted with values:', values);
      const { email, password } = values;
      const user = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.user.getIdToken();
      console.log('User signed in:', token);
      if (!token) {
        toast.error('Authentication failed, please try again.');
        return;
      }
      await login({ email, token });
      console.log('User signed in successfully:', user);
      toast.success('Login successful!');
      // Redirect or perform additional actions after successful login
      router.push('/');
    } catch (error) {
      toast.error('Something went wrong, please try again later.');
      console.error('Error during form submission:', error);
    }
    console.log(values);
  }

  return (
    <div className='card-border lg:min-w-[566px]'>
      <div className='flex flex-col gap-6 py-14 card px-10'>
        <div className='flex flex-row gap-2 justify-center'>
          <Image src='./logo.svg' alt='brand-logo' height={32} width={38} />
          <h2 className='text-primary-100'>PitchPerfectAI</h2>
        </div>
        <h3>Practice JOB interviews with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full mt-4 space-y-6 form'
          >
            <FormField
              name='email'
              control={form.control}
              label='Email'
              placeholder='Enter your email'
              type='email'
            />
            <FormField
              name='password'
              control={form.control}
              label='Password'
              placeholder='Enter your Password'
              type='password'
            />

            <Button type='submit' className='btn'>
              Login!
            </Button>
          </form>
        </Form>
        <p className='text-center'>
          Don&apos;t have account ?
          <Link href='sign-up' className='font-bold text-user-primary ml-1'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
