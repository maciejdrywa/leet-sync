import {Button} from "../shared/components/ui/button.tsx";
import {useAuth} from "../features/auth/contexts/useAuth.ts";
import {useRepositories} from "../features/repositories/contexts/useRepositories.ts";
import MyCombobox from "@/shared/components/MyCombobox.tsx";

function App() {
    const {authState, error, githubLogin, leetcodeLogin, logout} = useAuth();
    const {
        githubRepositories,
        getGithubRepositories,

        selectedRepository,
        setSelectedRepository
    } = useRepositories();


  return (
      <div className="flex flex-col w-90 h-100 items-start justify-center">
          Hello world
          <Button variant="default" size="lg" onClick={githubLogin}>GitHub login</Button>
          <Button variant="default" size="lg" onClick={leetcodeLogin}>LeetCode login</Button>
          <Button variant="default" size="lg" onClick={getGithubRepositories}>Get repos</Button>
          <Button variant="default" size="lg" onClick={logout}>Logout</Button>
          {JSON.stringify(authState)}


          <MyCombobox repositories={githubRepositories} value={selectedRepository ? selectedRepository.name : ""} onValueChange={setSelectedRepository}/>
          <p>{selectedRepository?.id} {selectedRepository?.name} {selectedRepository?.fullName}</p>
          {error}
      </div>
  )
}

export default App
