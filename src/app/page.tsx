import Image from 'next/image';
import { IconBrandGithub } from '@tabler/icons-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-4 p-24">
      <p>Superteam Germany Blink Example</p>
      <a href="https://github.com/Superteam-Germany/superblink">
        <IconBrandGithub stroke={2} />
      </a>
    </main>
  );
}
