import { Link, Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
