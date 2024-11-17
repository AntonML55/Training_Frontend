import ExercisesPage from "../exercisesPage/ExercisesPage";

import { AppContextProvider } from "../../context/AppContext";

const App = () => {
    return (
        <AppContextProvider>
            <div className="min-h-screen bg-[#d9e6f4]">
                <div className="container mx-auto py-10">
                    <ExercisesPage />
                </div>
            </div>
        </AppContextProvider>
    );
};

export default App;
