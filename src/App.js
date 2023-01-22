import Buttons from 'Pages/Examples/Buttons';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import CsvUpload from 'Components/CsvUpload';
import PageNotFound from 'Pages/404';
import './App.css';

function App(props) {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					{/* <Route path='/' element={<PageNotFound />}> */}
					<Route path='/upload-customer-info' element={<CsvUpload />} />
					<Route path='/examples/buttons' element={<Buttons />} />
					<Route index element={<PageNotFound />} />
					<Route path='*' element={<PageNotFound />} />
					{/* </Route> */}
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
