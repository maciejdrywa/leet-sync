import {Button} from "../shared/components/ui/button.tsx";
import {useAuth} from "../features/auth/contexts/useAuth.ts";

function App() {
    const {authState, githubLogin} = useAuth();

  return (
      <div className="flex flex-col w-90 h-100 items-start justify-center">
          Hello world
          <Button variant="default" size="lg" onClick={githubLogin}>test button</Button>
          {JSON.stringify(authState)}
      </div>
  )
}

export default App
