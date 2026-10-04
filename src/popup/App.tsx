import {Button} from "../shared/components/ui/button.tsx";
import {useAuth} from "../features/auth/contexts/useAuth.ts";

function App() {
    const {authState, error, githubLogin, leetcodeLogin, logout} = useAuth();

  return (
      <div className="flex flex-col w-90 h-100 items-start justify-center">
          Hello world
          <Button variant="default" size="lg" onClick={githubLogin}>GitHub login</Button>
          <Button variant="default" size="lg" onClick={leetcodeLogin}>LeetCode login</Button>
          <Button variant="default" size="lg" onClick={logout}>Logout</Button>
          {JSON.stringify(authState)}
          {error}
      </div>
  )
}

export default App
