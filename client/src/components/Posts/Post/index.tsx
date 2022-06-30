import { FC, useEffect, useMemo, useState } from 'react'
import { IPost } from '../../../types'
import styles from './index.module.scss'


interface Props extends IPost {
  username: string
  updatePost: (_id: string, editedText: string) => Promise<void>
  removePost: (_id: string) => Promise<void>
}

const Post: FC<Props> = ({ _id, text, timestamp, username, updatePost, removePost }) => {

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
    await updatePost(_id, editedText)
    setUpdating(false)
    toogleEdit(false)
    setEditedText('')
  }

  const onClickHandler = async () => {
    setDeleting(true)
    await removePost(_id)
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
          </p>
        }
      </div>
    </div>
  )

}

export default Post