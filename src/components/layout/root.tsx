import { Link, Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <div>
      <nav className="bg-accent flex-center px-2">
        <Link to="/">This is your navbar</Link>
      </nav>
      <main className="h-(--screen-height)">
        <Outlet />
      </main>
    </div>
  );
};
