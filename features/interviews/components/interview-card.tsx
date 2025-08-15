import { Button } from '@/components/ui/button';
import { getRandomInterviewCover } from '@/lib/utils';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import IconsGroup from './icons-group';

function InterviewCard({
  interviewId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) {
  const feedback = null as Feedback | null;
  const interviewType = /mix/gi.test(type) ? 'Mixed' : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format('MMM D, YYYY');

  return (
    <div className='card-border w-[360px] max-sm:w-full'>
      <div className='card-interview'>
        <div>
          <div className='absolute top-0 right-0 px-4 py-2 rounded-bl-lg w-fit bg-light-600'>
            <p className='badge-text'>{interviewType} </p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            width={90}
            height={90}
            className='rounded-full object-fit'
            alt='interview-cover'
          />

          <h3 className='mt-5 capitalize'>{role} Interview</h3>

          <div className='flex flex-row gap-5 mt-3'>
            <div className='flex items-center gap-2'>
              <Image
                src='./calendar.svg'
                width={22}
                height={22}
                alt='calendar-icon'
              />
              <p>{formattedDate}</p>
            </div>

            <div className='flex items-center gap-2'>
              <Image src='./star.svg' width={22} height={22} alt='star-icon' />
              <p>{feedback?.totalScore || '---'}/100</p>
            </div>
          </div>

          <p className='line-clamp-2 mt-5'>
            {feedback?.finalAssessment ||
              "You haven't taken any interviews yet. Take it now to imporve your skills!"}
          </p>

          <div className='flex justify-between items-center mt-5'>
            <IconsGroup techStack={techstack} />
            <Button className='btn-primary'>
              <Link
                href={
                  feedback
                    ? `/interview/${interviewId}/feedback`
                    : `/interview/${interviewId}`
                }
              >
                {feedback ? 'Check Feedback' : 'View Interview'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;
