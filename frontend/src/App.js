import {Provider} from 'react-redux';
import store from './store';
import MainNavigation from './navigation/MainNavigation';
import SideBar from './components/SideBar/SideBar';
import {ThemeProvider} from 'react-jss';

const {
    PUBLIC_URL
} = process.env;

function App() {

    const theme = {
        color: 'black',
        background: 'white',

        palette: {
            primary: {
                main: '#1976d2'
            },
            text: {
                primary: 'rgba(0,0,0,0.87)',
                secondary: 'rgba(0,0,0,0.60)'
            },
            action: {
                active: 'rgba(0,0,0,0.60)'
            }
        }
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <div style={{display: 'flex'}}>
                    <SideBar/>

                    <MainNavigation/>
                </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
