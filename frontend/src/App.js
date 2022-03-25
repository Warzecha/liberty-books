import {Provider} from 'react-redux';
import store from './store';
import MainNavigation from './navigation/MainNavigation';
import SideBar from './components/SideBar/SideBar';
import {ThemeProvider} from 'react-jss';
import {BrowserRouter} from 'react-router-dom';
import AudioBookPlayer from './components/AudiobookPlayer/AudioBookPlayer';

function App() {

    const theme = {
        color: 'black',
        background: 'white',

        palette: {
            primary: {
                main: '#FD4759'
            },
            text: {
                primary: 'rgba(0,0,0,0.87)',
                secondary: 'rgba(0,0,0,0.60)'
            },
            action: {
                active: 'rgba(0,0,0,0.60)',
                hoverBackground: 'rgba(234,234,234,0.6)'
            }
        }
    };

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <div style={{display: 'flex'}}>
                        <SideBar/>
                        <div style={{padding: 8}}>
                            <MainNavigation/>
                        </div>
                        <AudioBookPlayer/>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
