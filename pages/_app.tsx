import Categories from '@/components/Modals/Account/Categories'
import Sources from '@/components/Modals/Account/Sources'
import { store } from '@/lib/redux/store'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />

      <Categories />
      <Sources />      
    </Provider>
  )
}
