import Header from './components/ui/Header';
import './styles/global.scss';
import { exo2 } from './fonts'
import Footer from './components/ui/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={exo2.variable}>
      <body>
        <Header></Header>
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
