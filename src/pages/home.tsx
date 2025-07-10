import { Separator } from '@/components/ui/separator';

const BADGES = [
  {
    name: 'Bun',
    logo: 'bun',
    color: '282a36',
  },
  {
    name: 'React',
    color: '20232A',
    logo: 'react',
    logoColor: '61DAFB',
  },
  {
    name: 'Vite',
    logo: 'vite',
    color: 'B73BFE',
    logoColor: 'FFD62E',
  },
  {
    name: 'Redux',
    logo: 'redux',
    color: '593D88',
  },
  {
    name: 'React_Router',
    logo: 'react-router',
    color: 'CA4245',
  },
  {
    name: 'Express%20js',
    logo: 'express',
  },
  {
    name: 'Eslint',
    logo: 'eslint',
    color: '3A33D1',
  },
  {
    name: 'Prettier',
    logo: 'prettier',
    color: '1A2C34',
    logoColor: 'FFD62E',
  },
  {
    name: 'Hook_form',
    logo: 'hook-form',
    color: '3068B7',
  },
  {
    name: 'Zod',
    logo: 'zod',
    logoColor: '3068B7',
  },
  {
    name: 'Tailwind_CSS',
    logo: 'tailwind-css',
    color: '38B2AC',
  },
  {
    name: 'shadcn%2Fui',
    logo: 'shadcnui',
  },
];

export const HomePage = () => {
  return (
    <div className="h-full flex-center flex-col">
      <div className="border border-dashed p-6 rounded-lg max-w-3xl space-y-4">
        <h1>⚡ SSR React App Boilerplate</h1>
        <Separator />
        <div className="py-4 flex flex-wrap gap-2">
          {BADGES.map((item) => (
            <img
              key={item.name}
              src={`https://img.shields.io/badge/${item.name}-${item.color ?? '000000'}?style=for-the-badge&logo=${item.logo}&logoColor=${item.logoColor ?? 'white'}`}
              alt={`${item.logo}-badge`}
              className="rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
