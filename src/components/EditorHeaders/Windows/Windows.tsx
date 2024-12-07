import EditorHeaderWrapper from "../EditorHeaderWrapper/EditorHeaderWrapper"
import WindowsControl from "./WindowsControl/WindowsControl"

type IProps = {
  children: React.ReactNode
}

const Windows: React.FC<IProps> = ({ children }) => {
  return (
    <EditorHeaderWrapper>
      {children}
      <WindowsControl />
    </EditorHeaderWrapper>
  )
}

export default Windows
