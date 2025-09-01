import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div>
        <div>
          <div>
            <h3>Portfolio</h3>
            <p>
              Een professionele portfolio website gebouwd met moderne technologieën.
            </p>
          </div>

          <div>
            <h3>Snelle Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/over-mij">Over Mij</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <div>
              <p>Email: info@portfolio.nl</p>
              <p>Tel: +31 6 12345678</p>
            </div>
          </div>
        </div>

        <div>
          <p>
            © 2024 Portfolio. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
