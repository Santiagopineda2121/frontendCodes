import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import "./Layout.css";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";

function Layout() {
  const { t, i18n } = useTranslation();
  const { logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const languages = [
    { code: "es", flag: "es", label: "ES" },
    { code: "en", flag: "us", label: "EN" },
    { code: "pt", flag: "br", label: "PT" },
  ];

  const [langOpen, setLangOpen] = useState(false);
  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} />

      <div className="main-area">
        <header className="navbar">
          <div className="nav-left">
            <button
              className="menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            <h3>{t("navbar.panel")}</h3>
          </div>

          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <div className="lang-dropdown">
              <button
                className="lang-btn"
                onClick={() => setLangOpen(!langOpen)}
              >
                <span className={`fi fi-${currentLang.flag}`}></span>
                {currentLang.label} ▾
              </button>

              {langOpen && (
                <div className="lang-menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`lang-option ${i18n.language === lang.code ? "active" : ""}`}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                    >
                      <span className={`fi fi-${lang.flag}`}></span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              {t("navbar.logout")}
            </button>
          </div>
        </header>

        <main className="content">
          <Outlet />
        </main>

        <footer className="footer">
          © {new Date().getFullYear()} Kitty Codes - Dev:&nbsp;
          <a
            href="https://wa.me/573024824806"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            Diego Morales
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
