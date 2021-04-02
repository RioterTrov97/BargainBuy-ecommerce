import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
	return (
		<Router>
			<Header />
			<Route exact path="/" component={HomeScreen} />
			<Route path="/product/:id" component={ProductScreen} />
			<Footer />
		</Router>
	);
}

export default App;
