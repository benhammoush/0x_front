import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React from "react"

const Layout: React.FC = ({ children }) => {
  return (
    <div className="dark:bg-darkbg">
      <Nav />
      <main className="relative dark:bg-darkbg">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
