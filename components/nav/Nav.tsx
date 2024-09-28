'use client'
 
import { faPuzzlePiece, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { endpoint } from '@/helpers/endpoint'
import sendRequest from '@/helpers/request'
import { NavLink } from './NavLink'
import { Logo } from '../svg/Logo'
import { NavLinkIcon } from './NavLinkIcon'
 
export function Nav() {
  const logout = () => {
    const url = endpoint("/api/auth/logout")
    // TODO: Proper error handling. Maybe show modal?
    sendRequest(url, "POST")
      .then(() => window.location.reload())
      .catch((error) => console.error(error))
  }
 
  return (
    <nav className="bg-background/50 backdrop-blur-sm flex justify-between px-8 py-6 fixed top-0 w-full border-b-2 border-foreground">
        <div className="flex gap-2 items-center">
            <Logo width={50} height={50} className="mr-4" />
            <NavLink text="Dashboard" href="/" />
            <NavLink text="Manga" href="/manga" />
            <NavLink text="Comics" href="/comics" />
        </div>

        <div className="flex gap-2 items-center">
            <NavLinkIcon icon={faPuzzlePiece} href="/repositories" />
            <NavLinkIcon icon={faRightFromBracket} onClick={logout} />
        </div>
    </nav>
  )
}
