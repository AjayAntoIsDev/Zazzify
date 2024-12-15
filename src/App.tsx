import { useState } from "react";
import "./App.css";
import Modal from "./errorModal";
import config from "./config.json"

function App() {
    const [translator, setTranslator] = useState("shakespeare");
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const translate = async () => {
        setIsLoading(true);
        try {
            const response = await fetch((config.api), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: inputText,
                    // @ts-expect-error Stupid Typescript
                    translatorCode: config.translators[translator],
                }),
            });
            const data = await response.json();
            console.log(data)
            setOutputText(data);
        } catch (error) {
            console.error("Translation API error:", error);
            // @ts-expect-error Stupid Typescript
            setErrorMessage(error.message);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className=" h-screen flex flex-col items-center justify-center bg-surface-a0 text-white py-16">
            <div className="absolute top-4 right-4">
                <a href="https://github.com/AjayAntoIsDev/Zazzify">
                    <div className="flex  items-center justify-center gap-3 font-semibold bg-surface-a10 p-3 rounded-xl px-5 cursor-pointer hover:bg-surface-a20 ">
                        <p>View on GitHub</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="currentColor"
                            className="bi bi-github"
                            viewBox="0 0 16 16">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                        </svg>
                    </div>
                </a>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-primary-a10 mt-12">
                Zazzify
            </h1>

            <div className="mb-4 text-center">
                <label
                    htmlFor="translator"
                    className="block text-sm font-medium text-white mb-2">
                    Select Translator
                </label>
                <select
                    id="translator"
                    value={translator}
                    onChange={(e) => setTranslator(e.target.value)}
                    className="block w-full rounded-xl bg-surface-a10 p-3 px-5 border-r-8 border-transparent text-sm outline outline-surface-a20 mt-3">
                    <option value="shakespeare">Shakespeare</option>
                    <option value="genz">Gen Z</option>
                    <option value="pirate">Pirate</option>
                    <option value="hood">The Hood</option>
                    <option value="premiumEnglish">Premium English</option>
                </select>
            </div>

            <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-12 md:gap-4 w-full px-12 py-6 h-full">
                <div>
                    <label
                        htmlFor="input"
                        className="block text-sm font-medium text-white mb-2">
                        Input
                    </label>
                    <textarea
                        id="input"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full h-full p-2 border border-surface-a20 rounded-md bg-surface-a10 focus:outline-none focus:ring-primary-a0 focus:border-primary-a0 resize-none"></textarea>
                </div>

                <div>
                    <label
                        htmlFor="output"
                        className="block text-sm font-medium text-white mb-2">
                        Output
                    </label>
                    <textarea
                        id="output"
                        value={outputText}
                        onChange={(e) => setOutputText(e.target.value)}
                        className="w-full h-full p-2 border border-surface-a20 rounded-md bg-surface-a10 focus:outline-none focus:ring-primary-a0 focus:border-primary-a0  resize-none"
                        readOnly={true}></textarea>
                </div>
            </div>

            <div className="flex space-x-4 mt-12">
                <button
                    onClick={translate}
                    className={`px-4 py-2 rounded-md shadow focus:outline-none ${
                        isLoading
                            ? "bg-primary-a0 opacity-50 cursor-not-allowed text-gray-900"
                            : "bg-primary-a0 text-gray-900 hover:scale-110 transition-all"
                    }`}
                    disabled={isLoading}>
                    {isLoading ? "Translating..." : "Translate"}
                </button>
            </div>

            <Modal open={isError} onClose={() => setIsError(false)}>
                <div className="text-center w-auto flex flex-col p-5">
                    <p className="text-red-500 font-bold text-2xl self-start">
                        Error!
                    </p>
                    <p className="text-gray-200 font-normal self-start mt-2 text-xl">
                        {errorMessage}
                    </p>
                </div>
            </Modal>
            <div
                id="Loading"
                className={`
        fixed inset-0 flex justify-center items-center transition-colors h-[99vh]
        ${isLoading ? "visible bg-black/20" : "invisible"}
      `}>
                <div
                    className={`
          bg-surface-a20 rounded-xl shadow p-6 transition-all
          ${isLoading ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}>
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="inline w-10 h-10 text-surface-a30 animate-spin fill-primary-a20"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
