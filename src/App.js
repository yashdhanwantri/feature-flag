import './App.css';
import FeatureFlagList from './components/featureFlagList';

function App() {
  return (
    <div className="App">
      <header className="header">Feature Flag Management</header>
      <div className="container">
        <aside className="sidebar">Sidebar</aside>
        <div className="body">
          <FeatureFlagList></FeatureFlagList>
        </div>
      </div>
    </div>
  );
}

export default App;
