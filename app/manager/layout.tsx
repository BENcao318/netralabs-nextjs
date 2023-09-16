import ManagerNavbar from '@/components/manager-navbar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container">
        <ManagerNavbar />
        <section>{children}</section>
      </main>
    </>
  )
}
