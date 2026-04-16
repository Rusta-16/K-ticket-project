import './global.scss'
import { exo2 } from '../fonts'
export default function AdminLayout({ children }) {
  return (
    <html lang="ru" className={exo2.variable}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}