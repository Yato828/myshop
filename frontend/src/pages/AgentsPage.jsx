import "./AgentsPage.css";

export default function AgencyPage() {
  return (
    <div className="page">

      <header className="hero">
        <div className="container">

          <nav className="nav">

            <a className="logo" href="/">
              Kabaya
            </a>

            <div className="nav-links">
              <a href="#services">Услуги</a>
              <a href="#about">О нас</a>
              <a href="#contacts">Контакты</a>
            </div>

          </nav>


          <div className="hero-content">

            <p className="hero-label">
              DIGITAL AGENCY
            </p>

            <h1>
              Комплексное продвижение
              <br />
              бизнеса в интернете
            </h1>

            <p className="hero-description">
              Мы помогаем компаниям находить клиентов,
              развивать бренд и увеличивать продажи.
            </p>

            <a className="hero-button" href="#contacts">
              Обсудить проект
            </a>

          </div>

        </div>
      </header>


      <section className="features">
        <div className="container">

          <div className="features-grid">

            <article className="feature-card">

              <div className="feature-icon">
                01
              </div>

              <h3>
                Маркетинговая стратегия
              </h3>

              <p>
                Анализируем бизнес, аудиторию и конкурентов
                и создаём понятный план продвижения.
              </p>

            </article>


            <article className="feature-card">

              <div className="feature-icon">
                02
              </div>

              <h3>
                Разработка сайтов
              </h3>

              <p>
                Проектируем современные сайты,
                которые удобно использовать вашим клиентам.
              </p>

            </article>


            <article className="feature-card">

              <div className="feature-icon">
                03
              </div>

              <h3>
                SEO-продвижение
              </h3>

              <p>
                Улучшаем позиции сайта в поиске
                и увеличиваем органический трафик.
              </p>

            </article>

          </div>

        </div>
      </section>


      <section
        className="services"
        id="services"
      >

        <div className="container">

          <div className="section-heading">

            <p className="section-label">
              ЧТО МЫ ДЕЛАЕМ
            </p>

            <h2>
              Лучшие услуги для
              <span> быстрого роста</span>
            </h2>

            <p>
              Помогаем бизнесу развиваться через дизайн,
              маркетинг и технологии.
            </p>

          </div>


          <div className="services-grid">

            <article className="service-item">

              <div className="service-icon">
                S
              </div>

              <h3>
                Стратегия
              </h3>

              <p>
                Продумываем направление развития проекта.
              </p>

            </article>


            <article className="service-item">

              <div className="service-icon">
                M
              </div>

              <h3>
                Маркетинг
              </h3>

              <p>
                Привлекаем новую аудиторию и клиентов.
              </p>

            </article>


            <article className="service-item">

              <div className="service-icon">
                D
              </div>

              <h3>
                Технологии
              </h3>

              <p>
                Создаём современные цифровые продукты.
              </p>

            </article>


            <article className="service-item">

              <div className="service-icon">
                A
              </div>

              <h3>
                Реклама
              </h3>

              <p>
                Настраиваем эффективные рекламные кампании.
              </p>

            </article>


            <article className="service-item">

              <div className="service-icon">
                B
              </div>

              <h3>
                Бренд
              </h3>

              <p>
                Формируем узнаваемый образ компании.
              </p>

            </article>


            <article className="service-item">

              <div className="service-icon">
                SEO
              </div>

              <h3>
                SEO
              </h3>

              <p>
                Продвигаем сайты в поисковых системах.
              </p>

            </article>

          </div>

        </div>
      </section>


      <footer
        className="footer"
        id="contacts"
      >

        <div className="container footer-content">

          <a className="logo" href="/">
            Kabaya
          </a>

          <div className="footer-links">

            <a href="#services">
              Услуги
            </a>

            <a href="#about">
              О нас
            </a>

            <a href="#contacts">
              Контакты
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
}