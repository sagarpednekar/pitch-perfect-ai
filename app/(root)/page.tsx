import { Button } from '@/components/ui/button';
import InterviewCard from '@/features/interviews/components/interview-card';
import { dummyInterviews } from '@/shared/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* <!-- Hero Section --> */}
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className='text-lg'>
            Practice real interview questions & get instant feedback.
          </p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'>Start an Interview</Link>
          </Button>
        </div>
        <Image
          src='/robot.png'
          alt='Robot Image'
          width={400}
          height={400}
          className='max-sm:hidden'
        />
      </section>

      {/* <!-- Past Interviews --> */}

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Past Interviews</h2>
        <div className='interviews-section'>
          {dummyInterviews.length ? (
            dummyInterviews.map(interview => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      {/* <!-- Pick Interviews --> */}

      <section className='flex flex-col gap-6 mt-10'>
        <h2>Pick Your Interviews</h2>
        <div className='interviews-section'>
          {dummyInterviews.length ? (
            dummyInterviews.map(interview => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}
