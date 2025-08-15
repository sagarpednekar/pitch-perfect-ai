'use client';
import FormField from '@/components/form/form-field';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email(),
  password: z.string().min(3),
});

function RegisterForm() {
  toast.success('Account created successfully!');

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log('Form submitted with values:', values);
      toast.success('Account created successfully!');
      debugger;
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
              name='name'
              control={form.control}
              label='Name'
              placeholder='Enter your name'
              type='text'
            />
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
              Create an Account
            </Button>
          </form>
        </Form>
        <p className='text-center'>
          Have an account already ?{' '}
          <Link href='sign-in' className='font-bold text-user-primary ml-1'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
