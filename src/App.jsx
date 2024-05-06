import 'devextreme/dist/css/dx.light.css';
import Content from './components/content/content';
import Layout from './components/page-elements/layout';
import NavigationToolbar from './components/page-elements/navigation/navigation-toolbar';
import Providers from './components/providers';


function App() {

  return (
    <Providers>
      <Layout
        navigation={<NavigationToolbar />}
        body={<Content />}
      />
    </Providers>
  )
}

export default App
