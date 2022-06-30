import { FormEvent, useEffect, useRef, useState } from "react"

interface Props {
  addPost: (text: string) => Promise<void>
}

const PostForm = ({ addPost }: Props) => {

  const [postText, setPostText] = useState<string>('')
  const [adding, setAdding] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()

    setAdding(true)
    await addPost(postText)
    setAdding(false)
    setPostText('')
  }

  useEffect(() => {
    if (!adding) {
      inputRef.current?.focus()
    }
  }, [adding])

  return (
    <form onSubmit={onSubmitHandler}>
      <input
        ref={inputRef}
        value={postText}
        onChange={e => setPostText(e.target.value)}
        disabled={adding}
      />
      <button disabled={adding}>add post</button>
    </form>
  )
}

export default PostForm