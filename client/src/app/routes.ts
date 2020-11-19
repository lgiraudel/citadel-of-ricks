import Home from './pages/home/index';
import Characters from './pages/characters/index';
import NewCharacter from './pages/characters/new';
import CharacterDetails from './pages/characters/details';

export default [
  { path: '/', name: 'Home', Component: Home },
  { path: '/characters', name: 'Characters', Component: Characters },
  { path: '/characters/new', name: 'New Character', Component: NewCharacter },
  { path: '/characters/:id', name: 'Character details', Component: CharacterDetails },
]
