import { NotificationProvider } from "./provider/NotificationProvider";
import { UserProvider } from "./provider/UserProvider";
import { ToggleProvider } from "./provider/ToggleProvider";
import { Home } from "./components/Home";

// 메인 App 컴포넌트
const App: React.FC = () => {
  return (
    <NotificationProvider>
      <UserProvider>
        <ToggleProvider>
          <Home />
        </ToggleProvider>
      </UserProvider>
    </NotificationProvider>
  );
};

export default App;
