import EditorHeaderWrapper from "../EditorHeaderWrapper/EditorHeaderWrapper"
import MacControl from "./MacControl/MacControl"

type IProps = {
  variant: "outline" | "default" | "colored"
  children: React.ReactNode
}

const Mac: React.FC<IProps> = ({ variant, children }) => {
  return (
    <EditorHeaderWrapper>
      <MacControl variant={variant} />
      {children}
    </EditorHeaderWrapper>
  )
}

export default Mac
