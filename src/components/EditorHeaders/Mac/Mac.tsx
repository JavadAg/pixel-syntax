import AddNewTab from "../AddNewTab/AddNewTab"
import EditorHeaderWrapper from "../EditorHeaderWrapper/EditorHeaderWrapper"
import MacControl from "./MacControl/MacControl"

type IProps = {
  variant: "outline" | "default" | "colored"
  children: React.ReactNode
  isEditor?: boolean
}

const Mac: React.FC<IProps> = ({ variant, children, isEditor }) => {
  return (
    <EditorHeaderWrapper>
      <MacControl variant={variant} />
      {children}
      {isEditor && <AddNewTab />}
    </EditorHeaderWrapper>
  )
}

export default Mac
