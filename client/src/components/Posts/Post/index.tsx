import { FC, useEffect, useState } from 'react'
import { IPost } from '../../../models/IPost'
import styles from './index.module.scss'


interface Props extends Omit<IPost, 'id'> {
  updatePostError: string | null
  username: string
  updatePost: (editedText: string) => Promise<void>
  removePost: () => Promise<void>
}

const Post: FC<Props> = ({ updatePostError, text, timestamp, username, updatePost, removePost }) => {

  const [updating, setUpdating] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [isEdit, toogleEdit] = useState<boolean>(false)
  const [editedText, setEditedText] = useState<string>(text)
  useEffect(() => setEditedText(text), [text])

  const onBlurHandler = async () => {
    if (!editedText || editedText === text) {
      toogleEdit(false)
      return
    }

    setUpdating(true)
    await updatePost(editedText)
    setUpdating(false)
    toogleEdit(false)
    setEditedText('')
  }

  const onClickHandler = async () => {
    setDeleting(true)
    await removePost()
    setDeleting(false)
  }

  return (
    <div className={styles.post}>
      <div className={styles.title}>
        <span className={styles.title__name}>{username}</span>
        <span className={styles.title__time}>{timestamp}</span>
        <button
          className={styles.title__delete}
          disabled={deleting}
          onClick={onClickHandler}
        >
          &times;
        </button>
      </div>
      <div className={styles.text}>
        {isEdit
          ? <textarea
            value={editedText}
            onChange={e => setEditedText(e.target.value)}
            onBlur={onBlurHandler}
            autoFocus
            onFocus={e => e.target.setSelectionRange(editedText.length, editedText.length)}
            disabled={updating}
          />
          : <p onDoubleClick={() => toogleEdit(true)}>
            {text}
            {updatePostError &&
              <span className={styles.text__error}>
                {updatePostError}
              </span>
            }
          </p>
        }
      </div>
    </div>
  )

}

export default Post