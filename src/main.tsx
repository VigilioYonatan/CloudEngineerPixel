import { render } from 'preact';
import { App } from './App';
import './design-system/fonts.css';
import './design-system/tokens.css';
import './styles.css';

render(<App />, document.getElementById('app')!);
