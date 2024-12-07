import type { StateCreator } from "zustand"

export type EditorSlice = {
  content: string
  editorRef: HTMLDivElement | null
  setContent: (payload: string) => void
  setEditorRef: (payload: HTMLDivElement | null) => void
}

export const createEditorSlice: StateCreator<EditorSlice> = (set) => ({
  content: `const IntervalCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return <h1>Counter: {count}</h1>;
};
`,
  editorRef: null,
  setContent: (payload) =>
    set(() => ({
      content: payload
    })),
  setEditorRef: (payload) =>
    set(() => ({
      editorRef: payload
    }))
})
