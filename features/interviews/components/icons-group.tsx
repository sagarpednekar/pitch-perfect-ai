import { cn, getTechLogos } from '@/lib/utils';
import Image from 'next/image';

export default async function IconsGroup({ techStack }: TechIconProps) {
  const techIcons = await getTechLogos(techStack);
  return (
    <div className='flex flex-row'>
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={tech}
          className={cn(
            'group relative p-2 flex-center rounded-full bg-dark-300',
            index >= 1 && '-ml-3'
          )}
        >
          <span className='tech-tooltip'>{tech}</span>
          <Image
            src={url}
            alt='tech-icons'
            width={100}
            height={100}
            className='size-5'
          />
        </div>
      ))}
    </div>
  );
}
