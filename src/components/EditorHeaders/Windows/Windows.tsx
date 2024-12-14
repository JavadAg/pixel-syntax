import AddNewTab from "../AddNewTab/AddNewTab"
import EditorHeaderWrapper from "../EditorHeaderWrapper/EditorHeaderWrapper"
import WindowsControl from "./WindowsControl/WindowsControl"

type IProps = {
  children: React.ReactNode
  isEditor?: boolean
}

const Windows: React.FC<IProps> = ({ children, isEditor }) => {
  return (
    <EditorHeaderWrapper>
      {children}
      {isEditor && <AddNewTab />}
      <WindowsControl />
    </EditorHeaderWrapper>
  )
}

export default Windows
