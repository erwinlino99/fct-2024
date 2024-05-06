import Header from './components/Header'
import Products from './components/Products'
import Profile from './components/profile/Profile';



function App() {
  return (
    <div className="App">
        <Profile></Profile>
      <Header/>
      <Products/>
    </div>
  );
}

export default App;